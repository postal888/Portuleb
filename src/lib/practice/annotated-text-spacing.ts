import type { AnnotatedSegment } from "@/content/practice/types";

function needsSpaceBetween(prev: string, next: string): boolean {
  const prevChar = prev.slice(-1);
  const nextChar = next[0] ?? "";

  if (!prevChar || !nextChar || /^\s/.test(next)) return false;
  if (/[(\[«"'¿¡-]$/.test(prev)) return false;
  if (/^[,.;:!?)»\]'"]/.test(next)) return false;

  // Comma, semicolon, colon (and similar) before the next word: "2002, com"
  if (/[,;:.!?]$/.test(prev) && /[\p{L}\p{N}(\["'«¿¡]/u.test(nextChar)) {
    return true;
  }

  return /[\p{L}\p{N}]/u.test(prevChar) && /[\p{L}\p{N}(\["'«¿¡]/u.test(nextChar);
}

/** Inserts missing spaces between DOCX runs (plain ↔ highlighted). */
export function normalizeAnnotatedSegments(segments: AnnotatedSegment[]): AnnotatedSegment[] {
  if (segments.length <= 1) return segments.map((s) => ({ ...s }));

  const normalized: AnnotatedSegment[] = [{ ...segments[0]! }];

  for (let i = 1; i < segments.length; i++) {
    const prevIndex = normalized.length - 1;
    const prev = normalized[prevIndex]!;
    const curr = segments[i]!;

    if (
      prev.text.length > 0 &&
      curr.text.length > 0 &&
      !/\s$/.test(prev.text) &&
      !/^\s/.test(curr.text) &&
      needsSpaceBetween(prev.text, curr.text)
    ) {
      normalized[prevIndex] = { ...prev, text: `${prev.text} ` };
    }

    normalized.push({ ...curr });
  }

  return normalized;
}
