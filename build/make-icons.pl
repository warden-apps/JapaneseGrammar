#!/usr/bin/perl
# Draws the 筋道 home-screen icon: a pixel-art seedling in a terracotta pot on
# warm paper. The art is a 16x16 grid, and every PNG is that grid at an integer
# scale, centred with background padding to reach the exact size the platform
# wants. Integer scaling is the whole point — at 11.25x the "pixels" would come
# out uneven and the art would go soft, which defeats the look.
#
#   perl build/make-icons.pl            # writes icons/, apple-touch-icon.png, favicon.ico
use strict;
use warnings;
use Compress::Zlib ();
use File::Path qw(make_path);
use File::Basename qw(dirname);

my $ROOT = dirname(__FILE__) . '/..';

# ---------------------------------------------------------------- palette ---
my %C = (
    '.' => [0xF7, 0xF0, 0xDF],   # paper — matches --paper in index.html
    'G' => [0x4E, 0x7C, 0x55],   # leaf
    'g' => [0x7B, 0xA3, 0x77],   # leaf, sunlit edge
    'S' => [0x55, 0x79, 0x4F],   # stem
    'd' => [0x8E, 0x45, 0x29],   # pot, shadow side
    'r' => [0xA6, 0x51, 0x33],   # pot rim
    'P' => [0xB4, 0x5B, 0x3C],   # pot
    'h' => [0xCE, 0x7A, 0x57],   # pot highlight
);

# 16x16, symmetric about the seam between columns 7 and 8
my @ART = (
    '................',
    '................',
    '.......gg.......',
    '......gGGg......',
    '...gg.gGGg.gg...',
    '..gGGggGGggGGg..',
    '..gGGGGGGGGGGg..',
    '...gGGGGGGGGg...',
    '....ggGGGGgg....',
    '.......SS.......',
    '.......SS.......',
    '...rrrrrrrrrd...',
    '...PhPPPPPPPd...',
    '....PhPPPPPd....',
    '.....PhPPPd.....',
    '................',
);
my $N = 16;

# ------------------------------------------------------------ PNG writer ----
sub chunk {
    my ($type, $data) = @_;
    return pack('N', length $data) . $type . $data
         . pack('N', Compress::Zlib::crc32($type . $data));
}

# $scale = size of one art pixel; the rest of the canvas is paper.
sub png {
    my ($size, $scale) = @_;
    my $art = $N * $scale;
    my $off = int(($size - $art) / 2);          # centred; may be 0
    my $bg  = $C{'.'};

    my $raw = '';
    for my $y (0 .. $size - 1) {
        $raw .= "\0";                            # filter: none
        my $ay = $y - $off;
        if ($ay < 0 || $ay >= $art) {            # padding row
            $raw .= pack('C3', @$bg) x $size;
            next;
        }
        my @row = split //, $ART[ int($ay / $scale) ];
        my $line = '';
        $line .= pack('C3', @$bg) for 1 .. $off;
        for my $x (0 .. $art - 1) {
            my $c = $C{ $row[ int($x / $scale) ] } || $bg;
            $line .= pack('C3', @$c);
        }
        $line .= pack('C3', @$bg) while length($line) < $size * 3;
        $raw .= substr($line, 0, $size * 3);
    }

    my $ihdr = pack('NNCCCCC', $size, $size, 8, 2, 0, 0, 0);   # 8-bit truecolour
    return "\x89PNG\r\n\x1a\n"
         . chunk('IHDR', $ihdr)
         . chunk('IDAT', Compress::Zlib::compress($raw, 9))
         . chunk('IEND', '');
}

sub spit {
    my ($path, $bytes) = @_;
    make_path(dirname($path));
    open my $fh, '>:raw', $path or die "$path: $!";
    print $fh $bytes;
    close $fh;
    printf "  %-34s %6d bytes\n", $path =~ m{([^/]+/?[^/]*)$} ? $1 : $path, length $bytes;
}

# ------------------------------------------------------------------ ICO -----
# A .ico may simply carry a PNG payload for 32x32 and up, which saves writing a
# BMP encoder for a file only desktop browsers ask for.
sub ico {
    my ($size, $pngdata) = @_;
    return pack('vvv', 0, 1, 1)
         . pack('CCCCvvVV', $size, $size, 0, 0, 1, 32, length($pngdata), 22)
         . $pngdata;
}

# ------------------------------------------------------------------ SVG -----
# One <rect> per non-background pixel. Stays crisp at any size, and is what
# Android reaches for first when the launcher wants something big.
sub svg {
    my $r = qq{<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $N $N" shape-rendering="crispEdges">\n};
    $r .= sprintf qq{<rect width="%d" height="%d" fill="#%02X%02X%02X"/>\n}, $N, $N, @{ $C{'.'} };
    for my $y (0 .. $N - 1) {
        my @row = split //, $ART[$y];
        my $x = 0;
        while ($x < $N) {
            my $ch = $row[$x];
            if ($ch eq '.') { $x++; next; }
            my $run = 1;
            $run++ while $x + $run < $N && $row[ $x + $run ] eq $ch;   # merge runs
            $r .= sprintf qq{<rect x="%d" y="%d" width="%d" height="1" fill="#%02X%02X%02X"/>\n},
                          $x, $y, $run, @{ $C{$ch} };
            $x += $run;
        }
    }
    return $r . "</svg>\n";
}

# ----------------------------------------------------------------- build ----
print "筋道 icons\n";
for my $s (16, 32, 48, 180, 192, 512) {
    my $scale = int($s / $N) || 1;
    my $name  = $s == 180 ? "$ROOT/apple-touch-icon.png" : "$ROOT/icons/icon-$s.png";
    spit($name, png($s, $scale));
}
# Android masks icons to a circle/squircle and crops hard, so the maskable copy
# keeps the art inside the middle ~66% and lets the paper take the trimming.
spit("$ROOT/icons/icon-maskable-512.png", png(512, int(512 * 0.66 / $N)));
spit("$ROOT/icons/icon.svg", svg());
spit("$ROOT/favicon.ico", ico(32, png(32, 2)));
print "done\n";
