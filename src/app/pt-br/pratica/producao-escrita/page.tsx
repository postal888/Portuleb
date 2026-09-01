import type { Metadata } from "next";
import { PracticeWritingView } from "@/components/practice/PracticeWritingView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/pratica/pratica.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "practiceWriting",
  title: "Produção escrita do Celpe-Bras e critérios",
  description:
    "Praticar a produção escrita das quatro tarefas do Celpe-Bras com avaliação alinhada aos critérios oficiais da banca: adequação, coesão e adequação linguística.",
});

export default function EscreverPage() {
  return <PracticeWritingView locale="pt-br" />;
}
