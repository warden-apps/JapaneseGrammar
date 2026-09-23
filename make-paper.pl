#!/usr/bin/perl
# A 128x128 tileable paper-grain tile, laid over the background at low opacity
# so the cream reads as paper rather than flat colour.
#
# Grain is fine noise plus a few longer "fibres". The seed is fixed so
# rebuilding does not silently change the look.
#
#   perl build/make-paper.pl        # writes icons/paper.png
use strict;
use warnings;
use Compress::Zlib ();
use File::Path qw(make_path);
use File::Basename qw(dirname);

my $ROOT = dirname(__FILE__) . '/..';
my $N    = 128;

srand(20261208);                      # exam day, for luck

my @px = (128) x ($N * $N);           # mid grey; CSS blends it, so only the
                                      # deviation from 128 ends up visible
for my $i (0 .. $#px) {
    $px[$i] += int(rand(13)) - 6;
}

# a few short fibres, wrapped so the tile still meets itself cleanly
for (1 .. 55) {
    my ($x, $y) = (int rand $N, int rand $N);
    my $len     = 4 + int rand 14;
    my $horiz   = rand() < 0.72;      # pulp fibres mostly lie along the sheet
    my $shade   = rand() < 0.5 ? -6 : 5;
    for my $s (0 .. $len - 1) {
        my $cx = ($horiz ? $x + $s : $x) % $N;
        my $cy = ($horiz ? $y : $y + $s) % $N;
        $px[ $cy * $N + $cx ] += $shade;
    }
}

my $raw = '';
for my $y (0 .. $N - 1) {
    $raw .= "\0";                     # filter: none
    $raw .= pack 'C', ($_ < 0 ? 0 : $_ > 255 ? 255 : $_)
        for @px[ $y * $N .. $y * $N + $N - 1 ];
}

sub chunk {
    my ($t, $d) = @_;
    pack('N', length $d) . $t . $d . pack('N', Compress::Zlib::crc32($t . $d));
}

my $png = "\x89PNG\r\n\x1a\n"
        . chunk('IHDR', pack('NNCCCCC', $N, $N, 8, 0, 0, 0, 0))   # 8-bit grey
        . chunk('IDAT', Compress::Zlib::compress($raw, 9))
        . chunk('IEND', '');

make_path("$ROOT/icons");
open my $fh, '>:raw', "$ROOT/icons/paper.png" or die $!;
print $fh $png;
close $fh;
printf "icons/paper.png  %d bytes\n", length $png;
