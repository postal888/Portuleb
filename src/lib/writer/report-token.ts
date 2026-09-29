import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { isLocale } from "@/i18n/locales";

export const REPORT_TOKEN_BYTES = 32;
export const DEFAULT_REPORT_TTL_DAYS = 30;

export function reportTokenPepper(): string {
  return (
    process.env.WRITER_REPORT_PEPPER?.trim() ||
    process.env.ADMIN_SECRET_KEY?.trim() ||
    "celpe-writer-report"
  );
}

/** Raw token exists only in the URL the candidate receives; storage keeps the hash. */
export function generateReportToken(): string {
  return randomBytes(REPORT_TOKEN_BYTES).toString("base64url");
}

export function hashReportToken(token: string, pepper = reportTokenPepper()): string {
  return createHmac("sha256", pepper).update(token).digest("hex");
}

const BASE64URL_RE = /^[A-Za-z0-9_-]{40,128}$/;

export function isPlausibleToken(token: string | undefined | null): boolean {
  return Boolean(token && BASE64URL_RE.test(token));
}

export function reportTtlDays(): number {
  const raw = Number(process.env.WRITING_REPORT_TTL_DAYS ?? "");
  if (!Number.isFinite(raw) || raw <= 0) return DEFAULT_REPORT_TTL_DAYS;
  return Math.min(365, Math.round(raw));
}

export function isExpired(expiresAt: string, nowMs = Date.now()): boolean {
  const parsed = Date.parse(expiresAt);
  if (Number.isNaN(parsed)) return true;
  return parsed <= nowMs;
}

export function reportPath(locale: string, token: string): string {
  const safeLocale = isLocale(locale) ? locale : "pt-br";
  return `/${safeLocale}/writing/report/${token}`;
}

export function reportUrl(locale: string, token: string): string {
  const base = (process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://celpe-depe.com").replace(/\/+$/, "");
  return `${base}${reportPath(locale, token)}`;
}

/** Compare two hashes without leaking length/content through timing. */
export function tokenHashEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}
