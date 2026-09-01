import type { Metadata } from "next";
import { PracticeListeningIndexView } from "@/components/practice/PracticeListeningIndexView";
import { buildPageMetadata } from "@/i18n/metadata";
import "@/app/pt-br/pratica/pratica.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "practiceListening",
  title: "Compreensão auditiva do Celpe-Bras com legendas",
  description:
    "Treinar compreensão auditiva em português no formato Celpe-Bras: vídeos das tarefas com legendas sincronizadas, glossário e expressões anotadas.",
});

export default function OuvirPage() {
  return <PracticeListeningIndexView />;
}
