#!/bin/bash
# Run on the server (Ubuntu/Debian). Example:
#   bash deploy/setup-server.sh
set -euo pipefail

APP_DIR="/var/www/celpe-de-pe"
REPO_URL="https://github.com/postal888/Portuleb.git"
SERVICE_NAME="celpe-de-pe"
NGINX_SITE="celpe-de-pe"

echo "=== CELPE-Dê Pé server setup ==="

if [ "$(id -u)" -ne 0 ]; then
  SUDO="sudo"
else
  SUDO=""
fi

echo "Installing packages..."
export DEBIAN_FRONTEND=noninteractive
$SUDO apt-get update -qq
$SUDO apt-get install -y -qq curl git nginx ca-certificates

if ! command -v node >/dev/null || [ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]; then
  echo "Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  $SUDO apt-get install -y -qq nodejs
fi

echo "Node: $(node -v), npm: $(npm -v)"

$SUDO mkdir -p "$APP_DIR" /var/materials/celpe-bras
$SUDO chown -R "${SUDO_USER:-root}:${SUDO_USER:-root}" "$APP_DIR" /var/materials/celpe-bras 2>/dev/null || true

if [ ! -d "$APP_DIR/.git" ]; then
  echo "Cloning repository..."
  if [ -d "$APP_DIR" ] && [ "$(ls -A "$APP_DIR" 2>/dev/null)" ]; then
    echo "Directory $APP_DIR exists but is not a git repo. Aborting."
    exit 1
  fi
  git clone "$REPO_URL" "$APP_DIR"
else
  echo "Updating repository..."
  cd "$APP_DIR"
  git fetch origin
  git reset --hard origin/main
fi

cd "$APP_DIR"

if [ ! -f .env.local ]; then
  cat > .env.local <<'EOF'
NODE_ENV=production
PORT=3000
MATERIALS_ROOT=/var/materials/celpe-bras
EOF
  echo "Created .env.local — edit MATERIALS_ROOT if needed."
fi

echo "Installing dependencies and building..."
npm ci
npm run build

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
$SUDO cp "$SCRIPT_DIR/systemd/${SERVICE_NAME}.service" "/etc/systemd/system/${SERVICE_NAME}.service"
$SUDO cp "$SCRIPT_DIR/nginx/${NGINX_SITE}.conf" "/etc/nginx/sites-available/${NGINX_SITE}"
$SUDO ln -sf "/etc/nginx/sites-available/${NGINX_SITE}" "/etc/nginx/sites-enabled/${NGINX_SITE}"
$SUDO rm -f /etc/nginx/sites-enabled/default

$SUDO systemctl daemon-reload
$SUDO systemctl enable "${SERVICE_NAME}" nginx
$SUDO systemctl restart "${SERVICE_NAME}"
$SUDO nginx -t
$SUDO systemctl reload nginx

echo ""
echo "Done. App: http://$(curl -s -4 ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"
echo "Status: systemctl status ${SERVICE_NAME}"
