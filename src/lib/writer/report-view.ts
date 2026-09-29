import type { EssayAnalysis } from "@/lib/essay/types";
import { isLocale, type Locale } from "@/i18n/locales";
import { isPlausibleToken, reportPath, hashReportToken, isExpired } from "./report-token";
import {
  findReportByTokenHash,
  getDeliveryForSubmission,
  getSession,
  getSubmission,
  insertServerEvent,
  markReportOpened,
} from "./store";
import type { EmailDeliveryRow, WritingReportRow, WritingSubmissionRow, WriterSessionRow } from "./types";

export type ReportLoad =
  | {
      kind: "valid";
      locale: Locale;
      submission: WritingSubmissionRow;
      analysis: EssayAnalysis;
      report: WritingReportRow;
      session: WriterSessionRow | null;
      delivery: EmailDeliveryRow | null;
    }
  | { kind: "invalid" }
  | { kind: "expired"; expiresAt: string }
  | { kind: "no_analysis" };

function localeOf(value: string | null | undefined): Locale {
  return isLocale(value ?? "") ? (value as Locale) : "pt-br";
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

/**
 * Resolves a public report token to its submission. The raw token never reaches storage:
 * the lookup runs on the HMAC hash, and the row itself carries no e-mail or token.
 */
export function loadReport(token: string | undefined | null): ReportLoad {
  if (!isPlausibleToken(token)) return { kind: "invalid" };

  const report = findReportByTokenHash(hashReportToken(token!));
  if (!report) return { kind: "invalid" };
  if (isExpired(report.expires_at)) return { kind: "expired", expiresAt: report.expires_at };

  const submission = getSubmission(report.submission_id);
  if (!submission) return { kind: "invalid" };

  const analysis = parseAnalysis(submission.analysis_json);
  if (!analysis) return { kind: "no_analysis" };

  const locale = localeOf(submission.locale);
  if (markReportOpened(report.id)) {
    insertServerEvent({
      sessionId: submission.session_id,
      event: "writer_report_opened",
      locale,
      taskId: submission.task_id,
      metadata: { submissionId: submission.id },
    });
  }

  return {
    kind: "valid",
    locale,
    submission,
    analysis,
    report,
    session: submission.session_id ? getSession(submission.session_id) ?? null : null,
    delivery: getDeliveryForSubmission(submission.id) ?? null,
  };
}

export function reportPathFor(locale: Locale, token: string): string {
  return reportPath(locale, token);
}
