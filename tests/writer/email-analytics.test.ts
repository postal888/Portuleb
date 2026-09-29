import { beforeAll, describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { createTempDb } from "../helpers/temp-db";

const temp = createTempDb("email-analytics");

type CheckModule = typeof import("@/lib/writer/check");
type StoreModule = typeof import("@/lib/writer/store");
type SchemaModule = typeof import("@/lib/essay/schema");
type StatusModule = typeof import("@/lib/writer/email-status");
type UiModule = typeof import("@/i18n/ui");
type ResendRoute = typeof import("@/app/api/writer/resend/route");

let check: CheckModule;
let store: StoreModule;
let schema: SchemaModule;
let status: StatusModule;
let ui: UiModule;
let resendRoute: ResendRoute;

const EMAIL = "Candidata@Example.com";
const LOCALES = ["pt-br", "en", "ru"] as const;

function essayRequest() {
  const base =
    "o mercado corporativo brasileiro precisa comunicar os seus valores ao publico jovem com clareza cada dia mais ".split(
      " ",
    );
  const words: string[] = [];
  while (words.length < 140) words.push(...base);
  return schema.parseCheckEssayRequest({
    text: words.slice(0, 140).join(" "),
    email: EMAIL,
    sourceLanguage: "pt",
    explanationLanguage: "pt",
    mode: "exam",
    taskId: "mandacaru-2025-2",
  });
}

function snapshot(id: string) {
  const row = store.getSubmission(id);
  return {
    status: row?.status,
    text: row?.essay_text,
    analysis: row?.analysis_json,
    words: row?.word_count,
    provider: row?.provider,
    model: row?.model,
    mock: row?.mock,
    created: row?.created_at,
    updated: row?.updated_at,
  };
}

beforeAll(async () => {
  process.env.SITE_URL = "https://example.test";
  process.env.WRITER_REPORT_PEPPER = "test-pepper";
  process.env.ESSAY_CHECK_ALLOW_MOCK = "1";
  // The whole point of this file: no key, no sender — sending is off.
  delete process.env.RESEND_API_KEY;
  delete process.env.MAIL_FROM;
  delete process.env.RESEND_FROM;

  check = await import("@/lib/writer/check");
  store = await import("@/lib/writer/store");
  schema = await import("@/lib/essay/schema");
  status = await import("@/lib/writer/email-status");
  ui = await import("@/i18n/ui");
  resendRoute = await import("@/app/api/writer/resend/route");

  const { migrateWriterObservability } = await import("@/lib/writer/schema-ddl");
  migrateWriterObservability((await import("@/lib/admin/db")).getAdminDb());
});

describe("письмо выключено: путь кандидата целиком", () => {
  it("анализ завершён, результат есть, доставка помечена skipped_unconfigured", async () => {
    const outcome = await check.runWriterCheck(essayRequest(), { sessionId: null, locale: "pt-br" });

    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;

    // The result the component renders is complete even though nothing was mailed.
    expect(outcome.analysis.corrections.length).toBeGreaterThan(0);
    expect(outcome.meta.provider).toBeTruthy();
    expect(outcome.emailDelivery).toBe("skipped_unconfigured");
    expect(outcome.reportUrl).toContain("/pt-br/writing/report/");

    const submission = store.getSubmission(outcome.submissionId);
    expect(submission?.status).toBe("completed");
    expect(store.getDeliveryForSubmission(outcome.submissionId)?.status).toBe("skipped_unconfigured");
    expect(store.getDeliveryForSubmission(outcome.submissionId)?.attempt_count).toBe(0);
  });

  it("skipped_unconfigured не является writer_email_failed ни для одного статуса", () => {
    expect(status.emailEventOf("skipped_unconfigured")).toBeNull();
    expect(status.emailEventOf("sent")).toBe("writer_email_sent");
    expect(status.emailEventOf("failed")).toBe("writer_email_failed");
    expect(status.emailEventOf("pending")).toBe("writer_email_failed");
    expect(status.emailEventOf(null)).toBe("writer_email_failed");
  });

  it("компонент берёт и событие, и фразу только из проверенных помощников", () => {
    const source = fs.readFileSync(
      path.join(process.cwd(), "src/components/home/HomeWriterMock.tsx"),
      "utf8",
    );
    expect(source).toContain("emailEventOf(status)");
    expect(source).toContain("deliveryTemplateOf(t, delivery?.status)");
    expect(source).toContain("writerErrorCopy(t.errors, payload?.errorCode)");
    // No hand-written failure event left: every writer_email_failed goes through the mapping above.
    expect(source).not.toMatch(/track\(\s*"writer_email_failed"/);
    expect(source).not.toMatch(/showError\(\s*payload\?\.error/);
  });

  it("фраза о выключенном письме не утверждает, что письмо ушло", () => {
    for (const locale of LOCALES) {
      const t = ui.getUi(locale).writing;
      const shown = status.deliveryTemplateOf(t, "skipped_unconfigured");
      expect(shown).toBe(t.deliveryUnconfigured);
      expect(shown).not.toBe(t.deliverySent);
      expect(shown).not.toMatch(/\{email\}|\{days\}/);
      expect(shown).not.toMatch(/отправл|отправили|мы выслали|sent to|enviamos|we mailed/iu);
      expect(shown).toMatch(/на экране|na tela|on your screen/);
    }
    expect(status.deliveryTemplateOf(ui.getUi("pt-br").writing, "sent")).toContain("{email}");
    expect(status.deliveryTemplateOf(ui.getUi("pt-br").writing, null)).toBe("");
  });
});

describe("повтор при выключенном письме", () => {
  it("не перезапускает анализ и оставляет результат тем же", async () => {
    const outcome = await check.runWriterCheck(essayRequest(), { sessionId: null, locale: "ru" });
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;

    const before = snapshot(outcome.submissionId);
    const response = await resendRoute.POST(
      new Request("https://example.test/api/writer/resend", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.77" },
        body: JSON.stringify({ submissionId: outcome.submissionId, email: EMAIL }),
      }),
    );
    const payload = (await response.json()) as Record<string, unknown>;

    expect(snapshot(outcome.submissionId)).toEqual(before);
    expect(store.getSubmission(outcome.submissionId)?.status).toBe("completed");
    expect(store.getDeliveryForSubmission(outcome.submissionId)?.attempt_count).toBe(0);
    expect(response.status).toBe(200);
    expect(payload).not.toHaveProperty("analysis");
    expect(status.emailEventOf(String(payload.delivery))).toBeNull();
  });
});
