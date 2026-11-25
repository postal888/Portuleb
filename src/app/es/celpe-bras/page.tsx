import type { Metadata } from "next";
import { CelpeBrasGuideView } from "@/components/celpe-bras/CelpeBrasGuideView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/celpe-bras/celpe-bras.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "es",
  section: "celpeBras",
  title: "Celpe-Bras — guía completa del examen",
  description:
    "Qué es el Celpe-Bras, partes escrita y oral, criterios, niveles, inscripción y calendario. Guía independiente para hispanohablantes.",
});

export default function EsCelpeBrasPage() {
  return <CelpeBrasGuideView locale="es" />;
}
