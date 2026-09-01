import type { Metadata } from "next";
import { CelpeBrasGuideView } from "@/components/celpe-bras/CelpeBrasGuideView";
import { buildPageMetadata } from "@/i18n/metadata";
import "./celpe-bras.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "celpeBras",
  title: "Celpe-Bras: o que é, partes do exame e como se preparar",
  description:
    "Guia completo do Celpe-Bras: o que é o exame, partes escrita e oral, critérios de avaliação, níveis de proficiência e como estudar. Pratique de graça com provas anteriores.",
  keywords: [
    "celpe bras",
    "celpe-bras",
    "exame celpe bras",
    "celpe bras o que é",
    "partes do celpe bras",
    "como se preparar para o celpe bras",
    "celpe bras provas anteriores",
    "níveis celpe bras",
  ],
});

export default function CelpeBrasPage() {
  return <CelpeBrasGuideView locale="pt-br" />;
}
