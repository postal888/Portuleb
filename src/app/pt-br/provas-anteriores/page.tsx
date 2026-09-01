import type { Metadata } from "next";
import { PastExamsIndexView } from "@/components/archive/PastExamsIndexView";
import { buildPageMetadata } from "@/i18n/metadata";
import "./archive.css";

export const metadata: Metadata = buildPageMetadata({
  locale: "pt-br",
  section: "pastExams",
  title: "Acervo Celpe-Bras: provas anteriores e vídeos",
  description:
    "Acervo gratuito de provas anteriores do Celpe-Bras por edição: caderno de questões, vídeos das tarefas, roteiros da parte oral e elementos provocadores.",
});

export default function ProvasAnterioresPage() {
  return <PastExamsIndexView locale="pt-br" />;
}
