# Docker for Wordpress Development purpose
## Docker for osx
[Install Docker for Mac](https://docs.docker.com/docker-for-mac/install/)

### Docker Compose
[Install Docker Compose](https://docs.docker.com/compose/install/)

## File synchronisation to docker container:
[docker-sync](http://docker-sync.io/)

### For docker-sync install unison via homebrew

```bash
brew install unison
brew install eugenmayer/dockersync/unox
```

or an other option: [Advanced / optional](https://github.com/EugenMayer/docker-sync/wiki/docker-sync-on-OSX)

## Clone Repository
```
git clone https://github.com/schoenmedia/wp_docker_mac.git PROJECT && cd PROJECT

# initialize project
$ cmd/init

# go to the php container bash
$ cmd/terminal

# Wordpress installation
$ wordpress-install

## Close docker bash
$ exit

# Gulp 
$ cd project/gulp-assets
Edit Template Path in gulpfile.js

$ npm install

## start gulp
$ gulp watching

## gulp directories to work in
project/gulp-assets/src/style/
project/gulp-assets/src/javascript/


# You´re done! 
```
## Directory to work in

```
# Wordpress
cd project/public_html

# Gulp configuration and css files for wp-theme 
cd project/src/gulp-assets
```

## Commands on docker from host 
```
# Start
cmd/start

# Stop
cmd/stop

# Interactive bash 
cmd/terminal

# Gulp watch
cmd/gulp

```

## URL
Service | Url
------------ | -------------
Webserver | dev.local
PhpMyadmin | dev.local:8080
Mailhog | dev.local:8025

## Wordpress login (only for dev purpose) 
admin: admin
password: admin123
