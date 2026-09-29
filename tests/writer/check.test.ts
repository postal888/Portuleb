import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { createTempDb } from "../helpers/temp-db";

const temp = createTempDb("check");

/** Storage faults are opt-in per test; the mock below only ever passes through when they are off. */
const faults = vi.hoisted(() => ({ create: false, complete: false }));

vi.mock("@/lib/writer/store", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/writer/store")>();
  return {
    ...actual,
    createSubmission: (input: Parameters<typeof actual.createSubmission>[0]) => {
      if (faults.create) throw new Error("disk full");
      return actual.createSubmission(input);
    },
    completeSubmission: (
      id: string,
      result: Parameters<typeof actual.completeSubmission>[1],
    ) => {
      if (faults.complete) throw new Error("readonly");
      return actual.completeSubmission(id, result);
    },
  };
});

type StoreModule = typeof import("@/lib/writer/store");
type CheckModule = typeof import("@/lib/writer/check");
type SchemaModule = typeof import("@/lib/essay/schema");
type RouteModule = typeof import("@/app/api/check-essay/route");
type ArchiveModule = typeof import("@/lib/writer/archive");
type ProviderModule = typeof import("@/lib/essay/provider");

let store: StoreModule;
let check: CheckModule;
let schema: SchemaModule;
let route: RouteModule;
let archive: ArchiveModule;
let provider: ProviderModule;

const EMAIL = "Candidata@Example.com";

function essayWords(n: number): string {
  const base =
    "o mercado corporativo brasileiro precisa comunicar os seus valores ao publico jovem com clareza cada dia mais".split(
      " ",
    );
  const words: string[] = [];
  while (words.length < n) words.push(...base);
  return words.slice(0, n).join(" ");
}

function request(input = essayWords(140)) {
  return schema.parseCheckEssayRequest({
    text: input,
    email: EMAIL,
    sourceLanguage: "pt",
    explanationLanguage: "pt",
    mode: "exam",
    taskId: "mandacaru-2025-2",
  });
}

function writerSession(): string {
  const sessionId = crypto.randomUUID();
  store.upsertWriterSession({
    sessionId,
    visitorId: crypto.randomUUID(),
    context: { locale: "pt-br", path: "/pt-br/writing", taskId: "mandacaru-2025-2" },
  });
  return sessionId;
}

const context = { sessionId: null, locale: "pt-br" } as const;

async function postCheck(body: unknown, ip: string) {
  const response = await route.POST(
    new Request("https://example.test/api/check-essay", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
  const payload = (await response.json().catch(() => null)) as Record<string, unknown> | null;
  return { response, payload };
}

function tokenOf(url: unknown): string {
  return String(url ?? "").split("/").pop() ?? "";
}

beforeAll(async () => {
  process.env.SITE_URL = "https://example.test";
  process.env.WRITER_REPORT_PEPPER = "test-pepper";
  process.env.ESSAY_CHECK_ALLOW_MOCK = "1";
  delete process.env.RESEND_API_KEY;
  delete process.env.MAIL_FROM;
  delete process.env.RESEND_FROM;
  delete process.env.ESSAY_LLM_API_KEY;
  delete process.env.OPENAI_API_KEY;

  store = await import("@/lib/writer/store");
  check = await import("@/lib/writer/check");
  schema = await import("@/lib/essay/schema");
  route = await import("@/app/api/check-essay/route");
  archive = await import("@/lib/writer/archive");
  provider = await import("@/lib/essay/provider");

  const { migrateWriterObservability } = await import("@/lib/writer/schema-ddl");
  migrateWriterObservability((await import("@/lib/admin/db")).getAdminDb());
});

beforeEach(() => {
  faults.create = false;
  faults.complete = false;
  process.env.ESSAY_CHECK_ALLOW_MOCK = "1";
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

describe("жизненный цикл проверки", () => {
  it("успешная проверка проходит все шаги и всё записывает", async () => {
    const outcome = await check.runWriterCheck(request(), { ...context });

    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    expect(outcome.meta.provider).toBe("mock");
    expect(outcome.emailDelivery).toBe("skipped_unconfigured");
    expect(outcome.reportExpiresDays).toBeGreaterThan(0);
    expect(tokenOf(outcome.reportUrl)).toMatch(/^[A-Za-z0-9_-]{40,}$/);

    const submission = store.getSubmission(outcome.submissionId);
    expect(submission?.status).toBe("completed");
    expect(submission?.locale).toBe("pt-br");
    expect(submission?.task_id).toBe("mandacaru-2025-2");
    expect(submission?.word_count).toBe(140);
    expect(submission?.email_normalized).toBe("candidata@example.com");
    expect(submission?.error_code).toBeNull();
    expect(JSON.parse(String(submission?.analysis_json)).correctedAnnotatedHtml).toBeTruthy();
    expect(store.getReportForSubmission(outcome.submissionId)).toBeTruthy();
    expect(store.getDeliveryForSubmission(outcome.submissionId)?.status).toBe("skipped_unconfigured");
  });

  it("JSON-копия называется по uuid заявки и не содержит почту", async () => {
    const outcome = await check.runWriterCheck(request(), { ...context });
    if (!outcome.ok) throw new Error("проверка должна пройти");

    const submission = store.getSubmission(outcome.submissionId);
    expect(submission?.archive_status).toBe("ok");
    expect(String(submission?.archive_path).endsWith(`${outcome.submissionId}.json`)).toBe(true);

    const file = path.join(archive.writerArchiveRoot(), String(submission?.archive_path));
    expect(fs.existsSync(file)).toBe(true);
    const saved = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, unknown>;
    expect(saved.id).toBe(outcome.submissionId);
    expect(String(saved.text)).toContain("mercado corporativo");
    expect(JSON.stringify(saved)).not.toContain("Example.com");
  });

  it("тайминг и результат проверки привязываются к сессии", async () => {
    const sessionId = writerSession();
    const outcome = await check.runWriterCheck(request(), {
      ...context,
      sessionId,
      locale: "ru",
      timing: { activeMs: 640_000, elapsedMs: 900_000 },
    });
    if (!outcome.ok) throw new Error("проверка должна пройти");

    const session = store.getSession(sessionId);
    expect(session?.status).toBe("completed");
    expect(session?.submission_id).toBe(outcome.submissionId);
    expect(session?.active_ms).toBe(640_000);
    expect(session?.elapsed_ms).toBe(900_000);
    expect(session?.current_word_count).toBe(140);
    expect(store.getSubmission(outcome.submissionId)?.locale).toBe("ru");
  });

  it("повторная проверка с той же почтой не роняет результат", async () => {
    const first = await check.runWriterCheck(request(), { ...context });
    const second = await check.runWriterCheck(request(), { ...context });
    expect(first.ok && second.ok).toBe(true);
  });
});

describe("сбои жизненного цикла записываются, а не теряются", () => {
  it("сбой провайдера без мока даёт failed_analysis и помеченную сессию", async () => {
    process.env.ESSAY_CHECK_ALLOW_MOCK = "0";
    const sessionId = writerSession();

    const outcome = await check.runWriterCheck(request(), { ...context, sessionId });

    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.stage).toBe("analysis");
    expect(outcome.errorCode).toBe("not_configured");
    expect(outcome.statusCode).toBe(503);
    expect(outcome.submissionId).toBeTruthy();

    const submission = store.getSubmission(outcome.submissionId as string);
    expect(submission?.status).toBe("failed_analysis");
    expect(submission?.error_code).toBe("not_configured");
    expect(store.getSession(sessionId)?.status).toBe("failed");
  });

  it("мок доступен только по явному ESSAY_CHECK_ALLOW_MOCK=1", async () => {
    process.env.ESSAY_CHECK_ALLOW_MOCK = "0";
    expect(provider.essayMockAllowed()).toBe(false);
    expect(provider.getEssayProviderStatus()).toEqual({ openai: false, mock: false });

    process.env.ESSAY_CHECK_ALLOW_MOCK = "1";
    expect(provider.essayMockAllowed()).toBe(true);
    expect(provider.getEssayProviderStatus().mock).toBe(true);
  });

  it("невозможность создать заявку не превращается в успех", async () => {
    faults.create = true;
    const outcome = await check.runWriterCheck(request(), { ...context });
    faults.create = false;

    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.stage).toBe("storage");
    expect(outcome.errorCode).toBe("submission_create_failed");
    expect(outcome.statusCode).toBe(500);
    expect(outcome.submissionId).toBeNull();
  });

  it("сбой записи результата оставляет заявку в failed_storage", async () => {
    faults.complete = true;
    const outcome = await check.runWriterCheck(request(), { ...context });
    faults.complete = false;

    expect(outcome.ok).toBe(false);
    if (outcome.ok) return;
    expect(outcome.stage).toBe("storage");
    expect(outcome.errorCode).toBe("submission_update_failed");

    const submission = store.getSubmission(outcome.submissionId as string);
    expect(submission?.status).toBe("failed_storage");
    expect(submission?.error_code).toBe("submission_update_failed");
  });

  it("незаписанный архив не лишает результата, но помечается в заявке", async () => {
    const blocker = path.join(temp.dir, "blocker");
    fs.writeFileSync(blocker, "x", "utf8");
    const previous = process.env.WRITER_ARCHIVE_DIR;
    process.env.WRITER_ARCHIVE_DIR = blocker;

    const outcome = await check.runWriterCheck(request(), { ...context });

    process.env.WRITER_ARCHIVE_DIR = previous;
    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;
    const submission = store.getSubmission(outcome.submissionId);
    expect(submission?.archive_status).toBe("failed");
    expect(submission?.archive_error).toBeTruthy();
    expect(submission?.archive_path).toBeNull();
    expect(outcome.reportUrl).toBeTruthy();
  });
});

describe("границы API проверки", () => {
  it("текст короче экзаменационного минимума отклоняется на сервере", () => {
    expect(() => request(essayWords(60))).toThrow(/120/);
    expect(() => request(essayWords(601))).toThrow(/600/);
  });

  it("неизвестное задание отклоняется до обращения к модели", () => {
    expect(() =>
      schema.parseCheckEssayRequest({ text: essayWords(140), email: "a@b.test", taskId: "nope-999" }),
    ).toThrow();
  });

  it("чужая или испорченная сессия не привязывается к заявке", async () => {
    const broken = await postCheck(
      { text: essayWords(140), email: EMAIL, sessionId: "guest-1" },
      "203.0.113.11",
    );
    expect(broken.response.status).toBe(400);
    expect(broken.payload?.errorCode).toBe("validation");

    const ghost = await postCheck(
      {
        text: essayWords(140),
        email: EMAIL,
        taskId: "mandacaru-2025-2",
        locale: "pt-br",
        sessionId: "00000000-0000-4000-8000-000000000000",
      },
      "203.0.113.12",
    );
    expect(ghost.response.status).toBe(200);
    const submission = store.getSubmission(String(ghost.payload?.submissionId));
    expect(submission?.session_id).toBeNull();
  });

  it("битый JSON и слишком большое тело отклоняются понятными кодами", async () => {
    const broken = await postCheck("{not json", "203.0.113.21");
    expect(broken.response.status).toBe(400);
    expect(broken.payload?.errorCode).toBe("bad_json");

    const huge = await postCheck(JSON.stringify({ text: "a".repeat(70_000), email: EMAIL }), "203.0.113.22");
    expect(huge.response.status).toBe(413);
    expect(huge.payload?.errorCode).toBe("body_too_large");
  });

  it("повторные отправки с одного адреса упираются в 429", async () => {
    const ip = "203.0.113.31";
    let status = 0;
    for (let attempt = 0; attempt < 9; attempt += 1) {
      status = (await postCheck({ text: essayWords(140), email: EMAIL, taskId: "mandacaru-2025-2" }, ip))
        .response.status;
    }
    expect(status).toBe(429);
  });

  it("статус эндпоинта честно сообщает о выключенной коррекции", async () => {
    process.env.ESSAY_CHECK_ALLOW_MOCK = "0";
    const response = await route.GET();
    const payload = (await response.json()) as {
      configured: { openai: boolean; mock: boolean };
      limits: Record<string, number>;
    };
    process.env.ESSAY_CHECK_ALLOW_MOCK = "1";

    expect(payload.configured).toEqual({ openai: false, mock: false });
    expect(payload.limits).toEqual({ emailGateWords: 40, minWords: 120, maxWords: 600 });
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });
});
