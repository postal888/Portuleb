import { z } from "zod";
import { clientKey } from "@/lib/essay/rate-limit";
import { deliverReport } from "@/lib/writer/mail/deliver";
import { writerResendLimit } from "@/lib/writer/rate-limit";
import { getSubmission, normalizeEmail, safeErrorText } from "@/lib/writer/store";
import { reportTtlDays } from "@/lib/writer/report-token";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;

const bodySchema = z.object({
  submissionId: z.string().min(8).max(64),
  email: z.string().trim().min(3).max(320),
});

/** The same answer for "no such submission" and "wrong e-mail": the endpoint is not a probe. */
function invalid(status = 404) {
  return Response.json(
    { ok: false, delivery: null, errorCode: "not_found", expiresDays: reportTtlDays() },
    { status, headers: NO_STORE },
  );
}

/**
 * Re-sends the stored report link for a finished submission. The essay is never
 * re-analysed here: the analysis already on file is mailed again under a fresh token.
 */
export async function POST(request: Request) {
  const limited = clientKey(request);
  const ipLimited = writerResendLimit(`ip:${limited}`, { cooldownMs: 5_000, max: 30 });
  if (!ipLimited.ok) {
    return Response.json(
      { ok: false, delivery: "failed", errorCode: "rate_limited", expiresDays: reportTtlDays() },
      { status: 429, headers: { ...NO_STORE, "Retry-After": String(ipLimited.retryAfterSec) } },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return invalid(400);
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) return invalid(400);
  const { submissionId, email } = parsed.data;

  const submission = getSubmission(submissionId);
  if (!submission || submission.status !== "completed") return invalid();
  if (submission.email_normalized !== normalizeEmail(email)) return invalid();

  const perMail = writerResendLimit(`sub:${submissionId}`, { cooldownMs: 60_000, max: 3 });
  if (!perMail.ok) {
    return Response.json(
      { ok: false, delivery: "failed", errorCode: "too_soon", expiresDays: reportTtlDays() },
      { status: 429, headers: { ...NO_STORE, "Retry-After": String(perMail.retryAfterSec) } },
    );
  }

  try {
    const result = await deliverReport(submissionId, { resent: true });
    return Response.json(
      {
        // "ok" means a letter actually left: an unconfigured provider is reported as a failure.
        ok: result.status === "sent",
        delivery: result.status,
        errorCode: result.error ? (result.error === "provider_not_configured" ? result.error : "send_failed") : null,
        // A successful resend rotates the link, so the screen has to show the one that was mailed.
        reportUrl: result.reportUrl,
        expiresDays: result.expiresDays,
      },
      { headers: NO_STORE },
    );
  } catch (error) {
    console.error("[writer/resend] доставка falhou:", safeErrorText(error instanceof Error ? error.message : String(error)));
    return Response.json(
      { ok: false, delivery: "failed", errorCode: "send_failed", expiresDays: reportTtlDays() },
      { status: 502, headers: NO_STORE },
    );
  }
}
