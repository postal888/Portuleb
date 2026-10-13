import { NextResponse } from "next/server";
import { z } from "zod";
import {
  CABINET_COOKIE,
  CABINET_SESSION_SECONDS,
  cabinetCookieOptions,
  resetPassword,
} from "@/lib/writer/cabinet";
import { PASSWORD_MAX } from "@/lib/writer/password";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;

const bodySchema = z.object({
  token: z.string().min(40).max(128),
  password: z.string().min(1).max(PASSWORD_MAX),
});

function json(body: { ok: boolean; errorCode?: string }, status: number) {
  return Response.json(body, { status, headers: NO_STORE });
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, errorCode: "invalid" }, 400);
  }
  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) return json({ ok: false, errorCode: "invalid" }, 400);

  const result = await resetPassword(parsed.data.token, parsed.data.password);
  if (result.status === "weak") return json({ ok: false, errorCode: "weak_password" }, 400);
  if (result.status !== "ok") return json({ ok: false, errorCode: "invalid" }, 400);

  const response = NextResponse.json({ ok: true }, { headers: NO_STORE });
  response.cookies.set(CABINET_COOKIE, result.sessionToken, cabinetCookieOptions(CABINET_SESSION_SECONDS));
  return response;
}
