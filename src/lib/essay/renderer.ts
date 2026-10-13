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
    return `<ins class="essay-ins" style="text-decoration:none">${next}</ins>${mark}`;
  }
  if (correction.originalFragment && !correction.correctedFragment) {
    return `<del class="essay-del" style="text-decoration:line-through">${original}</del>${mark}`;
  }
  return `<del class="essay-del" style="text-decoration:line-through">${original}</del><ins class="essay-ins" style="text-decoration:none">${next}</ins>${mark}`;
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
    return { html: `<ins style="text-decoration:none">${escapeHtml(next)}</ins>`, plain: next };
  }
  if (original && !next) {
    return {
      html: `<del style="text-decoration:line-through">${escapeHtml(original)}</del>`,
      plain: strikePlain(original),
    };
  }
  return {
    html: `<del style="text-decoration:line-through">${escapeHtml(original)}</del><ins style="text-decoration:none">${escapeHtml(next)}</ins>`,
    plain: `${strikePlain(original)}${next}`,
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
