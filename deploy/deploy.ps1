# Deploy CELPE-Dê Pé to celpe-server (137.184.179.172)
# Usage: .\deploy\deploy.ps1
# Requires: SSH alias "celpe-server" in ~/.ssh/config

param(
    [string]$SshHost = "celpe-server",
    [string]$RemoteDir = "/var/www/celpe-de-pe"
)

$ErrorActionPreference = "Stop"

Write-Host "Deploying to $SshHost ($RemoteDir) ..." -ForegroundColor Cyan

$ProjectRoot = Split-Path -Parent $PSScriptRoot

Write-Host "Uploading files..." -ForegroundColor Cyan
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

$remoteScript = @"
set -e
cd $RemoteDir
npm ci
npm run build
systemctl restart celpe-de-pe
systemctl is-active celpe-de-pe
echo 'Deploy OK'
"@

ssh $SshHost $remoteScript

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Site: http://137.184.179.172" -ForegroundColor Green
} else {
    Write-Error "Deploy failed. Check SSH: ssh $SshHost"
}
