import fs from "fs";
import path from "path";
import type { ArticleBlock, BlogPost } from "@/content/blog/types";
import { allocateUniqueSlug, slugifyTitle, usedSlugs } from "./blog-slug";
import {
  bulkDocxArticleChunks,
  docxParagraphsToParts,
  extractDocxParagraphs,
  extractPdfParagraphs,
  pdfParagraphsToParts,
  type DocxParagraph,
  wordCountFromParagraphs,
  wordCountFromStrings,
} from "./document-parser";
import {
  isSeoGeoDocxFormat,
  seoDocxArticleChunks,
  seoDocxChunkToBlogPost,
  seoDocxChunkToParts,
} from "./seo-docx-parser";

const UPLOAD_DIR = path.join(process.cwd(), "data", "admin", "blog-uploads");

export type ImportHints = {
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  readTime: string;
  summary: string;
  seoTitle?: string;
  post: BlogPost;
};

export { slugifyTitle, allocateUniqueSlug, usedSlugs } from "./blog-slug";

function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

function estimateReadTime(words: number): string {
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

function excerptFromParts(lead: string, blocks: { content?: string }[], title: string): string {
  let base = lead.trim();
  if (base.length < 40) {
    const parts = [lead, ...blocks.map((b) => b.content ?? "").filter(Boolean)];
    base = parts.join(" ").replace(/\s+/g, " ").trim() || title;
  }
  if (base.length <= 300) return base;
  const cut = base.slice(0, 297);
  const sp = cut.lastIndexOf(" ");
  return (sp > 0 ? cut.slice(0, sp) : cut) + "…";
}

function guessCategory(title: string, lead: string): string {
  const s = `${title} ${lead}`.toLowerCase();
  if (/(celpe|exame|prova|tarefa)/.test(s)) return "Preparação Celpe-Bras";
  if (/(estratég|dica|método|plano)/.test(s)) return "Estratégia de preparação";
  if (/(gramática|vocabul|léxico)/.test(s)) return "Língua portuguesa";
  return "Artigo";
}

function blocksToArticleBlocks(
  lead: string,
  blocks: { type: "p" | "h2" | "ul"; content?: string; items?: string[] }[],
): ArticleBlock[] {
  const out: ArticleBlock[] = [];
  if (lead.trim()) {
    out.push({ type: "p", content: lead.trim(), lead: true });
  }
  for (const b of blocks) {
    if (b.type === "ul" && b.items?.length) {
      out.push({ type: "ul", items: b.items });
    } else if (b.type === "h2" && b.content) {
      out.push({ type: "h2", content: b.content });
    } else if (b.type === "p" && b.content) {
      out.push({ type: "p", content: b.content });
    }
  }
  if (!out.length) {
    out.push({ type: "p", content: "Conteúdo importado." });
  }
  return out;
}

export function buildBlogPostFromParts(
  parts: { title: string; lead: string; blocks: { type: "p" | "h2" | "ul"; content?: string; items?: string[] }[] },
  opts?: { slug?: string; publishedAt?: string; usedSlugs?: Set<string> },
): BlogPost {
  const slug = allocateUniqueSlug(parts.title, opts?.slug, opts?.usedSlugs);
  const summary = excerptFromParts(parts.lead, parts.blocks, parts.title);
  const words =
    parts.title.split(/\s+/).length +
    parts.lead.split(/\s+/).length +
    parts.blocks.reduce((n, b) => n + (b.content?.split(/\s+/).length ?? b.items?.join(" ").split(/\s+/).length ?? 0), 0);

  return {
    slug,
    title: parts.title,
    subtitle: parts.lead !== parts.title ? parts.lead : summary.slice(0, 120),
    eyebrow: "Blog",
    category: guessCategory(parts.title, parts.lead),
    readTime: estimateReadTime(words),
    featured: false,
    publishedAt: opts?.publishedAt ?? new Date().toISOString().slice(0, 10),
    tags: [],
    sidebar: {
      summary,
      audience: [],
      links: [],
    },
    blocks: blocksToArticleBlocks(parts.lead, parts.blocks),
  };
}

function hintsFromPost(post: BlogPost): ImportHints {
  return {
    title: post.title,
    slug: post.slug,
    subtitle: post.subtitle,
    category: post.category,
    readTime: post.readTime,
    summary: post.sidebar.summary,
    seoTitle: post.seoTitle,
    post,
  };
}

export async function parseDocumentBuffer(
  buffer: Buffer,
  filename: string,
): Promise<ImportHints> {
  const lower = filename.toLowerCase();
  let words = 0;

  if (lower.endsWith(".docx")) {
    const paragraphs = await extractDocxParagraphs(buffer);
    words = wordCountFromParagraphs(paragraphs);

    if (isSeoGeoDocxFormat(paragraphs)) {
      const chunks = seoDocxArticleChunks(paragraphs);
      if (!chunks[0]) throw new Error("Nenhum artigo SEO encontrado no DOCX.");
      const post = seoDocxChunkToBlogPost(chunks[0]);
      return hintsFromPost(post);
    }

    const parts = docxParagraphsToParts(paragraphs);
    const post = buildBlogPostFromParts(parts);
    return hintsFromPost(post);
  }

  if (lower.endsWith(".pdf")) {
    const paragraphs = await extractPdfParagraphs(buffer);
    const parts = pdfParagraphsToParts(paragraphs);
    words = wordCountFromStrings(paragraphs);
    const post = buildBlogPostFromParts(parts);
    return { ...hintsFromPost(post), readTime: estimateReadTime(words) };
  }

  throw new Error("Formato não suportado. Use .docx ou .pdf");
}

export async function parseBulkDocxBuffer(buffer: Buffer): Promise<ImportHints[]> {
  const paragraphs = await extractDocxParagraphs(buffer);
  const used = usedSlugs();

  if (isSeoGeoDocxFormat(paragraphs)) {
    const chunks = seoDocxArticleChunks(paragraphs);
    if (!chunks.length) {
      throw new Error("Nenhum artigo encontrado no DOCX SEO (marque Artigo 1, Artigo 2…).");
    }
    return chunks.map((chunk) => {
      const post = seoDocxChunkToBlogPost(chunk, { usedSlugs: used });
      return hintsFromPost(post);
    });
  }

  const chunks = bulkDocxArticleChunks(paragraphs);
  if (!chunks.length) {
    throw new Error(
      "Nenhum artigo encontrado no DOCX. Use o formato SEO (Artigo N + SourceCode) ou Compact/Heading.",
    );
  }

  return chunks.map((chunk) => {
    const parts = docxParagraphsToParts(chunk);
    const post = buildBlogPostFromParts(parts, { usedSlugs: used });
    return hintsFromPost(post);
  });
}

export function saveUploadedDocument(buffer: Buffer, slug: string, ext: string): string {
  ensureUploadDir();
  const safe = slugifyTitle(slug);
  const filePath = path.join(UPLOAD_DIR, `${Date.now()}_${safe}${ext}`);
  fs.writeFileSync(filePath, buffer);
  return filePath;
}

export async function buildFromDocxChunk(chunk: DocxParagraph[], used: Set<string>): Promise<ImportHints> {
  if (chunk.some((p) => p.style === "SourceCode" && /meta_title:/i.test(p.text))) {
    const post = seoDocxChunkToBlogPost(chunk, { usedSlugs: used });
    return hintsFromPost(post);
  }
  const parts = docxParagraphsToParts(chunk);
  const post = buildBlogPostFromParts(parts, { usedSlugs: used });
  return hintsFromPost(post);
}

export function detectDocxFormatLabel(paragraphs: DocxParagraph[]): "seo-geo" | "compact" {
  return isSeoGeoDocxFormat(paragraphs) ? "seo-geo" : "compact";
}

export function previewSeoChunkMeta(chunk: DocxParagraph[]) {
  const parts = seoDocxChunkToParts(chunk);
  return {
    title: parts.title,
    seoTitle: parts.meta.metaTitle,
    slug: parts.meta.slug,
    faqCount: parts.faq.length,
  };
}
