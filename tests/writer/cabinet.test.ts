import fs from "node:fs";
import path from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createTempDb } from "../helpers/temp-db";
import { finishedSubmission } from "../helpers/writer-fixtures";
import { LOCALES } from "@/i18n/locales";

const temp = createTempDb("cabinet");

type StoreModule = typeof import("@/lib/writer/store");
type CabinetModule = typeof import("@/lib/writer/cabinet");
type RouteModule = typeof import("@/app/api/writer/cabinet/request/route");
type RegisterModule = typeof import("@/app/api/writer/cabinet/register/route");
type LoginModule = typeof import("@/app/api/writer/cabinet/login/route");
type ForgotModule = typeof import("@/app/api/writer/cabinet/forgot/route");
type ResetModule = typeof import("@/app/api/writer/cabinet/reset/route");
type PasswordModule = typeof import("@/app/api/writer/cabinet/password/route");
type EnterModule = typeof import("@/app/pt-br/writing/conta/entrar/[token]/route");
type LogoutModule = typeof import("@/app/api/writer/cabinet/logout/route");
type EraseModule = typeof import("@/app/api/writer/cabinet/erase/route");
type LimitsModule = typeof import("@/lib/writer/rate-limit");

let store: StoreModule;
let cabinet: CabinetModule;
let requestRoute: RouteModule;
let registerRoute: RegisterModule;
let loginRoute: LoginModule;
let forgotRoute: ForgotModule;
let resetRoute: ResetModule;
let passwordRoute: PasswordModule;
let enterRoute: EnterModule;
let logoutRoute: LogoutModule;
let eraseRoute: EraseModule;
let limits: LimitsModule;
let db: ReturnType<typeof import("@/lib/admin/db").getAdminDb>;

beforeAll(async () => {
  process.env.SITE_URL = "https://example.test";
  process.env.WRITER_REPORT_PEPPER = "test-pepper";
  delete process.env.RESEND_API_KEY;
  delete process.env.MAIL_FROM;
  delete process.env.RESEND_FROM;

  store = await import("@/lib/writer/store");
  cabinet = await import("@/lib/writer/cabinet");
  requestRoute = await import("@/app/api/writer/cabinet/request/route");
  registerRoute = await import("@/app/api/writer/cabinet/register/route");
  loginRoute = await import("@/app/api/writer/cabinet/login/route");
  forgotRoute = await import("@/app/api/writer/cabinet/forgot/route");
  resetRoute = await import("@/app/api/writer/cabinet/reset/route");
  passwordRoute = await import("@/app/api/writer/cabinet/password/route");
  enterRoute = await import("@/app/pt-br/writing/conta/entrar/[token]/route");
  logoutRoute = await import("@/app/api/writer/cabinet/logout/route");
  eraseRoute = await import("@/app/api/writer/cabinet/erase/route");
  limits = await import("@/lib/writer/rate-limit");

  const { migrateWriterObservability } = await import("@/lib/writer/schema-ddl");
  const adminDb = await import("@/lib/admin/db");
  db = adminDb.getAdminDb();
  migrateWriterObservability(db);
});

afterEach(() => {
  vi.unstubAllGlobals();
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

let ipSeq = 0;

function enableMail() {
  process.env.RESEND_API_KEY = "re_test";
  process.env.MAIL_FROM = "Celpe-Dê Pé <no-reply@example.test>";
}

function stubResend() {
  const calls: Array<Record<string, unknown>> = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_input: unknown, init?: { body?: string }) => {
      calls.push(JSON.parse(String(init?.body ?? "{}")) as Record<string, unknown>);
      return new Response(JSON.stringify({ id: "msg_1" }), { status: 200, headers: { "content-type": "application/json" } });
    }),
  );
  return calls;
}

async function ask(email: string, ip = `198.51.100.${++ipSeq}`) {
  const response = await requestRoute.POST(
    new Request("https://example.test/api/writer/cabinet/request", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify({ email, locale: "pt-br" }),
    }),
  );
  const payload = (await response.json()) as { ok: boolean; errorCode?: string };
  return { response, payload };
}

describe("кабинет текстов", () => {
  it("страницы кабинета есть во всех трёх локалях и не попадают в карту маршрутов", () => {
    for (const locale of LOCALES) {
      expect(fs.existsSync(path.join(process.cwd(), "src", "app", locale, "writing", "conta", "page.tsx"))).toBe(true);
    }
    const map = fs.readFileSync(path.join(process.cwd(), "src", "i18n", "route-map.ts"), "utf8");
    expect(map).not.toContain("writing/conta");
  });

  it("письмо уходит только если на адресе уже есть готовый текст, и в письме нет самого текста", async () => {
    enableMail();
    const calls = stubResend();
    const empty = await ask("empty@example.com");
    const id = finishedSubmission(store, { email: "Candidato@Example.com" });
    const known = await ask("candidato@example.com");

    expect(empty.payload).toEqual({ ok: true });
    expect(known.payload).toEqual(empty.payload);
    expect(calls).toHaveLength(1);
    const letter = calls[0];
    expect(letter.to).toEqual(["candidato@example.com"]);
    expect(String(letter.text)).toContain("https://example.test/pt-br/writing/conta/entrar/");
    expect(String(letter.text)).not.toContain("Um texto com algumas palavras");
    expect(String(letter.html)).not.toContain("Um texto com algumas palavras");

    const stored = db.prepare(`SELECT token_hash FROM writer_login_links WHERE email_normalized = ?`).get(
      "candidato@example.com",
    ) as { token_hash: string };
    expect(stored.token_hash).toMatch(/^[a-f0-9]{64}$/);
    expect(store.getSubmission(id)?.essay_text).toContain("Um texto");
  });

  it("адрес без готовой проверки и адрес с ней отвечают одинаково, когда почта выключена", async () => {
    finishedSubmission(store, { email: "known@example.com" });
    const unknown = await ask("unknown@example.com");
    const known = await ask("known@example.com");
    expect(unknown.response.status).toBe(503);
    expect(known.payload).toEqual(unknown.payload);
    expect(known.payload.errorCode).toBe("unconfigured");
  });

  it("ссылка входа одноразовая и ставит сессию только на свой адрес", async () => {
    const own = finishedSubmission(store, { email: "owner@example.com", text: "Texto do dono da conta." });
    const other = finishedSubmission(store, { email: "other@example.com", text: "Texto de outra pessoa." });
    const token = cabinet.issueLoginLink("owner@example.com", "pt-br");

    const first = await enterRoute.GET(new Request("https://example.test/pt-br/writing/conta/entrar/x"), {
      params: Promise.resolve({ token }),
    });
    expect(first.status).toBe(307);
    expect(first.headers.get("location")).toBe("https://example.test/pt-br/writing/conta");
    const setCookie = first.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain("celpe_cabinet=");
    expect(setCookie).toContain("HttpOnly");

    const second = await enterRoute.GET(new Request("https://example.test/pt-br/writing/conta/entrar/x"), {
      params: Promise.resolve({ token }),
    });
    expect(second.headers.get("location")).toBe("https://example.test/pt-br/writing/conta?status=invalid");

    const loop = cabinet.issueLoginLink("loop@example.com", "pt-br");
    const fromLocal = await enterRoute.GET(new Request("http://localhost:3000/pt-br/writing/conta/entrar/x"), {
      params: Promise.resolve({ token: loop }),
    });
    expect(fromLocal.headers.get("location")).toBe("https://example.test/pt-br/writing/conta");

    const raw = setCookie.split(";")[0]?.split("=")[1] ?? "";
    expect(cabinet.sessionFromToken(raw)).toBe("owner@example.com");
    expect(cabinet.listCabinetEssays("owner@example.com").map((row) => row.id)).toEqual([own]);
    expect(cabinet.loadCabinetEssay("owner@example.com", other)).toBeNull();
    expect(cabinet.loadCabinetEssay("owner@example.com", own)?.submission.essay_text).toContain("dono");
  });

  it("просроченная ссылка не открывает кабинет", () => {
    finishedSubmission(store, { email: "late@example.com" });
    const token = cabinet.issueLoginLink("late@example.com", "ru");
    db.prepare(`UPDATE writer_login_links SET expires_at = ? WHERE email_normalized = ?`).run(
      "2000-01-01T00:00:00.000Z",
      "late@example.com",
    );
    expect(cabinet.consumeLoginLink(token)).toBeNull();
  });

  it("выход гасит сессию, а удаление стирает только тексты этого адреса", async () => {
    const own = finishedSubmission(store, { email: "erase-me@example.com" });
    const kept = finishedSubmission(store, { email: "keep-me@example.com" });
    const session = cabinet.createCabinetSession("erase-me@example.com");

    const erased = await eraseRoute.POST(
      new Request("https://example.test/api/writer/cabinet/erase", {
        method: "POST",
        headers: { cookie: `celpe_cabinet=${session.token}`, "content-type": "application/x-www-form-urlencoded" },
        body: "locale=pt-br",
      }),
    );
    expect(erased.status).toBe(303);
    expect(erased.headers.get("location")).toContain("status=erased");
    expect(store.getSubmission(own)).toBeUndefined();
    expect(store.getSubmission(kept)?.email_normalized).toBe("keep-me@example.com");
    expect(cabinet.sessionFromToken(session.token)).toBeNull();

    const other = cabinet.createCabinetSession("keep-me@example.com");
    const left = await logoutRoute.POST(
      new Request("https://example.test/api/writer/cabinet/logout", {
        method: "POST",
        headers: { cookie: `celpe_cabinet=${other.token}`, "content-type": "application/x-www-form-urlencoded" },
        body: "locale=en",
      }),
    );
    expect(left.headers.get("location")).toBe("https://example.test/en/writing/conta");
    expect(cabinet.sessionFromToken(other.token)).toBeNull();
    expect(store.getSubmission(kept)).toBeDefined();
  });

  it("регистрация с паролем прячет тексты до подтверждения, а сброс меняет пароль", async () => {
    enableMail();
    const calls = stubResend();
    const password = "senha-secreta-99";
    finishedSubmission(store, { email: "aluno@example.com", text: "Texto privado do aluno." });

    const registered = await registerRoute.POST(
      new Request("https://example.test/api/writer/cabinet/register", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.10" },
        body: JSON.stringify({ email: "aluno@example.com", password, locale: "pt-br" }),
      }),
    );
    expect(registered.status).toBe(200);
    const letter = String(calls[0]?.text ?? "");
    expect(letter).toContain("/pt-br/writing/conta/entrar/");
    expect(letter).not.toContain(password);
    expect(letter).not.toContain("Texto privado");

    const stored = db.prepare(`SELECT password_hash, verified_at FROM writer_accounts WHERE email_normalized = ?`).get(
      "aluno@example.com",
    ) as { password_hash: string; verified_at: string | null };
    expect(stored.password_hash).not.toContain(password);
    expect(stored.verified_at).toBeNull();

    const tooSoon = await loginRoute.POST(
      new Request("https://example.test/api/writer/cabinet/login", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.11" },
        body: JSON.stringify({ email: "aluno@example.com", password }),
      }),
    );
    expect(tooSoon.status).toBe(403);

    const token = letter.match(/entrar\/([A-Za-z0-9_-]+)/)?.[1] ?? "";
    const confirmed = await enterRoute.GET(new Request("https://example.test/pt-br/writing/conta/entrar/x"), {
      params: Promise.resolve({ token }),
    });
    expect(confirmed.status).toBe(307);
    const session = (confirmed.headers.get("set-cookie") ?? "").split(";")[0]?.split("=")[1] ?? "";
    expect(cabinet.sessionFromToken(session)).toBe("aluno@example.com");
    expect(cabinet.listCabinetEssays("aluno@example.com")).toHaveLength(1);

    const unknown = await loginRoute.POST(
      new Request("https://example.test/api/writer/cabinet/login", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.12" },
        body: JSON.stringify({ email: "ninguem@example.com", password }),
      }),
    );
    const wrong = await loginRoute.POST(
      new Request("https://example.test/api/writer/cabinet/login", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.13" },
        body: JSON.stringify({ email: "aluno@example.com", password: "outra-senha-99" }),
      }),
    );
    expect(unknown.status).toBe(401);
    expect(await wrong.json()).toEqual(await unknown.json());

    calls.length = 0;
    const missing = await forgotRoute.POST(
      new Request("https://example.test/api/writer/cabinet/forgot", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.14" },
        body: JSON.stringify({ email: "ninguem@example.com", locale: "pt-br" }),
      }),
    );
    const known = await forgotRoute.POST(
      new Request("https://example.test/api/writer/cabinet/forgot", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.15" },
        body: JSON.stringify({ email: "aluno@example.com", locale: "pt-br" }),
      }),
    );
    expect(await missing.json()).toEqual(await known.json());
    expect(calls).toHaveLength(1);
    const resetLetter = String(calls[0]?.text ?? "");
    expect(resetLetter).toContain("/pt-br/writing/conta/senha/");
    expect(resetLetter).not.toContain(password);
    const resetToken = resetLetter.match(/senha\/([A-Za-z0-9_-]+)/)?.[1] ?? "";

    const reset = await resetRoute.POST(
      new Request("https://example.test/api/writer/cabinet/reset", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: resetToken, password: "senha-nova-123" }),
      }),
    );
    expect(reset.status).toBe(200);
    const again = await loginRoute.POST(
      new Request("https://example.test/api/writer/cabinet/login", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.16" },
        body: JSON.stringify({ email: "aluno@example.com", password }),
      }),
    );
    const fresh = await loginRoute.POST(
      new Request("https://example.test/api/writer/cabinet/login", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.17" },
        body: JSON.stringify({ email: "aluno@example.com", password: "senha-nova-123" }),
      }),
    );
    expect(again.status).toBe(401);
    expect(fresh.status).toBe(200);
    expect(cabinet.cabinetStats("aluno@example.com").texts).toBe(1);
    const summary = cabinet.cabinetErrorSummary("aluno@example.com");
    expect(summary.total).toBe(1);
    expect(summary.groups).toEqual([
      expect.objectContaining({ original: "fazem", corrected: "faz", count: 1, category: "grammar" }),
    ]);

    const passwordCookie = (fresh.headers.get("set-cookie") ?? "").split(";")[0] ?? "";
    const wrongCurrent = await passwordRoute.POST(
      new Request("https://example.test/api/writer/cabinet/password", {
        method: "POST",
        headers: { "content-type": "application/json", cookie: passwordCookie },
        body: JSON.stringify({ current: "senha-errada-1", next: "senha-final-123" }),
      }),
    );
    const changed = await passwordRoute.POST(
      new Request("https://example.test/api/writer/cabinet/password", {
        method: "POST",
        headers: { "content-type": "application/json", cookie: passwordCookie },
        body: JSON.stringify({ current: "senha-nova-123", next: "senha-final-123" }),
      }),
    );
    expect(wrongCurrent.status).toBe(401);
    expect(changed.status).toBe(200);
    const withNew = await loginRoute.POST(
      new Request("https://example.test/api/writer/cabinet/login", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.18" },
        body: JSON.stringify({ email: "aluno@example.com", password: "senha-final-123" }),
      }),
    );
    expect(withNew.status).toBe(200);
  });

  it("одна и та же правка складывается, одиночная остаётся без числа", () => {
    const email = "erros@example.com";
    const first = finishedSubmission(store, { email });
    const second = finishedSubmission(store, { email, taskId: "zona-livre-2023-2" });
    db.prepare(`UPDATE writing_submissions SET analysis_json = ? WHERE id = ?`).run(
      JSON.stringify({
        correctedAnnotatedHtml: "<p>texto</p>",
        corrections: [
          {
            id: "a",
            sentenceIndex: 0,
            originalFragment: "Fazem",
            correctedFragment: "faz",
            category: "grammar",
            severity: "error",
            explanation: "Concordância.",
          },
          {
            id: "a2",
            sentenceIndex: 2,
            originalFragment: "fazem",
            correctedFragment: "faz",
            category: "grammar",
            severity: "error",
            explanation: "Concordância.",
          },
          {
            id: "b",
            sentenceIndex: 1,
            originalFragment: "quatros",
            correctedFragment: "quatro",
            category: "agreement",
            severity: "error",
            explanation: "Sem -s.",
          },
        ],
      }),
      first,
    );

    const summary = cabinet.cabinetErrorSummary(email);
    expect(summary.total).toBe(4);
    expect(summary.byCategory.map((row) => [row.category, row.count])).toEqual([
      ["grammar", 3],
      ["agreement", 1],
    ]);
    const fazem = summary.groups.find((row) => row.corrected === "faz");
    expect(fazem?.count).toBe(3);
    expect(fazem?.sources.map((source) => source.id).sort()).toEqual([first, second].sort());
    expect(fazem?.sources.map((source) => source.taskId).sort()).toEqual(
      ["mandacaru-2025-2", "zona-livre-2023-2"].sort(),
    );
    const quatros = summary.groups.find((row) => row.original === "quatros");
    expect(quatros?.count).toBe(1);
    expect(quatros?.sources).toEqual([
      expect.objectContaining({ id: first, taskId: "mandacaru-2025-2" }),
    ]);
    expect(cabinet.cabinetErrorSummary("outro@example.com").total).toBe(0);
  });

  it("галочки стоят только на завершённых заданиях этой почты", () => {
    finishedSubmission(store, { email: "marks@example.com", taskId: "mandacaru-2025-2" });
    finishedSubmission(store, { email: "marks@example.com", taskId: "mandacaru-2025-2" });
    finishedSubmission(store, { email: "marks@example.com", taskId: "not-a-task" });
    finishedSubmission(store, { email: "marks@example.com", taskId: null });
    finishedSubmission(store, { email: "other-marks@example.com", taskId: "zona-livre-2023-2" });
    expect(cabinet.writtenTaskIds("Marks@Example.com").sort()).toEqual(["mandacaru-2025-2"]);
  });

  it("эссе без входа создаёт учётку и одно письмо-подтверждение, не трогая чужой пароль", async () => {
    enableMail();
    const calls = stubResend();
    finishedSubmission(store, { email: "novo@example.com", taskId: "nota-musical-2025-1" });
    const first = await cabinet.ensureEssayAccount("Novo@Example.com", "pt-br");
    expect(first).toBe("sent");
    expect(calls).toHaveLength(1);
    const letter = String(calls[0]?.text ?? "");
    expect(letter).toContain("Confirme o e-mail");
    expect(letter).not.toContain("Um texto");

    const again = await cabinet.ensureEssayAccount("novo@example.com", "pt-br");
    expect(again).toBe("sent");
    expect(calls).toHaveLength(1);

    const token = letter.match(/entrar\/([A-Za-z0-9_-]+)/)?.[1] ?? "";
    const confirmed = await enterRoute.GET(new Request("https://example.test/pt-br/writing/conta/entrar/x"), {
      params: Promise.resolve({ token }),
    });
    const session = (confirmed.headers.get("set-cookie") ?? "").split(";")[0]?.split("=")[1] ?? "";
    expect(cabinet.sessionFromToken(decodeURIComponent(session))).toBe("novo@example.com");
    expect(cabinet.listCabinetEssays("novo@example.com")).toHaveLength(1);
    expect(await cabinet.ensureEssayAccount("novo@example.com", "pt-br")).toBe("exists");

    await cabinet.registerAccount("senha@example.com", "senha-forte-1", "pt-br");
    const before = db.prepare(`SELECT password_hash FROM writer_accounts WHERE email_normalized = ?`).get(
      "senha@example.com",
    ) as { password_hash: string };
    expect(await cabinet.ensureEssayAccount("senha@example.com", "pt-br")).toBe("sent");
    const after = db.prepare(`SELECT password_hash FROM writer_accounts WHERE email_normalized = ?`).get(
      "senha@example.com",
    ) as { password_hash: string };
    expect(after.password_hash).toBe(before.password_hash);
  });

  it("ссылка сброса пароля не сгорает, если её открыли как вход", async () => {
    const token = cabinet.issueLoginLink("reset-safe@example.com", "pt-br", "reset");
    const opened = await enterRoute.GET(new Request("https://example.test/pt-br/writing/conta/entrar/x"), {
      params: Promise.resolve({ token }),
    });
    expect(opened.headers.get("location")).toContain("status=invalid");
    expect(opened.headers.get("set-cookie")).toBeNull();
    const row = db
      .prepare(`SELECT used_at FROM writer_login_links WHERE email_normalized = ?`)
      .get("reset-safe@example.com") as { used_at: string | null };
    expect(row.used_at).toBeNull();
  });
});
