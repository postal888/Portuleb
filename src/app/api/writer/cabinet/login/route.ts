import { NextResponse } from "next/server";
import { z } from "zod";
import { clientKey } from "@/lib/essay/rate-limit";
import {
  CABINET_COOKIE,
  CABINET_SESSION_SECONDS,
  cabinetCookieOptions,
  isMailbox,
  loginAccount,
} from "@/lib/writer/cabinet";
import { PASSWORD_MAX } from "@/lib/writer/password";
import { writerResendLimit } from "@/lib/writer/rate-limit";
import { normalizeEmail } from "@/lib/writer/store";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;

const bodySchema = z.object({
  email: z.string().trim().min(3).max(320),
  password: z.string().min(1).max(PASSWORD_MAX),
});

function json(body: { ok: boolean; errorCode?: string }, status: number, retryAfter?: number) {
  return Response.json(body, {
    status,
    headers: retryAfter ? { ...NO_STORE, "Retry-After": String(retryAfter) } : NO_STORE,
  });
}

export async function POST(request: Request) {
  const ipLimited = writerResendLimit(`cabinet-login-ip:${clientKey(request)}`, { cooldownMs: 0, max: 40 });
  if (!ipLimited.ok) return json({ ok: false, errorCode: "rate_limited" }, 429, ipLimited.retryAfterSec);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, errorCode: "invalid" }, 400);
  }
  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success || !isMailbox(parsed.data.email)) return json({ ok: false, errorCode: "invalid" }, 400);

  const email = normalizeEmail(parsed.data.email);
  const paced = writerResendLimit(`cabinet-login:${email}`, { cooldownMs: 0, max: 8 });
  if (!paced.ok) return json({ ok: false, errorCode: "rate_limited" }, 429, paced.retryAfterSec);

  const result = await loginAccount(email, parsed.data.password);
  if (result.status === "unverified") return json({ ok: false, errorCode: "unverified" }, 403);
  if (result.status !== "ok") return json({ ok: false, errorCode: "invalid" }, 401);

  const response = NextResponse.json({ ok: true }, { headers: NO_STORE });
  response.cookies.set(CABINET_COOKIE, result.token, cabinetCookieOptions(CABINET_SESSION_SECONDS));
  return response;
}
