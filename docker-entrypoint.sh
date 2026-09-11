#!/bin/sh
set -e

# Ensure the SQLite database file exists before Laravel boots, regardless of
# how the container's start command was invoked (Render can override CMD).
mkdir -p /var/www/database
touch /var/www/database/database.sqlite

php artisan migrate --force

exec "$@"
