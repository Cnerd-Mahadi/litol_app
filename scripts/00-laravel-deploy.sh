#!/usr/bin/env bash
echo "Running composer"
composer global require hirak/prestissimo
composer self-update --2
composer install --no-dev --ignore-platform-reqs --working-dir=/var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache
