import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveSessionView } from "@/components/archive/ArchiveSessionView";
import { JsonLd } from "@/components/seo/JsonLd";
import { archiveSlugs, getArchiveSession } from "@/content/archive";
import { buildPageMetadata } from "@/i18n/metadata";
import { buildArchiveSessionJsonLd } from "@/lib/seo/archive-schema";
import "@/app/pt-br/provas-anteriores/archive.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return archiveSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const session = getArchiveSession(slug, "es");
  if (!session) return { title: "Sesión no encontrada" };

  return buildPageMetadata({
    locale: "es",
    section: "pastExamSession",
    params: { slug },
    title: `${session.title} — Exámenes anteriores`,
    description: session.lead,
  });
}

export default async function EsPastExamSessionPage({ params }: Props) {
  const { slug } = await params;
  const session = getArchiveSession(slug, "es");
  if (!session) notFound();

  const schemas = buildArchiveSessionJsonLd("es", slug, session);

  return (
    <>
      <JsonLd data={schemas} />
      <ArchiveSessionView session={session} locale="es" />
    </>
  );
}
