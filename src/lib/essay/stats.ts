import type { Correction, CorrectionCategory, EssayStats, RepeatedPattern } from "./types";

const FOCUS_LABEL: Record<CorrectionCategory, string> = {
  grammar: "gramática",
  spelling: "ortografia",
  agreement: "concordância",
  preposition: "preposições",
  article: "artigos",
  verb: "conjugação verbal",
  vocabulary: "vocabulário",
  collocation: "colocação natural",
  punctuation: "pontuação",
  style: "naturalidade",
};

function countBy(corrections: Correction[], category: CorrectionCategory): number {
  return corrections.filter((item) => item.category === category).length;
}

function buildPatterns(corrections: Correction[], fromModel: RepeatedPattern[] = []): RepeatedPattern[] {
  const counts = new Map<string, { label: string; count: number }>();

  for (const item of corrections) {
    const key = item.repeatedPatternKey || `${item.category}:${item.originalFragment}`;
    const previous = counts.get(key);
    counts.set(key, {
      label: previous?.label || item.ruleHint || FOCUS_LABEL[item.category],
      count: (previous?.count ?? 0) + 1,
    });
  }

  for (const pattern of fromModel) {
    const previous = counts.get(pattern.key);
    if (previous) previous.label = pattern.label;
  }

  return [...counts.entries()]
    .map(([key, value]) => ({ key, label: value.label, count: value.count }))
    .filter((row) => row.count > 1)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);
}

function focusAreas(corrections: Correction[]): string[] {
  return (Object.keys(FOCUS_LABEL) as CorrectionCategory[])
    .map((category) => ({ category, count: countBy(corrections, category) }))
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4)
    .map((row) => FOCUS_LABEL[row.category]);
}

export function buildEssayStats(
  corrections: Correction[],
  extras?: { estimatedLevel?: string; repeatedPatterns?: RepeatedPattern[] },
): EssayStats {
  return {
    total: corrections.length,
    grammar: countBy(corrections, "grammar"),
    spelling: countBy(corrections, "spelling"),
    agreement: countBy(corrections, "agreement"),
    preposition: countBy(corrections, "preposition"),
    article: countBy(corrections, "article"),
    verb: countBy(corrections, "verb"),
    vocabulary: countBy(corrections, "vocabulary"),
    collocation: countBy(corrections, "collocation"),
    punctuation: countBy(corrections, "punctuation"),
    style: countBy(corrections, "style"),
    repeatedPatterns: buildPatterns(corrections, extras?.repeatedPatterns),
    estimatedLevel: extras?.estimatedLevel,
    focusAreas: focusAreas(corrections),
  };
}
