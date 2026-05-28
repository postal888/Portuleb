import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveSessionView } from "@/components/archive/ArchiveSessionView";
import { JsonLd } from "@/components/seo/JsonLd";
import { session2026_1 } from "@/content/archive/2026-1";
import { absoluteUrl } from "@/lib/site";
import "../archive.css";

const sessions: Record<string, typeof session2026_1> = {
  "2026-1": session2026_1,
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(sessions).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const session = sessions[slug];
  if (!session) return { title: "Sessão não encontrada" };

  return {
    title: `${session.title} — Provas Anteriores`,
    description: session.lead,
    alternates: { canonical: `/pt-br/provas-anteriores/${slug}` },
  };
}

export default async function ArchiveSessionPage({ params }: Props) {
  const { slug } = await params;
  const session = sessions[slug];
  if (!session) notFound();

  const url = absoluteUrl(`/pt-br/provas-anteriores/${slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/pt-br") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Provas Anteriores",
        item: absoluteUrl("/pt-br/provas-anteriores"),
      },
      { "@type": "ListItem", position: 3, name: session.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ArchiveSessionView session={session} />
    </>
  );
}
