import type { Correction, ResolvedCorrection } from "./types";

type Span = { start: number; end: number };

function overlaps(used: Span[], start: number, end: number): boolean {
  return used.some((span) => start < span.end && end > span.start);
}

function findUnclaimed(text: string, fragment: string, used: Span[], from = 0): number {
  if (!fragment) return -1;
  let cursor = from;
  while (cursor <= text.length) {
    const index = text.indexOf(fragment, cursor);
    if (index < 0) return -1;
    const end = index + fragment.length;
    if (!overlaps(used, index, end)) return index;
    cursor = index + 1;
  }
  return -1;
}

function offsetsMatchFragment(text: string, correction: Correction): boolean {
  const { startOffset, endOffset, originalFragment } = correction;
  if (startOffset == null || endOffset == null) return false;
  if (startOffset < 0 || endOffset < startOffset || endOffset > text.length) return false;
  return text.slice(startOffset, endOffset) === originalFragment;
}

export function resolveCorrections(text: string, corrections: Correction[]): ResolvedCorrection[] {
  const used: Span[] = [];
  const resolved: ResolvedCorrection[] = [];

  for (const correction of corrections) {
    let start = -1;
    let end = -1;

    if (offsetsMatchFragment(text, correction)) {
      start = correction.startOffset as number;
      end = correction.endOffset as number;
      if (overlaps(used, start, end) && correction.originalFragment) {
        start = findUnclaimed(text, correction.originalFragment, used);
        end = start >= 0 ? start + correction.originalFragment.length : -1;
      }
    } else if (correction.originalFragment) {
      start = findUnclaimed(text, correction.originalFragment, used);
      end = start >= 0 ? start + correction.originalFragment.length : -1;
    } else if (
      correction.startOffset != null &&
      correction.startOffset >= 0 &&
      correction.startOffset <= text.length &&
      !overlaps(used, correction.startOffset, correction.startOffset)
    ) {
      start = correction.startOffset;
      end = correction.startOffset;
    }

    if (start < 0 || end < start) continue;

    used.push({ start, end });
    resolved.push({
      ...correction,
      startOffset: start,
      endOffset: end,
      mark: 0,
    });
  }

  resolved.sort((a, b) => a.startOffset - b.startOffset || a.endOffset - b.endOffset);
  return resolved.map((item, index) => ({ ...item, mark: index + 1 }));
}
