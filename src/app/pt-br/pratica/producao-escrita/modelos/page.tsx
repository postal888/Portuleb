import type { Metadata } from "next";
import { WritingModelos } from "@/components/practice/WritingModelos";
import { absoluteUrl } from "@/lib/site";
import "@/app/pt-br/pratica/pratica.css";
import "@/components/practice/escrita-nav.css";

export const metadata: Metadata = {
  title: "Modelos de texto da parte escrita do Celpe-Bras",
  description:
    "Quatro modelos para a parte escrita do Celpe-Bras: apresentar ao público, pedir a quem decide, informar o seu grupo e opinar sobre um texto.",
  alternates: {
    canonical: absoluteUrl("/pt-br/pratica/producao-escrita/modelos"),
  },
};

export default function ModelosPage() {
  return <WritingModelos />;
}
