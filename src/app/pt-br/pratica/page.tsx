import type { Metadata } from "next";
import { PracticeHubView } from "@/components/practice/PracticeHubView";
import { buildPageMetadata } from "@/i18n/metadata";
import "./pratica.css";
import "./exercicios.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "practice",
  title: "Prática Celpe-Bras: ouvir, ler e escrever",
  description:
    "Prática no formato real do Celpe-Bras: compreensão auditiva com vídeos, leitura de textos anotados, produção escrita das quatro tarefas e exercícios de base.",
});

export default function PraticaPage() {
  return <PracticeHubView locale="pt-br" />;
}
