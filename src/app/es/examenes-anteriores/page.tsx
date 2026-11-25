import type { Metadata } from "next";
import { PastExamsIndexView } from "@/components/archive/PastExamsIndexView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/provas-anteriores/archive.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "es",
  section: "pastExams",
  title: "Archivo de exámenes anteriores del Celpe-Bras",
  description:
    "Archivo gratuito de ediciones del Celpe-Bras: cuadernillos, videos de tareas, guiones de la parte oral y elementos provocadores.",
});

export default function EsPastExamsPage() {
  return <PastExamsIndexView locale="es" />;
}
