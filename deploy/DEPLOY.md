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
.\deploy\deploy.ps1                     # деплоит HEAD
.\deploy\deploy.ps1 -Commit 1a2b3c4     # деплоит конкретный коммит
```

Деплой берёт содержимое **одного коммита**, а не рабочего дерева. Скрипт разворачивает
`git archive <sha>` в `%TEMP%\celpe-release-<sha12>`, и все цели (`src`, `public`,
`data/blog/posts`, шесть конфигов, шесть скриптов `deploy/`) читаются оттуда. Поэтому
неотслеживаемые файлы — чужие аудиты, скриншоты, локальные отчёты, `data/writing` с реальными
эссе — физически не могут уехать на сервер: их нет в коммите. SHA печатается до первой
пересылки, а папка релиза удаляется в `finally` при любом исходе.

Исключение одно: архив материалов `Materials/Provas` (822 МБ PDF) в git никогда не попадал,
он по-прежнему берётся из рабочего дерева. `-SkipMaterials` выключает и его.

Перед любой пересылкой скрипт сверяет список целей с релизом: если коммит чего-то не
содержит, деплой прерывается целиком с перечнем недостающего — полусайт на проде хуже
незапущенного деплоя. Так что порядок всегда один: сначала коммит, потом деплой.

Посмотреть, что изменится, ничего не трогая:

```powershell
.\deploy\deploy.ps1 -DryRun      # rsync --dry-run: требует подключения к серверу
.\deploy\deploy.ps1 -Explain     # только печать команд: без rsync, без ssh
```

`-Explain` не открывает соединение вообще — видно точные команды `rsync`, которые запустит
обычный прогон, и все пути в них ведут в папку релиза, а не в `E:\GIT\Portulebre_hub`.
`npm ci`, сборка и перезапуск сервиса в обоих режимах не выполняются.

Синхронизация идёт через `rsync` (код, `data/blog/posts`, архив материалов), затем на сервере:
ключ IndexNow → `npm ci` → `npm run build` → перезапуск `celpe-de-pe` → проверка cron.
`git pull` на сервере **не** выполняется.

### Границы переноса

Синхронизируются только явно перечисленные цели: `src`, `public`, `data/blog/posts`,
шесть конфигов пакета поимённо, архив `Materials/Provas` и шесть скриптов из `deploy/`
поимённо. Корень репозитория не переносится никогда — поэтому локальные аудиты,
скриншоты и временные отчёты физически не могут уехать на сервер.

Дополнительно ко всем целям применён `$RsyncExcludes` (`.git`, `node_modules`, `.next`,
`.env*`, `*.log`, `*.db`/`*.sqlite` и их WAL/SHM, `*.tmp`, `*.bak`, `screenshots`,
`*-audit`, и привязанные к корню `data/admin`, `data/writing`, `data/backups`). Он работает
на любой глубине, так что случайный `admin.db` или `.env.local` внутри `src/` тоже не
перенесётся. `data/backups` на сервере в исключениях — деплой не имеет права трогать копии.

Сам файл `deploy.ps1` держится в ASCII: Windows PowerShell 5.1 читает скрипт без BOM в
кодовой странице ANSI, и кириллический байт UTF-8 распадается на «умные» кавычки, которые
ломают разбор. Проверка: `[System.Management.Automation.PSParser]::Tokenize` обязана
возвращать 0 ошибок.

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

### Трассировка сборки

Turbopack на `npm run build` сам решает, какие файлы попадут в serverless-трейс модуля.
Правило, из-за которого райтер когда-то шумел: модуль, который делает `path.join`/`path.resolve`
с нестатическими аргументами и трогает `fs`, тянет в трейс **весь корень репозитория**, и сборка
печатает `Encountered unexpected file in NFT list`. Для `src/lib/writer/archive.ts` это значило
одну вещь: в артефакт сборки пытались попасть `data/admin/admin.db` и `data/writing` с чужими
эссе.

Лечится не комментарием у `path.resolve` (проверено — предупреждение остаётся), а ленивой
загрузкой модуля: точка вызова пишется `await import(/* turbopackIgnore: true */ "./archive")`.
fs-код тогда вообще не попадает в граф сборки, путь при этом остаётся настраиваемым через
`WRITER_ARCHIVE_DIR`. Два места с такой загрузкой: `src/lib/writer/check.ts` (копия эссе в JSON)
и `src/app/api/admin/writer/erase/route.ts` (удаляется та же копия).

Проверка после любых правок в `src/lib/writer`:

```powershell
npm run build 2>&1 | Select-String -Pattern "NFT list" -Context 0,6
```

В списке не должно быть ни `src\lib\writer`, ни `data\writing`, ни `.env.local`. Предупреждение
от `src/lib/materials/registry.ts` (материалы лежат вне репозитория, на сервере в
`/var/materials`) — известное, к райтеру отношения не имеет и чужими правками не лечилось.

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
mkdir -p /var/www/celpe-de-pe/data/admin /var/www/celpe-de-pe/data/blog/posts \
         /var/www/celpe-de-pe/data/writing
chown -R www-data:www-data /var/www/celpe-de-pe/data
```

`data/writing` нужна райтеру: туда кладётся читаемая JSON-копия каждой проверки (см. раздел 6).

**Cron** — публикация запланированных постов (каждые 5 мин):

```powershell
scp deploy\setup-cron.sh celpe-server:/var/www/celpe-de-pe/deploy/
ssh celpe-server "bash /var/www/celpe-de-pe/deploy/setup-cron.sh"
```

Скрипт читает `CRON_SECRET` из `.env.local` и добавляет задачу в crontab. При деплое через `deploy.ps1` это выполняется автоматически. Там же ставится ежедневная задача резервной копии райтера (раздел 6) — обе задачи идемпотентны, повторный запуск их не дублирует.

Вручную (если нужно):

```bash
crontab -e
# */5 * * * * curl -fsS -H "x-cron-secret: SEU_CRON_SECRET" https://celpe-depe.com/api/admin/cron/publish >/dev/null
```

Вход: `https://celpe-depe.com/admin/login` → дашборд, блог, расписание, трафик, writer analytics (SQLite + опционально Cloudflare).

## 6. Раздел «Escrever» (проверка эссе)

### Схема

Пять таблиц наблюдаемости — `writer_sessions`, `writer_events`, `writing_submissions`,
`writing_reports`, `email_deliveries` — создаёт само приложение при первом обращении к базе
админки (`runAdminMigrations` → `migrateWriterObservability`, `src/lib/writer/schema-ddl.ts`).
Отдельного шага на сервере нет: `migrations/*.sql` деплоем туда не переносятся и нужны только
чтобы читать историю глазами. Проверить, что схема на месте:

```bash
sqlite3 /var/www/celpe-de-pe/data/admin/admin.db ".tables"
```

### Переменные

В `.env.local`; без них работает, значения ниже — то, что стоит в проде:

```env
WRITER_ARCHIVE_DIR=./data/writing   # читаемые JSON-копии проверок
WRITING_REPORT_TTL_DAYS=30          # срок жизни ссылки на отчёт
WRITER_REPORT_PEPPER=<32+ chars>    # HMAC токенов; по умолчанию берётся ADMIN_SECRET_KEY
SITE_URL=https://celpe-depe.com     # базовый URL в письме (или NEXT_PUBLIC_SITE_URL)
RESEND_API_KEY=                     # пусто → письма не уходят
MAIL_FROM=Celpe-Dê Pé <no-reply@celpe-depe.com>
MAIL_REPLY_TO=                      # необязательно
ESSAY_CHECK_ALLOW_MOCK=0            # 1 только для локальной разработки
```

Почта считается настроенной только при **обоих** значениях: `RESEND_API_KEY` и
`MAIL_FROM` (или `RESEND_FROM`). Отдельного флага `WRITING_EMAIL_ENABLED` в коде нет —
выключатель именно такой: пустой ключ.

При любом из двух невыполненных условий проверка не ломается:

- AI-анализ выполняется как обычно, `writing_submissions.status` доходит до `completed`;
- результат сразу показывается на экране, и там же остаётся рабочая ссылка на отчёт
  (`reportUrl` из ответа `/api/check-essay`, живёт `WRITING_REPORT_TTL_DAYS` дней);
- в `email_deliveries` пишется строка `skipped_unconfigured` с ошибкой
  `provider_not_configured` — это не отказ и не считается попыткой доставки;
- экран вместо «мы отправили письмо» показывает `deliveryUnconfigured`
  («A avaliação está na tela. O envio do link por e-mail ainda está desligado neste site.»);
- кнопка повтора не перезапускает анализ, а при выключенной почте снова возвращает
  `skipped_unconfigured` / `provider_not_configured` и не трогает уже показанную ссылку.

Покрытие: `tests/writer/check.test.ts` (весь цикл без провайдера), `tests/writer/mail.test.ts`
(статус доставки и живая ссылка), `tests/writer/resend-route.test.ts` (повтор кандидатом:
`skipped_unconfigured`, отсутствие пересчёта, сохранение ссылки, лимиты),
`tests/writer/admin-resend.test.ts` (повтор из админки).

### Откат кода

Миграция 004 только добавляет таблицы и ничего не меняет в старых, поэтому откат
`deploy.ps1` на предыдущую версию безопасен: прежний код продолжит писать в `writing_emails`,
новые таблицы просто переждут. Удалять их ради отката не нужно.

### Резервные копии

`deploy/backup-writer.mjs` снимает онлайн-копию (`.backup()`, приложение останавливать не
надо) в `data/backups/writer/ГГГГ-ММ-ДД/`:

- `admin.db` — база, WAL свёрнут в один файл, чтобы копию можно было открыть без соседей;
- `writing/` — все JSON-копии проверок.

Хранится 14 дней (`WRITER_BACKUP_KEEP_DAYS`); удаляются только суточные папки, созданные этим
же скриптом. `.env.local` в копию не попадает никогда.

```bash
cd /var/www/celpe-de-pe && node deploy/backup-writer.mjs
```

Cron ставит `deploy/setup-cron.sh` (то есть каждый деплой через `deploy.ps1`):

```
40 4 * * * cd /var/www/celpe-de-pe && /usr/bin/node deploy/backup-writer.mjs >> /var/log/celpe-backup-writer.log 2>&1
```

#### Что именно лежит в копии

Копия состоит из **двух** частей, и это не дублирование:

- `admin.db` — канонические данные: тексты эссе (`essay_text`), разбор (`analysis_json`,
  `scores_json`), сессии, события, токены отчётов и журнал доставки. Один-единственный
  `admin.db` восстанавливает работу сайта целиком;
- `writing/` — читаемые JSON-копии проверок из `data/writing`.

`data/writing` попадает в копию, потому что это отдельный от базы носитель: файлы лежат на
дереве, их можно отдать человеку или забрать скриптом, не поднимая SQLite, и их состояние
живёт рядом, но не внутри базы. Согласованность обеспечивается не сверкой файлов, а
привязкой к строке: `writing_submissions.archive_status` / `archive_path` / `archive_error`
записываются в том же жизненном цикле, что и сам файл (`src/lib/writer/check.ts:155-169`),
путь строится только из UUID отправки, а запись атомарная (`.tmp` + `rename`). То есть база
всегда знает, легла копия или нет (`ok` / `failed`), и в админке это видно; файл никогда не
создаётся для чужой отправки. Проверить вручную:

```bash
sqlite3 data/admin/admin.db "SELECT archive_status, COUNT(*) FROM writing_submissions GROUP BY 1;"
find data/writing -name '*.json' | wc -l
```

Если у завершённой отправки стоит `failed` или завис `pending` — это повод смотреть на папку
`data/writing` отдельно; сам файл источником истины не считается и при расхождении выигрывает
база. При запросе на удаление (`/api/admin/writer/erase`) стираются оба носителя — иначе
текст эссе пережил бы удаление базы.

#### Retention: чистка старых событий

`deploy/maintenance-writer.mjs` — единственный исполнительный сценарий чистки; политика
живёт в `deploy/writer-retention.mjs` и оттуда же проверяется тестами
(`tests/writer/retention.test.ts`). В дашборде админки чистки нет и не будет: prune запускается
только из cron или вручную.

Срок хранения (`WRITER_RETENTION_*` не переопределяются, константы в модуле):

- `writer_events` — 180 дней;
- завершённые сессии (`submitted`, `completed`, `failed`) без связи с отправкой — 180 дней;
- `abandoned` без отправки — 90 дней;
- события осиротевших сессий — сразу после удаления сессии.

`writing_submissions`, готовые отчёты и `email_deliveries` не удаляются никогда: доставка
прикрепляется к отправке и исчезает только вместе с ней через `/api/admin/writer/erase`.
Все четыре шага идут в одной транзакции (`BEGIN IMMEDIATE` … `COMMIT`), при любой ошибке —
полный `ROLLBACK`. `VACUUM` не запускается: скрипт только подсказывает, если free-лист стал
большим, решение принимает оператор.

Скрипт отказывается чистить без свежей копии (не старше 26 часов) и сначала требует backup:

```bash
cd /var/www/celpe-de-pe
node deploy/maintenance-writer.mjs --dry-run   # показать границы и счётчики, ничего не меняя
node deploy/maintenance-writer.mjs             # только после успешной копии за сегодня
```

`--dry-run` выполняет те же `DELETE` и откатывает транзакцию, поэтому счётчики совпадают с
реальным прогоном. В лог идут только границы и количества — без адресов, текстов и токенов.

Cron (`deploy/setup-cron.sh`, ставится автоматически при деплое, идемпотентно) запускает
чистку после копии — в 04:55, то есть через 15 минут после бэкапа в 04:40:

```
55 4 * * * cd /var/www/celpe-de-pe && /usr/bin/node deploy/maintenance-writer.mjs >> /var/log/celpe-maintenance-writer.log 2>&1
```

### Восстановление

```bash
systemctl stop celpe-de-pe
cd /var/www/celpe-de-pe
cp data/admin/admin.db /root/admin.db.before-restore.$(date +%F)   # если текущая ещё нужна
cp data/backups/writer/2026-10-01/admin.db data/admin/admin.db
rm -f data/admin/admin.db-wal data/admin/admin.db-shm
cp -r data/backups/writer/2026-10-01/writing data/writing
chown -R www-data:www-data data
systemctl start celpe-de-pe
```

`-wal` и `-shm` от старой базы убираются вместе с ней: иначе SQLite доклеит к восстановленной
копии удалённые строки из чужого лога.


## 7. Проверка

- Сайт: http://137.184.179.172  
- Админка: `/admin/login`  
- Логи: `ssh celpe-server "journalctl -u celpe-de-pe -f"`  
- Nginx: `ssh celpe-server "nginx -t && systemctl status nginx"`
- Бэкап райтера: `ssh celpe-server "ls -la /var/www/celpe-de-pe/data/backups/writer && tail -20 /var/log/celpe-backup-writer.log"`
- Retention райтера: `ssh celpe-server "crontab -l | grep maintenance-writer && tail -20 /var/log/celpe-maintenance-writer.log"`

## Домен и HTTPS (позже)

В `deploy/nginx/celpe-de-pe.conf` замените `server_name` на домен и настройте Certbot:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d seu-dominio.com.br
```
