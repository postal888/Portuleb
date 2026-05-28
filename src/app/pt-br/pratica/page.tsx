import type { Metadata } from "next";
import { PracticeHubView } from "@/components/practice/PracticeHubView";
import "./pratica.css";

export const metadata: Metadata = {
  title: "Prática",
  description:
    "Praticar o formato do Celpe-Bras: ouvir, ler, escrever e drills de gramática e vocabulário.",
  alternates: { canonical: "/pt-br/pratica" },
};

export default function PraticaPage() {
  return <PracticeHubView />;
}
