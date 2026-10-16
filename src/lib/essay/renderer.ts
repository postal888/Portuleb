import { resolveCorrections } from "./offsets";
import type { Correction, ResolvedCorrection } from "./types";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Shared edges stay readable; only the changed stretch is struck and rewritten. */
export function splitSharedAffix(
  original: string,
  corrected: string,
): { prefix: string; originalMid: string; correctedMid: string; suffix: string } {
  const left = Array.from(original);
  const right = Array.from(corrected);
  const maxPrefix = Math.min(left.length, right.length);
  let prefixLen = 0;
  while (prefixLen < maxPrefix && left[prefixLen] === right[prefixLen]) prefixLen += 1;

  const maxSuffix = Math.min(left.length - prefixLen, right.length - prefixLen);
  let suffixLen = 0;
  while (
    suffixLen < maxSuffix &&
    left[left.length - 1 - suffixLen] === right[right.length - 1 - suffixLen]
  ) {
    suffixLen += 1;
  }

  return {
    prefix: left.slice(0, prefixLen).join(""),
    originalMid: left.slice(prefixLen, left.length - suffixLen).join(""),
    correctedMid: right.slice(prefixLen, right.length - suffixLen).join(""),
    suffix: left.slice(left.length - suffixLen).join(""),
  };
}

function footnote(mark: number, tip: string): string {
  const safeTip = escapeHtml(tip);
  return `<sup class="essay-fn"><a class="essay-fn-link" href="#essay-note-${mark}" id="essay-mark-${mark}" data-tip="${safeTip}">${mark}</a></sup>`;
}

function delHtml(value: string, className?: string): string {
  if (!value) return "";
  const klass = className ? ` class="${className}"` : "";
  return `<del${klass} style="text-decoration:line-through">${escapeHtml(value)}</del>`;
}

function insHtml(value: string, className?: string): string {
  if (!value) return "";
  const klass = className ? ` class="${className}"` : "";
  return `<ins${klass} style="text-decoration:none">${escapeHtml(value)}</ins>`;
}

function renderReplacement(correction: ResolvedCorrection): string {
  const tip = correction.shortExplanation || correction.explanation;
  const mark = footnote(correction.mark, tip);
  const original = correction.originalFragment;
  const next = correction.correctedFragment;

  if (!original && next) return `${insHtml(next, "essay-ins")}${mark}`;
  if (original && !next) return `${delHtml(original, "essay-del")}${mark}`;

  const { prefix, originalMid, correctedMid, suffix } = splitSharedAffix(original, next);
  return `${escapeHtml(prefix)}${delHtml(originalMid, "essay-del")}${insHtml(correctedMid, "essay-ins")}${escapeHtml(suffix)}${mark}`;
}

function wrapParagraphs(html: string): string {
  return html
    .split(/\n{2,}/)
    .map((block) => `<p class="essay-p">${block.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

export function renderAnnotatedHtml(text: string, corrections: Correction[]): {
  html: string;
  resolved: ResolvedCorrection[];
} {
  const resolved = resolveCorrections(text, corrections);
  if (resolved.length === 0) {
    return { html: wrapParagraphs(escapeHtml(text)), resolved };
  }

  let cursor = text.length;
  const parts: string[] = [];

  for (let i = resolved.length - 1; i >= 0; i--) {
    const item = resolved[i];
    parts.unshift(escapeHtml(text.slice(item.endOffset, cursor)));
    parts.unshift(renderReplacement(item));
    cursor = item.startOffset;
  }
  parts.unshift(escapeHtml(text.slice(0, cursor)));

  return { html: wrapParagraphs(parts.join("")), resolved };
}

function strikePlain(value: string): string {
  return Array.from(value)
    .map((char) => (/\s/.test(char) ? char : `${char}\u0336`))
    .join("");
}

function markedPiece(correction: ResolvedCorrection): { html: string; plain: string } {
  const original = correction.originalFragment;
  const next = correction.correctedFragment;
  if (!original && next) {
    return { html: insHtml(next), plain: next };
  }
  if (original && !next) {
    return { html: delHtml(original), plain: strikePlain(original) };
  }

  const { prefix, originalMid, correctedMid, suffix } = splitSharedAffix(original, next);
  return {
    html: `${escapeHtml(prefix)}${delHtml(originalMid)}${insHtml(correctedMid)}${escapeHtml(suffix)}`,
    plain: `${prefix}${strikePlain(originalMid)}${correctedMid}${suffix}`,
  };
}

/** HTML keeps the strike for Word and Docs. Plain text uses a combining stroke so messengers keep it too. */
export function renderMarkedCopy(text: string, corrections: Correction[]): { html: string; plain: string } {
  const resolved = resolveCorrections(text, corrections);
  let cursor = text.length;
  const htmlParts: string[] = [];
  const plainParts: string[] = [];

  for (let i = resolved.length - 1; i >= 0; i--) {
    const item = resolved[i];
    const tail = text.slice(item.endOffset, cursor);
    htmlParts.unshift(escapeHtml(tail));
    plainParts.unshift(tail);
    const piece = markedPiece(item);
    htmlParts.unshift(piece.html);
    plainParts.unshift(piece.plain);
    cursor = item.startOffset;
  }
  const head = text.slice(0, cursor);
  htmlParts.unshift(escapeHtml(head));
  plainParts.unshift(head);

  const plain = plainParts.join("");
  const html = `<!DOCTYPE html><html><body>${wrapParagraphs(htmlParts.join(""))}</body></html>`;
  return { html, plain };
}

export function renderPlainCorrected(text: string, corrections: Correction[]): string {
  const resolved = resolveCorrections(text, corrections);
  let cursor = text.length;
  const parts: string[] = [];

  for (let i = resolved.length - 1; i >= 0; i--) {
    const item = resolved[i];
    parts.unshift(text.slice(item.endOffset, cursor));
    parts.unshift(item.correctedFragment);
    cursor = item.startOffset;
  }
  parts.unshift(text.slice(0, cursor));
  return parts.join("");
}
