import type { Metadata } from "next";
import { TheoryHubView } from "@/components/teoria/TheoryHubView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/pratica/pratica.css";
import "@/app/pt-br/teoria/verbos.css";
import "@/app/pt-br/teoria/teoria-hub.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "es",
  section: "theory",
  title: "Gramática y vocabulario de portugués para el Celpe-Bras",
  description:
    "Gramática y vocabulario de portugués brasileño por tema: crase, concordancia verbal, conectores, subjuntivo y voz pasiva — con tablas, ejemplos y quizzes.",
});

export default function EsTheoryPage() {
  return <TheoryHubView locale="es" />;
}
