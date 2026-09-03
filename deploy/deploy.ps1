# Deploy CELPE-Dê Pé to celpe-server (137.184.179.172)
# Usage: .\deploy\deploy.ps1            normal deploy
#        .\deploy\deploy.ps1 -DryRun    show what would change, touch nothing
#        .\deploy\deploy.ps1 -SkipMaterials

param(
    [string]$SshHost = "celpe-server",
    [string]$RemoteDir = "/var/www/celpe-de-pe",
    [string]$MaterialsDir = "/var/materials/celpe-bras",
    [switch]$SkipMaterials,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot

# MSYS2 rsync. scp has no skip-unchanged logic, so it re-sent the whole ~822 MB
# exam archive on every deploy; rsync settles it in a couple of KB.
$RsyncExe = "C:\msys64\usr\bin\rsync.exe"
# MSYS2's ssh cannot expand ~ here (the Windows profile path contains Cyrillic
# characters), so it never finds ~/.ssh/known_hosts. This config holds the same
# settings under ASCII-only paths. See deploy/DEPLOY.md.
$RsyncSshConfig = "C:\ProgramData\rsync-ssh\config"
$RsyncSsh = "/usr/bin/ssh -F /c/ProgramData/rsync-ssh/config -o BatchMode=yes"

if (-not (Test-Path $RsyncExe)) {
    throw "rsync not found at $RsyncExe. Install it with: winget install MSYS2.MSYS2; C:\msys64\usr\bin\bash -lc 'pacman -S --noconfirm rsync openssh'"
}
if (-not (Test-Path $RsyncSshConfig)) {
    throw "SSH config for rsync not found at $RsyncSshConfig. See deploy/DEPLOY.md."
}

# rsync reads "E:\path" as host "E", so local paths go in as /e/path.
function ConvertTo-MsysPath([string]$WindowsPath) {
    $full = (Resolve-Path -LiteralPath $WindowsPath).Path
    return "/" + $full.Substring(0, 1).ToLower() + $full.Substring(2).Replace("\", "/")
}

function Sync-Dir {
    param(
        [string]$Local,
        [string]$Remote,
        # Only for directories whose full contents live in git. Anything the server
        # generates or owns must sync without deletion.
        [switch]$Delete
    )
    $flags = @("-rt", "--itemize-changes", "--human-readable")
    if ($Delete) { $flags += "--delete" }
    if ($DryRun) { $flags += "--dry-run" }
    $src = (ConvertTo-MsysPath $Local) + "/"
    & $RsyncExe @flags -e $RsyncSsh $src "${SshHost}:${Remote}/"
    if ($LASTEXITCODE -ne 0) { throw "rsync failed for $Local (exit $LASTEXITCODE)" }
}

function Sync-Files {
    param([string[]]$Local, [string]$Remote)
    $flags = @("-t", "--itemize-changes")
    if ($DryRun) { $flags += "--dry-run" }
    $src = $Local | ForEach-Object { ConvertTo-MsysPath $_ }
    & $RsyncExe @flags -e $RsyncSsh @src "${SshHost}:${Remote}/"
    if ($LASTEXITCODE -ne 0) { throw "rsync failed for config files (exit $LASTEXITCODE)" }
}

if ($DryRun) {
    Write-Host "DRY RUN - nothing will be changed on $SshHost" -ForegroundColor Yellow
}
Write-Host "Deploying to $SshHost ($RemoteDir) ..." -ForegroundColor Cyan

if (-not $DryRun) {
    ssh $SshHost "mkdir -p $RemoteDir/data/blog/posts $RemoteDir/deploy $MaterialsDir"
}

# src is fully repo-managed, so stale files are deleted. This matters: renaming
# middleware.ts to proxy.ts left the old file on the server, and Next.js 16 routes
# every nested path to 404 when middleware.ts is present.
Write-Host "Syncing src (with delete) ..." -ForegroundColor Cyan
Sync-Dir -Local "$ProjectRoot\src" -Remote "$RemoteDir/src" -Delete

# No delete: setup-indexnow.sh generates the IndexNow key file here on the server.
Write-Host "Syncing public ..." -ForegroundColor Cyan
Sync-Dir -Local "$ProjectRoot\public" -Remote "$RemoteDir/public"

# No delete: most posts are published through the admin panel and exist only on the
# server. Posts that also exist in git are overwritten by the local copy, so admin
# edits to those are lost - check before deploying if you edited them there.
Write-Host "Syncing blog posts ..." -ForegroundColor Cyan
Sync-Dir -Local "$ProjectRoot\data\blog\posts" -Remote "$RemoteDir/data/blog/posts"

Write-Host "Syncing config files ..." -ForegroundColor Cyan
Sync-Files -Local @(
    "$ProjectRoot\package.json",
    "$ProjectRoot\package-lock.json",
    "$ProjectRoot\next.config.ts",
    "$ProjectRoot\tsconfig.json",
    "$ProjectRoot\postcss.config.mjs",
    "$ProjectRoot\eslint.config.mjs"
) -Remote $RemoteDir

# No delete, ever: the 2026-1 session lives only on the server under arquivos/ and
# backs the most visited page on the site.
if ($SkipMaterials) {
    Write-Host "Skipping exam archive." -ForegroundColor DarkGray
} else {
    Write-Host "Syncing exam archive (unchanged files cost nothing) ..." -ForegroundColor Cyan
    Sync-Dir -Local "$ProjectRoot\Materials\Provas" -Remote $MaterialsDir
}

Sync-Files -Local @(
    "$ProjectRoot\deploy\setup-indexnow.sh",
    "$ProjectRoot\deploy\setup-cron.sh"
) -Remote "$RemoteDir/deploy"

if ($DryRun) {
    Write-Host ""
    Write-Host "Dry run complete - no build, no restart." -ForegroundColor Yellow
    return
}

Write-Host "Writing IndexNow key to public/ (before build)..." -ForegroundColor Cyan
ssh $SshHost "bash $RemoteDir/deploy/setup-indexnow.sh"

Write-Host "Building on server..." -ForegroundColor Cyan
ssh $SshHost "cd $RemoteDir && export MAKEFLAGS=-j1 && export NODE_OPTIONS='--max-old-space-size=768' && npm ci && npm run build && systemctl restart celpe-de-pe && systemctl is-active celpe-de-pe"

Write-Host "Ensuring publish cron..." -ForegroundColor Cyan
ssh $SshHost "bash $RemoteDir/deploy/setup-cron.sh"

Write-Host ""
Write-Host "Site: http://137.184.179.172/pt-br" -ForegroundColor Green
