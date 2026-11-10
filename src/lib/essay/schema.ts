import { z } from "zod";
import { WRITING_TASK_IDS } from "@/content/writing/tasks";
import { EXAM_MAX_WORDS, EXAM_MIN_WORDS } from "@/lib/writer/time";
import {
  CELPE_LEVELS,
  CORRECTION_CATEGORIES,
  CORRECTION_SEVERITIES,
  ESSAY_EXPLANATION_LANGUAGES,
  ESSAY_MODES,
  ESSAY_SOURCE_LANGUAGES,
  type CheckEssayRequest,
  type Correction,
} from "./types";

export const MIN_ESSAY_CHARS = 40;
export const MAX_ESSAY_CHARS = 12_000;
/** Aliased to the writer constants so the form gates and the API can never drift apart. */
export const MIN_EXAM_WORDS = EXAM_MIN_WORDS;
export const MAX_EXAM_WORDS = EXAM_MAX_WORDS;

const essayTextSchema = z
  .string()
  .trim()
  .min(MIN_ESSAY_CHARS, `Texto muito curto (mínimo ${MIN_ESSAY_CHARS} caracteres).`)
  .max(MAX_ESSAY_CHARS, `Texto muito longo (máximo ${MAX_ESSAY_CHARS} caracteres).`)
  // The browser blocks a short submit, but the API is the boundary that actually costs a model call.
  .refine((value) => wordCount(value) >= MIN_EXAM_WORDS, {
    message: `Texto muito curto (mínimo ${MIN_EXAM_WORDS} palavras).`,
  })
  .refine((value) => wordCount(value) <= MAX_EXAM_WORDS, {
    message: `Texto muito longo (máximo ${MAX_EXAM_WORDS} palavras).`,
  });

export const checkEssayRequestSchema = z.object({
  text: essayTextSchema,
  sourceLanguage: z.enum(ESSAY_SOURCE_LANGUAGES).default("pt"),
  explanationLanguage: z.enum(ESSAY_EXPLANATION_LANGUAGES).default("pt"),
  mode: z.enum(ESSAY_MODES).default("exam"),
  taskId: z.enum(WRITING_TASK_IDS).optional(),
  email: z.string().trim().email("Deixe um e-mail válido para receber a avaliação."),
  debug: z.boolean().optional(),
});

/** Models may answer with the canonical names or the legacy `*Ru` ones; storage only keeps canonical. */
export const correctionSchema = z
  .object({
    id: z.string().min(1).optional(),
    sentenceIndex: z.number().int().min(0).optional(),
    originalFragment: z.string(),
    correctedFragment: z.string(),
    startOffset: z.number().int().min(0).optional(),
    endOffset: z.number().int().min(0).optional(),
    category: z.enum(CORRECTION_CATEGORIES),
    severity: z.enum(CORRECTION_SEVERITIES),
    explanation: z.string().min(1).optional(),
    explanationRu: z.string().min(1).optional(),
    shortExplanation: z.string().optional(),
    shortExplanationRu: z.string().optional(),
    ruleHint: z.string().optional(),
    repeatedPatternKey: z.string().optional(),
  })
  .refine((row) => Boolean(row.explanation ?? row.explanationRu), {
    message: "Explicação ausente.",
  })
  .transform(({ explanation, explanationRu, shortExplanation, shortExplanationRu, ...rest }) => ({
    ...rest,
    explanation: explanation ?? String(explanationRu),
    ...(shortExplanation ?? shortExplanationRu
      ? { shortExplanation: shortExplanation ?? String(shortExplanationRu) }
      : {}),
  }));

const criterionSchema = z.object({
  score: z.number().min(0).max(5),
  comment: z.string().min(1).max(600),
});

export const celpeTaskScoreSchema = z.object({
  estimatedLevel: z.enum(CELPE_LEVELS),
  taskFulfillment: criterionSchema,
  sourceComprehension: criterionSchema,
  organization: criterionSchema,
  language: criterionSchema,
  usedFacts: z.array(z.string().min(1).max(160)).max(5),
  missedFacts: z.array(z.string().min(1).max(160)).max(5),
  inventedFacts: z.array(z.string().min(1).max(160)).max(5),
  overallComment: z.string().min(1).max(800),
});

export const modelEssayPayloadSchema = z.object({
  corrections: z.array(correctionSchema).max(80),
  estimatedLevel: z.string().max(24).optional(),
  celpe: celpeTaskScoreSchema.optional(),
  repeatedPatterns: z
    .array(
      z.object({
        key: z.string().min(1),
        label: z.string().min(1),
        count: z.number().int().min(1),
      }),
    )
    .max(12)
    .optional(),
});

export type ModelEssayPayload = z.infer<typeof modelEssayPayloadSchema>;

export function parseCheckEssayRequest(body: unknown): CheckEssayRequest {
  return checkEssayRequestSchema.parse(body);
}

export function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

const CATEGORY_ALIASES: Record<string, (typeof CORRECTION_CATEGORIES)[number]> = {
  syntax: "grammar",
  syntactic: "grammar",
  morphology: "grammar",
  orthography: "spelling",
  ortografia: "spelling",
  accent: "spelling",
  accentuation: "spelling",
  typo: "spelling",
  concordance: "agreement",
  concordancia: "agreement",
  gender: "agreement",
  number: "agreement",
  plural: "agreement",
  prepositions: "preposition",
  articles: "article",
  verbal: "verb",
  tense: "verb",
  conjugation: "verb",
  lexical: "vocabulary",
  lexicon: "vocabulary",
  word_choice: "vocabulary",
  collocations: "collocation",
  punct: "punctuation",
  register: "style",
  cohesion: "style",
  coherence: "style",
  discourse: "style",
  connector: "style",
  connectors: "style",
};

const SEVERITY_ALIASES: Record<string, (typeof CORRECTION_SEVERITIES)[number]> = {
  major: "error",
  grave: "error",
  high: "error",
  critical: "error",
  medium: "minor",
  moderate: "minor",
  warning: "minor",
  low: "minor",
  tip: "suggestion",
  optional: "suggestion",
  improvement: "suggestion",
  hint: "suggestion",
};

function clipModelString(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (!text) return null;
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

function normalizeModelStringArray(value: unknown, maxItems: number, maxLength: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => clipModelString(item, maxLength))
    .filter((item): item is string => Boolean(item))
    .slice(0, maxItems);
}

function normalizeCriterion(value: unknown): unknown {
  if (!value || typeof value !== "object") return value;
  const row = value as Record<string, unknown>;
  return {
    ...row,
    comment: clipModelString(row.comment, 600) ?? row.comment,
  };
}

function normalizeCelpePayload(value: unknown): unknown {
  if (!value || typeof value !== "object") return value;
  const row = value as Record<string, unknown>;
  return {
    ...row,
    taskFulfillment: normalizeCriterion(row.taskFulfillment),
    sourceComprehension: normalizeCriterion(row.sourceComprehension),
    organization: normalizeCriterion(row.organization),
    language: normalizeCriterion(row.language),
    usedFacts: normalizeModelStringArray(row.usedFacts, 5, 160),
    missedFacts: normalizeModelStringArray(row.missedFacts, 5, 160),
    inventedFacts: normalizeModelStringArray(row.inventedFacts, 5, 160),
    overallComment: clipModelString(row.overallComment, 800) ?? row.overallComment,
  };
}

function foldLabel(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase().replace(/[\s-]+/g, "_") : "";
}

/** The model sometimes invents a label. One bad word must not discard the whole check. */
export function coerceCorrectionCategory(value: unknown): (typeof CORRECTION_CATEGORIES)[number] {
  const key = foldLabel(value);
  if ((CORRECTION_CATEGORIES as readonly string[]).includes(key)) {
    return key as (typeof CORRECTION_CATEGORIES)[number];
  }
  return CATEGORY_ALIASES[key] ?? "style";
}

export function coerceCorrectionSeverity(value: unknown): (typeof CORRECTION_SEVERITIES)[number] {
  const key = foldLabel(value);
  if ((CORRECTION_SEVERITIES as readonly string[]).includes(key)) {
    return key as (typeof CORRECTION_SEVERITIES)[number];
  }
  return SEVERITY_ALIASES[key] ?? "minor";
}

/** Drop corrections that still fail validation, and map stray category names onto the allowed list. */
export function prepareModelEssayPayload(raw: unknown): unknown {
  if (!raw || typeof raw !== "object") return raw;
  const source = raw as Record<string, unknown>;
  const prepared: Record<string, unknown> = { ...source };

  if (Array.isArray(source.corrections)) {
    prepared.corrections = source.corrections.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const row = { ...(item as Record<string, unknown>) };
      row.category = coerceCorrectionCategory(row.category);
      row.severity = coerceCorrectionSeverity(row.severity);
      return correctionSchema.safeParse(row).success ? [row] : [];
    });
  }

  prepared.celpe = normalizeCelpePayload(source.celpe);
  return prepared;
}

export function normalizeCorrections(raw: unknown[]): Correction[] {
  const out: Correction[] = [];
  for (const [index, item] of raw.entries()) {
    const parsed = correctionSchema.safeParse(item);
    if (!parsed.success) continue;
    const row = parsed.data;
    if (row.originalFragment === row.correctedFragment) continue;
    out.push({
      ...row,
      id: row.id?.trim() || `c${index + 1}`,
      sentenceIndex: row.sentenceIndex ?? 0,
    });
  }
  return out;
}
