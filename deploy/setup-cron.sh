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

# Writer backups: without this line the daily copy silently never happens, and the writer
# database is the only place the funnel numbers live.
NODE_BIN="$(command -v node || echo /usr/bin/node)"
BACKUP_LINE="40 4 * * * cd $APP_DIR && $NODE_BIN deploy/backup-writer.mjs >> /var/log/celpe-backup-writer.log 2>&1"

if crontab -l 2>/dev/null | grep -Fq "deploy/backup-writer.mjs"; then
  echo "Backup cron job already installed."
else
  (crontab -l 2>/dev/null || true; echo "$BACKUP_LINE") | crontab -
  echo "Backup cron job installed (daily 04:40)."
fi

# Retention, 15 minutes after the copy — the script itself refuses to prune without a fresh
# backup, so the order is enforced by the script and not by luck.
MAINTENANCE_LINE="55 4 * * * cd $APP_DIR && $NODE_BIN deploy/maintenance-writer.mjs >> /var/log/celpe-maintenance-writer.log 2>&1"

if crontab -l 2>/dev/null | grep -Fq "deploy/maintenance-writer.mjs"; then
  echo "Maintenance cron job already installed."
else
  (crontab -l 2>/dev/null || true; echo "$MAINTENANCE_LINE") | crontab -
  echo "Maintenance cron job installed (daily 04:55)."
fi

echo "Testing publish endpoint..."
HTTP_CODE="$(curl -sS -o /tmp/celpe-cron-test.json -w '%{http_code}' -H "x-cron-secret: $CRON_SECRET" https://celpe-depe.com/api/admin/cron/publish)"
cat /tmp/celpe-cron-test.json
echo ""
echo "HTTP $HTTP_CODE"
