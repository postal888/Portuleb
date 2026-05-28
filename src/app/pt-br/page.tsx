import Image from "next/image";
import Link from "next/link";
import { HubPathStrip } from "@/components/decor/HubPathStrip";
import { IllustrationFrame } from "@/components/decor/IllustrationFrame";
import { SectionHeading } from "@/components/decor/SectionHeading";
import { mainNav } from "@/lib/nav";

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
      <section className="surface-card surface-card-lift overflow-hidden">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-10">
          <div>
            <span className="eyebrow">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
              PortuLebre Hub
            </span>
            <h1 className="page-title page-title-display mt-4 max-w-[14ch]">
              Preparação para o Celpe-Bras
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Portal em construção passo a passo: teoria, prática, provas anteriores e leituras
              sobre estratégia de estudo.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/pt-br/celpe-bras" className="btn-primary">
                Começar pelo guia
              </Link>
              <Link href="/pt-br/teoria" className="btn-secondary">
                Ver Teoria
              </Link>
            </div>
          </div>
          <IllustrationFrame>
            <Image
              src="/images/hero-illustration.png"
              alt="Ilustração: leitura, escrita e elementos do exame em português"
              width={640}
              height={480}
              className="h-auto w-full"
              priority
            />
          </IllustrationFrame>
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
                <span className="font-serif text-lg font-semibold text-teal">{item.label}</span>
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
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--site-primary-highlight)] font-serif text-lg text-teal"
                  aria-hidden
                >
                  {sectionIcons[item.href] ?? "•"}
                </span>
                <span className="font-serif text-lg font-semibold text-teal">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
