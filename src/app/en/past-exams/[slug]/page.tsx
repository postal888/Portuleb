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
  const session = getArchiveSession(slug, "en");
  if (!session) return { title: "Session not found" };

  return buildPageMetadata({
    locale: "en",
    section: "pastExamSession",
    params: { slug },
    title: `${session.title} — Past exams`,
    description: session.lead,
  });
}

export default async function EnPastExamSessionPage({ params }: Props) {
  const { slug } = await params;
  const session = getArchiveSession(slug, "en");
  if (!session) notFound();

  const schemas = buildArchiveSessionJsonLd("en", slug, session);

  return (
    <>
      <JsonLd data={schemas} />
      <ArchiveSessionView session={session} locale="en" />
    </>
  );
}
