import { z } from "zod";
import { listWritingTasks } from "@/content/writing/tasks";
import { SAMPLE_ESSAY_PT } from "@/lib/essay/sample";
import { parseCheckEssayRequest } from "@/lib/essay/schema";
import { getEssayProviderStatus } from "@/lib/essay/provider";
import { clientKey, essayRateLimit } from "@/lib/essay/rate-limit";
import { runWriterCheck } from "@/lib/writer/check";
import { getMailStatus } from "@/lib/writer/mail/provider";
import { parseWriterCheckMeta } from "@/lib/writer/request";
import { getSession } from "@/lib/writer/store";
import { EMAIL_GATE_WORDS, EXAM_MAX_WORDS, EXAM_MIN_WORDS } from "@/lib/writer/time";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;
const MAX_BODY_BYTES = 64_000;
const ENCODER = new TextEncoder();

export async function GET() {
  return Response.json(
    {
      ok: true,
      configured: getEssayProviderStatus(),
      mail: getMailStatus(),
      limits: { emailGateWords: EMAIL_GATE_WORDS, minWords: EXAM_MIN_WORDS, maxWords: EXAM_MAX_WORDS },
      sample: SAMPLE_ESSAY_PT,
      tasks: listWritingTasks().map((task) => ({
        id: task.id,
        cycle: task.cycle,
        number: task.number,
        title: task.title,
        genre: task.genre,
      })),
    },
    { headers: NO_STORE },
  );
}

/**
 * A schema fault becomes a stable code, never a message: zod text is Portuguese, and a browser
 * on EN/RU would be shown source text it cannot translate.
 */
function validationCode(error: unknown): string {
  if (!(error instanceof z.ZodError)) return "validation";
  const field = error.issues[0]?.path?.[0];
  if (field === "text") return "invalid_text";
  if (field === "email") return "invalid_email";
  if (field === "taskId") return "invalid_task";
  return "validation";
}

export async function POST(request: Request) {
  const limited = essayRateLimit(clientKey(request));
  if (!limited.ok) {
    return Response.json(
      { ok: false, errorCode: "rate_limit" },
      { status: 429, headers: { ...NO_STORE, "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return Response.json({ ok: false, errorCode: "body_unreadable" }, { status: 400, headers: NO_STORE });
  }

  if (!raw || ENCODER.encode(raw).length > MAX_BODY_BYTES) {
    return Response.json({ ok: false, errorCode: "body_too_large" }, { status: 413, headers: NO_STORE });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ ok: false, errorCode: "bad_json" }, { status: 400, headers: NO_STORE });
  }

  let input;
  let meta;
  try {
    input = parseCheckEssayRequest(body);
    meta = parseWriterCheckMeta(body);
  } catch (error) {
    return Response.json(
      { ok: false, errorCode: validationCode(error) },
      { status: 400, headers: NO_STORE },
    );
  }

  // An unknown session uuid is dropped rather than linked, so submissions never point at ghosts.
  const sessionId = meta.sessionId && getSession(meta.sessionId) ? meta.sessionId : null;

  const outcome = await runWriterCheck(input, {
    sessionId,
    locale: meta.locale,
    timing: meta.timing,
    debug: input.debug,
  });

  if (!outcome.ok) {
    return Response.json(
      {
        ok: false,
        errorCode: outcome.errorCode,
        stage: outcome.stage,
        submissionId: outcome.submissionId,
      },
      { status: outcome.statusCode, headers: NO_STORE },
    );
  }

  return Response.json(outcome, { headers: NO_STORE });
}
