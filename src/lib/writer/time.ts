export const IDLE_THRESHOLD_MS = 30_000;
export const ABANDON_AFTER_MS = 30 * 60 * 1_000;
export const REPORT_OPEN_DEDUPE_MS = 2_000;

export const EMAIL_GATE_WORDS = 40;
export const EXAM_MIN_WORDS = 120;
export const EXAM_MAX_WORDS = 600;

export function nowIso(): string {
  return new Date().toISOString();
}

export function isoDaysFromNow(days: number, fromMs = Date.now()): string {
  return new Date(fromMs + days * 24 * 60 * 60 * 1_000).toISOString();
}

export function isoAgo(ms: number, fromMs = Date.now()): string {
  return new Date(fromMs - ms).toISOString();
}

export function toEpochMs(value: string | null | undefined): number | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export function elapsedBetweenMs(start: string | null | undefined, end: string | null | undefined): number | null {
  const a = toEpochMs(start);
  const b = toEpochMs(end);
  if (a === null || b === null) return null;
  return Math.max(0, b - a);
}

export function wordsPerActiveMinute(words: number, activeMs: number): number | null {
  if (!activeMs || activeMs <= 0) return null;
  const minutes = activeMs / 60_000;
  if (minutes <= 0) return null;
  return Math.round((words / minutes) * 10) / 10;
}

/** Nearest-rank percentile over an unsorted list of numbers. */
export function percentile(values: number[], p: number): number | null {
  const clean = values.filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
  if (!clean.length) return null;
  const rank = Math.ceil((p / 100) * clean.length) - 1;
  return clean[Math.max(0, Math.min(clean.length - 1, rank))];
}

export function formatDuration(ms: number | null | undefined): string {
  if (!ms || ms <= 0) return "—";
  const totalSeconds = Math.round(ms / 1_000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes <= 0) return `${seconds}s`;
  if (minutes < 60) return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${(minutes % 60).toString().padStart(2, "0")}m`;
}
