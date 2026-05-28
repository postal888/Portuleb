import type { Metadata } from "next";
import Link from "next/link";
import { CelpeExamBanner } from "@/components/celpe-bras/CelpeExamBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { CelpeInstructionList } from "@/components/celpe-bras/CelpeInstructionList";
import { CelpeTaskStrip } from "@/components/celpe-bras/CelpeTaskStrip";
import { SectionHeading } from "@/components/decor/SectionHeading";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { examInstructions2026_1 } from "@/content/celpe-bras/exam-instructions";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ScoreBandsTable } from "@/components/ui/ScoreBandsTable";
import "./celpe-bras.css";

export const metadata: Metadata = {
  title: "Celpe-Bras — Guia completo do exame",
  description:
    "Visão geral do Celpe-Bras: partes do exame, critérios de avaliação, níveis de proficiência, inscrição e calendário.",
  alternates: { canonical: "/pt-br/celpe-bras" },
};

const quickFacts = [
  "Exame oficial brasileiro de proficiência em português para estrangeiros.",
  "Aplicado no Brasil e no exterior.",
  "Realizado, em geral, duas vezes por ano.",
  "Composto por uma parte escrita (3 horas, 4 tarefas) e uma parte oral (~20 min).",
  "Certifica quatro níveis de proficiência.",
  "As informações oficiais são publicadas no sistema e nas páginas do Celpe-Bras/Inep.",
];

const indexLinks = [
  { href: "#caderno-2026-1", label: "Caderno 2026/1" },
  { href: "#o-que-e-o-celpe-bras", label: "O que é o Celpe-Bras" },
  { href: "#como-funciona-o-exame", label: "Como funciona o exame" },
  { href: "#partes-do-exame", label: "Partes do exame" },
  { href: "#criterios-de-avaliacao", label: "Critérios de avaliação" },
  { href: "#niveis-e-resultados", label: "Níveis e resultados" },
  { href: "#inscricao-e-calendario", label: "Inscrição e calendário" },
  { href: "#perguntas-frequentes", label: "Perguntas frequentes" },
];

const faq = [
  {
    question: "O que é o Celpe-Bras?",
    answer: "É o exame oficial brasileiro para certificar a proficiência em português como língua estrangeira.",
  },
  {
    question: "O exame é reconhecido oficialmente?",
    answer: "Sim. O Celpe-Bras é o certificado oficialmente reconhecido pelo governo brasileiro para esse fim.",
  },
  {
    question: "Quais são as partes do exame?",
    answer:
      "O exame tem uma parte escrita e uma parte oral. A parte escrita envolve tarefas ligadas à compreensão e à produção, e a parte oral avalia a interação em português face a face.",
  },
  {
    question: "Quantos níveis de certificação existem?",
    answer: "Existem quatro níveis: Intermediário, Intermediário Superior, Avançado e Avançado Superior.",
  },
  {
    question: "O certificado tem validade?",
    answer: "Não. O certificado do Celpe-Bras não tem prazo de validade.",
  },
  {
    question: "Onde acompanhar inscrição e resultados?",
    answer:
      "No sistema oficial do exame e nas páginas oficiais do Celpe-Bras/Inep, além das orientações do centro aplicador quando necessário.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function CelpeBrasPage() {
  return (
    <div className="celpe-guide">
      <JsonLd data={faqSchema} />
      <Breadcrumbs items={[{ label: "Início", href: "/pt-br" }, { label: "Celpe-Bras" }]} />

      <CelpeExamBanner />

      <div className="surface-card surface-card-lift celpe-hero-inner relative overflow-hidden p-6 sm:p-8">
        <span className="eyebrow">Guia do exame</span>
        <h1 className="page-title relative mt-3 text-charcoal">
          Celpe-Bras: guia completo do exame
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
          O Celpe-Bras é o exame oficial do Brasil para certificar a proficiência em português como
          língua estrangeira. Nesta página, você encontra uma visão geral de como o exame funciona,
          quais são suas partes, como é a avaliação e onde acompanhar informações importantes sobre
          inscrição e resultados.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#caderno-2026-1" className="btn-primary">
            Ver caderno 2026/1
          </a>
          <Link href="/pt-br/provas-anteriores/2026-1" className="btn-secondary">
            Explorar provas anteriores
          </Link>
        </div>
      </div>

      <section id="caderno-2026-1" className="surface-card mt-10 scroll-mt-24 p-6 sm:p-8">
        <SectionHeading
          title="Do caderno de questões (2026/1)"
          subtitle="Instruções da capa do material oficial da Parte Escrita — mesmas cores e estrutura do exame."
        />
        <CelpeTaskStrip />
        <div className="mt-6">
          <CelpeInstructionList items={examInstructions2026_1} />
        </div>
        <Link
          href="/pt-br/provas-anteriores/2026-1#material-caderno"
          className="celpe-caderno-link"
        >
          Abrir o PDF do caderno no acervo →
        </Link>
      </section>

      <section className="surface-card mt-10 p-6 sm:p-8">
        <SectionHeading title="Informações rápidas" />
        <ul className="mt-4 space-y-2 text-charcoal/85">
          {quickFacts.map((fact) => (
            <li key={fact} className="flex gap-2">
              <span className="quick-fact-dot mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface-card mt-10 p-6 sm:p-8">
        <SectionHeading title="Índice" />
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {indexLinks.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-lg px-3 py-2 text-[var(--celpe-blue)] transition-colors hover:bg-[var(--celpe-green-pale)] hover:text-[var(--celpe-green)]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="o-que-e-o-celpe-bras" className="surface-card mt-10 scroll-mt-24 space-y-4 p-6 sm:p-8">
        <SectionHeading title="O que é o Celpe-Bras" />
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          O Celpe-Bras é o certificado oficial brasileiro de proficiência em português para
          estrangeiros. Ele é reconhecido pelo governo brasileiro e funciona como referência para
          pessoas que precisam comprovar seu nível de português em contextos acadêmicos,
          profissionais e institucionais.
        </p>
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          Mais do que verificar conhecimento isolado de gramática, o exame busca observar a
          capacidade de usar a língua em situações comunicativas mais amplas. Por isso, entender a
          lógica da prova é tão importante quanto conhecer vocabulário, estruturas e regras da língua.
        </p>
      </section>

      <section id="como-funciona-o-exame" className="surface-card mt-10 scroll-mt-24 space-y-4 p-6 sm:p-8">
        <SectionHeading title="Como funciona o exame" />
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          O exame é dividido em duas partes: uma parte escrita e uma parte oral. A parte escrita tem
          cerca de <strong>3 horas</strong>, e a parte oral tem cerca de 20 minutos.
        </p>
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          De forma geral, a parte escrita reúne tarefas que envolvem compreensão e produção,
          enquanto a parte oral avalia o desempenho do candidato em interação face a face. A proposta
          do exame é observar como a pessoa interpreta informações, organiza respostas e usa o
          português para cumprir objetivos comunicativos.
        </p>
      </section>

      <section id="partes-do-exame" className="surface-card mt-10 scroll-mt-24 space-y-4 p-6 sm:p-8">
        <SectionHeading title="Partes do exame" />
        <div className="grid gap-4 md:grid-cols-2">
          <article className="surface-card-muted celpe-parte-card p-5">
            <h3 className="font-semibold text-[var(--celpe-green)]">Compreensão oral</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/85">
              Na parte escrita, o candidato precisa compreender informações apresentadas em materiais
              em áudio e utilizá-las nas tarefas propostas.
            </p>
          </article>
          <article className="surface-card-muted celpe-parte-card-alt p-5">
            <h3 className="font-semibold text-[var(--celpe-blue)]">Leitura</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/85">
              A leitura aparece na interpretação de textos escritos e no uso dessas informações para
              elaborar respostas adequadas à tarefa.
            </p>
          </article>
          <article className="surface-card-muted celpe-parte-card p-5">
            <h3 className="font-semibold text-[var(--celpe-green)]">Produção escrita</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/85">
              A produção escrita é avaliada por meio de tarefas baseadas em diferentes insumos, como
              vídeo, áudio e textos escritos. O foco está na capacidade de produzir um texto adequado
              à proposta, com clareza, coerência e uso funcional da língua.
            </p>
          </article>
          <article className="surface-card-muted celpe-parte-card-alt p-5">
            <h3 className="font-semibold text-[var(--celpe-blue)]">Entrevista oral</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/85">
              A parte oral acontece em formato de interação face a face. Nessa etapa, o candidato
              conversa com os avaliadores a partir de temas e estímulos apresentados durante a
              entrevista.
            </p>
          </article>
        </div>
      </section>

      <section id="criterios-de-avaliacao" className="surface-card mt-10 scroll-mt-24 space-y-4 p-6 sm:p-8">
        <SectionHeading title="Critérios de avaliação" />
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          O Celpe-Bras não se limita a medir acertos gramaticais isolados. O exame considera o
          desempenho do candidato de forma mais ampla, observando como ele compreende os materiais,
          responde às tarefas e usa a língua de forma adequada à situação proposta.
        </p>
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          Na prática, isso significa que a avaliação leva em conta a adequação da resposta, a
          organização do texto ou da fala, a clareza da comunicação e a capacidade de cumprir o
          objetivo comunicativo da tarefa. Entender esse ponto ajuda a evitar uma preparação baseada
          apenas em memorização de regras.
        </p>
      </section>

      <section id="niveis-e-resultados" className="surface-card mt-10 scroll-mt-24 space-y-4 p-6 sm:p-8">
        <SectionHeading title="Níveis e resultados" />
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          O exame certifica quatro níveis de proficiência: Intermediário, Intermediário Superior,
          Avançado e Avançado Superior. Candidatos que não atingem a pontuação mínima não recebem
          certificação.
        </p>
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          Alguns centros aplicadores e materiais explicativos apresentam as faixas de pontuação da
          seguinte forma:
        </p>
        <ScoreBandsTable />
        <p className="surface-card-muted mt-5 max-w-4xl px-4 py-3 text-sm leading-relaxed text-charcoal/90">
          <span className="font-semibold text-[var(--celpe-green)]">Validade do certificado.</span>{" "}
          O certificado do Celpe-Bras não tem prazo de validade.
        </p>
      </section>

      <section id="inscricao-e-calendario" className="surface-card mt-10 scroll-mt-24 space-y-4 p-6 sm:p-8">
        <SectionHeading title="Inscrição e calendário" />
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          O Celpe-Bras é realizado, em geral, duas vezes por ano, normalmente em uma edição no
          primeiro semestre e outra no segundo. As inscrições, o cronograma de aplicação e a
          divulgação dos resultados devem ser acompanhados no sistema oficial do exame e nas
          comunicações do Inep e dos centros aplicadores.
        </p>
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          Como datas e procedimentos podem mudar a cada edição, a forma mais segura de se informar é
          consultar sempre a página oficial do Celpe-Bras no Inep e o sistema de inscrição do exame.
        </p>
      </section>

      <section className="surface-card mt-10 p-6 sm:p-8">
        <SectionHeading title="Próximos passos" />
        <ul className="mt-4 space-y-2 text-charcoal/90">
          <li>
            <a href="#caderno-2026-1" className="text-[var(--celpe-blue)] hover:underline">
              Ver instruções do caderno
            </a>{" "}
            — Regras da Parte Escrita 2026/1.
          </li>
          <li>
            <a href="#partes-do-exame" className="text-[var(--celpe-blue)] hover:underline">
              Ver partes do exame
            </a>{" "}
            — Entenda melhor cada componente da prova.
          </li>
          <li>
            <Link href="/pt-br/provas-anteriores" className="text-[var(--celpe-blue)] hover:underline">
              Explorar provas anteriores
            </Link>{" "}
            — Consulte edições passadas e use o acervo como referência.
          </li>
          <li>
            <Link href="/pt-br/pratica" className="text-[var(--celpe-blue)] hover:underline">
              Ir para prática
            </Link>{" "}
            — Treine por habilidade.
          </li>
          <li>
            <Link
              href="/pt-br/blog/estrategia-minimalista-celpe-bras"
              className="text-[var(--celpe-blue)] hover:underline"
            >
              Ler o blog
            </Link>{" "}
            — Estratégias e abordagens para o exame.
          </li>
        </ul>
      </section>

      <section id="perguntas-frequentes" className="surface-card mt-10 scroll-mt-24 p-6 sm:p-8">
        <SectionHeading title="Perguntas frequentes" />
        <div className="mt-4">
          <FAQAccordion items={faq} />
        </div>
      </section>
    </div>
  );
}
