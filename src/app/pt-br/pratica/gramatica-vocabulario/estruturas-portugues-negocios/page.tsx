import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticeLessonPage } from "@/components/practice/lesson/PracticeLessonPage";
import { getPracticeLessonByPath } from "@/content/practice";
import { practiceLessonPath } from "@/content/practice/lesson-paths";
import { absoluteUrl } from "@/lib/site";
import "@/app/pt-br/pratica/pratica.css";
import "@/components/practice/lesson/practice-lesson.css";

const CATEGORY = "gramatica-vocabulario";
const SLUG = "estruturas-portugues-negocios";

export function generateMetadata(): Metadata {
  const lesson = getPracticeLessonByPath(CATEGORY, SLUG);
  if (!lesson) return { title: "Lição não encontrada" };

  const path = practiceLessonPath(CATEGORY, SLUG);
  const title = lesson.meta.seoTitle;

  return {
    title,
    description: lesson.meta.seoDescription,
    keywords: lesson.meta.tags,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      url: absoluteUrl(path),
      title,
      description: lesson.meta.seoDescription,
    },
  };
}

export default function EstruturasPortuguesNegociosPage() {
  const lesson = getPracticeLessonByPath(CATEGORY, SLUG);
  if (!lesson) notFound();

  return <PracticeLessonPage lesson={lesson} />;
}
