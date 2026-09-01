#!/bin/bash
set -e
ENV=/var/www/celpe-de-pe/.env.local
KEY="17cca4e35d034a8e96572ebf047465f8"
touch "$ENV"
grep -vE '^\s*INDEXNOW_KEY\s*=' "$ENV" > "$ENV.tmp" || true
mv "$ENV.tmp" "$ENV"
echo "INDEXNOW_KEY=$KEY" >> "$ENV"
rm -f /var/www/celpe-de-pe/public/17cca*.txt
printf '%s' "$KEY" > "/var/www/celpe-de-pe/public/${KEY}.txt"
echo "IndexNow: /public/${KEY}.txt ($(wc -c < "/var/www/celpe-de-pe/public/${KEY}.txt") bytes)"
