import type { Metadata } from "next";
import { PracticeHubView } from "@/components/practice/PracticeHubView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/pratica/pratica.css";
import "@/app/pt-br/pratica/exercicios.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  section: "practice",
  title: "Celpe-Bras practice: listening, reading, writing",
  description:
    "Practise in the real Celpe-Bras format: listening with subtitled task videos, annotated reading texts, the four writing tasks and grammar drills.",
});

export default function EnPracticePage() {
  return <PracticeHubView locale="en" />;
}
