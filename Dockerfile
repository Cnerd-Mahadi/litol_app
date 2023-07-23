FROM php:8.1-cli-alpine

RUN apk add --no-cache --virtual .build-deps g++ linux-headers zlib-dev $PHPIZE_DEPS \
  && apk add --no-cache libstdc++ \
  && date \
  && export MAKEFLAGS="-j $(nproc)" \
  && time pecl install grpc \
  && date \
  && ls -lh /usr/local/lib/php/extensions/no-debug-non-zts-20210902/


COPY . .

# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

CMD ["/start.sh"]
