import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TheoryTopicPage } from "@/components/teoria/topic/TheoryTopicPage";
import { getTheoryTopic, theoryTopics, theoryTopicPath } from "@/content/teoria/topics";
import { articleJsonLd, breadcrumbJsonLd, buildPageMetadata, faqJsonLd } from "@/i18n/metadata";
import { pathFor } from "@/i18n/route-map";
import "@/app/pt-br/pratica/pratica.css";
import "@/components/practice/lesson/practice-lesson.css";
import "@/components/teoria/topic/theory-topic.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return theoryTopics.map((topic) => ({ slug: topic.meta.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTheoryTopic(slug);
  if (!topic) return { title: "Tema não encontrado" };

  return buildPageMetadata({
    locale: "pt-br",
    section: "theoryTopic",
    params: { slug },
    title: topic.meta.seoTitle,
    description: topic.meta.seoDescription,
    keywords: [topic.meta.keyword, ...topic.meta.tags],
    ogType: "article",
    publishedTime: topic.meta.publishedAt,
  });
}

export default async function TeoriaTopicoPage({ params }: Params) {
  const { slug } = await params;
  const topic = getTheoryTopic(slug);
  if (!topic) notFound();

  const path = theoryTopicPath(slug);

  const schema = [
    articleJsonLd("pt-br", {
      path,
      headline: topic.meta.seoTitle,
      description: topic.meta.seoDescription,
      datePublished: topic.meta.publishedAt,
      dateModified: topic.meta.updatedAt,
      keywords: [topic.meta.keyword, ...topic.meta.tags],
      section: "Teoria",
    }),
    breadcrumbJsonLd("pt-br", [
      { name: "Início", path: pathFor("pt-br", "home") },
      { name: "Teoria", path: pathFor("pt-br", "theory") },
      { name: topic.meta.title, path },
    ]),
    faqJsonLd(topic.faq),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TheoryTopicPage topic={topic} />
    </>
  );
}
