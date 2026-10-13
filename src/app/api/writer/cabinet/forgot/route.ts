import { z } from "zod";
import { isLocale } from "@/i18n/locales";
import { clientKey } from "@/lib/essay/rate-limit";
import { forgotPassword, isMailbox } from "@/lib/writer/cabinet";
import { writerResendLimit } from "@/lib/writer/rate-limit";
import { normalizeEmail } from "@/lib/writer/store";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;

const bodySchema = z.object({
  email: z.string().trim().min(3).max(320),
  locale: z.enum(["pt-br", "en", "ru"]).optional(),
});

function json(body: { ok: boolean; errorCode?: string }, status: number, retryAfter?: number) {
  return Response.json(body, {
    status,
    headers: retryAfter ? { ...NO_STORE, "Retry-After": String(retryAfter) } : NO_STORE,
  });
}

export async function POST(request: Request) {
  const ipLimited = writerResendLimit(`cabinet-forgot-ip:${clientKey(request)}`, { cooldownMs: 10_000, max: 8 });
  if (!ipLimited.ok) return json({ ok: false, errorCode: "rate_limited" }, 429, ipLimited.retryAfterSec);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, errorCode: "invalid_email" }, 400);
  }
  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success || !isMailbox(parsed.data.email)) return json({ ok: false, errorCode: "invalid_email" }, 400);

  const email = normalizeEmail(parsed.data.email);
  const paced = writerResendLimit(`cabinet-forgot:${email}`, { cooldownMs: 60_000, max: 3 });
  if (!paced.ok) return json({ ok: false, errorCode: "rate_limited" }, 429, paced.retryAfterSec);

  const locale = parsed.data.locale && isLocale(parsed.data.locale) ? parsed.data.locale : "pt-br";
  const result = await forgotPassword(email, locale);
  if (result === "unconfigured") return json({ ok: false, errorCode: "unconfigured" }, 503);
  if (result === "failed") return json({ ok: false, errorCode: "send_failed" }, 502);
  return json({ ok: true }, 200);
}
