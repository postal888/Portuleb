import { getWritingTask } from "@/content/writing/tasks";
import { mockCelpeScore, normalizeCelpe } from "./celpe";
import { locateSampleCorrections, SAMPLE_CORRECTIONS, SAMPLE_ESSAY_PT } from "./sample";
import { essayMockAllowed, payloadToCorrections, requestEssayModel } from "./provider";
import { renderAnnotatedHtml } from "./renderer";
import { buildEssayStats } from "./stats";
import type { CheckEssayMeta, CheckEssayRequest, Correction, EssayAnalysis } from "./types";

function looksLikeSample(text: string): boolean {
  const hay = text.toLowerCase();
  return (
    hay.includes("vale-alimentaçao") ||
    hay.includes("quatros empresas") ||
    hay.includes(SAMPLE_ESSAY_PT.slice(0, 40).toLowerCase())
  );
}

function mockAnalyze(text: string): { corrections: Correction[]; estimatedLevel?: string } {
  const located = locateSampleCorrections(text).filter((item) => {
    if (!item.originalFragment) return item.startOffset != null;
    return text.includes(item.originalFragment);
  });

  if (located.length > 0) {
    return {
      corrections: located,
      estimatedLevel: looksLikeSample(text) ? "B1" : undefined,
    };
  }

  return {
    corrections: SAMPLE_CORRECTIONS.filter(
      (item) => item.originalFragment && text.includes(item.originalFragment),
    ),
    estimatedLevel: undefined,
  };
}

export async function analyzeEssay(input: CheckEssayRequest): Promise<{
  analysis: EssayAnalysis;
  meta: CheckEssayMeta;
  raw?: unknown;
}> {
  const task = getWritingTask(input.taskId);

  try {
    const { payload, meta, raw } = await requestEssayModel(input);
    const corrections = payloadToCorrections(payload);
    const { html, resolved } = renderAnnotatedHtml(input.text, corrections);
    const celpe = normalizeCelpe(payload.celpe) ?? mockCelpeScore(input.text, task);
    return {
      analysis: {
        correctedAnnotatedHtml: html,
        corrections: resolved.map(({ mark: _mark, ...item }) => item),
        stats: buildEssayStats(resolved, {
          estimatedLevel: celpe.estimatedLevel,
          repeatedPatterns: payload.repeatedPatterns,
        }),
        celpe,
        taskId: task.id,
      },
      meta,
      raw,
    };
  } catch (error) {
    if (!essayMockAllowed()) throw error;
    const mocked = mockAnalyze(input.text);
    const { html, resolved } = renderAnnotatedHtml(input.text, mocked.corrections);
    const celpe = mockCelpeScore(input.text, task);
    return {
      analysis: {
        correctedAnnotatedHtml: html,
        corrections: resolved.map(({ mark: _mark, ...item }) => item),
        stats: buildEssayStats(resolved, { estimatedLevel: celpe.estimatedLevel }),
        celpe,
        taskId: task.id,
      },
      meta: { provider: "mock", model: "seeded-pt", mock: true },
    };
  }
}

export { SAMPLE_ESSAY_PT };
