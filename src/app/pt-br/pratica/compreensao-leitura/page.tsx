import type { Metadata } from "next";
import { PracticeReadingIndexView } from "@/components/practice/PracticeReadingIndexView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/pratica/pratica.css";
import "@/components/practice/lesson/practice-lesson.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "practiceReading",
  title: "Compreensão de leitura do Celpe-Bras",
  description:
    "Treinar interpretação de texto em português no formato Celpe-Bras: textos autênticos anotados, vocabulário em contexto e questões de compreensão.",
});

export default function LerPage() {
  return <PracticeReadingIndexView />;
}
