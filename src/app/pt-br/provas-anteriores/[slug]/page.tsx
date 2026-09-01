import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveSessionView } from "@/components/archive/ArchiveSessionView";
import { JsonLd } from "@/components/seo/JsonLd";
import { archiveSlugs, getArchiveSession } from "@/content/archive";
import { buildPageMetadata } from "@/i18n/metadata";
import { buildArchiveSessionJsonLd } from "@/lib/seo/archive-schema";
import "../archive.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return archiveSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const session = getArchiveSession(slug, "pt-br");
  if (!session) return { title: "Sessão não encontrada" };

  return buildPageMetadata({
    locale: "pt-br",
    section: "pastExamSession",
    params: { slug },
    title: `${session.title} — Provas Anteriores`,
    description: session.lead,
  });
}

export default async function ArchiveSessionPage({ params }: Props) {
  const { slug } = await params;
  const session = getArchiveSession(slug, "pt-br");
  if (!session) notFound();

  const schemas = buildArchiveSessionJsonLd("pt-br", slug, session);

  return (
    <>
      <JsonLd data={schemas} />
      <ArchiveSessionView session={session} locale="pt-br" />
    </>
  );
}
