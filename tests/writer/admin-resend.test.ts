import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { createTempDb } from "../helpers/temp-db";
import { finishedSubmission } from "../helpers/writer-fixtures";

const temp = createTempDb("admin-resend");

type StoreModule = typeof import("@/lib/writer/store");
type RouteModule = typeof import("@/app/api/admin/writer/resend/route");
type LimitsModule = typeof import("@/lib/writer/rate-limit");

let store: StoreModule;
let route: RouteModule;
let limits: LimitsModule;
let adminToken: string;

beforeAll(async () => {
  process.env.SITE_URL = "https://example.test";
  process.env.WRITER_REPORT_PEPPER = "test-pepper";
  process.env.ADMIN_USERNAME = "admin";
  process.env.ADMIN_PASSWORD = "test-password-only";
  process.env.ADMIN_SECRET_KEY = "test-admin-secret";
  delete process.env.RESEND_API_KEY;
  delete process.env.MAIL_FROM;
  delete process.env.RESEND_FROM;

  store = await import("@/lib/writer/store");
  route = await import("@/app/api/admin/writer/resend/route");
  limits = await import("@/lib/writer/rate-limit");
  const auth = await import("@/lib/admin/auth");
  adminToken = auth.createAdminToken("admin");

  const { migrateWriterObservability } = await import("@/lib/writer/schema-ddl");
  migrateWriterObservability((await import("@/lib/admin/db")).getAdminDb());
});

afterEach(() => {
  limits.resetWriterResendLimit();
  delete process.env.RESEND_API_KEY;
  delete process.env.MAIL_FROM;
});

afterAll(() => {
  try {
    temp.close();
  } catch {
    // SQLite keeps the handle open until the worker exits; losing a temp dir is harmless.
  }
});

async function resend(body: unknown, authorized = true) {
  const response = await route.POST(
    new Request("https://example.test/api/admin/writer/resend", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(authorized ? { authorization: `Bearer ${adminToken}` } : {}),
      },
      body: JSON.stringify(body),
    }),
  );
  const payload = (await response.json().catch(() => null)) as Record<string, unknown> | null;
  return { response, payload };
}

describe("повторная отправка из админки", () => {
  it("без токена администратора письмо не уходит", async () => {
    const id = finishedSubmission(store);
    const { payload } = await resend({ submissionId: id }, false);

    expect(payload?.error).toBeTruthy();
    expect(store.getDeliveryForSubmission(id)).toBeUndefined();
    expect(store.getReportForSubmission(id)).toBeUndefined();
  });

  it("ответ админки даёт статус доставки, а не саму ссылку", async () => {
    const id = finishedSubmission(store);
    const { response, payload } = await resend({ submissionId: id });

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(payload?.delivery).toBe("skipped_unconfigured");
    expect(payload?.ok).toBe(false);
    expect(payload?.errorCode).toBe("provider_not_configured");
    expect(payload?.expiresDays).toBeGreaterThan(0);
    expect(JSON.stringify(payload)).not.toMatch(/writing\/report\//);
    expect(JSON.stringify(payload)).not.toContain("candidato@example.com");
    expect(String(payload?.recipient)).toContain("@");
  });

  it("получатель возвращается в маске", async () => {
    const id = finishedSubmission(store);
    const { payload } = await resend({ submissionId: id });
    expect(store.getDeliveryForSubmission(id)?.recipient).toBe("candidato@example.com");
    expect(String(payload?.recipient)).not.toBe("candidato@example.com");
  });

  it("несостоявшийся повтор из админки не ломает ссылку кандидата", async () => {
    const id = finishedSubmission(store);
    await resend({ submissionId: id });
    const oldHash = store.getReportForSubmission(id)?.token_hash;
    expect(oldHash).toBeTruthy();

    limits.resetWriterResendLimit();
    await resend({ submissionId: id });
    const report = store.getReportForSubmission(id);

    expect(report?.token_hash).toBe(oldHash);
    expect(store.findReportByTokenHash(String(oldHash))).toBeTruthy();
  });

  it("неизвестная и незавершённая заявка различимы для админа", async () => {
    const missing = await resend({ submissionId: "does-not-exist-000000" });
    expect(missing.response.status).toBe(404);
    expect(missing.payload?.errorCode).toBe("not_found");

    const pending = store.createSubmission({
      id: crypto.randomUUID(),
      sessionId: null,
      email: "half@example.com",
      locale: "pt-br",
      taskId: null,
      text: "Texto",
      wordCount: 1,
    });
    const unfinished = await resend({ submissionId: pending.id });
    expect(unfinished.response.status).toBe(409);
    expect(unfinished.payload?.errorCode).toBe("submission_not_completed");
    expect(unfinished.payload?.submissionStatus).toBe("pending");
    expect(store.getDeliveryForSubmission(pending.id)).toBeUndefined();
  });

  it("битый запрос отклоняется без обращения к доставке", async () => {
    const bad = await resend({});
    expect(bad.response.status).toBe(400);
    expect(bad.payload?.errorCode).toBe("bad_request");
  });

  it("частые клики подряд гасятся на 429", async () => {
    const id = finishedSubmission(store);
    const first = await resend({ submissionId: id });
    const second = await resend({ submissionId: id });

    expect(first.response.status).toBe(200);
    expect(second.response.status).toBe(429);
    expect(second.payload?.errorCode).toBe("too_soon");
    expect(Number(second.response.headers.get("Retry-After"))).toBeGreaterThan(0);
    // A skipped send (no provider configured) is not an attempt, so the counter stays at zero.
    expect(store.getDeliveryForSubmission(id)?.attempt_count).toBe(0);
  });

  it("отправка через resend пишет письмо и не оставляет токен в строке доставки", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.MAIL_FROM = "Celpe-Dê Pé <no-reply@example.test>";
    const sent: Array<Record<string, unknown>> = [];
    const original = globalThis.fetch;
    globalThis.fetch = (async (_input: unknown, init?: { body?: string }) => {
      sent.push(JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>);
      return new Response(JSON.stringify({ id: "rm_admin_1" }), { status: 200 });
    }) as typeof fetch;

    try {
      const id = finishedSubmission(store);
      const { response, payload } = await resend({ submissionId: id });

      expect(response.status).toBe(200);
      expect(payload?.delivery).toBe("sent");
      expect(sent).toHaveLength(1);
      expect(JSON.stringify(sent[0])).toMatch(/report\/[A-Za-z0-9_-]{40,}/);

      const delivery = store.getDeliveryForSubmission(id);
      expect(delivery?.status).toBe("sent");
      expect(delivery?.provider_message_id).toBe("rm_admin_1");
      expect(JSON.stringify(delivery)).not.toMatch(/[A-Za-z0-9_-]{40,}/);

      // Rotation is the point of a resend: the mailed link wins, the old one dies.
      const firstHash = store.getReportForSubmission(id)?.token_hash;
      limits.resetWriterResendLimit();
      await resend({ submissionId: id });
      expect(store.getReportForSubmission(id)?.token_hash).not.toBe(firstHash);
      expect(store.findReportByTokenHash(String(firstHash))).toBeUndefined();
      expect(sent).toHaveLength(2);
    } finally {
      globalThis.fetch = original;
    }
  });
});
