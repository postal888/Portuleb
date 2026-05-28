import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveSessionView } from "@/components/archive/ArchiveSessionView";
import { session2026_1 } from "@/content/archive/2026-1";
import "../archive.css";

const sessions: Record<string, typeof session2026_1> = {
  "2026-1": session2026_1,
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const session = sessions[slug];
  if (!session) return { title: "Sessão não encontrada" };
  return {
    title: `${session.title} — Provas Anteriores`,
    description: session.lead,
  };
}

export default async function ArchiveSessionPage({ params }: Props) {
  const { slug } = await params;
  const session = sessions[slug];
  if (!session) notFound();

  return <ArchiveSessionView session={session} />;
}
