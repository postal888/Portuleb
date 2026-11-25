# Deploy CELPE-DE PE (site celpe-depe.com) to celpe-server (137.184.179.172)
# What reaches the server is one Git commit, not this working tree: the release folder is built
# with `git archive`, so untracked files and other people's uncommitted edits cannot ride along.
# Usage: .\deploy\deploy.ps1                      deploy HEAD
#        .\deploy\deploy.ps1 -Commit 1a2b3c4       deploy that commit
#        .\deploy\deploy.ps1 -DryRun              build the release, show the diff, touch nothing
#        .\deploy\deploy.ps1 -Explain             print the rsync/ssh commands only - no connection at all
#        .\deploy\deploy.ps1 -SkipMaterials
# ASCII only in this file: Windows PowerShell 5.1 reads a script without a BOM in the ANSI code
# page, and a Cyrillic UTF-8 byte can decode into a smart quote and break the parse.

param(
    [string]$SshHost = "celpe-server",
    [string]$RemoteDir = "/var/www/celpe-de-pe",
    [string]$MaterialsDir = "/var/materials/celpe-bras",
    [string]$Commit = "HEAD",
    [switch]$SkipMaterials,
    [switch]$DryRun,
    [switch]$Explain
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
# Windows' own bsdtar, by absolute path. From a shell whose PATH carries MSYS, a bare "tar" is
# msys tar, and it reads "D:\Temp\release.tar" as a remote host called D - the extract fails.
$TarExe = Join-Path $env:SystemRoot "System32\tar.exe"

if (-not $Explain) {
    if (-not (Test-Path $RsyncExe)) {
        throw "rsync not found at $RsyncExe. Install it with: winget install MSYS2.MSYS2; C:\msys64\usr\bin\bash -lc 'pacman -S --noconfirm rsync openssh'"
    }
    if (-not (Test-Path $RsyncSshConfig)) {
        throw "SSH config for rsync not found at $RsyncSshConfig. See deploy/DEPLOY.md."
    }
}
if (-not (Test-Path $TarExe)) { throw "bsdtar not found at $TarExe - the release cannot be unpacked." }

# rsync reads "E:\path" as host "E", so local paths go in as /e/path.
function ConvertTo-MsysPath([string]$WindowsPath) {
    $full = (Resolve-Path -LiteralPath $WindowsPath).Path
    return "/" + $full.Substring(0, 1).ToLower() + $full.Substring(2).Replace("\", "/")
}

# Nothing matching these ever reaches the server, whichever allowlisted target it hides in.
# The working tree is full of other people's uncommitted findings: audits, screenshots, local
# reports, a real database, real essays. Deploy ships the tree as it is, so the line is drawn
# here rather than trusting that junk stays out of src/.
# Semantics matter: a pattern with a slash inside is anchored to the transfer root, a bare name
# matches at any depth. They stay as a second line of defence even though the release folder
# already contains only what the commit contains.
$RsyncExcludes = @(
    # match at any depth
    ".git", "node_modules", ".next", "out", "coverage", ".vercel",
    ".env", ".env.*",
    "*.log", "*.tmp", "*.bak", "*.swp", "*~",
    "*.db", "*.db-wal", "*.db-shm", "*.sqlite", "*.sqlite3",
    ".tmp-*", "tmp-*",
    ".DS_Store", "Thumbs.db",
    "screenshots", "*-audit",
    # anchored to the transfer root (they restate the allowlist)
    "data/admin", "data/writing", "data/backups", "seo-audit", "content-audit", "schema-audit"
)

function Sync-Dir {
    param(
        [string]$Local,
        [string]$Remote,
        # Only for directories whose full contents live in git. Anything the server
        # generates or owns must sync without deletion.
        [switch]$Delete
    )
    $flags = @("-rt", "--itemize-changes", "--human-readable")
    foreach ($pattern in $RsyncExcludes) { $flags += "--exclude=$pattern" }
    if ($Delete) { $flags += "--delete" }
    if ($DryRun) { $flags += "--dry-run" }
    $src = (ConvertTo-MsysPath $Local) + "/"
    if ($Explain) {
        Write-Host "$RsyncExe $($flags -join ' ') -e `"$RsyncSsh`" $src ${SshHost}:${Remote}/" -ForegroundColor Gray
        return
    }
    & $RsyncExe @flags -e $RsyncSsh $src "${SshHost}:${Remote}/"
    if ($LASTEXITCODE -ne 0) { throw "rsync failed for $Local (exit $LASTEXITCODE)" }
}

function Sync-Files {
    param([string[]]$Local, [string]$Remote)
    $flags = @("-t", "--itemize-changes")
    # Explicit file list, and the filter still applies: a stray .env.local never rides along.
    foreach ($pattern in $RsyncExcludes) { $flags += "--exclude=$pattern" }
    if ($DryRun) { $flags += "--dry-run" }
    $src = $Local | ForEach-Object { ConvertTo-MsysPath $_ }
    if ($Explain) {
        Write-Host "$RsyncExe $($flags -join ' ') -e `"$RsyncSsh`" $($src -join ' ') ${SshHost}:${Remote}/" -ForegroundColor Gray
        return
    }
    & $RsyncExe @flags -e $RsyncSsh @src "${SshHost}:${Remote}/"
    if ($LASTEXITCODE -ne 0) { throw "rsync failed for config files (exit $LASTEXITCODE)" }
}

$ReleaseRoot = $null
try {
    if ($Explain) {
        Write-Host "EXPLAIN - commands are printed only; rsync and ssh never start (server untouched)" -ForegroundColor Yellow
        Write-Host ("excluded from the transfer: " + ($RsyncExcludes -join " ")) -ForegroundColor DarkGray
    } elseif ($DryRun) {
        Write-Host "DRY RUN - nothing will be changed on $SshHost" -ForegroundColor Yellow
        Write-Host ("excluded from the transfer: " + ($RsyncExcludes -join " ")) -ForegroundColor DarkGray
    }

    # The release is one commit, materialised outside the working tree. Nothing tracked-in-git-but-
    # not-in-the-commit can reach the server, and no local file can either.
    $Sha = (@(& git -C $ProjectRoot rev-parse --verify "$Commit^{commit}") -join "").Trim()
    if ($LASTEXITCODE -ne 0 -or -not $Sha) { throw "Cannot resolve '$Commit' to a commit in $ProjectRoot." }
    $dirty = @(@(& git -C $ProjectRoot status --porcelain) | Where-Object { $_ -ne "" }).Count
    Write-Host "Deploying commit $Sha (resolved from '$Commit') to $SshHost ($RemoteDir)" -ForegroundColor Cyan
    if ($dirty -gt 0) {
        Write-Host "Working tree holds $dirty uncommitted entries - none of them are part of this deploy." -ForegroundColor Yellow
    }

    $ReleaseRoot = Join-Path $env:TEMP ("celpe-release-" + $Sha.Substring(0, 12))
    $TarFile = "$ReleaseRoot.tar"
    if (Test-Path -LiteralPath $ReleaseRoot) { Remove-Item -LiteralPath $ReleaseRoot -Recurse -Force }
    if (Test-Path -LiteralPath $TarFile) { Remove-Item -LiteralPath $TarFile -Force }
    New-Item -ItemType Directory -Path $ReleaseRoot -Force | Out-Null
    & git -C $ProjectRoot archive --format=tar -o $TarFile $Sha
    if ($LASTEXITCODE -ne 0) { throw "git archive failed for $Sha (exit $LASTEXITCODE)" }
    & $TarExe -xf $TarFile -C $ReleaseRoot
    if ($LASTEXITCODE -ne 0) { throw "tar could not extract $TarFile (exit $LASTEXITCODE)" }
    Remove-Item -LiteralPath $TarFile -Force
    $fileCount = @(Get-ChildItem -LiteralPath $ReleaseRoot -Recurse -File).Count
    Write-Host "Release folder: $ReleaseRoot ($fileCount files, the tracked content of $Sha only)" -ForegroundColor DarkGray

    # Allowlist of directory targets. The repository root is never synced on purpose - that is what
    # keeps local audits, screenshots and tmp reports off the server. Delete only where the full
    # contents live in the repo.
    $Targets = @(
        # src: stale files must go. Renaming middleware.ts to proxy.ts left the old file on the
        # server, and Next.js 16 routes every nested path to 404 while middleware.ts is present.
        @{ Local = "$ReleaseRoot\src";             Remote = "$RemoteDir/src";            Delete = $true },
        # public: no delete, setup-indexnow.sh generates the IndexNow key file there on the server.
        @{ Local = "$ReleaseRoot\public";          Remote = "$RemoteDir/public";         Delete = $false },
        # blog posts: no delete, most posts are published through the admin panel and exist only on
        # the server. Posts that also live in the repo are overwritten by the release copy, so admin
        # edits to those are lost - check before deploying if you edited them there.
        @{ Local = "$ReleaseRoot\data\blog\posts"; Remote = "$RemoteDir/data/blog/posts"; Delete = $false }
    )

    $ConfigFiles = @(
        "$ReleaseRoot\package.json",
        "$ReleaseRoot\package-lock.json",
        "$ReleaseRoot\next.config.ts",
        "$ReleaseRoot\tsconfig.json",
        "$ReleaseRoot\postcss.config.mjs",
        "$ReleaseRoot\eslint.config.mjs"
    )

    # Writer cron scripts: listed one by one, never by a deploy/* wildcard, so nothing local
    # (backups, notes, scratch logs that happen to live in this folder) rides along.
    $WriterScripts = @(
        "$ReleaseRoot\deploy\setup-indexnow.sh",
        "$ReleaseRoot\deploy\setup-cron.sh",
        "$ReleaseRoot\deploy\backup-writer.mjs",
        "$ReleaseRoot\deploy\maintenance-writer.mjs",
        "$ReleaseRoot\deploy\writer-retention.mjs",
        "$ReleaseRoot\deploy\writer-paths.mjs"
    )

    # Checked before anything leaves the machine: a commit that does not carry every item on the list
    # is a broken release, and half a site is far worse than a deploy that never started.
    $missing = @()
    foreach ($target in $Targets) {
        if (-not (Test-Path -LiteralPath $target.Local)) { $missing += (Split-Path -Leaf $target.Local) + "/" }
    }
    foreach ($path in @($ConfigFiles) + @($WriterScripts)) {
        if (-not (Test-Path -LiteralPath $path)) { $missing += (Split-Path -Leaf $path) }
    }
    if ($missing.Count -gt 0) {
        throw ("commit $Sha does not contain: " + ($missing -join ", ") + ". Deploy list and commit are out of step - commit the work first.")
    }

    if (-not ($DryRun -or $Explain)) {
        ssh $SshHost "mkdir -p $RemoteDir/data/blog/posts $RemoteDir/deploy $MaterialsDir"
    }

    foreach ($target in $Targets) {
        $label = Split-Path -Leaf $target.Local
        $mode = if ($target.Delete) { "with delete" } else { "no delete" }
        Write-Host "Syncing $label ($mode) ..." -ForegroundColor Cyan
        Sync-Dir -Local $target.Local -Remote $target.Remote -Delete:$target.Delete
    }

    Write-Host "Syncing config files ..." -ForegroundColor Cyan
    Sync-Files -Local $ConfigFiles -Remote $RemoteDir

    # No delete, ever: the 2026-1 session lives only on the server under arquivos/ and
    # backs the most visited page on the site. The archive is 822 MB of PDFs and never was in git,
    # so this is the one part of a deploy that still comes off this machine instead of the commit.
    if ($SkipMaterials) {
        Write-Host "Skipping exam archive." -ForegroundColor DarkGray
    } else {
        Write-Host "Syncing exam archive from the working tree (unchanged files cost nothing) ..." -ForegroundColor Cyan
        Sync-Dir -Local "$ProjectRoot\Materials\Provas" -Remote $MaterialsDir
    }

    Sync-Files -Local $WriterScripts -Remote "$RemoteDir/deploy"

    if ($DryRun -or $Explain) {
        Write-Host ""
        Write-Host "Stopped before the build and the restart: the server was not touched." -ForegroundColor Yellow
        Write-Host "The list above is what would have been sent. 'deleting' lines are removals on the server (src only)." -ForegroundColor DarkGray
        return
    }

    Write-Host "Writing IndexNow key to public/ (before build)..." -ForegroundColor Cyan
    ssh $SshHost "bash $RemoteDir/deploy/setup-indexnow.sh"

    Write-Host "Building on server..." -ForegroundColor Cyan
    # Wipe .next first: a failed/partial turbopack build leaves hashed CSS/JS that no longer
    # match the running process, and Cloudflare then keeps serving the old immutable chunks.
    ssh $SshHost "cd $RemoteDir && rm -rf .next && export MAKEFLAGS=-j1 && export NODE_OPTIONS='--max-old-space-size=768' && npm ci && npm run build && systemctl restart celpe-de-pe && systemctl is-active celpe-de-pe"
    if ($LASTEXITCODE -ne 0) {
        throw "Server build or restart failed (exit $LASTEXITCODE). The previous process may still be running with a stale .next - fix the build before another deploy."
    }

    Write-Host "Ensuring publish cron..." -ForegroundColor Cyan
    ssh $SshHost "bash $RemoteDir/deploy/setup-cron.sh"

    Write-Host ""
    Write-Host "Site: http://137.184.179.172/pt-br" -ForegroundColor Green
    Write-Host "Deployed commit: $Sha" -ForegroundColor DarkGray
} finally {
    # The release folder is throwaway: leaving it behind would let a later deploy reuse stale bytes.
    if ($ReleaseRoot -and (Test-Path -LiteralPath $ReleaseRoot)) {
        Remove-Item -LiteralPath $ReleaseRoot -Recurse -Force
        Write-Host "Release folder removed." -ForegroundColor DarkGray
    }
}
