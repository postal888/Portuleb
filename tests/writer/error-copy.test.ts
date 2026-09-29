import { beforeAll, describe, expect, it } from "vitest";
import { createTempDb } from "../helpers/temp-db";

const temp = createTempDb("error-copy");

type RouteModule = typeof import("@/app/api/check-essay/route");
type CopyModule = typeof import("@/lib/writer/error-copy");
type UiModule = typeof import("@/i18n/ui");

let route: RouteModule;
let copy: CopyModule;
let ui: UiModule;

/** Every errorCode the candidate-facing API can answer with. A new one needs dictionary copy too. */
const API_CODES = [
  "rate_limit",
  "body_unreadable",
  "body_too_large",
  "bad_json",
  "validation",
  "invalid_text",
  "invalid_email",
  "invalid_task",
  "not_configured",
  "timeout",
  "rate_limited",
  "llm_error",
  "empty_response",
  "network_error",
  "analysis_failed",
  "submission_create_failed",
  "submission_update_failed",
  "request_failed",
];

const LOCALES = ["pt-br", "en", "ru"] as const;

async function post(body: unknown, ip: string) {
  const response = await route.POST(
    new Request("https://example.test/api/check-essay", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
  return { response, text: await response.text() };
}

beforeAll(async () => {
  process.env.SITE_URL = "https://example.test";
  process.env.WRITER_REPORT_PEPPER = "test-pepper";
  // No key and no mock: the analysis step fails with not_configured instead of costing a model call.
  process.env.ESSAY_CHECK_ALLOW_MOCK = "0";
  delete process.env.ESSAY_LLM_API_KEY;
  delete process.env.OPENAI_API_KEY;

  copy = await import("@/lib/writer/error-copy");
  ui = await import("@/i18n/ui");
  route = await import("@/app/api/check-essay/route");

  const { migrateWriterObservability } = await import("@/lib/writer/schema-ddl");
  migrateWriterObservability((await import("@/lib/admin/db")).getAdminDb());
});

const errorsOf = (locale: (typeof LOCALES)[number]) => ui.getUi(locale).writing.errors;

describe("errorCode превращается в текст текущей локали", () => {
  it("каждый код API имеет собственный перевод, а не unknown", () => {
    for (const locale of LOCALES) {
      const errors = errorsOf(locale);
      for (const code of API_CODES) {
        const text = copy.writerErrorCopy(errors, code);
        expect(text, `${locale}/${code}`).toBeTypeOf("string");
        expect(text.length).toBeGreaterThan(10);
        expect(text).not.toBe(errors.unknown);
        expect(text).not.toMatch(/\{\w+\}/);
      }
    }
  });

  it("pt-br, en и ru дают три разных текста", () => {
    const pt = copy.writerErrorCopy(errorsOf("pt-br"), "timeout");
    const en = copy.writerErrorCopy(errorsOf("en"), "timeout");
    const ru = copy.writerErrorCopy(errorsOf("ru"), "timeout");
    expect(new Set([pt, en, ru]).size).toBe(3);
    expect(ru).toMatch(/[А-Яа-яЁё]/);
    expect(en).toMatch(/^[\x20-\x7E]+$/);
  });

  it("неизвестный код даёт локализованный fallback", () => {
    for (const locale of LOCALES) {
      const errors = errorsOf(locale);
      expect(copy.writerErrorCopy(errors, "brand_new_code")).toBe(errors.unknown);
      expect(copy.writerErrorCopy(errors, null)).toBe(errors.unknown);
      expect(copy.writerErrorCopy(errors, undefined)).toBe(errors.unknown);
    }
    expect(copy.writerErrorCopy(errorsOf("ru"), "brand_new_code")).toMatch(/[А-Яа-яЁё]/);
  });

  it("сырая ошибка не превращается в текст на экране", () => {
    const hostile = 'SQLITE_BUSY: database is locked <img src=x onerror="alert(1)"> ESSAY_LLM_API_KEY';
    for (const locale of LOCALES) {
      const shown = copy.writerErrorCopy(errorsOf(locale), hostile);
      expect(shown).toBe(errorsOf(locale).unknown);
      expect(shown).not.toMatch(/SQLITE|API_KEY|onerror|</);
    }
  });

  it("словари locales содержат одинаковый набор ключов errors", () => {
    const keys = LOCALES.map((locale) => Object.keys(errorsOf(locale)).sort().join(","));
    expect(new Set(keys).size).toBe(1);
    expect(keys[0]).toContain("unknown");
  });
});

describe("ответ API проверки", () => {
  const text =
    "o mercado corporativo brasileiro precisa comunicar os seus valores ao publico jovem com clareza cada dia mais ".repeat(
      12,
    );

  it("выключенная коррекция отдаёт код, а не имя переменной секрета", async () => {
    const { response, text: body } = await post(
      { text, email: "candidata@example.test", taskId: "mandacaru-2025-2", locale: "pt-br" },
      "203.0.113.51",
    );
    const payload = JSON.parse(body) as Record<string, unknown>;

    expect(response.status).toBe(503);
    expect(payload.errorCode).toBe("not_configured");
    expect(payload).not.toHaveProperty("error");
    expect(body).not.toMatch(/ESSAY_LLM_API_KEY|OPENAI_API_KEY|não configurada/);
    expect(copy.writerErrorCopy(errorsOf("en"), String(payload.errorCode))).toBe(errorsOf("en").notConfigured);
  });

  it("короткий текст и чужой адрес дают отдельные коды", async () => {
    const short = await post({ text: "too short", email: "candidata@example.test" }, "203.0.113.52");
    expect(short.response.status).toBe(400);
    expect((JSON.parse(short.text) as Record<string, unknown>).errorCode).toBe("invalid_text");

    const badEmail = await post({ text, email: "not-an-email" }, "203.0.113.53");
    expect((JSON.parse(badEmail.text) as Record<string, unknown>).errorCode).toBe("invalid_email");

    const badTask = await post({ text, email: "candidata@example.test", taskId: "nope-999" }, "203.0.113.54");
    expect((JSON.parse(badTask.text) as Record<string, unknown>).errorCode).toBe("invalid_task");
  });

  it("в ответе нет свободной фразы, которую можно показать вместо перевода", async () => {
    const { text: body } = await post("{", "203.0.113.55");
    const payload = JSON.parse(body) as Record<string, unknown>;
    expect(Object.keys(payload).sort()).toEqual(["errorCode", "ok"]);
  });
});
