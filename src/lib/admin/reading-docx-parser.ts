import JSZip from "jszip";
import { XMLParser } from "fast-xml-parser";
import { normalizeAnnotatedSegments } from "@/lib/practice/annotated-text-spacing";

export type ReadingSegment = {
  text: string;
  highlight?: boolean;
  expressionId?: string;
  translation?: string;
};

export type ReadingParagraph = {
  id: string;
  title?: string;
  segments: ReadingSegment[];
};

export type ReadingExpression = {
  id: string;
  expression: string;
  translation: string;
};

function asArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function runText(run: Record<string, unknown>): string {
  const t = run.t;
  if (typeof t === "string") return t;
  if (typeof t === "object" && t !== null && typeof (t as Record<string, unknown>)["#text"] === "string") {
    return (t as Record<string, string>)["#text"];
  }
  return "";
}

function isItalic(run: Record<string, unknown>): boolean {
  const rPr = run.rPr as Record<string, unknown> | undefined;
  if (!rPr) return false;
  const i = rPr.i;
  if (i === "" || i === true || i === 1) return true;
  if (typeof i === "object" && i !== null) return true;
  return false;
}

function isBold(run: Record<string, unknown>): boolean {
  const rPr = run.rPr as Record<string, unknown> | undefined;
  if (!rPr) return false;
  const b = rPr.b;
  if (b === "" || b === true || b === 1) return true;
  if (typeof b === "object" && b !== null) return true;
  return false;
}

export function slugExpression(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function parseParenTranslation(text: string): { rest: string; translation?: string } {
  const m = text.match(/^\s*\(([^)]+)\)([\s\S]*)$/);
  if (!m) return { rest: text };
  return { translation: m[1].trim(), rest: m[2] };
}

export async function extractAnnotatedReading(buffer: Buffer): Promise<{
  title: string;
  paragraphs: ReadingParagraph[];
  expressions: ReadingExpression[];
}> {
  const zip = await JSZip.loadAsync(buffer);
  const xml = await zip.file("word/document.xml")?.async("string");
  if (!xml) throw new Error("DOCX inválido");

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    removeNSPrefix: true,
  });
  const parsed = parser.parse(xml) as Record<string, unknown>;
  const body = (parsed.document as Record<string, unknown> | undefined)?.body as
    | Record<string, unknown>
    | undefined;
  if (!body) throw new Error("DOCX vazio");

  const expressions = new Map<string, ReadingExpression>();
  const paragraphs: ReadingParagraph[] = [];
  let title = "";
  let index = 0;

  for (const p of asArray(body.p)) {
    const para = p as Record<string, unknown>;
    const runs = asArray(para.r).map((r) => r as Record<string, unknown>);
    if (runs.length === 0) continue;

    const segments: ReadingSegment[] = [];
    let pendingItalic: string | null = null;

    for (const run of runs) {
      let text = runText(run);
      if (!text) continue;

      if (pendingItalic !== null) {
        const { translation, rest } = parseParenTranslation(text);
        const id = slugExpression(pendingItalic);
        if (!expressions.has(id)) {
          expressions.set(id, {
            id,
            expression: pendingItalic,
            translation: translation ?? pendingItalic,
          });
        }
        segments.push({
          text: pendingItalic,
          highlight: true,
          expressionId: id,
          translation,
        });
        pendingItalic = null;
        if (rest) segments.push({ text: rest });
        continue;
      }

      if (isItalic(run)) {
        pendingItalic = text.trim();
        continue;
      }

      segments.push({ text });
    }

    if (pendingItalic) {
      const id = slugExpression(pendingItalic);
      expressions.set(id, { id, expression: pendingItalic, translation: pendingItalic });
      segments.push({ text: pendingItalic, highlight: true, expressionId: id });
    }

    const plain = segments.map((s) => s.text).join("").replace(/\s+/g, " ").trim();
    if (!plain) continue;

    if (!title && isBold(runs[0]!)) {
      title = plain;
      continue;
    }

    index += 1;
    const isSection =
      plain.length < 80 &&
      !plain.includes("(") &&
      segments.length === 1 &&
      (plain === "Tradição coletiva" || plain === "Muito além do sabor");

    paragraphs.push({
      id: isSection ? slugExpression(plain) : `par-${index}`,
      title: isSection ? plain : index === 1 ? "Introdução" : undefined,
      segments: normalizeAnnotatedSegments(segments),
    });
  }

  return {
    title: title || "Texto anotado",
    paragraphs,
    expressions: [...expressions.values()],
  };
}
