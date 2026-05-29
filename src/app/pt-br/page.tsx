import type { Metadata } from "next";
import Link from "next/link";
import { HubPathStrip } from "@/components/decor/HubPathStrip";
import { SectionHeading } from "@/components/decor/SectionHeading";
import { siteBrand } from "@/lib/brand";
import { mainNav } from "@/lib/nav";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: SITE.titleDefault },
  alternates: { canonical: "/pt-br" },
};

const featured = [
  {
    href: "/pt-br/blog/analise-tarefa-1-festival-fartura-2026-1",
    label: "Blog",
    desc: "Análise Tarefa 1 — Festival Fartura",
    icon: "B",
    iconClass: "featured-icon-accent",
  },
  {
    href: "/pt-br/celpe-bras",
    label: "Celpe-Bras",
    desc: "Guia completo do exame",
    icon: "C",
    iconClass: "featured-icon-teal",
  },
  {
    href: "/pt-br/provas-anteriores/2026-1",
    label: "Provas 2026/1",
    desc: "Caderno, vídeo e materiais",
    icon: "P",
    iconClass: "featured-icon-teal",
  },
] as const;

const sectionIcons: Record<string, string> = {
  "/pt-br/celpe-bras": "◆",
  "/pt-br/provas-anteriores": "◇",
  "/pt-br/pratica": "○",
  "/pt-br/avaliacao": "◎",
  "/pt-br/teoria": "△",
  "/pt-br/blog": "✦",
  "/pt-br/materiais": "□",
};

export default function HomePage() {
  const sections = mainNav.filter(
    (item) => !["/pt-br/contato", "/pt-br/termos"].includes(item.href),
  );

  return (
    <div className="pb-4">
      <section className="surface-card surface-card-lift p-6 sm:p-8 lg:p-10">
        <span className="eyebrow">{siteBrand.tagline}</span>
        <h1 className="page-title page-title-display mt-4 max-w-[18ch]">
          Preparação para o Celpe-Bras
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Teoria, prática, provas anteriores e leituras sobre estratégia — portal em
          construção, {siteBrand.tagline}.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/pt-br/celpe-bras" className="btn-primary">
            Começar pelo guia
          </Link>
          <Link href="/pt-br/teoria" className="btn-secondary">
            Ver Teoria
          </Link>
        </div>
      </section>

      <div className="mt-8">
        <HubPathStrip />
      </div>

      <section className="mt-12">
        <SectionHeading
          title="Em destaque"
          subtitle="Comece por estes caminhos — cada um com materiais próprios."
        />
        <ul className="grid gap-3 sm:grid-cols-3">
          {featured.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hub-card hub-card-accent group p-5">
                <span className={`featured-icon ${item.iconClass}`}>{item.icon}</span>
                <span className="text-lg font-semibold text-teal">{item.label}</span>
                <p className="mt-1 text-sm text-muted">{item.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal">
                  Abrir
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <SectionHeading title="Todas as seções" />
        <ul className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hub-card group flex items-center gap-3 p-5">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--site-primary-highlight)] text-lg font-semibold text-teal"
                  aria-hidden
                >
                  {sectionIcons[item.href] ?? "•"}
                </span>
                <span className="text-lg font-semibold text-teal">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
