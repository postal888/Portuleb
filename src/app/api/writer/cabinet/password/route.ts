import { z } from "zod";
import { clientKey } from "@/lib/essay/rate-limit";
import { changePassword, sessionFromToken } from "@/lib/writer/cabinet";
import { tokenFrom } from "@/lib/writer/cabinet-http";
import { PASSWORD_MAX } from "@/lib/writer/password";
import { writerResendLimit } from "@/lib/writer/rate-limit";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;

const bodySchema = z.object({
  current: z.string().min(1).max(PASSWORD_MAX),
  next: z.string().min(1).max(PASSWORD_MAX),
});

function json(body: { ok: boolean; errorCode?: string }, status: number, retryAfter?: number) {
  return Response.json(body, {
    status,
    headers: retryAfter ? { ...NO_STORE, "Retry-After": String(retryAfter) } : NO_STORE,
  });
}

export async function POST(request: Request) {
  const email = sessionFromToken(tokenFrom(request));
  if (!email) return json({ ok: false, errorCode: "invalid" }, 401);

  const ipLimited = writerResendLimit(`cabinet-password-ip:${clientKey(request)}`, { cooldownMs: 0, max: 20 });
  if (!ipLimited.ok) return json({ ok: false, errorCode: "rate_limited" }, 429, ipLimited.retryAfterSec);
  const paced = writerResendLimit(`cabinet-password:${email}`, { cooldownMs: 0, max: 8 });
  if (!paced.ok) return json({ ok: false, errorCode: "rate_limited" }, 429, paced.retryAfterSec);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, errorCode: "invalid" }, 400);
  }
  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) return json({ ok: false, errorCode: "invalid" }, 400);

  const result = await changePassword(email, parsed.data.current, parsed.data.next);
  if (result.status === "weak") return json({ ok: false, errorCode: "weak_password" }, 400);
  if (result.status !== "ok") return json({ ok: false, errorCode: "invalid" }, 401);
  return json({ ok: true }, 200);
}
