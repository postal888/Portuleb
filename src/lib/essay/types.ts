export const CORRECTION_CATEGORIES = [
  "grammar",
  "spelling",
  "agreement",
  "preposition",
  "article",
  "verb",
  "vocabulary",
  "collocation",
  "punctuation",
  "style",
] as const;

export type CorrectionCategory = (typeof CORRECTION_CATEGORIES)[number];

export const CORRECTION_SEVERITIES = ["error", "minor", "suggestion"] as const;
export type CorrectionSeverity = (typeof CORRECTION_SEVERITIES)[number];

export const ESSAY_SOURCE_LANGUAGES = ["pt", "es", "en"] as const;
export type EssaySourceLanguage = (typeof ESSAY_SOURCE_LANGUAGES)[number];

export const ESSAY_EXPLANATION_LANGUAGES = ["ru", "pt", "en"] as const;
export type EssayExplanationLanguage = (typeof ESSAY_EXPLANATION_LANGUAGES)[number];

export const ESSAY_MODES = ["strict", "natural", "exam", "business"] as const;
export type EssayMode = (typeof ESSAY_MODES)[number];

export type Correction = {
  id: string;
  sentenceIndex: number;
  originalFragment: string;
  correctedFragment: string;
  startOffset?: number;
  endOffset?: number;
  category: CorrectionCategory;
  severity: CorrectionSeverity;
  explanation: string;
  shortExplanation?: string;
  ruleHint?: string;
  repeatedPatternKey?: string;
};

/** Rows written before the fields lost their misleading `Ru` suffix stay readable. */
export type CorrectionText = {
  explanation?: string;
  explanationRu?: string;
  shortExplanation?: string;
  shortExplanationRu?: string;
};

export function explanationOf(item: CorrectionText): string {
  return item.explanation ?? item.explanationRu ?? "";
}

export function shortExplanationOf(item: CorrectionText): string {
  return item.shortExplanation ?? item.shortExplanationRu ?? "";
}

export type RepeatedPattern = {
  key: string;
  label: string;
  count: number;
};

export const CELPE_LEVELS = [
  "none",
  "intermediario",
  "intermediario-superior",
  "avancado",
  "avancado-superior",
] as const;

export type CelpeLevel = (typeof CELPE_LEVELS)[number];

export type CelpeCriterionScore = {
  score: number;
  comment: string;
};

export type CelpeTaskScore = {
  estimatedLevel: CelpeLevel;
  taskFulfillment: CelpeCriterionScore;
  sourceComprehension: CelpeCriterionScore;
  organization: CelpeCriterionScore;
  language: CelpeCriterionScore;
  usedFacts: string[];
  missedFacts: string[];
  inventedFacts: string[];
  overallComment: string;
};

export type EssayStats = {
  total: number;
  grammar: number;
  spelling: number;
  agreement: number;
  preposition: number;
  article: number;
  verb: number;
  vocabulary: number;
  collocation: number;
  punctuation: number;
  style: number;
  repeatedPatterns: RepeatedPattern[];
  estimatedLevel?: string;
  focusAreas: string[];
};

export type EssayAnalysis = {
  correctedAnnotatedHtml: string;
  corrections: Correction[];
  stats: EssayStats;
  celpe?: CelpeTaskScore;
  taskId?: string;
};

export type CheckEssayRequest = {
  text: string;
  sourceLanguage: EssaySourceLanguage;
  explanationLanguage: EssayExplanationLanguage;
  mode: EssayMode;
  taskId?: string;
  email: string;
  debug?: boolean;
};

export type CheckEssayMeta = {
  provider: "openai" | "mock";
  model?: string;
  mock: boolean;
};

export type CheckEssayResponse = {
  ok: true;
  analysis: EssayAnalysis;
  meta: CheckEssayMeta;
  debug?: {
    rawModelJson?: unknown;
  };
};

export type ResolvedCorrection = Correction & {
  startOffset: number;
  endOffset: number;
  mark: number;
};
