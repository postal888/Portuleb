import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ScoreBandsTable } from "@/components/ui/ScoreBandsTable";

export const metadata: Metadata = {
  title: "Celpe-Bras — Guia completo do exame",
  description:
    "Visão geral do Celpe-Bras: partes do exame, critérios, níveis, inscrição e calendário.",
};

const quickFacts = [
  "Exame oficial brasileiro de proficiência em português para estrangeiros.",
  "Aplicado no Brasil e no exterior.",
  "Realizado, em geral, duas vezes por ano.",
  "Composto por uma parte escrita e uma parte oral.",
  "Certifica quatro níveis de proficiência.",
  "As informações oficiais são publicadas no sistema e nas páginas do Celpe-Bras/Inep.",
];

const indexLinks = [
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

export default function CelpeBrasPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Início", href: "/pt-br" }, { label: "Celpe-Bras" }]} />

      <h1 className="font-serif text-4xl font-bold text-teal">Celpe-Bras: guia completo do exame</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        O Celpe-Bras é o exame oficial do Brasil para certificar a proficiência em português como
        língua estrangeira. Nesta página, você encontra uma visão geral de como o exame funciona,
        quais são suas partes, como é a avaliação e onde acompanhar informações importantes sobre
        inscrição e resultados.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href="#partes-do-exame" className="btn-primary">
          Ver partes do exame
        </a>
        <Link
          href="/pt-br/provas-anteriores"
          className="rounded-md bg-teal/10 px-4 py-2 text-sm font-semibold text-teal transition-colors hover:bg-teal/20"
        >
          Explorar provas anteriores
        </Link>
      </div>

      <section className="mt-10 rounded-xl border border-tan/30 bg-cream-dark/40 p-6">
        <h2 className="font-serif text-2xl font-semibold text-teal">Informações rápidas</h2>
        <ul className="mt-4 space-y-2 text-charcoal/85">
          {quickFacts.map((fact) => (
            <li key={fact} className="flex gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-teal">Índice</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {indexLinks.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-teal underline-offset-2 hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="o-que-e-o-celpe-bras" className="mt-12 space-y-4">
        <h2 className="font-serif text-2xl font-semibold text-teal">O que é o Celpe-Bras</h2>
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          O Celpe-Bras é o certificado oficial brasileiro de proficiência em português para
          estrangeiros. Ele é reconhecido pelo governo brasileiro e funciona como referência para
          pessoas que precisam comprovar seu nível de português em contextos acadêmicos,
          profissionais e institucionais.
        </p>
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          Mais do que verificar conhecimento isolado de gramática, o exame busca observar a
          capacidade de usar a língua em situações comunicativas mais amplas. Por isso, entender a
          lógica da prova é tão importante quanto conhecer vocabulário, estruturas e regras da
          língua.
        </p>
      </section>

      <section id="como-funciona-o-exame" className="mt-12 space-y-4">
        <h2 className="font-serif text-2xl font-semibold text-teal">Como funciona o exame</h2>
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          O exame é dividido em duas partes: uma parte escrita e uma parte oral. A parte escrita tem
          cerca de 3 horas, e a parte oral tem cerca de 20 minutos.
        </p>
        <p className="max-w-4xl leading-relaxed text-charcoal/90">
          De forma geral, a parte escrita reúne tarefas que envolvem compreensão e produção,
          enquanto a parte oral avalia o desempenho do candidato em interação face a face. A
          proposta do exame é observar como a pessoa interpreta informações, organiza respostas e
          usa o português para cumprir objetivos comunicativos.
        </p>
      </section>

      <section id="partes-do-exame" className="mt-12 space-y-4">
        <h2 className="font-serif text-2xl font-semibold text-teal">Partes do exame</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-tan/30 bg-cream p-4">
            <h3 className="font-semibold text-teal">Compreensão oral</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/85">
              Na parte escrita, o candidato precisa compreender informações apresentadas em
              materiais em áudio e utilizá-las nas tarefas propostas.
            </p>
          </article>
          <article className="rounded-lg border border-tan/30 bg-cream p-4">
            <h3 className="font-semibold text-teal">Leitura</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/85">
              A leitura aparece na interpretação de textos escritos e no uso dessas informações para
              elaborar respostas adequadas à tarefa.
            </p>
          </article>
          <article className="rounded-lg border border-tan/30 bg-cream p-4">
            <h3 className="font-semibold text-teal">Produção escrita</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/85">
              A produção escrita é avaliada por meio de tarefas baseadas em diferentes insumos, como
              vídeo, áudio e textos escritos. O foco está na capacidade de produzir um texto adequado
              à proposta, com clareza, coerência e uso funcional da língua.
            </p>
          </article>
          <article className="rounded-lg border border-tan/30 bg-cream p-4">
            <h3 className="font-semibold text-teal">Entrevista oral</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/85">
              A parte oral acontece em formato de interação face a face. Nessa etapa, o candidato
              conversa com os avaliadores a partir de temas e estímulos apresentados durante a
              entrevista.
            </p>
          </article>
        </div>
      </section>

      <section id="criterios-de-avaliacao" className="mt-12 space-y-4">
        <h2 className="font-serif text-2xl font-semibold text-teal">Critérios de avaliação</h2>
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

      <section id="niveis-e-resultados" className="mt-12 space-y-4">
        <h2 className="font-serif text-2xl font-semibold text-teal">Níveis e resultados</h2>
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
        <p className="mt-5 max-w-4xl rounded-lg border border-tan/30 bg-cream-dark/40 px-4 py-3 text-sm leading-relaxed text-charcoal/90">
          <span className="font-semibold text-teal">Validade do certificado.</span> O certificado do
          Celpe-Bras não tem prazo de validade.
        </p>
      </section>

      <section id="inscricao-e-calendario" className="mt-12 space-y-4">
        <h2 className="font-serif text-2xl font-semibold text-teal">Inscrição e calendário</h2>
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

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-teal">Próximos passos</h2>
        <ul className="mt-4 space-y-2 text-charcoal/90">
          <li>
            <a href="#partes-do-exame" className="text-teal hover:underline">
              Ver partes do exame
            </a>{" "}
            — Entenda melhor cada componente da prova.
          </li>
          <li>
            <Link href="/pt-br/provas-anteriores" className="text-teal hover:underline">
              Explorar provas anteriores
            </Link>{" "}
            — Consulte edições passadas e use o acervo como referência.
          </li>
          <li>
            <Link href="/pt-br/pratica" className="text-teal hover:underline">
              Ir para prática
            </Link>{" "}
            — Acesse materiais para treinar por habilidade.
          </li>
          <li>
            <Link
              href="/pt-br/blog/estrategia-minimalista-celpe-bras"
              className="text-teal hover:underline"
            >
              Ler o blog
            </Link>{" "}
            — Estratégias, explicações e abordagens para o exame.
          </li>
        </ul>
      </section>

      <section id="perguntas-frequentes" className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-teal">Perguntas frequentes</h2>
        <div className="mt-4">
          <FAQAccordion items={faq} />
        </div>
      </section>
    </>
  );
}
