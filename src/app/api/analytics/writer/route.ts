import { clientKey } from "@/lib/essay/rate-limit";
import { MAX_INGEST_BYTES, safeParseIngest } from "@/lib/writer/events";
import { ingestWriterEvents } from "@/lib/writer/ingest";
import { writerRateLimit } from "@/lib/writer/rate-limit";
import { safeErrorText } from "@/lib/writer/store";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" } as const;
const ENCODER = new TextEncoder();

function reject(status: number, error: string, headers?: HeadersInit) {
  return Response.json({ ok: false, error }, { status, headers: { ...NO_STORE, ...headers } });
}

/**
 * Collects writer events from the browser. sendBeacon sends this as text/plain,
 * so the body is read as text and parsed by hand. Analytics must never echo essay
 * text or e-mail back, and it does not: only the counters leave this route.
 */
export async function POST(request: Request) {
  const limited = writerRateLimit(clientKey(request));
  if (!limited.ok) {
    return reject(429, "Muitos eventos. Tente mais tarde.", { "Retry-After": String(limited.retryAfterSec) });
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return reject(400, "Não foi possível ler o corpo da requisição.");
  }

  if (!raw || ENCODER.encode(raw).length > MAX_INGEST_BYTES) {
    return reject(413, "Payload de eventos muito grande.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return reject(400, "JSON inválido.");
  }

  const input = safeParseIngest(parsed);
  if (!input.ok) return reject(400, input.error);

  try {
    const stats = ingestWriterEvents(input.data);
    return Response.json({ ok: true, ...stats }, { headers: NO_STORE });
  } catch (error) {
    console.error("[writer/analytics] ingest falhou:", safeErrorText(error instanceof Error ? error.message : String(error)));
    return reject(500, "Não foi possível registrar os eventos.");
  }
}
