import type { Metadata } from "next";
import { PracticePolishBaseView } from "@/components/practice/PracticePolishBaseView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/pratica/pratica.css";
import "@/app/pt-br/pratica/exercicios.css";
import "@/components/practice/lesson/practice-lesson.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "practiceFoundation",
  title: "Exercícios de gramática e vocabulário em português",
  description:
    "Exercícios de gramática e vocabulário do português: conjugação verbal, tempos, artigos e contrações, com lições guiadas e correção imediata.",
});

export default function PolirBasePage() {
  return <PracticePolishBaseView locale="pt-br" />;
}
