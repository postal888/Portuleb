import type { Metadata } from "next";
import { ReaderView } from "@/components/reader/ReaderView";
import { buildPageMetadata } from "@/i18n/metadata";
import "./reader.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "reader",
  title: "Leitor de textos em português com rolagem automática",
  description:
    "Carregue um PDF, Word ou texto e leia com rolagem automática — ajuste a velocidade e o tamanho da letra para treinar a leitura em português.",
});

export default function LeitorPage() {
  return <ReaderView locale="pt-br" />;
}
