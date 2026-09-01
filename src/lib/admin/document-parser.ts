import JSZip from "jszip";
import { XMLParser } from "fast-xml-parser";
import { PDFParse } from "pdf-parse";

export type DocxParagraph = { style: string; text: string };

function asArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function collectText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const obj = node as Record<string, unknown>;
  const textNode = obj["w:t"] ?? obj.t;
  if (typeof textNode === "string") return textNode;
  if (typeof textNode === "object" && textNode !== null) {
    const t = textNode as Record<string, unknown>;
    if (typeof t["#text"] === "string") return t["#text"];
  }
  let out = "";
  for (const run of asArray(obj["w:r"] ?? obj.r)) {
    out += collectText(run);
  }
  for (const ins of asArray(obj["w:ins"] ?? obj.ins)) {
    out += collectText(ins);
  }
  return out;
}

export async function extractDocxParagraphs(buffer: Buffer): Promise<DocxParagraph[]> {
  const zip = await JSZip.loadAsync(buffer);
  const xml = await zip.file("word/document.xml")?.async("string");
  if (!xml) throw new Error("DOCX inválido: document.xml ausente");

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

  const paragraphs: DocxParagraph[] = [];
  for (const p of asArray(body.p)) {
    const para = p as Record<string, unknown>;
    const pPr = para.pPr as Record<string, unknown> | undefined;
    const pStyle = pPr?.pStyle as Record<string, string> | undefined;
    const style = pStyle?.["@_val"] ?? "";
    const text = collectText(para).replace(/\s+/g, " ").trim();
    if (text) paragraphs.push({ style, text });
  }
  if (paragraphs.length === 0) throw new Error("DOCX sem texto");
  return paragraphs;
}

export function bulkDocxArticleChunks(paragraphs: DocxParagraph[]): DocxParagraph[][] {
  let cut = paragraphs.length;
  for (let i = 0; i < paragraphs.length; i++) {
    const t = paragraphs[i]!.text;
    if (/^=+\s*$/.test(t) || t.toUpperCase().includes("READY-TO-PUBLISH")) {
      cut = i;
      break;
    }
  }
  const trimmed = paragraphs.slice(0, cut);
  const articles: DocxParagraph[][] = [];
  let cur: DocxParagraph[] = [];

  for (const para of trimmed) {
    const sl = para.style.toLowerCase();
    const isStart = sl === "compact" || (sl.startsWith("heading") && para.text.length > 5);
    if (isStart) {
      if (cur.length) articles.push(cur);
      cur = [para];
    } else if (cur.length) {
      cur.push(para);
    }
  }
  if (cur.length) articles.push(cur);
  return articles;
}

export function paragraphsSliceToBlocks(
  slice: DocxParagraph[],
): { type: "p" | "h2" | "ul"; content?: string; items?: string[] }[] {
  const blocks: { type: "p" | "h2" | "ul"; content?: string; items?: string[] }[] = [];
  let ulItems: string[] = [];

  for (const { style, text } of slice) {
    const isHeading = style.toLowerCase().startsWith("heading");
    if (/^[-•*]\s+/.test(text)) {
      ulItems.push(text.replace(/^[-•*]\s+/, "").trim());
      continue;
    }
    if (ulItems.length) {
      blocks.push({ type: "ul", items: [...ulItems] });
      ulItems = [];
    }
    if (isHeading) blocks.push({ type: "h2", content: text });
    else blocks.push({ type: "p", content: text });
  }
  if (ulItems.length) blocks.push({ type: "ul", items: ulItems });
  return blocks;
}

export function docxParagraphsToParts(paragraphs: DocxParagraph[]): {
  title: string;
  lead: string;
  blocks: { type: "p" | "h2" | "ul"; content?: string; items?: string[] }[];
} {
  if (!paragraphs.length) throw new Error("DOCX vazio");

  const title = paragraphs[0]!.text;
  let lead = "";
  let blocks: { type: "p" | "h2" | "ul"; content?: string; items?: string[] }[] = [];

  if (paragraphs.length >= 2 && !paragraphs[1]!.style.toLowerCase().startsWith("heading")) {
    const leadRaw = paragraphs[1]!.text;
    lead = leadRaw.replace(/^lead:\s*/i, "").trim() || leadRaw;
    blocks = paragraphsSliceToBlocks(paragraphs.slice(2));
  } else {
    let ulItems: string[] = [];
    for (const { style, text } of paragraphs.slice(1)) {
      const isHeading = style.toLowerCase().startsWith("heading");
      if (!lead && !isHeading) {
        lead = text;
        continue;
      }
      if (/^[-•*]\s+/.test(text)) {
        ulItems.push(text.replace(/^[-•*]\s+/, "").trim());
        continue;
      }
      if (ulItems.length) {
        blocks.push({ type: "ul", items: [...ulItems] });
        ulItems = [];
      }
      if (isHeading) blocks.push({ type: "h2", content: text });
      else blocks.push({ type: "p", content: text });
    }
    if (ulItems.length) blocks.push({ type: "ul", items: ulItems });
  }

  let movedLeadToBody = false;
  if (!blocks.length && lead.trim() && lead.trim() !== title.trim()) {
    blocks = [{ type: "p", content: lead }];
    lead = "";
    movedLeadToBody = true;
  }
  if (!lead.trim() && !movedLeadToBody) lead = title;

  return { title, lead, blocks };
}

export async function extractPdfParagraphs(buffer: Buffer): Promise<string[]> {
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    const raw = (result.text || "").replace(/\r/g, "");
    const parts = raw
      .split(/\n{2,}/)
      .map((p) => p.replace(/\s+/g, " ").trim())
      .filter(Boolean);
    if (!parts.length) {
      const lines = raw
        .split(/\n/)
        .map((l) => l.trim())
        .filter(Boolean);
      if (!lines.length) throw new Error("PDF sem texto extraível");
      return lines;
    }
    return parts;
  } finally {
    await parser.destroy();
  }
}

export function pdfParagraphsToParts(paragraphs: string[]): {
  title: string;
  lead: string;
  blocks: { type: "p" | "h2" | "ul"; content?: string; items?: string[] }[];
} {
  if (!paragraphs.length) throw new Error("PDF vazio");
  const title = paragraphs[0]!;
  const lead = paragraphs[1] ?? title;
  const blocks = paragraphs.slice(2).map((content) => ({ type: "p" as const, content }));
  if (!blocks.length && lead !== title) {
    return { title, lead: "", blocks: [{ type: "p", content: lead }] };
  }
  return { title, lead, blocks };
}

export function wordCountFromParagraphs(paragraphs: DocxParagraph[]): number {
  const text = paragraphs.map((p) => p.text).join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export function wordCountFromStrings(parts: string[]): number {
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}
