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

Write-Host "Building on server..." -ForegroundColor Cyan
ssh $SshHost "cd $RemoteDir && npm ci && npm run build && systemctl restart celpe-de-pe && systemctl is-active celpe-de-pe"

Write-Host ""
Write-Host "Site: http://137.184.179.172/pt-br" -ForegroundColor Green
