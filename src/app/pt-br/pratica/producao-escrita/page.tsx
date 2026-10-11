import type { Metadata } from "next";
import { WritingCatalog } from "@/components/practice/WritingCatalog";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/pratica/pratica.css";
import "@/components/practice/escrita-nav.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "practiceWriting",
  title: "Escrita: tarefas da parte escrita do Celpe-Bras",
  description:
    "Escolha uma tarefa da parte escrita por edição, leia os modelos de texto e escreva com o vídeo, o áudio ou o texto de apoio.",
});

export default function EscreverPage() {
  return <WritingCatalog />;
}
