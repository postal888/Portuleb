# Деплой CELPE-Dê Pé на VPS

**Сервер:** `137.184.179.172`  
**SSH-алиас:** `celpe-server` (ключ `E:\GIT\portulebre_do`, см. `~/.ssh/config`)

## 1. Первый вход (ключ SSH)

Сейчас сервер отвечает `Permission denied (publickey)` — нужно добавить ваш публичный ключ в DigitalOcean:

1. [DigitalOcean](https://cloud.digitalocean.com) → Droplet → **Access** → **Add SSH Key**  
   или при создании дроплета выбрать существующий ключ.

2. Публичный ключ проекта (`E:\GIT\portulebre_do.pub`):

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJEpXyh45QoZOWi+WWhEPZAyawONvvgxbfZ4m7MSDQke portulibre-do
```

3. Проверка с Windows:

```powershell
ssh celpe-server "uname -a"
```

## 2. Установка на сервере (один раз)

С локальной машины (после успешного SSH):

```powershell
cd E:\GIT\Portulebre_hub
Get-Content deploy\setup-server.sh -Raw | ssh celpe-server "bash -s"
```

Или зайти на сервер и выполнить `bash deploy/setup-server.sh` из клонированного репозитория.

Скрипт установит: Node.js 20, nginx, git, создаст `/var/www/celpe-de-pe`, systemd-сервис и конфиг nginx.

## 3. Переменные окружения на сервере

```bash
ssh celpe-server
nano /var/www/celpe-de-pe/.env.local
```

Пример:

```env
NODE_ENV=production
PORT=3000
MATERIALS_ROOT=/var/materials/celpe-bras
```

Материалы (PDF, vídeos) нужно скопировать на сервер, например:

```powershell
scp -r "E:\GIT\Portulebre\Materials" celpe-server:/var/materials/celpe-bras
```

## 4. Деплой обновлений

```powershell
cd E:\GIT\Portulebre_hub
.\deploy\deploy.ps1
```

Скрипт: `git pull` на сервере → `npm ci` → `npm run build` → перезапуск `celpe-de-pe`.

## 5. Админка (`/admin`)

В `.env.local` на сервере (`/var/www/celpe-de-pe/.env.local`):

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<senha-forte>
ADMIN_SECRET_KEY=<opcional-32-chars>
CRON_SECRET=<segredo-cron>
NEXT_PUBLIC_SITE_URL=https://celpe-depe.com
# Opcional: Cloudflare Analytics API
CF_API_TOKEN=
CF_ZONE_ID=
NEXT_PUBLIC_GA_ID=
```

Папки с правами на запись для пользователя `celpe-de-pe`:

```bash
mkdir -p /var/www/celpe-de-pe/data/admin /var/www/celpe-de-pe/data/blog/posts
chown -R www-data:www-data /var/www/celpe-de-pe/data
```

**Cron** — публикация запланированных постов (каждые 5 мин):

```bash
crontab -e
# добавить:
*/5 * * * * curl -fsS -H "x-cron-secret: SEU_CRON_SECRET" https://celpe-depe.com/api/admin/cron/publish >/dev/null
```

Вход: `https://celpe-depe.com/admin/login` → дашборд, блог, расписание, трафик (SQLite + опционально Cloudflare).

## 6. Проверка

- Сайт: http://137.184.179.172  
- Админка: `/admin/login`  
- Логи: `ssh celpe-server "journalctl -u celpe-de-pe -f"`  
- Nginx: `ssh celpe-server "nginx -t && systemctl status nginx"`

## Домен и HTTPS (позже)

В `deploy/nginx/celpe-de-pe.conf` замените `server_name` на домен и настройте Certbot:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d seu-dominio.com.br
```
