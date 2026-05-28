# Git — CELPE-Dê Pé (Portuleb)

**Репозиторий:** https://github.com/postal888/Portuleb  
**Локальная папка:** `E:\GIT\Portulebre_hub`

## Уже настроено в проекте

- `origin` → `git@github.com:postal888/Portuleb.git`
- ветка `main`
- автор коммитов (только для этого репо): `postal888`

## Один раз: SSH-ключ на GitHub

1. Откройте https://github.com/settings/keys → **New SSH key**
2. Вставьте публичный ключ:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPzG28OAXXOJqJUboHxGMpiAlMgIsVuo6jdICO33JpNJ postal8888888@gmail.com
```

Файл на диске: `C:\Users\lenovo\.ssh\id_ed25519.pub`

3. Проверка:

```powershell
ssh -T git@github.com
```

Должно быть: `Hi postal888! You've successfully authenticated...`

## Push / pull

```powershell
cd E:\GIT\Portulebre_hub
git status
git push origin main
git pull origin main
```

## HTTPS (если SSH не нужен)

```powershell
git remote set-url origin https://github.com/postal888/Portuleb.git
git push origin main
```

При запросе пароля используйте **Personal Access Token** (не пароль от аккаунта):  
https://github.com/settings/tokens

## Деплой на сервер

```powershell
.\deploy\deploy.ps1
```

Сервер: `ssh celpe-server` → `/var/www/celpe-de-pe`
