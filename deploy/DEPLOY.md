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

Скрипт синхронизирует через `rsync` код (`src`, `public`, конфиги), `data/blog/posts`
и архив материалов, затем на сервере: ключ IndexNow → `npm ci` → `npm run build` →
перезапуск `celpe-de-pe` → проверка cron. `git pull` на сервере **не** выполняется.

Посмотреть, что изменится, ничего не трогая:

```powershell
.\deploy\deploy.ps1 -DryRun
```

### Зависимость: rsync из MSYS2

Раньше использовался `scp`, который не умеет пропускать неизменившиеся файлы и потому
гнал все ~822 МБ архива при каждом деплое. Установка:

```powershell
winget install --id MSYS2.MSYS2 -e
C:\msys64\usr\bin\bash.exe -lc "pacman -S --noconfirm --needed rsync openssh"
```

Отдельный ssh-конфиг `C:\ProgramData\rsync-ssh\config` нужен из-за кириллицы в пути
профиля (`C:\Users\Администратор`): MSYS-овский `ssh` не может развернуть `~` и не
находит `~/.ssh/known_hosts` — падает с `Host key verification failed`. Явные пути без
кириллицы это обходят; сам приватный ключ по такому пути читается нормально, поэтому
копировать его никуда не потребовалось. Нативный `ssh.exe` из Windows тут не годится:
соединение поднимается, но поток данных `rsync` рвётся на нулевом байте.

Конфиг привязан к профилю `Администратор`. Со второй учётки поправьте в нём `IdentityFile`.

### Что синхронизируется с удалением, а что нет

| Каталог | `--delete` | Почему |
|---|---|---|
| `src` | да | Полностью управляется репозиторием |
| `public` | нет | `setup-indexnow.sh` создаёт там ключ на сервере |
| `data/blog/posts` | нет | ~40 статей опубликованы через админку и есть только на сервере |
| `Materials/Provas` | **никогда** | Сессия 2026-1 существует только на сервере |

`--delete` для `src` — не косметика. При переименовании `middleware.ts` → `proxy.ts`
старый файл оставался на сервере, а в Next.js 16 присутствие `middleware.ts` уводит все
вложенные маршруты в 404. `scp` такие хвосты не убирал.

Важно про раскладку архива (`src/lib/materials/registry.ts`):

- сессии 2023-1…2025-2 — плоские папки, читаются из `MATERIALS_ROOT`
  (`/var/materials/celpe-bras`), потому что `Materials/Provas` внутри папки приложения
  на сервере отсутствует и срабатывает откат;
- сессия **2026-1** — записи с `legacy: true`, файлы лежат в `arquivos/2026/1/...`
  **только на сервере**, в репозитории их нет.

Поэтому синхронизировать эту папку с удалением нельзя: это снесёт материалы 2026-1,
а `/pt-br/provas-anteriores/2026-1` — самая посещаемая страница сайта.

Метки времени архива были один раз выровнены (`rsync -rt --size-only`, 2 КБ трафика),
поэтому обычная синхронизация видит, что менять нечего. `scp` метки не переносил, из-за
чего без этого шага `rsync` посчитал бы все 34 файла изменившимися.

### `data/blog/posts` перезаписывается

Локальные JSON кладутся поверх серверных. Лишние файлы не удаляются, но статьи с
совпадающими именами затираются локальной версией. На сервере ~45 статей, в репозитории
только часть — правки, сделанные через админку в статьях, которые есть и в git, деплой
откатит. Перед деплоем сверяйте, если правили эти статьи в админке.

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

```powershell
scp deploy\setup-cron.sh celpe-server:/var/www/celpe-de-pe/deploy/
ssh celpe-server "bash /var/www/celpe-de-pe/deploy/setup-cron.sh"
```

Скрипт читает `CRON_SECRET` из `.env.local` и добавляет задачу в crontab. При деплое через `deploy.ps1` это выполняется автоматически.

Вручную (если нужно):

```bash
crontab -e
# */5 * * * * curl -fsS -H "x-cron-secret: SEU_CRON_SECRET" https://celpe-depe.com/api/admin/cron/publish >/dev/null
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
