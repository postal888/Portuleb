import { randomBytes, randomUUID } from "node:crypto";
import type { Locale } from "@/i18n/locales";
import { getAdminDb } from "@/lib/admin/db";
import type { EssayAnalysis } from "@/lib/essay/types";
import { MailError, getMailProvider } from "./mail/provider";
import { renderCabinetEmail } from "./mail/templates";
import { cabinetEnterPath, cabinetResetPath } from "./cabinet-path";
import { hashPassword, passwordAccepted, verifyPassword } from "./password";
import { hashReportToken, isPlausibleToken, reportTokenPepper } from "./report-token";
import { deleteSubmissionCascade, getSubmission, normalizeEmail } from "./store";
import { nowIso } from "./time";
import type { WritingSubmissionRow } from "./types";

export const CABINET_COOKIE = "celpe_cabinet";
export const CABINET_LINK_MINUTES = 30;
export const CABINET_SESSION_SECONDS = 30 * 24 * 60 * 60;

const ADDRESS_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ESSAY_ID_RE = /^[A-Za-z0-9_-]{8,80}$/;

export function isMailbox(email: string): boolean {
  const value = email.trim();
  return value.length >= 3 && value.length <= 320 && ADDRESS_RE.test(value);
}

export function cabinetCookieOptions(maxAge: number) {
  return {
    httpOnly: true as const,
    sameSite: "lax" as const,
    path: "/",
    maxAge,
    secure: process.env.NODE_ENV === "production",
  };
}

function cabinetPepper(): string {
  const dedicated = process.env.WRITER_CABINET_PEPPER?.trim();
  if (dedicated) return dedicated;
  return `${reportTokenPepper()}:cabinet`;
}

function hashCabinetToken(token: string): string {
  return hashReportToken(token, cabinetPepper());
}

function siteBase(): string {
  return (
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://celpe-depe.com"
  ).replace(/\/+$/, "");
}

export function hasCompletedEssays(email: string): boolean {
  const row = getAdminDb()
    .prepare(
      `SELECT 1 AS ok FROM writing_submissions
       WHERE email_normalized = ? AND status = 'completed' AND analysis_json IS NOT NULL
       LIMIT 1`,
    )
    .get(normalizeEmail(email)) as { ok: number } | undefined;
  return Boolean(row);
}

export type LoginLinkPurpose = "login" | "verify" | "reset";

/** Latest unused link of the same kind replaces older ones. */
export function issueLoginLink(email: string, locale: Locale, purpose: LoginLinkPurpose = "login"): string {
  const database = getAdminDb();
  const normalized = normalizeEmail(email);
  const now = nowIso();
  database
    .prepare(
      `UPDATE writer_login_links SET used_at = ? WHERE email_normalized = ? AND purpose = ? AND used_at IS NULL`,
    )
    .run(now, normalized, purpose);
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + CABINET_LINK_MINUTES * 60_000).toISOString();
  database
    .prepare(
      `INSERT INTO writer_login_links
         (id, email_normalized, token_hash, locale, purpose, expires_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(randomUUID(), normalized, hashCabinetToken(token), locale, purpose, expires, now);
  return token;
}

function purposeOf(value: string | null | undefined): LoginLinkPurpose {
  if (value === "verify" || value === "reset") return value;
  return "login";
}

export function readLoginLink(token: string): { email: string; purpose: LoginLinkPurpose; hash: string } | null {
  if (!isPlausibleToken(token)) return null;
  const hash = hashCabinetToken(token);
  const row = getAdminDb()
    .prepare(`SELECT email_normalized, purpose, expires_at, used_at FROM writer_login_links WHERE token_hash = ?`)
    .get(hash) as
    | { email_normalized: string; purpose: string | null; expires_at: string; used_at: string | null }
    | undefined;
  if (!row || row.used_at) return null;
  if (Date.parse(row.expires_at) <= Date.now()) return null;
  return { email: row.email_normalized, purpose: purposeOf(row.purpose), hash };
}

export function consumeLoginLink(token: string): { email: string; purpose: LoginLinkPurpose } | null {
  const link = readLoginLink(token);
  if (!link) return null;
  const updated = getAdminDb()
    .prepare(`UPDATE writer_login_links SET used_at = ? WHERE token_hash = ? AND used_at IS NULL`)
    .run(nowIso(), link.hash);
  if (updated.changes !== 1) return null;
  return { email: link.email, purpose: link.purpose };
}

function revokeLoginLink(token: string): void {
  if (!isPlausibleToken(token)) return;
  getAdminDb().prepare(`DELETE FROM writer_login_links WHERE token_hash = ?`).run(hashCabinetToken(token));
}

export function createCabinetSession(email: string): { token: string } {
  const token = randomBytes(32).toString("base64url");
  const now = nowIso();
  const expires = new Date(Date.now() + CABINET_SESSION_SECONDS * 1000).toISOString();
  getAdminDb()
    .prepare(
      `INSERT INTO writer_cabinet_sessions
         (id, email_normalized, token_hash, expires_at, created_at, last_seen_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(randomUUID(), normalizeEmail(email), hashCabinetToken(token), expires, now, now);
  return { token };
}

/** Returns the mailbox behind a live session cookie. Raw tokens are never stored. */
export function sessionFromToken(token: string | null | undefined): string | null {
  if (!token || !isPlausibleToken(token)) return null;
  const database = getAdminDb();
  const hash = hashCabinetToken(token);
  const row = database
    .prepare(`SELECT email_normalized, expires_at FROM writer_cabinet_sessions WHERE token_hash = ?`)
    .get(hash) as { email_normalized: string; expires_at: string } | undefined;
  if (!row) return null;
  if (Date.parse(row.expires_at) <= Date.now()) return null;
  database.prepare(`UPDATE writer_cabinet_sessions SET last_seen_at = ? WHERE token_hash = ?`).run(nowIso(), hash);
  return row.email_normalized;
}

export function destroyCabinetSession(token: string | null | undefined): void {
  if (!token || !isPlausibleToken(token)) return;
  getAdminDb().prepare(`DELETE FROM writer_cabinet_sessions WHERE token_hash = ?`).run(hashCabinetToken(token));
}

export type CabinetEssaySummary = {
  id: string;
  taskId: string | null;
  wordCount: number;
  level: string | null;
  createdAt: string;
};

export function listCabinetEssays(email: string): CabinetEssaySummary[] {
  const rows = getAdminDb()
    .prepare(
      `SELECT id, task_id, word_count, celpe_level, created_at
       FROM writing_submissions
       WHERE email_normalized = ? AND status = 'completed' AND analysis_json IS NOT NULL
       ORDER BY created_at DESC`,
    )
    .all(normalizeEmail(email)) as Array<{
    id: string;
    task_id: string | null;
    word_count: number;
    celpe_level: string | null;
    created_at: string;
  }>;
  return rows.map((row) => ({
    id: row.id,
    taskId: row.task_id,
    wordCount: row.word_count,
    level: row.celpe_level,
    createdAt: row.created_at,
  }));
}

function parseAnalysis(json: string | null): EssayAnalysis | null {
  if (!json) return null;
  try {
    const parsed = JSON.parse(json) as EssayAnalysis;
    return Array.isArray(parsed?.corrections) && typeof parsed?.correctedAnnotatedHtml === "string" ? parsed : null;
  } catch {
    return null;
  }
}

export function loadCabinetEssay(
  email: string,
  id: string,
): { submission: WritingSubmissionRow; analysis: EssayAnalysis } | null {
  if (!ESSAY_ID_RE.test(id)) return null;
  const submission = getSubmission(id);
  if (!submission || submission.status !== "completed") return null;
  if (submission.email_normalized !== normalizeEmail(email)) return null;
  const analysis = parseAnalysis(submission.analysis_json);
  if (!analysis) return null;
  return { submission, analysis };
}

/** Deletes every text tied to the mailbox, plus the login links and sessions that opened them. */
export function eraseCabinet(email: string): number {
  const normalized = normalizeEmail(email);
  const database = getAdminDb();
  const ids = database.prepare(`SELECT id FROM writing_submissions WHERE email_normalized = ?`).all(normalized) as {
    id: string;
  }[];
  for (const row of ids) deleteSubmissionCascade(row.id);
  database.prepare(`DELETE FROM writer_login_links WHERE email_normalized = ?`).run(normalized);
  database.prepare(`DELETE FROM writer_cabinet_sessions WHERE email_normalized = ?`).run(normalized);
  database.prepare(`DELETE FROM writer_accounts WHERE email_normalized = ?`).run(normalized);
  return ids.length;
}

export type CabinetMailStatus = "sent" | "silent" | "unconfigured" | "failed";

/**
 * Mails an entry link only when this address already has a finished text.
 * Callers answer "silent" and "sent" the same way, so the endpoint is not a probe.
 */
export async function mailCabinetLink(email: string, locale: Locale): Promise<CabinetMailStatus> {
  const provider = getMailProvider();
  if (!provider) return "unconfigured";
  const normalized = normalizeEmail(email);
  if (!hasCompletedEssays(normalized)) return "silent";

  const token = issueLoginLink(normalized, locale, "login");
  const enterUrl = `${siteBase()}${cabinetEnterPath(locale, token)}`;
  try {
    const message = renderCabinetEmail({ locale, enterUrl, minutes: CABINET_LINK_MINUTES });
    await provider.send({ ...message, to: normalized });
    return "sent";
  } catch (error) {
    revokeLoginLink(token);
    const code = error instanceof MailError ? error.code : "send_failed";
    console.error("[cabinet] link mail failed:", code);
    return "failed";
  }
}

type AccountRow = {
  email_normalized: string;
  password_hash: string;
  verified_at: string | null;
};

function accountOf(email: string): AccountRow | undefined {
  return getAdminDb()
    .prepare(`SELECT email_normalized, password_hash, verified_at FROM writer_accounts WHERE email_normalized = ?`)
    .get(normalizeEmail(email)) as AccountRow | undefined;
}

export function markAccountVerified(email: string): void {
  getAdminDb()
    .prepare(`UPDATE writer_accounts SET verified_at = ? WHERE email_normalized = ? AND verified_at IS NULL`)
    .run(nowIso(), normalizeEmail(email));
}

async function sendAccountLink(email: string, locale: Locale, purpose: "verify" | "reset"): Promise<CabinetMailStatus> {
  const provider = getMailProvider();
  if (!provider) return "unconfigured";
  const normalized = normalizeEmail(email);
  const token = issueLoginLink(normalized, locale, purpose);
  const path = purpose === "reset" ? cabinetResetPath(locale, token) : cabinetEnterPath(locale, token);
  try {
    const message = renderCabinetEmail({
      locale,
      enterUrl: `${siteBase()}${path}`,
      minutes: CABINET_LINK_MINUTES,
      kind: purpose,
    });
    await provider.send({ ...message, to: normalized });
    return "sent";
  } catch (error) {
    revokeLoginLink(token);
    const code = error instanceof MailError ? error.code : "send_failed";
    console.error("[cabinet] account mail failed:", code);
    return "failed";
  }
}

export type RegisterStatus = "sent" | "exists" | "weak" | "unconfigured" | "failed";

/** Stores the password and mails a confirmation link. Essays stay hidden until that link is opened. */
export async function registerAccount(email: string, password: string, locale: Locale): Promise<RegisterStatus> {
  if (!passwordAccepted(password)) return "weak";
  const provider = getMailProvider();
  if (!provider) return "unconfigured";
  const normalized = normalizeEmail(email);
  const existing = accountOf(normalized);
  if (existing?.verified_at) return "exists";

  const passwordHash = await hashPassword(password);
  const database = getAdminDb();
  const now = nowIso();
  if (existing) {
    database
      .prepare(`UPDATE writer_accounts SET password_hash = ? WHERE email_normalized = ?`)
      .run(passwordHash, normalized);
  } else {
    database
      .prepare(
        `INSERT INTO writer_accounts (id, email_normalized, password_hash, verified_at, created_at)
         VALUES (?, ?, ?, NULL, ?)`,
      )
      .run(randomUUID(), normalized, passwordHash, now);
  }
  const mailed = await sendAccountLink(normalized, locale, "verify");
  if (mailed === "sent") return "sent";
  return mailed === "unconfigured" ? "unconfigured" : "failed";
}

export type LoginStatus = "ok" | "invalid" | "unverified";

let dummyPasswordHash: Promise<string> | null = null;

function dummyHash(): Promise<string> {
  dummyPasswordHash ??= hashPassword("not-a-stored-password");
  return dummyPasswordHash;
}

export async function loginAccount(
  email: string,
  password: string,
): Promise<{ status: "ok"; token: string } | { status: Exclude<LoginStatus, "ok"> }> {
  const account = accountOf(email);
  const matches = await verifyPassword(password, account?.password_hash ?? (await dummyHash()));
  if (!account || !matches) return { status: "invalid" };
  if (!account.verified_at) return { status: "unverified" };
  return { status: "ok", token: createCabinetSession(account.email_normalized).token };
}

/** Same outcome whether or not the address has an account, except a real send failure. */
export async function forgotPassword(email: string, locale: Locale): Promise<CabinetMailStatus> {
  const provider = getMailProvider();
  if (!provider) return "unconfigured";
  const normalized = normalizeEmail(email);
  if (!accountOf(normalized)) return "silent";
  return sendAccountLink(normalized, locale, "reset");
}

export async function resetPassword(
  token: string,
  password: string,
): Promise<{ status: "ok"; sessionToken: string } | { status: "invalid" | "weak" }> {
  if (!passwordAccepted(password)) return { status: "weak" };
  const peeked = readLoginLink(token);
  if (!peeked || peeked.purpose !== "reset") return { status: "invalid" };
  const link = consumeLoginLink(token);
  if (!link || link.purpose !== "reset") return { status: "invalid" };
  const passwordHash = await hashPassword(password);
  const now = nowIso();
  getAdminDb()
    .prepare(
      `UPDATE writer_accounts
       SET password_hash = ?, verified_at = COALESCE(verified_at, ?)
       WHERE email_normalized = ?`,
    )
    .run(passwordHash, now, link.email);
  return { status: "ok", sessionToken: createCabinetSession(link.email).token };
}
