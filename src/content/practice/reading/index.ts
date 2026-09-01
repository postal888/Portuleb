import { readingArticlePath } from "./article-paths";
import { comidasGigantesCaruaru } from "./comidas-gigantes";
import { historiaBrasil500Anos } from "./500-anos-historia-brasil";
import { quemPodeApostarNoFuturo } from "./quem-pode-apostar-no-futuro";
import { vereadorPccTransuniao } from "./vereador-pcc-transuniao";
import type { ReadingArticle, ReadingArticleSummary } from "./types";

export const readingArticles: ReadingArticle[] = [
  historiaBrasil500Anos,
  comidasGigantesCaruaru,
  vereadorPccTransuniao,
  quemPodeApostarNoFuturo,
];

const READING_CATEGORY = "compreensao-leitura";
const LISTENING_CATEGORY = "compreensao-auditiva";

function toSummary(article: ReadingArticle): ReadingArticleSummary {
  return {
    slug: article.meta.slug,
    href: readingArticlePath(article.meta.categoryPath, article.meta.slug),
    title: article.hero.title,
    subtitle: article.hero.lead.slice(0, 140) + (article.hero.lead.length > 140 ? "…" : ""),
    meta: `${article.meta.level} · ${article.meta.duration}`,
    badge: article.meta.eyebrow.split("·").pop()?.trim() ?? "Prática",
  };
}

export function listReadingArticleSummaries(): ReadingArticleSummary[] {
  return readingArticles
    .filter((article) => article.meta.categoryPath === READING_CATEGORY)
    .map(toSummary);
}

export function listListeningLessonSummaries(): ReadingArticleSummary[] {
  return readingArticles
    .filter((article) => article.meta.categoryPath === LISTENING_CATEGORY)
    .map(toSummary);
}

export function getReadingArticle(slug: string): ReadingArticle | undefined {
  return readingArticles.find((a) => a.meta.slug === slug);
}

export function getReadingArticleByPath(
  categoryPath: string,
  slug: string,
): ReadingArticle | undefined {
  const article = getReadingArticle(slug);
  if (!article || article.meta.categoryPath !== categoryPath) return undefined;
  return article;
}

export type { ReadingArticle } from "./types";
