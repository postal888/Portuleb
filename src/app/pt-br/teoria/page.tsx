import type { Metadata } from "next";
import { TheoryHubView } from "@/components/teoria/TheoryHubView";
import { buildPageMetadata } from "@/i18n/metadata";
import "../pratica/pratica.css";
import "./verbos.css";
import "./teoria-hub.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "theory",
  title: "Teoria: gramática e vocabulário para o Celpe-Bras",
  description:
    "Gramática e vocabulário do português explicados por tema: crase, concordância, conectivos, subjuntivo e voz passiva — com tabelas, exemplos e testes.",
});

export default function TeoriaPage() {
  return <TheoryHubView locale="pt-br" />;
}
