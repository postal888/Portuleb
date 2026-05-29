import type { Metadata } from "next";
import Link from "next/link";
import { AssessmentLauncher } from "@/components/assessment/assessment-launcher";
import "./avaliacao.css";

export const metadata: Metadata = {
  title: "Avaliação",
  description: "Testes rápidos de autoavaliação de leitura para preparação ao Celpe-Bras.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/pt-br/avaliacao" },
};

export default function AvaliacaoPage() {
  return (
    <div className="avaliacao-page">
      <nav className="avaliacao-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/pt-br">Início</Link>
        <span aria-hidden> / </span>
        <span>Avaliação</span>
      </nav>
      <AssessmentLauncher />
    </div>
  );
}
