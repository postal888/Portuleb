import { recordContactMessage } from "@/lib/admin/db";
import { contactRateLimit } from "@/lib/contact/rate-limit";
import { contactMessageSchema } from "@/lib/contact/schema";
import { clientKey } from "@/lib/essay/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const limited = contactRateLimit(`contact:${clientKey(request)}`);
  if (!limited.ok) {
    return Response.json(
      { ok: false, error: "Muitas mensagens. Tente novamente em alguns minutos." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec), "Cache-Control": "no-store" },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "JSON inválido." }, { status: 400 });
  }

  const parsed = contactMessageSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Dados inválidos.";
    return Response.json({ ok: false, error: message }, { status: 400 });
  }

  if (parsed.data.company) {
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  }

  const id = recordContactMessage({
    name: parsed.data.name || undefined,
    email: parsed.data.email,
    message: parsed.data.message,
    locale: parsed.data.locale,
  });

  return Response.json({ ok: true, id }, { headers: { "Cache-Control": "no-store" } });
}
