import type { Metadata } from "next";
import { ReaderView } from "@/components/reader/ReaderView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/leitor/reader.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "es",
  section: "reader",
  title: "Lector de textos en portugués con desplazamiento automático",
  description:
    "Sube un PDF, Word o archivo de texto y lee con desplazamiento automático — ajusta la velocidad y el tamaño de fuente para practicar la lectura en portugués.",
});

export default function EsReaderPage() {
  return <ReaderView locale="es" />;
}
