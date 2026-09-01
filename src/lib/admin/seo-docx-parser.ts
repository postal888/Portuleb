import { langToBlogLocale, localePathPrefix } from "@/lib/blog/locale";
import type { ArticleBlock, BlogFaqItem, BlogPost } from "@/content/blog/types";
import type { DocxParagraph } from "./document-parser";
import { allocateUniqueSlug, slugifyTitle } from "./blog-slug";

export type SeoDocxMeta = {
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
  lang?: string;
};

export type SeoDocxParts = {
  meta: SeoDocxMeta;
  title: string;
  lead: string;
  blocks: { type: "p" | "h2" | "ul"; content?: string; items?: string[] }[];
  faq: BlogFaqItem[];
  geoSummaryItems: string[];
  footer?: string;
};

const STOP_SECTION = /^(FAQ|Leia também:?|Última atualização:)/i;
const ARTICLE_MARKER = /^Artigo \d+$/i;

export function isSeoGeoDocxFormat(paragraphs: DocxParagraph[]): boolean {
  const hasMarkers = paragraphs.some((p) => ARTICLE_MARKER.test(p.text));
  const hasMeta = paragraphs.some(
    (p) => p.style === "SourceCode" && /meta_title:/i.test(p.text),
  );
  return hasMarkers && hasMeta;
}

export function seoDocxArticleChunks(paragraphs: DocxParagraph[]): DocxParagraph[][] {
  const starts: number[] = [];
  for (let i = 0; i < paragraphs.length; i++) {
    if (ARTICLE_MARKER.test(paragraphs[i]!.text)) starts.push(i);
  }
  if (!starts.length) return [];

  const chunks: DocxParagraph[][] = [];
  for (let i = 0; i < starts.length; i++) {
    chunks.push(paragraphs.slice(starts[i]!, starts[i + 1] ?? paragraphs.length));
  }
  return chunks;
}

export function parseSeoMetaLine(text: string): SeoDocxMeta {
  const meta: SeoDocxMeta = {};
  const titleMatch = text.match(/meta_title:"([^"]*)"/i);
  const descMatch = text.match(/meta_description:"([^"]*)"/i);
  const slugMatch = text.match(/slug:(\/[a-z0-9-]+|[a-z0-9-]+)/i);
  const langMatch = text.match(/lang:([a-z]{2}(?:-[a-z]{2})?)/i);

  if (titleMatch?.[1]) meta.metaTitle = titleMatch[1].trim();
  if (descMatch?.[1]) meta.metaDescription = descMatch[1].trim();
  if (slugMatch?.[1]) meta.slug = slugMatch[1].replace(/^\//, "").trim();
  if (langMatch?.[1]) meta.lang = langMatch[1].trim();
  return meta;
}

function isHeadingLine(text: string): boolean {
  const t = text.trim();
  if (!t || t.length > 140) return false;
  if (/^Pontos-chave:?\s*$/i.test(t)) return false;
  if (t.endsWith("?")) return true;
  if (t.length <= 90 && !/[.!:;]$/.test(t)) return true;
  return false;
}

export function parseFaqParagraph(text: string): BlogFaqItem[] {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const items: BlogFaqItem[] = [];
  const parts = normalized.split(/(?<=\?)(?=[A-ZÀ-ÚÁÉÍÓÚÂÊÎÔÛÃÕÇ])/);
  for (const part of parts) {
    const qEnd = part.indexOf("?");
    if (qEnd === -1) continue;
    const question = part.slice(0, qEnd + 1).trim();
    const answer = part.slice(qEnd + 1).trim();
    if (question && answer) items.push({ question, answer });
  }
  return items;
}

function normalizeSlugFromMeta(meta: SeoDocxMeta, title: string): string {
  if (meta.slug) return slugifyTitle(meta.slug.replace(/^\//, ""));
  return slugifyTitle(title);
}

function tagsFromSlug(slug: string): string[] {
  const stop = new Set([
    "a",
    "o",
    "e",
    "de",
    "do",
    "da",
    "no",
    "na",
    "em",
    "para",
    "com",
    "celpe",
    "bras",
    "pt",
  ]);
  const tags = slug
    .split("-")
    .filter((w) => w.length > 2 && !stop.has(w))
    .slice(0, 8);
  if (!tags.includes("Celpe-Bras")) tags.unshift("Celpe-Bras");
  return tags;
}

function guessCategory(title: string, lead: string): string {
  const s = `${title} ${lead}`.toLowerCase();
  if (/(inscri|edital|prazo)/.test(s)) return "Inscrição";
  if (/(gênero|genero|escrita|oral|tarefa|prova)/.test(s)) return "Preparação Celpe-Bras";
  if (/(vocabul|gramática|express)/.test(s)) return "Língua portuguesa";
  if (/(estratég|dica|método|plano|mock|shadowing)/.test(s)) return "Estratégia de preparação";
  return "Preparação Celpe-Bras";
}

function estimateReadTime(words: number): string {
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

export function seoDocxChunkToParts(chunk: DocxParagraph[]): SeoDocxParts {
  let i = 0;
  while (i < chunk.length && ARTICLE_MARKER.test(chunk[i]!.text)) i += 1;

  const metaPara = chunk.find((p) => p.style === "SourceCode" && /meta_title:/i.test(p.text));
  const meta = metaPara ? parseSeoMetaLine(metaPara.text) : {};

  const contentParas = chunk
    .slice(i)
    .filter((p) => p !== metaPara)
    .filter((p) => !ARTICLE_MARKER.test(p.text));

  const title = contentParas[0]?.text.trim() ?? meta.metaTitle ?? "Artigo";
  let bodyStart = 1;
  let lead = contentParas[1]?.text.trim() ?? "";
  if (lead === title) {
    lead = "";
    bodyStart = 1;
  } else {
    bodyStart = 2;
  }

  const blocks: SeoDocxParts["blocks"] = [];
  const geoSummaryItems: string[] = [];
  let faq: BlogFaqItem[] = [];
  let footer: string | undefined;
  let listMode = false;

  for (let j = bodyStart; j < contentParas.length; j++) {
    const text = contentParas[j]!.text.trim();
    if (!text || text === "·") continue;

    if (STOP_SECTION.test(text)) {
      listMode = false;
      if (/^FAQ$/i.test(text)) {
        const faqRaw = contentParas[j + 1]?.text.trim();
        if (faqRaw && !STOP_SECTION.test(faqRaw)) {
          faq = parseFaqParagraph(faqRaw);
          j += 1;
        }
      } else if (/^Última atualização:/i.test(text)) {
        footer = text;
      }
      continue;
    }

    if (/^Pontos-chave:?\s*$/i.test(text)) {
      listMode = true;
      continue;
    }

    if (listMode) {
      if (isHeadingLine(text) || STOP_SECTION.test(text)) {
        listMode = false;
        j -= 1;
        continue;
      }
      const items = blocks.at(-1)?.type === "ul" ? blocks.at(-1)!.items! : [];
      if (blocks.at(-1)?.type === "ul") {
        items.push(text);
      } else {
        blocks.push({ type: "ul", items: [text] });
      }
      geoSummaryItems.push(text);
      continue;
    }

    if (isHeadingLine(text)) {
      blocks.push({ type: "h2", content: text });
      continue;
    }

    blocks.push({ type: "p", content: text });
  }

  if (!lead) lead = meta.metaDescription?.slice(0, 160) ?? title;

  return { meta, title, lead, blocks, faq, geoSummaryItems, footer };
}

function blocksToArticleBlocks(
  lead: string,
  blocks: SeoDocxParts["blocks"],
  geoSummaryItems: string[],
  metaDescription?: string,
): ArticleBlock[] {
  const out: ArticleBlock[] = [];

  if (lead.trim()) {
    out.push({ type: "p", content: lead.trim(), lead: true });
  }

  for (const b of blocks) {
    if (b.type === "ul" && b.items?.length) out.push({ type: "ul", items: b.items });
    else if (b.type === "h2" && b.content) out.push({ type: "h2", content: b.content });
    else if (b.type === "p" && b.content) out.push({ type: "p", content: b.content });
  }

  const summaryItems =
    geoSummaryItems.length > 0
      ? geoSummaryItems.slice(0, 6)
      : metaDescription
        ? [metaDescription]
        : [];

  if (summaryItems.length) {
    out.push({
      type: "geoBox",
      variant: geoSummaryItems.length ? "learn" : "summary",
      title: geoSummaryItems.length ? "Pontos-chave:" : "Resumo:",
      items: summaryItems,
    });
  }

  out.push({
    type: "internalLinks",
    links: [
      { label: "Guia do Celpe-Bras", href: "/pt-br/celpe-bras" },
      { label: "Provas anteriores 2026/1", href: "/pt-br/provas-anteriores/2026-1" },
      { label: "Prática guiada", href: "/pt-br/pratica" },
    ],
  });

  return out;
}

export function buildBlogPostFromSeoParts(
  parts: SeoDocxParts,
  opts?: { publishedAt?: string; usedSlugs?: Set<string> },
): BlogPost {
  const suggestedSlug = normalizeSlugFromMeta(parts.meta, parts.title);
  const slug = allocateUniqueSlug(parts.title, suggestedSlug, opts?.usedSlugs);
  const summary =
    parts.meta.metaDescription?.trim() ||
    parts.lead.slice(0, 300) ||
    parts.title;

  const words =
    parts.title.split(/\s+/).length +
    parts.lead.split(/\s+/).length +
    parts.blocks.reduce(
      (n, b) => n + (b.content?.split(/\s+/).length ?? b.items?.join(" ").split(/\s+/).length ?? 0),
      0,
    ) +
    parts.faq.reduce((n, f) => n + f.question.split(/\s+/).length + f.answer.split(/\s+/).length, 0);

  const locale = langToBlogLocale(parts.meta.lang);
  const prefix = localePathPrefix(locale);
  const pastExamsPath =
    locale === "en" ? "/past-exams" : locale === "ru" ? "/proshlye-ekzameny" : "/provas-anteriores";

  return {
    slug,
    locale,
    title: parts.title,
    subtitle: parts.lead !== parts.title ? parts.lead.slice(0, 200) : summary.slice(0, 120),
    seoTitle: parts.meta.metaTitle ?? parts.title,
    seoDescription: parts.meta.metaDescription ?? summary.slice(0, 160),
    eyebrow: "Blog",
    category: guessCategory(parts.title, parts.lead),
    readTime: estimateReadTime(words),
    featured: false,
    publishedAt: opts?.publishedAt ?? new Date().toISOString().slice(0, 10),
    tags: tagsFromSlug(suggestedSlug),
    faq: parts.faq.length ? parts.faq : undefined,
    sidebar: {
      summary: summary.length > 300 ? summary.slice(0, 297) + "…" : summary,
      audience: [],
      links: [
        {
          label: locale === "en" ? "Celpe-Bras guide" : locale === "ru" ? "Гид по Celpe-Bras" : "Guia do Celpe-Bras",
          href: `${prefix}/celpe-bras`,
          hint:
            locale === "en"
              ? "Format, parts and exam levels"
              : locale === "ru"
                ? "Формат, части и уровни экзамена"
                : "Formato, partes e níveis do exame",
        },
        {
          label: locale === "en" ? "Past exams" : locale === "ru" ? "Прошлые экзамены" : "Provas anteriores",
          href: `${prefix}${pastExamsPath}/2026-1`,
          hint:
            locale === "en"
              ? "Practice with real exams"
              : locale === "ru"
                ? "Практика на реальных экзаменах"
                : "Pratique com provas reais",
        },
      ],
    },
    blocks: blocksToArticleBlocks(
      parts.lead,
      parts.blocks,
      parts.geoSummaryItems,
      parts.meta.metaDescription,
    ),
  };
}

export function seoDocxChunkToBlogPost(
  chunk: DocxParagraph[],
  opts?: { publishedAt?: string; usedSlugs?: Set<string> },
): BlogPost {
  return buildBlogPostFromSeoParts(seoDocxChunkToParts(chunk), opts);
}
