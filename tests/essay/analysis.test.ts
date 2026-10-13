import { afterEach, describe, expect, it, vi } from "vitest";
import { getWritingTask } from "@/content/writing/tasks";
import { mockCelpeScore } from "@/lib/essay/celpe";
import { buildEssayCheckPrompts } from "@/lib/essay/prompt";
import { modelEssayPayloadSchema, normalizeCorrections, parseCheckEssayRequest, prepareModelEssayPayload, wordCount } from "@/lib/essay/schema";
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

  it("незнакомая категория не отменяет весь разбор", () => {
    const payload = modelEssayPayloadSchema.parse(
      prepareModelEssayPayload({
        corrections: [
          {
            originalFragment: "paises",
            correctedFragment: "países",
            category: "accentuation",
            severity: "major",
            explanation: "Acento agudo.",
          },
          {
            originalFragment: "a",
            correctedFragment: "b",
            category: "not-a-category",
            severity: "whatever",
          },
        ],
      }),
    );

    expect(payload.corrections).toHaveLength(1);
    expect(payload.corrections[0]?.category).toBe("spelling");
    expect(payload.corrections[0]?.severity).toBe("error");
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

  it("видео и аудио оцениваются по транскрипции и по enunciado", () => {
    const video = getWritingTask("2026-1-t1");
    const videoPrompt = buildEssayCheckPrompts(request(), video);
    expect(videoPrompt.system).toContain("TRANSCRIPTION OF THE VIDEO");
    expect(videoPrompt.user).toContain("---TRANSCRIPTION OF THE VIDEO---");
    expect(videoPrompt.user).toContain(video.prompt);
    expect(videoPrompt.user).not.toContain("KEY FACTS THE ESSAY SHOULD USE");
    expect(videoPrompt.user.split("No próximo fim de semana").length - 1).toBe(1);

    const audio = getWritingTask("2026-1-t2");
    expect(buildEssayCheckPrompts(request(), audio).user).toContain("---TRANSCRIPTION OF THE AUDIO---");

    const text = getWritingTask("mandacaru-2025-2");
    const textPrompt = buildEssayCheckPrompts(request(), text).user;
    expect(textPrompt).toContain("---SOURCE TEXT (INSUMO)---");
    expect(textPrompt).toContain("KEY FACTS THE ESSAY SHOULD USE");
  });

  it("локальная оценка видео опирается на транскрипцию, а не на короткий keyFact", () => {
    const task = getWritingTask("2026-1-t1");
    const onTopic = [
      "O Festival Fartura é um festival de gastronomia no Jockey Club, em parceria com a Folha.",
      "As expedições mapeiam a cadeia do alimento, do campo ao prato, e os visitantes podem provar broa com requeijão e frango na brasa.",
      "Há aulas de receitas e uma feirinha de produtos. Daniel Castelli, de Canela, faz polenta de milho crioulo.",
    ].join(" ");
    const offTopic =
      "A biblioteca municipal precisa de novos livros infantis e de um horário maior aos sábados para os estudantes do bairro.";
    const relevant = mockCelpeScore(onTopic, task);
    const unrelated = mockCelpeScore(offTopic, task);
    expect(relevant.sourceComprehension.score).toBeGreaterThan(unrelated.sourceComprehension.score);
    expect(relevant.taskFulfillment.score).toBeGreaterThan(unrelated.taskFulfillment.score);
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
