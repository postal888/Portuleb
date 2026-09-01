import type { ReadingExpressionGuideEntry } from "@/content/practice/reading/types";

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export type GlossLang = "en" | "ru";

export type ResolvedExpression = {
  id: string;
  portuguese: string;
  english: string;
  russian?: string;
};

export function lookupExpressionEntry(
  expressionId: string,
  segmentText: string,
  entries: ReadingExpressionGuideEntry[],
): ReadingExpressionGuideEntry | undefined {
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  if (byId.has(expressionId)) return byId.get(expressionId);

  const normSegment = normalize(segmentText);

  return entries.find((entry) => {
    const base = entry.portuguese.split("(")[0]?.trim() ?? entry.portuguese;
    const normEntry = normalize(base);
    return (
      normSegment.includes(normEntry) ||
      normEntry.includes(normSegment) ||
      normalize(entry.portuguese).includes(normSegment)
    );
  });
}

export function resolveExpression(
  expressionId: string,
  segmentText: string,
  entries: ReadingExpressionGuideEntry[],
): ResolvedExpression {
  const entry = lookupExpressionEntry(expressionId, segmentText, entries);
  return {
    id: expressionId,
    portuguese: segmentText.trim(),
    english: entry?.english ?? segmentText.trim(),
    russian: entry?.russian,
  };
}

export function glossFor(
  expression: ResolvedExpression,
  lang: GlossLang,
): string {
  if (lang === "ru" && expression.russian) return expression.russian;
  return expression.english;
}

export function collectInlineExpressions(
  blocks: { segments: { text: string; highlight?: boolean; expressionId?: string }[] }[],
  entries: ReadingExpressionGuideEntry[],
): ResolvedExpression[] {
  const seen = new Set<string>();
  const result: ResolvedExpression[] = [];

  for (const block of blocks) {
    for (const segment of block.segments) {
      if (!segment.highlight || !segment.expressionId) continue;
      if (seen.has(segment.expressionId)) continue;
      seen.add(segment.expressionId);
      result.push(resolveExpression(segment.expressionId, segment.text, entries));
    }
  }

  return result;
}
