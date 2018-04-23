#DanmuPDF

DanmuPDF is a website to add bullet comments to the pdf file, which mean the comments will show in the real time when you send it.

The mainly usage of this app is to make the realative boring pdf presentation in the party or some informal meeting with many peoples. The audience can send and read the comments to add fun and interactivity to the party or meeting.

###This demo only available in the Linux，FreeBSD，MacOS system. Because this demo use the php swoole extension to realize the socket communication, and build a websocket server.

##How to run the demo in the localhost:

!!!Firstly, you need to have matched system:
Linux 2.3.32 version+
PHP-5.3.10 version+ and PHP7
gcc4.4 version+ or clang

If you use the window system, you can build the enviroment use cygwin, here's the steps:
    > install cygwin, including(gcc, autoconf, php, and pcre-dev) 4 packages
    > open the php.ini(php -i|grep php.ini ), and add the "extension=swoole.so"
    > put the upper files into your cygwin folder \home\examples\http\
    > In cygwin terminal, cd upper path, and run the file use:
        php swoole_server.php
    >Open the danmu.html, then you can check the demo
