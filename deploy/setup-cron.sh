#!/bin/bash
# Install cron job for scheduled blog publishing.
# Run on server: bash deploy/setup-cron.sh
set -euo pipefail

APP_DIR="/var/www/celpe-de-pe"
ENV_FILE="$APP_DIR/.env.local"
CRON_LINE='*/5 * * * * curl -fsS -H "x-cron-secret: __CRON_SECRET__" https://celpe-depe.com/api/admin/cron/publish >/dev/null 2>&1'

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE"
  exit 1
fi

CRON_SECRET="$(grep '^CRON_SECRET=' "$ENV_FILE" | cut -d= -f2- | tr -d '\r' | tr -d '"')"
if [ -z "$CRON_SECRET" ]; then
  echo "CRON_SECRET is not set in $ENV_FILE"
  exit 1
fi

JOB="${CRON_LINE/__CRON_SECRET__/$CRON_SECRET}"

if crontab -l 2>/dev/null | grep -Fq "api/admin/cron/publish"; then
  echo "Cron job already installed."
else
  (crontab -l 2>/dev/null || true; echo "$JOB") | crontab -
  echo "Cron job installed (every 5 minutes)."
fi

echo "Testing publish endpoint..."
HTTP_CODE="$(curl -sS -o /tmp/celpe-cron-test.json -w '%{http_code}' -H "x-cron-secret: $CRON_SECRET" https://celpe-depe.com/api/admin/cron/publish)"
cat /tmp/celpe-cron-test.json
echo ""
echo "HTTP $HTTP_CODE"
