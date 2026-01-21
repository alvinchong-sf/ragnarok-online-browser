# Installation to get Browser Ragnarok running LOCALLY

### Packet Versions Samples
-  20151104 - Very stable, widely used
-  20141022 - Also popular
-  20180620 - Newer, what you just tried
-  20131223 - Older but reliable
-  20120410 - Classic era
-  20130618 - Niktout 

### Emulator Setup
```bash
# Install dependencies for Emulator
brew install mysql
brew install gcc
brew install make
brew install pcre
brew install zlib

# For Hercules
CPPFLAGS="-I/opt/homebrew/Cellar/pcre/8.45/include" 
LDFLAGS="-L/opt/homebrew/Cellar/pcre/8.45/lib" 
./configure --enable-packetver=20151104 --disable-renewal && make clean && make all

# For rAthena
CPPFLAGS="-I/opt/homebrew/Cellar/pcre/8.45/include" 
LDFLAGS="-L/opt/homebrew/Cellar/pcre/8.45/lib" 
./configure --enable-prere --enable-packetver=20120410 && make clean && make server
```

### Mysql Setup
```bash
# Install if haven't already
brew install mysql

# login to mysql as root user
mysql -u root -p

# create database
CREATE DATABASE ragnarok;
GRANT ALL PRIVILEGES ON ragnarok.* TO 'ragnarok'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# seed data from rAthena in bash
# Note! These command does not include renewal. Add them when needed
mysql -u ragnarok -p ragnarok_rathena < sql-files/main.sql
mysql -u ragnarok -p ragnarok_rathena < sql-files/logs.sql
mysql -u ragnarok -p ragnarok_rathena < sql-files/item_db.sql
mysql -u ragnarok -p ragnarok_rathena < sql-files/mob_db.sql
mysql -u ragnarok -p ragnarok_rathena < sql-files/mob_skill_db.sql

# Connect to mysql as ragnarok usr
mysql -u ragnarok -p ragnarok

# mysql commands
show tables;
show databases;
```
1. Configure SQL connection(rAthena):
Edit `conf/import/inter_conf.txt`
```
sql.db_hostname: 127.0.0.1
sql.db_port: 3306
sql.db_username: ragnarok
sql.db_password: ragnarok
sql.db_database: ragnarok
```

2. Configure server IPs(rAthena):
Edit `1conf/char_athena.conf`
```bash
# Find and uncomment/set:
login_ip: 127.0.0.1
char_ip: 127.0.0.1
bind_ip: 127.0.0.1
```

Edit: `conf/map_athena.conf`
```bash
# Find and uncomment/set:
char_ip: 127.0.0.1
map_ip: 127.0.0.1
bind_ip: 127.0.0.1
```

3. Create a GM account:
```bash
# Login to mysql as Ragnarok user
mysql -u ragnarok -p ragnarok

# Create GM account
INSERT INTO `login` (`userid`, `user_pass`, `sex`, `group_id`) 
VALUES ('your_gm_id', 'your_password', 'M', 99);
EXIT;
```

4. Update demo.html
```javascript
{
    display: 'My Local Server',
    desc: 'rAthena Pre-Renewal',
    address: '127.0.0.1',
    port: 6900,
    version: 25,
    langtype: 12,
    packetver: 20151104, // make sure packet version is same for rAthena
    renewal: false,
    socketProxy: 'ws://127.0.0.1:5999',
}
```

### Running the game
```bash
# Hercules
./login-server
./char-server
./map-server

# rathena
./athena-start start
./athena-start stop
./athena-start restart

# ro browser ws-proxy
npm start

# ro browser legacy
npm run live # Go to demo.html to get started
```

### Screenshots
![Login in first time](https://github-production-user-asset-6210df.s3.amazonaws.com/54681072/538855143-9c20b78f-832c-4fd7-b6b3-ee3a7497ed55.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260121%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260121T234455Z&X-Amz-Expires=300&X-Amz-Signature=1ca66afd45033714dce520cd55138d6e04b12e2f82fd4880c72b4739b55b3b15&X-Amz-SignedHeaders=host)