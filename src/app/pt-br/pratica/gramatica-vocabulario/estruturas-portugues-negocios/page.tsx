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
  const absolute = absoluteUrl(path);

  return {
    title,
    description: lesson.meta.seoDescription,
    keywords: lesson.meta.tags,
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
