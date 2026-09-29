import { resolveCorrections } from "./offsets";
import type { Correction, ResolvedCorrection } from "./types";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function footnote(mark: number, tip: string): string {
  const safeTip = escapeHtml(tip);
  return `<sup class="essay-fn"><a class="essay-fn-link" href="#essay-note-${mark}" id="essay-mark-${mark}" data-tip="${safeTip}">${mark}</a></sup>`;
}

function renderReplacement(correction: ResolvedCorrection): string {
  const original = escapeHtml(correction.originalFragment);
  const next = escapeHtml(correction.correctedFragment);
  const tip = correction.shortExplanation || correction.explanation;
  const mark = footnote(correction.mark, tip);

  if (!correction.originalFragment && correction.correctedFragment) {
    return `<ins class="essay-ins">${next}</ins>${mark}`;
  }
  if (correction.originalFragment && !correction.correctedFragment) {
    return `<del class="essay-del">${original}</del>${mark}`;
  }
  return `<del class="essay-del">${original}</del><ins class="essay-ins">${next}</ins>${mark}`;
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
