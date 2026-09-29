import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createTempDb } from "../helpers/temp-db";
import * as fixtures from "../helpers/writer-fixtures";
import type { Locale } from "@/i18n/locales";

const temp = createTempDb("mail");

type StoreModule = typeof import("@/lib/writer/store");
type DbModule = typeof import("@/lib/admin/db");
type DeliverModule = typeof import("@/lib/writer/mail/deliver");
type ReportModule = typeof import("@/lib/writer/report-view");
type TokenModule = typeof import("@/lib/writer/report-token");
type ProviderModule = typeof import("@/lib/writer/mail/provider");
type TemplatesModule = typeof import("@/lib/writer/mail/templates");

let store: StoreModule;
let db: DbModule;
let deliver: DeliverModule;
let reportView: ReportModule;
let tokens: TokenModule;
let provider: ProviderModule;
let templates: TemplatesModule;

beforeAll(async () => {
  process.env.SITE_URL = "https://example.test";
  process.env.WRITER_REPORT_PEPPER = "test-pepper";
  delete process.env.RESEND_API_KEY;
  delete process.env.MAIL_FROM;
  delete process.env.RESEND_FROM;

  store = await import("@/lib/writer/store");
  db = await import("@/lib/admin/db");
  deliver = await import("@/lib/writer/mail/deliver");
  reportView = await import("@/lib/writer/report-view");
  tokens = await import("@/lib/writer/report-token");
  provider = await import("@/lib/writer/mail/provider");
  templates = await import("@/lib/writer/mail/templates");

  const { migrateWriterObservability } = await import("@/lib/writer/schema-ddl");
  migrateWriterObservability(db.getAdminDb());
});

afterAll(() => {
  vi.unstubAllGlobals();
  try {
    temp.close();
  } catch {
    // SQLite keeps the handle open until the worker exits; losing a temp dir is harmless.
  }
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.RESEND_API_KEY;
  delete process.env.MAIL_FROM;
});

function finishedSubmission(overrides: Record<string, unknown> = {}) {
  return fixtures.finishedSubmission(store, overrides);
}

function writerSession(locale: Locale = "pt-br"): string {
  const sessionId = crypto.randomUUID();
  store.upsertWriterSession({
    sessionId,
    visitorId: crypto.randomUUID(),
    context: { locale, path: `/${locale}/writing`, taskId: "mandacaru-2025-2" },
  });
  return sessionId;
}

function stubResend(handler: () => { status: number; json: unknown }) {
  const calls: Array<{ body: Record<string, unknown>; headers: Record<string, string> }> = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_input: unknown, init?: { body?: string; headers?: Record<string, string> }) => {
      const body = JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>;
      calls.push({ body, headers: init?.headers ?? {} });
      const result = handler();
      return new Response(JSON.stringify(result.json), {
        status: result.status,
        headers: { "Content-Type": "application/json" },
      });
    }),
  );
  return calls;
}

function tokenOf(url: string | null): string {
  return String(url ?? "").split("/").pop() ?? "";
}

function openEvents(submissionId: string): number {
  const row = db
    .getAdminDb()
    .prepare(`SELECT COUNT(*) AS n FROM writer_events WHERE event_name = 'writer_report_opened' AND metadata_json LIKE ?`)
    .get(`%"submissionId":"${submissionId}"%`) as { n: number };
  return row.n;
}

describe("настройка почты", () => {
  it("без ключа и адреса провайдер считается ненастроенным", () => {
    expect(provider.getMailStatus()).toEqual({ configured: false, provider: null, from: null });
  });

  it("MAIL_FROM без домена не считается адресом", () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.MAIL_FROM = "not-an-address";
    expect(provider.getMailStatus().configured).toBe(false);
  });

  it("ключ и адрес вместе включают провайдера resend", () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.MAIL_FROM = "Celpe-Dê Pé <no-reply@example.test>";
    expect(provider.getMailStatus()).toEqual({
      configured: true,
      provider: "resend",
      from: "Celpe-Dê Pé <no-reply@example.test>",
    });
  });
});

describe("deliverReport", () => {
  it("без провайдера письмо помечается skipped_unconfigured, но ссылка остаётся рабочей", async () => {
    const id = finishedSubmission();
    const result = await deliver.deliverReport(id);

    expect(result.status).toBe("skipped_unconfigured");
    expect(result.error).toBe("provider_not_configured");
    expect(tokenOf(result.reportUrl)).toMatch(/^[A-Za-z0-9_-]{40,}$/);
    expect(result.reportUrl).toMatch(/^https:\/\/example\.test\/pt-br\/writing\/report\//);

    const delivery = store.getDeliveryForSubmission(id);
    expect(delivery?.status).toBe("skipped_unconfigured");
    expect(delivery?.recipient).toBe("candidato@example.com");
    expect(reportView.loadReport(tokenOf(result.reportUrl)).kind).toBe("valid");
  });

  it("отправленное письмо содержит ссылку, но не текст эссе", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.MAIL_FROM = "Celpe-Dê Pé <no-reply@example.test>";
    const calls = stubResend(() => ({ status: 200, json: { id: "rm_777" } }));

    const id = finishedSubmission();
    const result = await deliver.deliverReport(id);

    expect(result.status).toBe("sent");
    expect(result.messageId).toBe("rm_777");
    expect(calls).toHaveLength(1);
    expect(calls[0].body.to).toEqual(["Candidato@Example.com"]);
    expect(calls[0].headers.Authorization).toBe("Bearer re_test");
    expect(JSON.stringify(calls[0].body)).not.toContain("algumas palavras");
    expect(String(calls[0].body.html)).toContain(tokenOf(result.reportUrl));

    const delivery = store.getDeliveryForSubmission(id);
    expect(delivery?.status).toBe("sent");
    expect(delivery?.provider_message_id).toBe("rm_777");
    expect(delivery?.attempt_count).toBe(1);
    expect(delivery?.sent_at).toBeTruthy();
    expect(delivery?.last_error).toBeNull();
  });

  it("сбой провайдера записывается в доставку, а не теряется", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.MAIL_FROM = "no-reply@example.test";
    stubResend(() => ({ status: 503, json: { message: "queue full" } }));

    const id = finishedSubmission();
    const result = await deliver.deliverReport(id);

    expect(result.status).toBe("failed");
    const delivery = store.getDeliveryForSubmission(id);
    expect(delivery?.status).toBe("failed");
    expect(delivery?.last_error).toContain("queue full");
    expect(delivery?.sent_at).toBeNull();
    expect(delivery?.attempt_count).toBe(1);
    expect(reportView.loadReport(tokenOf(result.reportUrl)).kind).toBe("valid");
  });

  it("незавершённую проверку не отправляет", async () => {
    const id = crypto.randomUUID();
    store.createSubmission({
      id,
      sessionId: null,
      email: "half@example.com",
      locale: "pt-br",
      taskId: null,
      text: "Texto",
      wordCount: 1,
    });
    store.setSubmissionStatus(id, "analyzing");

    const result = await deliver.deliverReport(id);
    expect(result.status).toBe("failed");
    expect(result.error).toBe("submission_not_completed");
    expect(store.getReportForSubmission(id)).toBeUndefined();
    expect(store.getDeliveryForSubmission(id)?.last_error).toBe("submission_not_completed");
  });

  it("неотправленное повторное письмо оставляет старую ссылку рабочей", async () => {
    const id = finishedSubmission();
    const first = await deliver.deliverReport(id);
    const oldToken = tokenOf(first.reportUrl);

    const second = await deliver.deliverReport(id, { resent: true });

    expect(second.status).toBe("skipped_unconfigured");
    expect(second.reportUrl).toBeNull();
    expect(reportView.loadReport(oldToken).kind).toBe("valid");
    expect(store.getReportForSubmission(id)?.token_hash).toBe(tokens.hashReportToken(oldToken));
  });

  it("сбой провайдера при повторной отправке не убивает ссылку из первого письма", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.MAIL_FROM = "no-reply@example.test";
    let attempt = 0;
    stubResend(() =>
      ++attempt === 1
        ? { status: 200, json: { id: "rm_1" } }
        : { status: 503, json: { message: "queue full" } },
    );

    const id = finishedSubmission();
    const first = await deliver.deliverReport(id);
    const oldToken = tokenOf(first.reportUrl);
    const second = await deliver.deliverReport(id, { resent: true });

    expect(second.status).toBe("failed");
    expect(second.reportUrl).toBeNull();
    expect(reportView.loadReport(oldToken).kind).toBe("valid");
    expect(store.getReportForSubmission(id)?.token_hash).toBe(tokens.hashReportToken(oldToken));
  });

  it("успешный повторный посыл меняет токен: старая ссылка перестает работать", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.MAIL_FROM = "no-reply@example.test";
    const calls = stubResend(() => ({ status: 200, json: { id: "rm_2" } }));

    const id = finishedSubmission();
    const first = await deliver.deliverReport(id);
    const oldToken = tokenOf(first.reportUrl);

    const second = await deliver.deliverReport(id, { resent: true });
    const newToken = tokenOf(second.reportUrl);

    expect(second.status).toBe("sent");
    expect(newToken).not.toBe(oldToken);
    expect(String(calls[1].body.html)).toContain(newToken);

    const report = store.getReportForSubmission(id);
    expect(report?.token_hash).toBe(tokens.hashReportToken(newToken));
    expect(report?.token_hash).not.toBe(tokens.hashReportToken(oldToken));
    expect(reportView.loadReport(oldToken).kind).toBe("invalid");
    expect(reportView.loadReport(newToken).kind).toBe("valid");
  });

  it("в базе хранится хеш токена, а не сама ссылка", async () => {
    const id = finishedSubmission();
    const result = await deliver.deliverReport(id);
    const token = tokenOf(result.reportUrl);
    const report = store.getReportForSubmission(id);
    expect(report?.token_hash).not.toContain(token);
    expect(JSON.stringify(report)).not.toContain(token);
  });

  it("письмо с настроенным провайдером помечает повторную тему", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.MAIL_FROM = "no-reply@example.test";
    const calls = stubResend(() => ({ status: 200, json: { id: "rm_1" } }));

    const id = finishedSubmission();
    await deliver.deliverReport(id);
    await deliver.deliverReport(id, { resent: true });

    expect(String(calls[1].body.subject)).toMatch(/^Reenvio:/);
    expect(String(calls[0].body.subject)).not.toMatch(/^Reenvio:/);
  });
});

describe("шаблоны писем", () => {
  it("письмо на языке сайта и без пустых подстановок", () => {
    const message = templates.renderReportEmail({
      locale: "ru",
      reportUrl: "https://example.test/ru/writing/report/token",
      taskTitle: "Mandacaru",
      levelLabel: "Avançado",
      corrections: 3,
      words: 210,
      expiresDays: 30,
    });

    expect(message.subject).toContain("Проверка");
    expect(message.text).toContain("30 дней");
    expect(message.text).not.toMatch(/\{\w+\}/);
    expect(message.html).toContain("https://example.test/ru/writing/report/token");
  });

  it("письмо-повтор предупреждает, что прежняя ссылка больше не работает", () => {
    const base = {
      locale: "pt-br" as const,
      reportUrl: "https://example.test/pt-br/writing/report/token",
      taskTitle: "Mandacaru",
      levelLabel: null,
      corrections: 0,
      words: 120,
      expiresDays: 30,
    };
    const first = templates.renderReportEmail(base);
    const resent = templates.renderReportEmail({ ...base, resent: true });

    expect(first.text).not.toContain("deixou de funcionar");
    expect(resent.text).toContain("deixou de funcionar");
  });

  it("португальская локаль отдаёт pt-BR в html-письме", () => {
    const message = templates.renderReportEmail({
      locale: "pt-br",
      reportUrl: "https://example.test/pt-br/writing/report/token",
      taskTitle: "Mandacaru",
      levelLabel: null,
      corrections: 0,
      words: 120,
      expiresDays: 30,
    });
    expect(message.subject).toContain("avaliação");
    expect(message.html).toContain('lang="pt-BR"');
  });

  it("текст письма экранируется", () => {
    const message = templates.renderReportEmail({
      locale: "en",
      reportUrl: "https://example.test/en/writing/report/<script>",
      taskTitle: "<img onerror=alert(1)>",
      levelLabel: null,
      corrections: 0,
      words: 1,
      expiresDays: 30,
    });
    expect(message.html).not.toContain("<img onerror");
    expect(message.html).toContain("&lt;img onerror");
  });
});

describe("открытие отчёта", () => {
  it("засчитывает первое открытие и гасит повторные клики", async () => {
    const sessionId = writerSession();
    const id = finishedSubmission({ sessionId });
    const result = await deliver.deliverReport(id);
    const token = tokenOf(result.reportUrl);

    expect(reportView.loadReport(token).kind).toBe("valid");
    reportView.loadReport(token);
    reportView.loadReport(token);

    const report = store.getReportForSubmission(id);
    expect(report?.open_count).toBe(1);
    expect(report?.first_opened_at).toBeTruthy();
    expect(openEvents(id)).toBe(1);
  });

  it("отчёт без сессии открывается без падения — событие просто некому писать", async () => {
    const id = finishedSubmission();
    const result = await deliver.deliverReport(id);
    const token = tokenOf(result.reportUrl);

    expect(reportView.loadReport(token).kind).toBe("valid");
    expect(store.getReportForSubmission(id)?.open_count).toBe(1);
    expect(openEvents(id)).toBe(0);
  });

  it("просроченная ссылка не отдаёт анализ", async () => {
    const id = finishedSubmission();
    const result = await deliver.deliverReport(id);
    const token = tokenOf(result.reportUrl);

    db.getAdminDb()
      .prepare(`UPDATE writing_reports SET expires_at = '2020-01-01T00:00:00.000Z' WHERE submission_id = ?`)
      .run(id);

    const load = reportView.loadReport(token);
    expect(load.kind).toBe("expired");
    expect(openEvents(id)).toBe(0);
  });

  it("мусорный токен не доходит до запроса к базе", () => {
    expect(reportView.loadReport("../../etc/passwd").kind).toBe("invalid");
    expect(reportView.loadReport("").kind).toBe("invalid");
    expect(reportView.loadReport(null).kind).toBe("invalid");
    expect(reportView.loadReport("short").kind).toBe("invalid");
  });

  it("повреждённый analysis_json показывает честное состояние", async () => {
    const id = finishedSubmission();
    const result = await deliver.deliverReport(id);
    const token = tokenOf(result.reportUrl);
    db.getAdminDb()
      .prepare(`UPDATE writing_submissions SET analysis_json = '{oops' WHERE id = ?`)
      .run(id);

    expect(reportView.loadReport(token).kind).toBe("no_analysis");
  });
});
