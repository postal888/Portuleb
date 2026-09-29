import { getWritingTask, isWritingTaskId } from "@/content/writing/tasks";
import { isLocale, type Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import type { CelpeLevel, EssayAnalysis } from "@/lib/essay/types";
import {
  createDelivery,
  createReport,
  getDeliveryForSubmission,
  getReportForSubmission,
  getSubmission,
  markDeliveryFailed,
  markDeliverySent,
  safeErrorText,
} from "../store";
import { generateReportToken, hashReportToken, reportTtlDays, reportUrl as reportUrlFor } from "../report-token";
import { MailError, getMailProvider } from "./provider";
import { renderReportEmail } from "./templates";
import type { EmailDeliveryStatus } from "../types";

export type DeliveryResult = {
  status: EmailDeliveryStatus;
  provider: string | null;
  error: string | null;
  reportUrl: string | null;
  expiresDays: number;
  messageId: string | null;
};

function localeOf(value: string | null | undefined): Locale {
  return isLocale(value ?? "") ? (value as Locale) : "pt-br";
}

function levelLabel(locale: Locale, level: string | null | undefined): string | null {
  if (!level) return null;
  const levels = getUi(locale).writing.levels as Record<string, string>;
  return levels[level] ?? level;
}

function analysisOf(json: string | null): EssayAnalysis | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as EssayAnalysis;
  } catch {
    return null;
  }
}

function taskTitle(submissionTaskId: string | null): string {
  if (submissionTaskId && isWritingTaskId(submissionTaskId)) return getWritingTask(submissionTaskId).title;
  return "Celpe-Bras";
}

/**
 * Sends (or re-sends) the report link for one finished submission.
 * A resend only rotates the token once the letter has actually left: rotating first would
 * kill the link the candidate already has every time a send fails or mail is switched off.
 * Never call this for a submission whose analysis failed: there is nothing to show.
 */
export async function deliverReport(
  submissionId: string,
  options: { resent?: boolean } = {},
): Promise<DeliveryResult> {
  const submission = getSubmission(submissionId);
  const expiresDays = reportTtlDays();
  const locale = localeOf(submission?.locale);

  if (!submission || submission.status !== "completed") {
    const reason = "submission_not_completed";
    createDelivery({
      submissionId,
      recipient: submission?.email ?? "",
      provider: null,
      status: "failed",
      error: reason,
    });
    return { status: "failed", provider: null, error: reason, reportUrl: null, expiresDays, messageId: null };
  }

  const token = generateReportToken();
  const candidateUrl = reportUrlFor(locale, token);
  // The first link is stored up front: the result screen shows it even when mail is off.
  const existingReport = getReportForSubmission(submission.id);
  if (!existingReport) createReport(submission.id, hashReportToken(token), expiresDays);
  const liveUrl = existingReport ? null : candidateUrl;
  const provider = getMailProvider();

  if (!provider) {
    createDelivery({
      submissionId: submission.id,
      recipient: submission.email,
      provider: null,
      status: "skipped_unconfigured",
      error: "provider_not_configured",
    });
    return {
      status: "skipped_unconfigured",
      provider: null,
      error: "provider_not_configured",
      reportUrl: liveUrl,
      expiresDays,
      messageId: null,
    };
  }

  const analysis = analysisOf(submission.analysis_json);
  const message = renderReportEmail({
    locale,
    reportUrl: candidateUrl,
    taskTitle: taskTitle(submission.task_id),
    levelLabel: levelLabel(locale, (analysis?.celpe?.estimatedLevel ?? submission.celpe_level) as CelpeLevel | null),
    corrections: analysis?.corrections?.length ?? 0,
    words: submission.word_count,
    expiresDays,
    resent: Boolean(options.resent) && Boolean(getDeliveryForSubmission(submission.id)?.sent_at),
  });

  createDelivery({
    submissionId: submission.id,
    recipient: submission.email,
    provider: provider.name,
    status: "pending",
  });

  try {
    const sent = await provider.send({ ...message, to: submission.email });
    if (existingReport) createReport(submission.id, hashReportToken(token), expiresDays);
    markDeliverySent(submission.id, sent.messageId);
    return {
      status: "sent",
      provider: provider.name,
      error: null,
      reportUrl: candidateUrl,
      expiresDays,
      messageId: sent.messageId,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const code = error instanceof MailError ? error.code : "send_failed";
    markDeliveryFailed(submission.id, message);
    return {
      status: "failed",
      provider: provider.name,
      error: safeErrorText(message) ?? code,
      reportUrl: liveUrl,
      expiresDays,
      messageId: null,
    };
  }
}
