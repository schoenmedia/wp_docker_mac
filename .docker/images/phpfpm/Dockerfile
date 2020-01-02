FROM php:7.2-fpm

MAINTAINER Sebastian Schön <schoen@schoenmedia.de>

ENV HOME /var/www/

ENV XDEBUG_PORT 9000


RUN apt-get update \
        && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        software-properties-common \
        && apt-get update \
        && DEBIAN_FRONTEND=noninteractive apt-get install -y \  
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libicu-dev \
        libssl-dev \
        libmcrypt-dev \
        libedit-dev \
        libedit2 \
        libxslt1-dev \
        apt-utils \
        vim \
        mysql-client \
        git \
        wget \
        curl \
        tar \
        bash-completion \
        && apt-get clean

# php extensions
RUN docker-php-ext-configure \
        gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/; \
        docker-php-ext-install \
        opcache \
        gd \
        bcmath \
        intl \
        mbstring \
        mysqli \
        pdo_mysql \
        soap \
        xsl \
        zip

RUN apt-get update && apt-get install -y libmagickwand-6.q16-dev --no-install-recommends \
 && ln -s /usr/lib/x86_64-linux-gnu/ImageMagick-6.8.9/bin-Q16/MagickWand-config /usr/bin \
 && pecl install imagick \
 && echo "extension=imagick.so" > /usr/local/etc/php/conf.d/ext-imagick.ini

RUN apt-get install libmcrypt-dev
RUN pecl install mcrypt-1.0.1 && docker-php-ext-enable mcrypt

# Register the COMPOSER_HOME environment variable
ENV COMPOSER_HOME /var/www/.composer

# Add global binary directory to PATH and make sure to re-export it
ENV PATH /var/www/.composer/vendor/bin:$PATH

# Install Composer
RUN curl --silent --show-error https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin/ --filename=composer
RUN composer global require hirak/prestissimo


# Install Codesniffer
RUN composer global require "squizlabs/php_codesniffer=*"

# configure wordpress coding standard for codesniffer
# https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards
RUN git clone -b master https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards.git /wpcs
RUN phpcs --config-set installed_paths /wpcs


# install go language
WORKDIR /tmp
RUN wget https://dl.google.com/go/go1.11.linux-amd64.tar.gz \
        && tar -C /usr/local -xzf go1.11.linux-amd64.tar.gz \
        && GOROOT=/usr/local/go 

ENV PATH /usr/local/go/bin:$PATH

# A sendmail replacement which forwards mail to an SMTP server.<Paste>
RUN go get github.com/mailhog/mhsendmail
RUN mv /var/www/go/bin/mhsendmail /usr/local/bin/
        

# install xdebug
RUN yes | pecl install xdebug && \
     echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini
COPY config/custom-xdebug.ini /usr/local/etc/php/conf.d/custom-xdebug.ini

# install node
ENV NODE_VERSION=13.5.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
ENV NVM_DIR=/var/www/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/var/www/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

#install gulp globally
RUN npm install --global gulp-cli

# User
RUN usermod -u 1000 www-data

# config php
COPY config/php.ini /usr/local/etc/php/php.ini
COPY config/php-fpm.conf /usr/local/etc/php-fpm.conf
COPY config/www.conf /usr/local/etc/php-fpm.d/www.conf

COPY bin/* /usr/local/bin/
#COPY .docker/users/* /var/www/

RUN chmod +x /usr/local/bin/*

ENV PATH=/usr/local/bin:$PATH

# starter theme for wordpress
COPY wptheme /var/www/html/

#  wpcli - the command line interface for WordPress
RUN curl --silent --show-error -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \ 
        && chmod +x wp-cli.phar \
        && mv wp-cli.phar /usr/local/bin/wp

RUN chown -R www-data:1000 /var/www

# bash completion for wp-cli
RUN curl -o /etc/bash_completion.d/wp-completion.bash https://raw.githubusercontent.com/wp-cli/wp-cli/master/utils/wp-completion.bash

RUN echo "source /etc/bash_completion" >> /root/.bashrc
RUN echo "source /etc/bash_completion" >> /var/www/.bashrc



VOLUME /var/www/
WORKDIR /var/www/html

CMD ["php-fpm", "-F"]
