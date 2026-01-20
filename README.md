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
./configure

# after running ./configure
make all

# login to mysql
mysql -u ragnarok -p ragnarok

# mysql commands
show tables;

# ws proxy for testing



```