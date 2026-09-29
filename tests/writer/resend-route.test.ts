import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { createTempDb } from "../helpers/temp-db";
import { finishedSubmission } from "../helpers/writer-fixtures";

const temp = createTempDb("resend-route");

type StoreModule = typeof import("@/lib/writer/store");
type RouteModule = typeof import("@/app/api/writer/resend/route");
type LimitsModule = typeof import("@/lib/writer/rate-limit");

let store: StoreModule;
let route: RouteModule;
let limits: LimitsModule;
let db: ReturnType<typeof import("@/lib/admin/db").getAdminDb>;

beforeAll(async () => {
  process.env.SITE_URL = "https://example.test";
  process.env.WRITER_REPORT_PEPPER = "test-pepper";
  delete process.env.RESEND_API_KEY;
  delete process.env.MAIL_FROM;
  delete process.env.RESEND_FROM;

  store = await import("@/lib/writer/store");
  route = await import("@/app/api/writer/resend/route");
  limits = await import("@/lib/writer/rate-limit");

  const { migrateWriterObservability } = await import("@/lib/writer/schema-ddl");
  const adminDb = await import("@/lib/admin/db");
  db = adminDb.getAdminDb();
  migrateWriterObservability(db);
});

afterEach(() => {
  limits.resetWriterResendLimit();
  delete process.env.RESEND_API_KEY;
});

afterAll(() => {
  try {
    temp.close();
  } catch {
    // SQLite keeps the handle open until the worker exits; losing a temp dir is harmless.
  }
});

// The IP bucket has its own 5 s cooldown, so each call gets a fresh address unless a test
// deliberately reuses one.
let ipSeq = 0;
async function resend(body: unknown, ip = `203.0.113.${++ipSeq}`) {
  const response = await route.POST(
    new Request("https://example.test/api/writer/resend", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify(body),
    }),
  );
  const payload = (await response.json().catch(() => null)) as Record<string, unknown> | null;
  return { response, payload };
}

function snapshot(id: string) {
  const row = store.getSubmission(id);
  return {
    essay_text: row?.essay_text,
    analysis_json: row?.analysis_json,
    word_count: row?.word_count,
    status: row?.status,
    provider: row?.provider,
    model: row?.model,
    mock: row?.mock,
    created_at: row?.created_at,
    updated_at: row?.updated_at,
  };
}

describe("повторная отправка ссылки самим кандидатом", () => {
  it("при выключенной почте отвечает skipped_unconfigured, а не «отправлено»", async () => {
    const id = finishedSubmission(store);
    const { response, payload } = await resend({
      submissionId: id,
      email: "candidato@example.com",
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(payload?.ok).toBe(false);
    expect(payload?.delivery).toBe("skipped_unconfigured");
    expect(payload?.errorCode).toBe("provider_not_configured");
    expect(Number(payload?.expiresDays)).toBeGreaterThan(0);
    expect(store.getDeliveryForSubmission(id)?.status).toBe("skipped_unconfigured");
  });

  it("повтор не перезапускает анализ: текст, разбор и поставщик остаются как были", async () => {
    const id = finishedSubmission(store);
    const before = snapshot(id);
    const rowsBefore = db.prepare(`SELECT COUNT(*) AS c FROM writing_submissions`).get() as { c: number };

    await resend({ submissionId: id, email: "candidato@example.com" });

    expect(snapshot(id)).toEqual(before);
    const rowsAfter = db.prepare(`SELECT COUNT(*) AS c FROM writing_submissions`).get() as { c: number };
    expect(rowsAfter.c).toBe(rowsBefore.c);
    // Retry only touches the delivery log; a re-analysis would have bumped the attempt counter.
    expect(store.getDeliveryForSubmission(id)?.attempt_count).toBe(0);
  });

  it("ссылка, показанная в этой сессии, не ломается неудачным повтором", async () => {
    const id = finishedSubmission(store);
    const first = store.getReportForSubmission(id);
    expect(first).toBeUndefined();

    // First check stores the live link even when the letter never left.
    await resend({ submissionId: id, email: "candidato@example.com" });
    const stored = store.getReportForSubmission(id);
    expect(stored?.token_hash).toBeTruthy();

    limits.resetWriterResendLimit();
    const second = await resend({ submissionId: id, email: "candidato@example.com" });

    expect(second.payload?.reportUrl ?? null).toBeNull();
    expect(store.getReportForSubmission(id)?.token_hash).toBe(stored?.token_hash);
    expect(store.findReportByTokenHash(String(stored?.token_hash))).toBeTruthy();
  });

  it("чужая почта и неизвестная заявка выглядят одинаково", async () => {
    const id = finishedSubmission(store);
    const wrongMail = await resend({ submissionId: id, email: "intruder@example.com" });
    const unknown = await resend({ submissionId: "00000000-0000-4000-8000-000000000000", email: "a@b.test" });

    expect(wrongMail.response.status).toBe(404);
    expect(unknown.response.status).toBe(404);
    expect(unknown.payload).toEqual(wrongMail.payload);
    expect(JSON.stringify(wrongMail.payload)).not.toContain("Um texto com algumas palavras");
  });

  it("незавершённая заявка не получает письмо и не отличается от неизвестной", async () => {
    const pending = store.createSubmission({
      id: crypto.randomUUID(),
      sessionId: null,
      email: "half@example.com",
      locale: "pt-br",
      taskId: null,
      text: "Texto",
      wordCount: 1,
    });
    const unfinished = await resend({ submissionId: pending.id, email: "half@example.com" });
    const unknown = await resend({ submissionId: "00000000-0000-4000-8000-000000000001", email: "a@b.test" });

    expect(unfinished.response.status).toBe(404);
    expect(unfinished.payload).toEqual(unknown.payload);
    expect(store.getDeliveryForSubmission(pending.id)).toBeUndefined();
  });

  it("клик подряд по одной заявке гасится до обращения к доставке", async () => {
    const id = finishedSubmission(store);
    const first = await resend({ submissionId: id, email: "candidato@example.com" });
    const second = await resend({ submissionId: id, email: "candidato@example.com" });

    expect(first.response.status).toBe(200);
    expect(second.response.status).toBe(429);
    expect(second.payload?.errorCode).toBe("too_soon");
    expect(Number(second.response.headers.get("Retry-After"))).toBeGreaterThan(0);
    expect(store.getDeliveryForSubmission(id)?.attempt_count).toBe(0);
  });

  it("тот же адрес с новой заявкой всё равно упирается в общий кулдаун", async () => {
    const a = finishedSubmission(store);
    const b = finishedSubmission(store);
    const first = await resend({ submissionId: a, email: "candidato@example.com" }, "198.51.100.7");
    expect(first.response.status).toBe(200);

    const other = await resend({ submissionId: b, email: "candidato@example.com" }, "198.51.100.7");
    expect(other.response.status).toBe(429);
    expect(other.payload?.errorCode).toBe("rate_limited");
  });

  it("битый запрос отклоняется до поиска заявки", async () => {
    const bad = await resend({});
    expect(bad.response.status).toBe(400);
    expect(bad.payload?.errorCode).toBe("not_found");
  });
});
