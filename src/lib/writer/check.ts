import { getWritingTask } from "@/content/writing/tasks";
import { analyzeEssay } from "@/lib/essay/analyze";
import { EssayProviderError, essayMockAllowed } from "@/lib/essay/provider";
import { wordCount } from "@/lib/essay/schema";
import type { CheckEssayMeta, EssayAnalysis } from "@/lib/essay/types";
import { recordWritingEmail } from "@/lib/admin/db";
import { deliverReport } from "./mail/deliver";
import { reportTtlDays } from "./report-token";
import {
  advanceSessionStatus,
  completeSubmission,
  createSubmission,
  safeErrorText,
  setArchiveResult,
  setSubmissionStatus,
} from "./store";
import { nowIso } from "./time";
import type { CheckEssayRequest } from "@/lib/essay/types";
import type { EmailDeliveryStatus } from "./types";

export type CheckOk = {
  ok: true;
  analysis: EssayAnalysis;
  meta: CheckEssayMeta;
  submissionId: string;
  emailDelivery: EmailDeliveryStatus | "not_attempted";
  emailError: string | null;
  reportUrl: string | null;
  reportExpiresDays: number;
  debug?: { rawModelJson: unknown };
};

export type CheckFail = {
  ok: false;
  stage: "validation" | "analysis" | "storage";
  statusCode: number;
  /** Stable, locale-free key. The browser owns the wording; nothing here describes the failure itself. */
  errorCode: string;
  submissionId: string | null;
};

export type CheckOutcome = CheckOk | CheckFail;

export type CheckContext = {
  /** Validated session uuid, or null when the client sent none. */
  sessionId: string | null;
  /** Site locale the candidate wrote in — not the explanation language. */
  locale: string;
  debug?: boolean;
  timing?: { activeMs: number; elapsedMs: number } | null;
  /** False when a cabinet session already owns the address: the result stays on screen, no mail. */
  deliver?: boolean;
};

/**
 * The whole check-essay lifecycle in one place, with a recorded state for every step:
 * submission row → analyzing → analysis → completion → archive → report link → e-mail.
 * No step is allowed to fail silently; each one writes what went wrong.
 */
export async function runWriterCheck(input: CheckEssayRequest, context: CheckContext): Promise<CheckOutcome> {
  const submissionId = crypto.randomUUID();
  const words = wordCount(input.text);

  try {
    createSubmission({
      id: submissionId,
      sessionId: context.sessionId,
      email: input.email,
      locale: context.locale,
      taskId: input.taskId ?? null,
      text: input.text,
      wordCount: words,
    });
  } catch {
    return {
      ok: false,
      stage: "storage",
      statusCode: 500,
      errorCode: "submission_create_failed",
      submissionId: null,
    };
  }

  setSubmissionStatus(submissionId, "analyzing");

  let result: { analysis: EssayAnalysis; meta: CheckEssayMeta; raw?: unknown };
  const startedAt = Date.now();
  try {
    result = await analyzeEssay(input);
  } catch (error) {
    const code = error instanceof EssayProviderError ? error.code : "analysis_failed";
    const statusCode = error instanceof EssayProviderError ? error.statusCode : 502;
    setSubmissionStatus(submissionId, "failed_analysis", {
      code,
      message: error instanceof Error ? error.message : String(error),
    });
    if (context.sessionId) advanceSessionStatus(context.sessionId, "failed");
    return {
      ok: false,
      stage: "analysis",
      statusCode,
      errorCode: code,
      submissionId,
    };
  }
  const analysisDurationMs = Date.now() - startedAt;

  try {
    completeSubmission(submissionId, {
      analysisJson: JSON.stringify(result.analysis),
      celpeLevel: result.analysis.celpe?.estimatedLevel ?? null,
      scoresJson: result.analysis.celpe ? JSON.stringify(result.analysis.celpe) : null,
      provider: result.meta.provider,
      model: result.meta.model ?? null,
      mock: result.meta.mock,
      analysisDurationMs,
    });
  } catch (error) {
    setSubmissionStatus(submissionId, "failed_storage", {
      code: "submission_update_failed",
      message: error instanceof Error ? error.message : String(error),
    });
    return {
      ok: false,
      stage: "storage",
      statusCode: 500,
      errorCode: "submission_update_failed",
      submissionId,
    };
  }

  // The JSON copy is secondary, but a failure here is recorded rather than dropped.
  // Loaded lazily on purpose: a static import of the fs module puts the whole repository into the
  // build's file trace (see deploy/DEPLOY.md → «Трассировка сборки»).
  let archivePath: string | null = null;
  try {
    const { saveWriterArchive } = await import(/* turbopackIgnore: true */ "./archive");
    setArchiveResult(submissionId, "pending", null);
    archivePath = saveWriterArchive({
      id: submissionId,
      savedAt: nowIso(),
      locale: context.locale,
      taskId: result.analysis.taskId ?? input.taskId ?? null,
      wordCount: words,
      text: input.text,
      analysis: result.analysis,
      meta: result.meta,
      timing: context.timing ?? null,
    });
    setArchiveResult(submissionId, "ok", archivePath);
  } catch (error) {
    setArchiveResult(submissionId, "failed", null, error instanceof Error ? error.message : String(error));
  }

  if (context.sessionId) {
    advanceSessionStatus(context.sessionId, "completed", {
      completed_at: nowIso(),
      submission_id: submissionId,
      active_ms: context.timing?.activeMs,
      elapsed_ms: context.timing?.elapsedMs,
      current_word_count: words,
      max_word_count: words,
    });
  }

  // Legacy list kept alive for the existing admin tab; recorded only after a real success.
  try {
    recordWritingEmail(input.email, (input.taskId ?? result.analysis.taskId) ?? undefined);
  } catch {
    // A duplicate e-mail row must never cost the candidate their result.
  }

  const delivery =
    context.deliver === false
      ? { status: "not_attempted" as const, error: null, reportUrl: null }
      : await deliverReport(submissionId);

  return {
    ok: true,
    analysis: result.analysis,
    meta: result.meta,
    submissionId,
    emailDelivery: delivery.status,
    emailError: delivery.error,
    reportUrl: delivery.reportUrl,
    reportExpiresDays: reportTtlDays(),
    ...(context.debug && essayMockAllowed() ? { debug: { rawModelJson: result.raw ?? null } } : {}),
  };
}

export function describeTask(taskId: CheckEssayRequest["taskId"]) {
  const task = getWritingTask(taskId);
  return { id: task.id, cycle: task.cycle, number: task.number, title: task.title, genre: task.genre };
}
