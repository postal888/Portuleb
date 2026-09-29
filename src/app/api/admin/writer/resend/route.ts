import { z } from "zod";
import { requireAdmin } from "@/lib/admin/auth";
import { writerResendLimit } from "@/lib/writer/rate-limit";
import { deliverReport } from "@/lib/writer/mail/deliver";
import { reportTtlDays } from "@/lib/writer/report-token";
import { getSubmission, maskEmail, safeErrorText } from "@/lib/writer/store";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;

const bodySchema = z.object({ submissionId: z.string().min(8).max(64) });

function fail(errorCode: string, status: number, extra: Record<string, unknown> = {}) {
  return Response.json(
    { ok: false, delivery: null, errorCode, expiresDays: reportTtlDays(), ...extra },
    { status, headers: NO_STORE },
  );
}

/**
 * Admin re-send of a stored report. The essay is never re-analysed — no second model
 * bill — and the report URL stays out of this response so tokens do not spread.
 */
export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  let submissionId: string;
  try {
    submissionId = bodySchema.parse(await request.json()).submissionId;
  } catch {
    return fail("bad_request", 400);
  }

  const submission = getSubmission(submissionId);
  if (!submission) return fail("not_found", 404);
  if (submission.status !== "completed") {
    return fail("submission_not_completed", 409, { submissionStatus: submission.status });
  }

  // A delivered resend rotates the token, so the candidate's older link dies — clicks are throttled.
  const limited = writerResendLimit(`admin:${submissionId}`, { cooldownMs: 10_000, max: 3 });
  if (!limited.ok) {
    return Response.json(
      { ok: false, delivery: "failed", errorCode: "too_soon", expiresDays: reportTtlDays() },
      { status: 429, headers: { ...NO_STORE, "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  try {
    const result = await deliverReport(submissionId, { resent: true });
    return Response.json(
      {
        // "ok" means the letter actually left; an unconfigured provider is reported as a failure.
        ok: result.status === "sent",
        delivery: result.status,
        errorCode: result.error
          ? result.error === "provider_not_configured"
            ? result.error
            : "send_failed"
          : null,
        recipient: maskEmail(submission.email_normalized),
        expiresDays: result.expiresDays,
      },
      { headers: NO_STORE },
    );
  } catch (error) {
    console.error(
      "[admin/writer/resend] доставка falhou:",
      safeErrorText(error instanceof Error ? error.message : String(error)),
    );
    return fail("send_failed", 502);
  }
}
