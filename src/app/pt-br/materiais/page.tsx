import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/SectionPlaceholder";
import { buildPageMetadata } from "@/i18n/metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "materials",
  title: "Materiais gratuitos para o Celpe-Bras",
  description:
    "Materiais gratuitos de preparação para o Celpe-Bras: cadernos de questões, vídeos das tarefas, listas de vocabulário e guias de estudo.",
});

export default function MateriaisPage() {
  return <SectionPlaceholder locale="pt-br" title="Materiais" />;
}
