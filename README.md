## Hercules setup
```bash

# Install dependencies for either
brew install mysql
brew install gcc
brew install make
brew install pcre
brew install zlib

# cd into Hercules and run
CPPFLAGS="-I/opt/homebrew/Cellar/pcre/8.45/include" 
LDFLAGS="-L/opt/homebrew/Cellar/pcre/8.45/lib" 
./configure --enable-packetver=20151104 --disable-renewal

# 20151104 - Very stable, widely used
# 20141022 - Also popular
# 20180620 - Newer, what you just tried
# 20131223 - Older but reliable
# 20120410 - Classic era
# 20130618 - Niktout 

# rathena pcre issue
CPPFLAGS="-I/opt/homebrew/Cellar/pcre/8.45/include" 
LDFLAGS="-L/opt/homebrew/Cellar/pcre/8.45/lib" 
./configure --enable-prere --enable-packetver=20120410 && make clean && make server

# for Hercules only
make all

# login to mysql
mysql -u ragnarok -p ragnarok

# mysql commands
show tables;

# ws proxy for testing
npm install


# running game
    # Hercules
    ./login-server
    ./char-server
    ./map-server

    # ro browser ws-proxy
    npm start

    # ro browser legacy
    npm run live

    # rathena
    ./athena-start start
    ./athena-start stop
    ./athena-start restart

# when changing packet version in Hercules, make sure to change in demo.html and mmo.h files


```