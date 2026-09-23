#!/usr/bin/perl
# Static server for checking the build the way GitHub Pages will serve it.
# Service workers and the manifest need a real http:// origin, so opening
# index.html off disk is not a good enough test.
#
#   perl build/serve.pl [port]      then open http://127.0.0.1:8765/
#
# Forks per connection and drains the request before replying — a half-read
# request followed by an abrupt close makes Chrome abandon the service-worker
# script fetch with a bare "unknown error".
use strict;
use warnings;
use IO::Socket::INET;
use POSIX ':sys_wait_h';
use Errno qw(EINTR);
use File::Basename qw(dirname);

my $PORT = shift || 8765;
my $ROOT = shift || (dirname(__FILE__) . '/..');
$ROOT =~ s{/+$}{};

my %MIME = (
    html => 'text/html; charset=utf-8',
    js   => 'text/javascript; charset=utf-8',
    json => 'application/json; charset=utf-8',
    webmanifest => 'application/manifest+json; charset=utf-8',
    svg  => 'image/svg+xml',
    png  => 'image/png',
    ico  => 'image/x-icon',
    css  => 'text/css; charset=utf-8',
    md   => 'text/plain; charset=utf-8',
);

my $srv = IO::Socket::INET->new(
    LocalAddr => '127.0.0.1', LocalPort => $PORT,
    Proto => 'tcp', Listen => 32, ReuseAddr => 1,
) or die "cannot bind $PORT: $!\n";

$SIG{CHLD} = sub { 1 while waitpid(-1, WNOHANG) > 0 };
print "serving $ROOT on http://127.0.0.1:$PORT/\n";

while (1) {
    my $c = $srv->accept;
    # reaping a child interrupts accept(); that is not a reason to stop serving
    unless ($c) { next if $! == EINTR; last }

    next if fork;                     # parent keeps accepting
    close $srv;

    my $req = <$c> // '';
    while ( my $h = <$c> ) { last if $h =~ /^\s*$/ }      # drain the headers

    my ($method, $path) = $req =~ m{^(GET|HEAD)\s+(\S+)};
    if ( !$method ) { close $c; exit }
    $path =~ s/\?.*//;
    $path =~ s/%([0-9A-Fa-f]{2})/chr hex $1/ge;
    $path =~ s/\.\.//g;                                   # no climbing out
    my $file = "$ROOT$path";
    $file .= ( $file =~ m{/$} ? 'index.html' : '/index.html' ) if -d $file;

    my ($status, $type, $body) = ('404 Not Found', 'text/plain', "404 $path");
    if ( -f $file ) {
        my ($ext) = $file =~ /\.(\w+)$/;
        $type   = $MIME{ lc( $ext // '' ) } || 'application/octet-stream';
        $status = '200 OK';
        open my $f, '<:raw', $file or die $!;
        local $/;
        $body = <$f>;
        close $f;
    }
    print $c "HTTP/1.1 $status\r\nContent-Type: $type\r\n"
           . "Content-Length: " . length($body) . "\r\n"
           . "Cache-Control: no-cache\r\n"
           . "Service-Worker-Allowed: /\r\nConnection: close\r\n\r\n"
           . ( $method eq 'HEAD' ? '' : $body );

    $c->flush;
    shutdown($c, 1);                  # send FIN, then let the client finish
    1 while sysread($c, my $junk, 4096);
    close $c;
    exit;
}
