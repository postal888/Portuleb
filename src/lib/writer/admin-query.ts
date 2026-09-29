import { isWritingTaskId } from "@/content/writing/tasks";
import { isLocale } from "@/i18n/locales";
import { isoAgo } from "./time";
import { EMAIL_DELIVERY_STATUSES, SUBMISSION_STATUSES, WRITER_SESSION_STATUSES } from "./types";
import type { WriterFilters } from "./analytics";

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
export const DEFAULT_WINDOW_DAYS = 30;
export const MAX_WINDOW_DAYS = 366;
export const DEFAULT_PAGE_SIZE = 200;
export const MAX_PAGE_SIZE = 500;

export type ParsedFilters = { filters: WriterFilters; limit: number; problems: string[] };

function startOfDay(date: string): string {
  return `${date}T00:00:00.000Z`;
}

function endOfDay(date: string): string {
  return `${date}T23:59:59.999Z`;
}

function dateParam(params: URLSearchParams, key: string, now: number): string {
  const raw = params.get(key)?.trim();
  if (raw && DATE_ONLY.test(raw) && !Number.isNaN(Date.parse(raw))) {
    return key === "from" ? startOfDay(raw) : endOfDay(raw);
  }
  if (raw && !Number.isNaN(Date.parse(raw))) return new Date(Date.parse(raw)).toISOString();
  // No upper bound means "up to this moment"; no lower bound means "the last month".
  return key === "from"
    ? isoAgo(DEFAULT_WINDOW_DAYS * 24 * 60 * 60 * 1000, now)
    : new Date(now).toISOString();
}

/**
 * Query strings are the admin's only input, so an unreadable filter is reported instead of
 * being dropped: a silently ignored `locale=de` would show the operator a wrong funnel.
 */
export function parseWriterFilters(params: URLSearchParams, now = Date.now()): ParsedFilters {
  const problems: string[] = [];

  const sinceIso = dateParam(params, "from", now);
  const untilIso = dateParam(params, "to", now);
  if (Date.parse(sinceIso) > Date.parse(untilIso)) problems.push("from está depois de to");
  if (Date.parse(untilIso) - Date.parse(sinceIso) > MAX_WINDOW_DAYS * 24 * 60 * 60 * 1000) {
    problems.push(`janela máxima de ${MAX_WINDOW_DAYS} dias`);
  }

  const filters: WriterFilters = { sinceIso, untilIso };

  const locale = params.get("locale")?.trim();
  if (locale) {
    if (isLocale(locale)) filters.locale = locale;
    else problems.push(`locale desconhecido: ${locale}`);
  }

  const taskId = params.get("taskId")?.trim();
  if (taskId) {
    if (isWritingTaskId(taskId)) filters.taskId = taskId;
    else problems.push(`tarefa desconhecida: ${taskId}`);
  }

  const status = params.get("status")?.trim();
  if (status) {
    if ((SUBMISSION_STATUSES as readonly string[]).includes(status)) filters.status = status;
    else problems.push(`status desconhecido: ${status}`);
  }

  const deliveryStatus = params.get("delivery")?.trim();
  if (deliveryStatus) {
    if ((EMAIL_DELIVERY_STATUSES as readonly string[]).includes(deliveryStatus)) {
      filters.deliveryStatus = deliveryStatus;
    } else if (deliveryStatus === "none") {
      filters.deliveryStatus = "none";
    } else {
      problems.push(`entrega desconhecida: ${deliveryStatus}`);
    }
  }

  const sessionStatus = params.get("sessionStatus")?.trim();
  if (sessionStatus) {
    if ((WRITER_SESSION_STATUSES as readonly string[]).includes(sessionStatus)) {
      filters.sessionStatus = sessionStatus;
    } else {
      problems.push(`sessão desconhecida: ${sessionStatus}`);
    }
  }

  const provider = params.get("provider")?.trim();
  if (provider) filters.provider = provider.slice(0, 60);
  const model = params.get("model")?.trim();
  if (model) filters.model = model.slice(0, 60);

  const mock = params.get("mock")?.trim();
  if (mock === "real" || mock === "mock") filters.mock = mock;

  const rawLimit = Number(params.get("limit")?.trim() ?? "");
  const limit = Number.isFinite(rawLimit) && rawLimit > 0 ? Math.min(rawLimit, MAX_PAGE_SIZE) : DEFAULT_PAGE_SIZE;

  return { filters, limit, problems };
}

export const SESSION_STATUS_FILTER = WRITER_SESSION_STATUSES;
export const SUBMISSION_STATUS_FILTER = SUBMISSION_STATUSES;
export const DELIVERY_STATUS_FILTER = EMAIL_DELIVERY_STATUSES;

/** Cells a spreadsheet would execute are neutralised before they leave the server. */
function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let text = String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\n\r;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function toCsv(rows: Record<string, unknown>[], columns?: string[]): string {
  const header = columns ?? Object.keys(rows[0] ?? {});
  const lines = [header.map(csvCell).join(",")];
  for (const row of rows) lines.push(header.map((column) => csvCell(row[column])).join(","));
  return `${lines.join("\r\n")}\r\n`;
}
