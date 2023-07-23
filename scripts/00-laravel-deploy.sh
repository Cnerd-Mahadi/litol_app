#!/usr/bin/env bash

echo "Running yourn bullshit"

/usr/local/bin/docker-php-ext-configure grpc
/usr/local/bin/docker-php-ext-install grpc

supervisorctl restart php-fpm

echo "Running composer"
composer global require hirak/prestissimo
composer self-update --2
composer install --no-dev --working-dir=/var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache
