# Deploy CELPE-Dê Pé to celpe-server (137.184.179.172)
# Usage: .\deploy\deploy.ps1

param(
    [string]$SshHost = "celpe-server",
    [string]$RemoteDir = "/var/www/celpe-de-pe"
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot

Write-Host "Deploying to $SshHost ($RemoteDir) ..." -ForegroundColor Cyan

ssh $SshHost "mkdir -p $RemoteDir"
ssh $SshHost "mkdir -p $RemoteDir/data/blog/posts"
scp -r `
  "$ProjectRoot\src" `
  "$ProjectRoot\public" `
  "$ProjectRoot\package.json" `
  "$ProjectRoot\package-lock.json" `
  "$ProjectRoot\next.config.ts" `
  "$ProjectRoot\tsconfig.json" `
  "$ProjectRoot\postcss.config.mjs" `
  "$ProjectRoot\eslint.config.mjs" `
  "${SshHost}:${RemoteDir}/"
scp -r "$ProjectRoot\data\blog\posts" "${SshHost}:${RemoteDir}/data/blog/"
ssh $SshHost "mkdir -p /var/materials/celpe-bras"
scp -r "$ProjectRoot\Materials\Provas\*" "${SshHost}:/var/materials/celpe-bras/"

scp "$ProjectRoot\deploy\setup-indexnow.sh" "${SshHost}:${RemoteDir}/deploy/setup-indexnow.sh"
Write-Host "Writing IndexNow key to public/ (before build)..." -ForegroundColor Cyan
ssh $SshHost "bash $RemoteDir/deploy/setup-indexnow.sh"

Write-Host "Building on server..." -ForegroundColor Cyan
ssh $SshHost "cd $RemoteDir && export MAKEFLAGS=-j1 && export NODE_OPTIONS='--max-old-space-size=768' && npm ci && npm run build && systemctl restart celpe-de-pe && systemctl is-active celpe-de-pe"

scp "$ProjectRoot\deploy\setup-cron.sh" "${SshHost}:${RemoteDir}/deploy/setup-cron.sh"
Write-Host "Ensuring publish cron..." -ForegroundColor Cyan
ssh $SshHost "bash $RemoteDir/deploy/setup-cron.sh"

Write-Host ""
Write-Host "Site: http://137.184.179.172/pt-br" -ForegroundColor Green
