import type { Metadata } from "next";
import { TheoryHubView } from "@/components/teoria/TheoryHubView";
import "../pratica/pratica.css";

export const metadata: Metadata = {
  title: "Teoria",
  description:
    "Revisar gramática, vocabulário e estrutura textual com explicações, tabelas e testes por tema.",
  alternates: { canonical: "/pt-br/teoria" },
};

export default function TeoriaPage() {
  return <TheoryHubView />;
}
