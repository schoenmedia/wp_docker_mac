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
git clone https://github.com/schoenmedia/wp_docker_mac.git PROJEKT && cd PROJEKT

cmd/init
cmd/terminal

```bash
rm index.php
./install-wordpress
```
## Directory to work in

```bash
cd src/
```

## URL
Service | Url
------------ | -------------
Webserver | dev.local
PhpMyadmin | dev.local:8080
Mailhog	| dev.local:8025


