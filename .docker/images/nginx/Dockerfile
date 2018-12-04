FROM nginx:1.15

RUN usermod -u 1000 www-data

ADD conf.d/* /etc/nginx/conf.d/

WORKDIR /var/www/html

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
