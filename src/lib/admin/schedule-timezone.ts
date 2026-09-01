import type { Locale } from "@/i18n/locales";
import { isLocale } from "@/i18n/locales";

export const SCHEDULE_TIMEZONE_OPTIONS = [
  { id: "America/Sao_Paulo", label: "Brasília (BRT/BRST)" },
  { id: "America/Manaus", label: "Manaus (AMT)" },
  { id: "America/Belem", label: "Belém (BRT)" },
  { id: "America/Fortaleza", label: "Fortaleza (BRT)" },
  { id: "UTC", label: "UTC" },
] as const;

export type ScheduleTimezoneId = (typeof SCHEDULE_TIMEZONE_OPTIONS)[number]["id"];

export const DEFAULT_SCHEDULE_TIMEZONE: ScheduleTimezoneId = "America/Sao_Paulo";

export const SCHEDULE_TIMEZONE_STORAGE_KEY = "celpe_admin_schedule_timezone";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function isValidScheduleTimezone(value: string): value is ScheduleTimezoneId {
  return SCHEDULE_TIMEZONE_OPTIONS.some((opt) => opt.id === value);
}

export function resolveScheduleTimezone(value?: string | null): ScheduleTimezoneId {
  if (value && isValidScheduleTimezone(value)) return value;
  return DEFAULT_SCHEDULE_TIMEZONE;
}

export function scheduleTimezoneLabel(timeZone: string): string {
  return SCHEDULE_TIMEZONE_OPTIONS.find((opt) => opt.id === timeZone)?.label ?? timeZone;
}

type ZonedParts = { y: number; mo: number; d: number; h: number; mi: number };

export function getZonedParts(date: Date, timeZone: string): ZonedParts {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(date);
  const pick = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  const hourRaw = pick("hour");
  return {
    y: Number(pick("year")),
    mo: Number(pick("month")),
    d: Number(pick("day")),
    h: Number(hourRaw === "24" ? "0" : hourRaw),
    mi: Number(pick("minute")),
  };
}

export function formatZonedDateTimeInput(date: Date | string, timeZone: string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const p = getZonedParts(d, timeZone);
  return `${p.y}-${pad(p.mo)}-${pad(p.d)}T${pad(p.h)}:${pad(p.mi)}`;
}

export function formatZonedDisplay(date: Date | string, timeZone: string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const text = new Intl.DateTimeFormat("pt-BR", {
    timeZone,
    dateStyle: "short",
    timeStyle: "short",
  }).format(d);
  return `${text} (${scheduleTimezoneLabel(timeZone)})`;
}

export function parseDateTimeInput(value: string): ZonedParts {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value.trim());
  if (!m) throw new Error("Data/hora inválida — use o seletor de data e hora");
  return { y: +m[1], mo: +m[2], d: +m[3], h: +m[4], mi: +m[5] };
}

/** Wall-clock datetime in `timeZone` → ISO UTC string stored in SQLite. */
export function zonedDateTimeInputToUtc(isoLocal: string, timeZone: string): string {
  const target = parseDateTimeInput(isoLocal);
  let ts = Date.UTC(target.y, target.mo - 1, target.d, target.h, target.mi);

  for (let attempt = 0; attempt < 72; attempt++) {
    const p = getZonedParts(new Date(ts), timeZone);
    if (
      p.y === target.y &&
      p.mo === target.mo &&
      p.d === target.d &&
      p.h === target.h &&
      p.mi === target.mi
    ) {
      return new Date(ts).toISOString();
    }
    const desired = Date.UTC(target.y, target.mo - 1, target.d, target.h, target.mi);
    const actual = Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi);
    ts += desired - actual;
  }

  throw new Error(`Não foi possível converter ${isoLocal} para ${scheduleTimezoneLabel(timeZone)}`);
}

export function defaultScheduleStartInput(timeZone: string, daysAhead = 1, hour = 9, minute = 0): string {
  const base = new Date(Date.now() + daysAhead * 86400000);
  const p = getZonedParts(base, timeZone);
  return `${p.y}-${pad(p.mo)}-${pad(p.d)}T${pad(hour)}:${pad(minute)}`;
}

export type CustomPlanEntry = { index: number; publishAtLocal: string; locale?: Locale };

export function parseCustomPlanJson(raw: string | null | undefined): CustomPlanEntry[] | null {
  if (!raw?.trim()) return null;
  const parsed = JSON.parse(raw) as CustomPlanEntry[];
  if (!Array.isArray(parsed) || !parsed.length) return null;
  for (const row of parsed) {
    if (typeof row.index !== "number" || typeof row.publishAtLocal !== "string") {
      throw new Error("Plano personalizado inválido");
    }
    parseDateTimeInput(row.publishAtLocal);
    if (row.locale !== undefined && !isLocale(row.locale)) {
      throw new Error("Locale inválido no plano personalizado");
    }
  }
  return parsed;
}
