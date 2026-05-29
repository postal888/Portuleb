import type { AssessmentToken, CefrLevel, WordDifficultyBand } from "./types";
import { CEFR_LEVELS } from "./types";

const CEFR_INDEX: Record<CefrLevel, number> = {
  A1: 0,
  A2: 1,
  B1: 2,
  B2: 3,
  C1: 4,
  C2: 5,
};

function cefrFromIndex(idx: number): CefrLevel {
  return CEFR_LEVELS[Math.max(0, Math.min(5, Math.round(idx)))]!;
}

function formatRange(min: CefrLevel, max: CefrLevel): string {
  if (min === max) return min;
  return `${min}–${max}`;
}

type StepEvidence = {
  articleId: string;
  cefrMin: CefrLevel;
  cefrMax: CefrLevel;
  comprehensionRatio: number;
  unknownBasic: number;
  unknownIntermediate: number;
  unknownAdvanced: number;
  clickableBasic: number;
  clickableIntermediate: number;
  clickableAdvanced: number;
};

function comprehensionCeiling(ratio: number, min: CefrLevel, max: CefrLevel): CefrLevel {
  const minI = CEFR_INDEX[min];
  const maxI = CEFR_INDEX[max];
  /** Perfect score on one text cannot exceed mid-point of its band toward max. */
  const cappedRatio = Math.min(ratio, 0.85);
  const idx = minI + cappedRatio * (maxI - minI);
  return cefrFromIndex(idx);
}

function aggregateReadingLevel(steps: StepEvidence[]): { min: CefrLevel; max: CefrLevel } {
  if (steps.length === 0) return { min: "A1", max: "A2" };

  const indices = steps.map((s) => CEFR_INDEX[comprehensionCeiling(s.comprehensionRatio, s.cefrMin, s.cefrMax)]);

  const sorted = [...indices].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)]!;

  /** Hard text must contribute — cap overall if hardest text was weak. */
  const hardest = steps[steps.length - 1]!;
  const hardRatio = hardest.comprehensionRatio;
  let maxIdx = median;
  if (hardRatio < 0.34) maxIdx = Math.min(maxIdx, CEFR_INDEX.B1);
  else if (hardRatio < 0.67) maxIdx = Math.min(maxIdx, CEFR_INDEX.B2);
  else maxIdx = Math.min(maxIdx, CEFR_INDEX.C1);

  /** Never award C2 from a short multi-text screen. */
  maxIdx = Math.min(maxIdx, CEFR_INDEX.C1);

  /** Single-text perfect cannot lift above B2 alone — enforce via median cap. */
  const easyOnlyPerfect =
    steps.filter((s) => s.comprehensionRatio >= 0.99).length === 1 &&
    steps.every((s) => s.comprehensionRatio >= 0.99) === false;
  if (easyOnlyPerfect) maxIdx = Math.min(maxIdx, CEFR_INDEX.B2);

  const minIdx = Math.max(CEFR_INDEX.A1, maxIdx - 1);
  return { min: cefrFromIndex(minIdx), max: cefrFromIndex(maxIdx) };
}

function estimateVocabulary(steps: StepEvidence[]): { min: CefrLevel; max: CefrLevel } {
  let unknownBasic = 0;
  let unknownAdvanced = 0;
  let totalBasic = 0;
  let totalAdvanced = 0;

  for (const s of steps) {
    unknownBasic += s.unknownBasic;
    unknownAdvanced += s.unknownAdvanced;
    totalBasic += s.clickableBasic;
    totalAdvanced += s.clickableAdvanced;
  }

  const basicRate = totalBasic > 0 ? unknownBasic / totalBasic : 0;
  const advancedRate = totalAdvanced > 0 ? unknownAdvanced / totalAdvanced : 0;

  let min: CefrLevel = "A1";
  let max: CefrLevel = "A2";

  if (basicRate > 0.12) {
    min = "A1";
    max = "A2";
  } else if (basicRate > 0.06) {
    min = "A2";
    max = "B1";
  } else if (advancedRate > 0.35) {
    min = "A2";
    max = "B1";
  } else if (advancedRate > 0.18) {
    min = "B1";
    max = "B2";
  } else if (advancedRate > 0.08) {
    min = "B2";
    max = "C1";
  } else {
    min = "B2";
    max = "C1";
  }

  return { min, max: cefrFromIndex(Math.min(CEFR_INDEX[max], CEFR_INDEX.C1)) };
}

function computeConfidence(steps: StepEvidence[]): "baixa" | "média" | "alta" {
  const ratios = steps.map((s) => s.comprehensionRatio);
  const spread = Math.max(...ratios) - Math.min(...ratios);
  const avg = ratios.reduce((a, b) => a + b, 0) / ratios.length;

  if (steps.length < 3 || spread > 0.5) return "baixa";
  if (avg >= 0.7 && spread <= 0.25) return "alta";
  return "média";
}

function recommendNextStep(readingMax: CefrLevel, confidence: "baixa" | "média" | "alta"): string {
  if (confidence === "baixa") {
    return "Refaça o teste em outro dia e combine com leituras guiadas curtas antes de tirar conclusões.";
  }
  const maxIdx = CEFR_INDEX[readingMax];
  if (maxIdx <= CEFR_INDEX.B1) {
    return "Priorize textos jornalísticos curtos com vocabulário frequente e revise inferências em Teoria.";
  }
  if (maxIdx <= CEFR_INDEX.B2) {
    return "Amplie para textos completos de opinião e notícia, cronometrando 15–20 min por texto.";
  }
  return "Mantenha leitura de reportagens longas e analise conectores argumentativos em textos complexos.";
}

export function buildStepEvidence(
  articleId: string,
  cefrMin: CefrLevel,
  cefrMax: CefrLevel,
  comprehensionRatio: number,
  tokens: { id: string; clickable: boolean; difficultyBand: WordDifficultyBand }[],
  unknownTokenIds: string[],
): StepEvidence {
  const unknown = new Set(unknownTokenIds);
  let unknownBasic = 0;
  let unknownIntermediate = 0;
  let unknownAdvanced = 0;
  let clickableBasic = 0;
  let clickableIntermediate = 0;
  let clickableAdvanced = 0;

  for (const t of tokens) {
    if (!t.clickable) continue;
    if (t.difficultyBand === "basic") clickableBasic += 1;
    else if (t.difficultyBand === "intermediate") clickableIntermediate += 1;
    else clickableAdvanced += 1;

    if (!unknown.has(t.id)) continue;
    if (t.difficultyBand === "basic") unknownBasic += 1;
    else if (t.difficultyBand === "intermediate") unknownIntermediate += 1;
    else unknownAdvanced += 1;
  }

  return {
    articleId,
    cefrMin,
    cefrMax,
    comprehensionRatio,
    unknownBasic,
    unknownIntermediate,
    unknownAdvanced,
    clickableBasic,
    clickableIntermediate,
    clickableAdvanced,
  };
}

export function scoreAssessmentSession(steps: StepEvidence[]): {
  readingRange: string;
  vocabularyRange: string;
  confidence: "baixa" | "média" | "alta";
  recommendation: string;
} {
  const reading = aggregateReadingLevel(steps);
  const vocabulary = estimateVocabulary(steps);
  const confidence = computeConfidence(steps);

  return {
    readingRange: formatRange(reading.min, reading.max),
    vocabularyRange: formatRange(vocabulary.min, vocabulary.max),
    confidence,
    recommendation: recommendNextStep(reading.max, confidence),
  };
}
