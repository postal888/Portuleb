import { afterEach, describe, expect, it, vi } from "vitest";
import { buildEssayCheckPrompts } from "@/lib/essay/prompt";
import { normalizeCorrections, parseCheckEssayRequest, wordCount } from "@/lib/essay/schema";
import { explanationOf, shortExplanationOf } from "@/lib/essay/types";
import type { CheckEssayRequest } from "@/lib/essay/types";
import { analyzeEssay } from "@/lib/essay/analyze";

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.ESSAY_LLM_API_KEY;
  delete process.env.OPENAI_API_KEY;
  delete process.env.ESSAY_CHECK_ALLOW_MOCK;
});

function essayWords(n: number): string {
  const base = "o mercado corporativo brasileiro precisa comunicar os seus valores ao publico jovem".split(" ");
  const words: string[] = [];
  while (words.length < n) words.push(...base);
  return words.slice(0, n).join(" ");
}

function request(overrides: Partial<CheckEssayRequest> = {}): CheckEssayRequest {
  return {
    text: `${essayWords(130)} quatros empresas disputam o mercado.`,
    sourceLanguage: "pt",
    explanationLanguage: "pt",
    mode: "exam",
    email: "candidata@example.com",
    ...overrides,
  };
}

function modelContent(payload: unknown): string {
  return JSON.stringify({
    id: "chatcmpl-test",
    choices: [{ message: { role: "assistant", content: JSON.stringify(payload) } }],
    model: "gpt-test",
  });
}

describe("имена полей объяснений", () => {
  it("старое поле explanationRu читается и нормализуется в explanation", () => {
    const [row] = normalizeCorrections([
      {
        originalFragment: "quatros",
        correctedFragment: "quatro",
        category: "agreement",
        severity: "error",
        explanationRu: "Concordância verbal.",
        shortExplanationRu: "quatro, sem -s.",
      },
    ]);

    expect(row?.explanation).toBe("Concordância verbal.");
    expect(row?.shortExplanation).toBe("quatro, sem -s.");
    expect(JSON.stringify(row)).not.toContain("explanationRu");
  });

  it("новое поле explanation имеет приоритет, если пришли оба", () => {
    const [row] = normalizeCorrections([
      {
        originalFragment: "a",
        correctedFragment: "b",
        category: "grammar",
        severity: "error",
        explanation: "canonical",
        explanationRu: "legacy",
      },
    ]);
    expect(row?.explanation).toBe("canonical");
  });

  it("исправление без объяснения отбрасывается", () => {
    expect(
      normalizeCorrections([
        { originalFragment: "a", correctedFragment: "b", category: "grammar", severity: "error" },
      ]),
    ).toEqual([]);
  });

  it("читатель примет и новый, и старый запись", () => {
    expect(explanationOf({ explanationRu: "старое" })).toBe("старое");
    expect(explanationOf({ explanation: "новое" })).toBe("новое");
    expect(explanationOf({})).toBe("");
    expect(shortExplanationOf({ shortExplanationRu: "кратко" })).toBe("кратко");
    expect(shortExplanationOf({ shortExplanation: "кратко" })).toBe("кратко");
  });
});

describe("язык объяснений в промпте", () => {
  it("промпт требует объяснения на языке интерфейса", () => {
    const ru = buildEssayCheckPrompts(request({ explanationLanguage: "ru" })).system;
    const en = buildEssayCheckPrompts(request({ explanationLanguage: "en" })).system;
    const pt = buildEssayCheckPrompts(request({ explanationLanguage: "pt" })).system;

    expect(ru).toContain("in Russian");
    expect(en).toContain("in English");
    expect(pt).toContain("in Brazilian Portuguese");
  });

  it("из промпта убран запрет на русский и английский", () => {
    const system = buildEssayCheckPrompts(request({ explanationLanguage: "ru" })).system;
    expect(system).not.toMatch(/Never Russian/);
    expect(system).not.toMatch(/Never English/);
    expect(system).not.toContain("explanationRu");
  });

  it("форма JSON в промпте использует канонические имена", () => {
    const system = buildEssayCheckPrompts(request()).system;
    expect(system).toContain('"explanation": "..."');
    expect(system).toContain('"shortExplanation": "..."');
  });
});

describe("границы запроса проверки", () => {
  it("минимум и максимум слов совпадают с формой", () => {
    expect(wordCount(essayWords(120))).toBe(120);
    expect(() => parseCheckEssayRequest({ text: essayWords(119), email: "a@b.test" })).toThrow(/120/);
    expect(() => parseCheckEssayRequest({ text: essayWords(601), email: "a@b.test" })).toThrow(/600/);
    expect(parseCheckEssayRequest({ text: essayWords(120), email: "a@b.test" }).text).toBeTruthy();
  });
});

describe("ответ модели с устаревшими полями", () => {
  it("канонизируется до того, как попадёт в анализ", async () => {
    process.env.ESSAY_LLM_API_KEY = "test-key-only";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          modelContent({
            corrections: [
              {
                originalFragment: "quatros",
                correctedFragment: "quatro",
                category: "agreement",
                severity: "error",
                explanationRu: "Concordância.",
                shortExplanationRu: "quatro, sem -s.",
              },
            ],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      ),
    );

    const { analysis, meta } = await analyzeEssay(request({ explanationLanguage: "ru" }));

    expect(meta.provider).toBe("openai");
    expect(analysis.corrections).toHaveLength(1);
    expect(analysis.corrections[0]?.explanation).toBe("Concordância.");
    expect(JSON.stringify(analysis)).not.toContain("explanationRu");
    expect(analysis.correctedAnnotatedHtml).toContain("quatro, sem -s.");
  });
});
