import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import "./archive.css";

export const metadata: Metadata = {
  title: "Provas Anteriores",
  description: "Arquivo de provas anteriores do Celpe-Bras por sessão e edição.",
};

const sessions = [
  {
    slug: "2026-1",
    title: "Celpe-Bras 2026/1",
    period: "28/04 a 01/05/2026",
    summary: "Prova escrita, parte oral, edital e materiais em PDF e vídeo.",
    materials: 6,
  },
];

export default function ProvasAnterioresPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Início", href: "/pt-br" }, { label: "Provas Anteriores" }]} />
      <h1 className="font-serif text-4xl font-bold text-teal">Provas Anteriores</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        Arquivo por sessão — materiais organizados por função, não como lista solta de arquivos.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {sessions.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/pt-br/provas-anteriores/${s.slug}`}
              className="archive-hero-card block p-6 transition-shadow hover:shadow-md"
              style={{
                background: "var(--site-surface)",
                border: "1px solid var(--site-border)",
                borderRadius: "1.4rem",
              }}
            >
              <div className="text-xs uppercase tracking-wider text-[#9e9b95]">Sessão</div>
              <h2 className="mt-2 font-serif text-2xl font-bold text-charcoal">{s.title}</h2>
              <p className="mt-2 text-sm text-muted">{s.summary}</p>
              <p className="mt-4 text-sm font-medium text-teal">
                {s.period} · {s.materials} materiais →
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
