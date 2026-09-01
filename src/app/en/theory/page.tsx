import type { Metadata } from "next";
import { TheoryHubView } from "@/components/teoria/TheoryHubView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/pratica/pratica.css";
import "@/app/pt-br/teoria/verbos.css";
import "@/app/pt-br/teoria/teoria-hub.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  section: "theory",
  title: "Portuguese grammar and vocabulary for Celpe-Bras",
  description:
    "Brazilian Portuguese grammar and vocabulary by topic: crase, verb agreement, connectives, subjunctive and passive voice — with tables, examples and quizzes.",
});

export default function EnTheoryPage() {
  return <TheoryHubView locale="en" />;
}
