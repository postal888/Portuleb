import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadingArticlePage } from "@/components/practice/reading/ReadingArticlePage";
import { getReadingArticleByPath } from "@/content/practice/reading";
import { absoluteUrl } from "@/lib/site";
import "@/app/pt-br/pratica/pratica.css";
import "@/components/practice/lesson/practice-lesson.css";
import "@/components/practice/reading/reading-lesson.css";

const CATEGORY = "compreensao-leitura";
const SLUG = "vereador-pcc-transuniao";

export function generateMetadata(): Metadata {
  const article = getReadingArticleByPath(CATEGORY, SLUG);
  if (!article) return { title: "Texto não encontrado" };

  const path = `/pt-br/pratica/${CATEGORY}/${SLUG}`;
  const absolute = absoluteUrl(path);
  return {
    title: article.meta.seoTitle,
    description: article.meta.seoDescription,
    keywords: article.meta.tags,
    alternates: {
      canonical: path,
      languages: {
        "pt-BR": absolute,
        "x-default": absolute,
      },
    },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url: absolute,
      title: article.meta.seoTitle,
      description: article.meta.seoDescription,
    },
  };
}

export default function VereadorPccTransuniaoPage() {
  const article = getReadingArticleByPath(CATEGORY, SLUG);
  if (!article) notFound();
  return <ReadingArticlePage article={article} />;
}
