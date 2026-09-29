import fs from "node:fs";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTempDb } from "../helpers/temp-db";
import { getUi } from "@/i18n/ui";
import { LOCALES, type Locale } from "@/i18n/locales";
import { EMAIL_GATE_WORDS, EXAM_MAX_WORDS, EXAM_MIN_WORDS } from "@/lib/writer/time";
import { wordLabel } from "@/lib/writer/word-label";
import { reportPath } from "@/lib/writer/report-token";
import { buildEssayCheckPrompts } from "@/lib/essay/prompt";
import { ESSAY_EXPLANATION_LANGUAGES } from "@/lib/essay/types";

const temp = createTempDb("locales");

let store: typeof import("@/lib/writer/store");
let checkRoute: typeof import("@/app/api/check-essay/route");

beforeAll(async () => {
  process.env.SITE_URL = "https://example.test";
  process.env.WRITER_REPORT_PEPPER = "test-pepper";
  delete process.env.RESEND_API_KEY;
  delete process.env.MAIL_FROM;

  store = await import("@/lib/writer/store");
  checkRoute = await import("@/app/api/check-essay/route");
  const { migrateWriterObservability } = await import("@/lib/writer/schema-ddl");
  migrateWriterObservability((await import("@/lib/admin/db")).getAdminDb());
});

afterAll(() => {
  try {
    temp.close();
  } catch {
    // SQLite keeps the handle open until the worker exits; losing a temp dir is harmless.
  }
});

/** Flattens a locale dictionary into `a.b.c` -> leaf, so the three locales can be compared by key. */
function leafKeys(value: unknown, prefix = ""): string[] {
  if (value !== null && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
      leafKeys(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

function leaves(value: unknown, prefix = ""): Array<[string, unknown]> {
  if (value !== null && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
      leaves(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [[prefix, value]];
}

const writing = (locale: Locale) => getUi(locale).writing;

describe("набор подписей раздела райтера", () => {
  it("pt-br, en и ru имеют одинаковые ключи", () => {
    const reference = leafKeys(writing("pt-br")).sort();
    expect(reference.length).toBeGreaterThan(60);
    for (const locale of LOCALES) {
      if (locale === "pt-br") continue;
      expect(leafKeys(writing(locale)).sort(), `расхождение по ключам ${locale}`).toEqual(reference);
    }
  });

  it("ни одно значение не равно имени собственного ключа", () => {
    // categories.* в английском — это английские термины, совпадение с ключем случайно и правильно.
    for (const locale of LOCALES) {
      for (const [key, value] of leaves(writing(locale))) {
        if (typeof value !== "string" || key.startsWith("categories.")) continue;
        expect(value, `${locale}: ${key}`).not.toBe(key.split(".").pop());
      }
    }
  });

  it("в русской локали непереведёнными остаются только термины экзамена", () => {
    // Список зафиксирован: новая непереведённая строка уронит этот тест.
    const ALLOWED_RU_LATIN = [
      "debugToggle",
      "doneMeta",
      "emailPlaceholder",
      "levels.avancado",
      "levels.avancado-superior",
      "levels.intermediario",
      "levels.intermediario-superior",
      "promptBody",
      "promptTitle",
      "tabJson",
    ].sort();

    const offenders = leaves(writing("ru"))
      .filter(([, value]) => typeof value === "string")
      .filter(([, value]) => !/[А-Яа-яЁё]/.test(String(value)))
      .map(([key]) => key)
      .sort();

    expect(offenders).toEqual(ALLOWED_RU_LATIN);
  });
});

describe("жанр, уровень и отчёт по локалям", () => {
  it("подписи жанра, задания и уровня различаются", () => {
    expect(writing("pt-br").promptGenre).toBe("Gênero:");
    expect(writing("en").promptGenre).toBe("Genre:");
    expect(writing("ru").promptGenre).toBe("Жанр:");

    expect(writing("pt-br").taskPickerLabel).toBe("Proposta:");
    expect(writing("en").taskPickerLabel).toBe("Task:");
    expect(writing("ru").taskPickerLabel).toBe("Задание:");

    expect(new Set([writing("pt-br").level, writing("en").level, writing("ru").level]).size).toBe(3);
    expect(new Set([writing("pt-br").reportTitle, writing("en").reportTitle, writing("ru").reportTitle]).size).toBe(3);
  });

  it("уровни Celpe-Bras подписаны в каждой локали", () => {
    for (const locale of LOCALES) {
      const levels = writing(locale).levels as Record<string, string>;
      expect(Object.keys(levels).sort()).toEqual([
        "avancado",
        "avancado-superior",
        "intermediario",
        "intermediario-superior",
        "none",
      ]);
      for (const [key, label] of Object.entries(levels)) {
        expect(label, `${locale}.${key}`).toBeTruthy();
        expect(label, `${locale}.${key}`).not.toBe(key);
      }
    }
  });

  it("ступени Celpe-Bras: pt-br и ru дают португальский термин, en переводит", () => {
    // Различие зафиксировано намеренно: менять его можно только осознанно по всем трём локалям.
    const level = (locale: Locale) => (writing(locale).levels as Record<string, string>).avancado;
    expect(level("pt-br")).toBe("Avançado");
    expect(level("ru")).toBe("Avançado");
    expect(level("en")).toBe("Advanced");
  });

  it("форма слова «слово» отличается в ru и совпадает в pt/en", () => {
    const forms = (locale: Locale) => {
      const t = writing(locale);
      return [1, 2, 5, 11, 21].map((n) => wordLabel(locale, n, t.wordOne, t.wordFew, t.wordMany));
    };
    expect(forms("ru")).toEqual([
      writing("ru").wordOne,
      writing("ru").wordFew,
      writing("ru").wordMany,
      writing("ru").wordMany,
      writing("ru").wordOne,
    ]);
    expect(forms("pt-br")[0]).toBe(writing("pt-br").wordOne);
    expect(forms("pt-br")[1]).toBe(writing("pt-br").wordMany);
    expect(forms("en")[1]).toBe(writing("en").wordMany);
  });
});

describe("язык объяснений", () => {
  it("у каждой site-локали есть язык объяснений", () => {
    expect([...ESSAY_EXPLANATION_LANGUAGES].sort()).toEqual(["en", "pt", "ru"]);
  });

  it("промпт называет язык объяснений и запрещает переводить сам текст", () => {
    const named: Record<string, string> = {
      pt: "Brazilian Portuguese",
      en: "English",
      ru: "Russian",
    };
    for (const [language, name] of Object.entries(named)) {
      const { system } = buildEssayCheckPrompts({
        text: "O mercado corporativo brasileiro precisa comunicar os seus valores.",
        sourceLanguage: "pt",
        explanationLanguage: language,
        mode: "exam",
      } as never);
      expect(system).toContain(`in ${name}`);
      expect(system).toContain(`never correct, rewrite or translate it into ${name}`);
    }
  });
});

describe("адрес отчёта и пороги", () => {
  it("ссылка отчёта живёт в префиксе своей локали", () => {
    expect(reportPath("pt-br", "tok")).toBe("/pt-br/writing/report/tok");
    expect(reportPath("en", "tok")).toBe("/en/writing/report/tok");
    expect(reportPath("ru", "tok")).toBe("/ru/writing/report/tok");
    // Неизвестная локаль не уводит ссылку в 404.
    expect(reportPath("de", "tok")).toBe("/pt-br/writing/report/tok");
  });

  it("страницы отчёта существуют для всех трёх локалей", () => {
    for (const locale of LOCALES) {
      const file = path.join(process.cwd(), "src", "app", locale, "writing", "report", "[token]", "page.tsx");
      expect(fs.existsSync(file), `нет страницы ${locale}`).toBe(true);
    }
  });

  it("пороги 40/120/600 — один источник для сервера и клиента", async () => {
    expect([EMAIL_GATE_WORDS, EXAM_MIN_WORDS, EXAM_MAX_WORDS]).toEqual([40, 120, 600]);

    const payload = (await (await checkRoute.GET()).json()) as {
      limits: { emailGateWords: number; minWords: number; maxWords: number };
    };
    expect(payload.limits).toEqual({
      emailGateWords: EMAIL_GATE_WORDS,
      minWords: EXAM_MIN_WORDS,
      maxWords: EXAM_MAX_WORDS,
    });
  });
});

describe("реальный результат проверки в каждой локали", () => {
  /** Один и тот же текст, три site-локали: меняется только язык интерфейса и объяснений. */
  const BASE =
    "o mercado corporativo brasileiro precisa comunicar os seus valores ao publico jovem com clareza cada dia mais".split(
      " ",
    );
  const TEXT = (() => {
    const words: string[] = [];
    while (words.length < 140) words.push(...BASE);
    return words.slice(0, 140).join(" ");
  })();

  const cases: Array<{ locale: Locale; explanationLanguage: "pt" | "en" | "ru"; word: string }> = [
    { locale: "pt-br", explanationLanguage: "pt", word: "avaliação" },
    { locale: "en", explanationLanguage: "en", word: "assessment" },
    { locale: "ru", explanationLanguage: "ru", word: "проверка" },
  ];

  it.each(cases)("путь $locale: результат, ссылка и письмо на своём языке", async ({ locale, explanationLanguage, word }) => {
    process.env.ESSAY_CHECK_ALLOW_MOCK = "1";
    delete process.env.ESSAY_LLM_API_KEY;
    delete process.env.OPENAI_API_KEY;

    const check = await import("@/lib/writer/check");
    const templates = await import("@/lib/writer/mail/templates");
    const { parseCheckEssayRequest } = await import("@/lib/essay/schema");

    const input = parseCheckEssayRequest({
      text: TEXT,
      email: `candidate+${locale}@example.com`,
      sourceLanguage: "pt",
      explanationLanguage,
      mode: "exam",
      taskId: "mandacaru-2025-2",
    });
    const outcome = await check.runWriterCheck(input, { sessionId: null, locale, timing: null, debug: false });

    expect(outcome.ok).toBe(true);
    if (!outcome.ok) return;

    expect(store.getSubmission(outcome.submissionId)?.locale).toBe(locale);
    const reportUrl = outcome.reportUrl;
    expect(reportUrl).toBeTruthy();
    if (!reportUrl) return;
    expect(reportUrl.startsWith(`https://example.test/${locale}/writing/report/`)).toBe(true);

    const submission = store.getSubmission(outcome.submissionId);
    const levels = writing(locale).levels as Record<string, string>;
    const message = templates.renderReportEmail({
      locale,
      reportUrl,
      taskTitle: "Mandacaru",
      levelLabel: levels[submission?.celpe_level ?? "none"] ?? null,
      corrections: 0,
      words: submission?.word_count ?? 0,
      expiresDays: 30,
    });
    expect(message.subject.toLowerCase()).toContain(word);
    expect(message.text).toContain(reportUrl);
    expect(message.text).not.toMatch(/\{\w+\}/);
  });
});

describe("ответы API кандидату", () => {
  it("битое тело даёт переводимый код и никакой свободной серверной фразы", async () => {
    const response = await checkRoute.POST(
      new Request("https://example.test/api/check-essay", {
        method: "POST",
        headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.41" },
        body: "{",
      }),
    );
    const payload = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(400);
    expect(payload.ok).toBe(false);
    expect(String(payload.errorCode)).toMatch(/^[a-z][a-z_]*$/);
    expect(payload).not.toHaveProperty("error");
    expect(payload).not.toHaveProperty("code");
  });

  it("заявка без разбора не отдаёт ссылку и не пишет в отчёты", async () => {
    const id = crypto.randomUUID();
    store.createSubmission({
      id,
      sessionId: null,
      email: "nobody@example.com",
      locale: "ru",
      taskId: null,
      text: "Текст без разбора.",
      wordCount: 3,
    });

    expect(store.getReportForSubmission(id)).toBeUndefined();
    expect(store.getSubmission(id)?.status).toBe("pending");
  });
});
