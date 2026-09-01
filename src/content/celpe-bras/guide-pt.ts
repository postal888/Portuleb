import type { CelpeBrasGuideContent } from "./guide-types";

export const celpeGuidePt: CelpeBrasGuideContent = {
  anchors: {
    booklet: "caderno-2026-1",
    whatIs: "o-que-e-o-celpe-bras",
    howWorks: "como-funciona-o-exame",
    parts: "partes-do-exame",
    criteria: "criterios-de-avaliacao",
    levels: "niveis-e-resultados",
    registration: "inscricao-e-calendario",
    faq: "perguntas-frequentes",
  },
  hero: {
    eyebrow: "Guia do exame",
    title: "Celpe-Bras: o que é e como se preparar para o exame",
    lead:
      "O Celpe-Bras é o exame oficial do Brasil para certificar a proficiência em português como língua estrangeira. Aqui você entende o que é o exame, suas partes (escrita e oral), os critérios de avaliação, os níveis de proficiência e por onde começar a sua preparação.",
    ctaBooklet: "Ver caderno 2026/1",
    ctaPastExams: "Explorar provas anteriores",
  },
  booklet: {
    title: "Do caderno de questões (2026/1)",
    subtitle:
      "Instruções da capa do material oficial da Parte Escrita — mesmas cores e estrutura do exame.",
    linkLabel: "Abrir o PDF do caderno no acervo →",
    pastExamSlug: "2026-1",
    materialId: "caderno",
  },
  taskStripLabel: "Quatro tarefas da parte escrita (2026/1)",
  quickFactsTitle: "Informações rápidas",
  quickFacts: [
    "Exame oficial brasileiro de proficiência em português para estrangeiros.",
    "Aplicado no Brasil e no exterior.",
    "Realizado, em geral, duas vezes por ano.",
    "Composto por uma parte escrita (3 horas, 4 tarefas) e uma parte oral (~20 min).",
    "Certifica quatro níveis de proficiência.",
    "As informações oficiais são publicadas no sistema e nas páginas do Celpe-Bras/Inep.",
  ],
  indexTitle: "Índice",
  indexLinks: [
    { anchor: "booklet", label: "Caderno 2026/1" },
    { anchor: "whatIs", label: "O que é o Celpe-Bras" },
    { anchor: "howWorks", label: "Como funciona o exame" },
    { anchor: "parts", label: "Partes do exame" },
    { anchor: "criteria", label: "Critérios de avaliação" },
    { anchor: "levels", label: "Níveis e resultados" },
    { anchor: "registration", label: "Inscrição e calendário" },
    { anchor: "faq", label: "Perguntas frequentes" },
  ],
  whatIs: {
    title: "O que é o Celpe-Bras",
    paragraphs: [
      "O Celpe-Bras é o certificado oficial brasileiro de proficiência em português para estrangeiros. Ele é reconhecido pelo governo brasileiro e funciona como referência para pessoas que precisam comprovar seu nível de português em contextos acadêmicos, profissionais e institucionais.",
      "Mais do que verificar conhecimento isolado de gramática, o exame busca observar a capacidade de usar a língua em situações comunicativas mais amplas. Por isso, entender a lógica da prova é tão importante quanto conhecer vocabulário, estruturas e regras da língua.",
    ],
  },
  howWorks: {
    title: "Como funciona o exame",
    paragraphs: [
      "O exame é dividido em duas partes: uma parte escrita e uma parte oral. A parte escrita tem cerca de 3 horas, e a parte oral tem cerca de 20 minutos.",
      "De forma geral, a parte escrita reúne tarefas que envolvem compreensão e produção, enquanto a parte oral avalia o desempenho do candidato em interação face a face. A proposta do exame é observar como a pessoa interpreta informações, organiza respostas e usa o português para cumprir objetivos comunicativos.",
    ],
  },
  parts: {
    title: "Partes do exame",
    cards: [
      {
        title: "Compreensão oral",
        body: "Na parte escrita, o candidato precisa compreender informações apresentadas em materiais em áudio e utilizá-las nas tarefas propostas.",
        variant: "green",
      },
      {
        title: "Leitura",
        body: "A leitura aparece na interpretação de textos escritos e no uso dessas informações para elaborar respostas adequadas à tarefa.",
        variant: "blue",
      },
      {
        title: "Produção escrita",
        body: "A produção escrita é avaliada por meio de tarefas baseadas em diferentes insumos, como vídeo, áudio e textos escritos. O foco está na capacidade de produzir um texto adequado à proposta, com clareza, coerência e uso funcional da língua.",
        variant: "green",
      },
      {
        title: "Entrevista oral",
        body: "A parte oral acontece em formato de interação face a face. Nessa etapa, o candidato conversa com os avaliadores a partir de temas e estímulos apresentados durante a entrevista.",
        variant: "blue",
      },
    ],
  },
  criteria: {
    title: "Critérios de avaliação",
    paragraphs: [
      "O Celpe-Bras não se limita a medir acertos gramaticais isolados. O exame considera o desempenho do candidato de forma mais ampla, observando como ele compreende os materiais, responde às tarefas e usa a língua de forma adequada à situação proposta.",
      "Na prática, isso significa que a avaliação leva em conta a adequação da resposta, a organização do texto ou da fala, a clareza da comunicação e a capacidade de cumprir o objetivo comunicativo da tarefa. Entender esse ponto ajuda a evitar uma preparação baseada apenas em memorização de regras.",
    ],
  },
  levels: {
    title: "Níveis e resultados",
    paragraphs: [
      "O exame certifica quatro níveis de proficiência: Intermediário, Intermediário Superior, Avançado e Avançado Superior. Candidatos que não atingem a pontuação mínima não recebem certificação.",
      "Alguns centros aplicadores e materiais explicativos apresentam as faixas de pontuação da seguinte forma:",
    ],
    validityLabel: "Validade do certificado.",
    validityText: "O certificado do Celpe-Bras não tem prazo de validade.",
  },
  registration: {
    title: "Inscrição e calendário",
    paragraphs: [
      "O Celpe-Bras é realizado, em geral, duas vezes por ano, normalmente em uma edição no primeiro semestre e outra no segundo. As inscrições, o cronograma de aplicação e a divulgação dos resultados devem ser acompanhados no sistema oficial do exame e nas comunicações do Inep e dos centros aplicadores.",
      "Como datas e procedimentos podem mudar a cada edição, a forma mais segura de se informar é consultar sempre a página oficial do Celpe-Bras no Inep e o sistema de inscrição do exame.",
    ],
  },
  nextSteps: {
    title: "Próximos passos",
    items: [
      { type: "link", section: "home", label: "Começar a preparação gratuita", suffix: "— Pratique de graça com teoria, provas e exercícios." },
      {
        type: "link",
        section: "pastExamSession",
        slug: "2026-1",
        label: "Provas anteriores do Celpe-Bras (2026/1)",
        suffix: "— Treine com a prova real mais recente.",
      },
      { type: "anchor", anchor: "booklet", label: "Ver instruções do caderno", suffix: "— Regras da Parte Escrita 2026/1." },
      { type: "anchor", anchor: "parts", label: "Ver partes do exame", suffix: "— Entenda melhor cada componente da prova." },
      { type: "link", section: "pastExams", label: "Explorar provas anteriores", suffix: "— Consulte edições passadas e use o acervo como referência." },
      { type: "link", section: "practice", label: "Ir para prática", suffix: "— Treine por habilidade." },
      {
        type: "link",
        section: "blogPost",
        slug: "estrategia-minimalista-celpe-bras",
        label: "Ler o blog",
        suffix: "— Estratégias e abordagens para o exame.",
      },
    ],
  },
  faqTitle: "Perguntas frequentes",
  faq: [
    {
      question: "Quando é a próxima edição do Celpe-Bras (2026/2)?",
      answer:
        "Inscrições: 27 de julho a 6 de agosto de 2026. Exame no Brasil: 20–23 de outubro de 2026. Exame no exterior: 24–27 de novembro de 2026. Resultados: 15 de dezembro de 2026 (Brasil) e 15 de janeiro de 2027 (exterior).",
    },
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
  ],
};
