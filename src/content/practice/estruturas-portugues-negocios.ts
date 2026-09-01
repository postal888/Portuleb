import type { PracticeLesson } from "./types";

export const estruturasPortuguesNegocios: PracticeLesson = {
  meta: {
    slug: "estruturas-portugues-negocios",
    categoryPath: "gramatica-vocabulario",
    title: "Português para Negócios — Lição Interativa",
    seoTitle: "Estruturas «não só... mas também» — português de negócios",
    seoDescription:
      "Lição interativa sobre a locução correlativa «não só... mas também» em contexto profissional: texto anotado, análise de expressões, quiz e exercício de reescrita.",
    eyebrow: "Prática · Gramática e vocabulário",
    level: "Intermediário avançado",
    duration: "12–15 min",
    tags: ["gramática", "vocabulário", "português de negócios", "escrita formal"],
  },
  hero: {
    kicker: "Lição interativa",
    title: "Português para Negócios",
    lead:
      "Nesta lição você lê um trecho de comunicação corporativa, analisa expressões-chave e pratica a estrutura «não só... mas também» — muito frequente em e-mails, relatórios e apresentações.",
    objectives: [
      "Reconhecer a locução «não só... mas também» em textos formais",
      "Manter paralelismo gramatical entre as duas partes da frase",
      "Aplicar a estrutura em uma frase de contexto profissional",
    ],
  },
  annotatedText: {
    sectionTitle: "Texto com expressões destacadas",
    intro:
      "Leia o trecho abaixo como faria em uma reunião ou na preparação de uma resposta escrita. As expressões em destaque aparecem nos cartões de análise logo em seguida.",
    blocks: [
      {
        id: "email-trecho",
        title: "Trecho de e-mail interno",
        context: "Gerente de projetos → equipe comercial, fechamento de trimestre",
        segments: [
          { text: "Prezados colegas,\n\n" },
          { text: "Gostaria de reconhecer o desempenho da equipe neste trimestre. " },
          {
            text: "Vocês não só cumpriram as metas acordadas",
            highlight: true,
            expressionId: "nao-so-mas-tambem",
          },
          { text: ", " },
          {
            text: "mas também apresentaram soluções criativas",
            highlight: true,
            expressionId: "nao-so-mas-tambem",
          },
          {
            text: " que fortaleceram a confiança dos clientes.",
          },
          { text: "\n\nEsse resultado " },
          {
            text: "reflete não só disciplina operacional, mas também visão estratégica",
            highlight: true,
            expressionId: "paralelismo",
          },
          {
            text: " — exatamente o que precisamos para o próximo ciclo.\n\nConto com vocês na reunião de alinhamento na sexta-feira.\n\nAtenciosamente,\nMariana Costa",
          },
        ],
      },
    ],
  },
  expressions: {
    sectionTitle: "Análise das expressões",
    intro:
      "Cada cartão explica uma estrutura ou recurso presente no texto. Observe como o registro permanece formal e como as partes ligadas pela locução mantêm a mesma categoria gramatical.",
    cards: [
      {
        id: "nao-so-mas-tambem",
        expression: "não só... mas também",
        register: "Formal / corporativo",
        meaning:
          "Locução conjuntiva correlativa que adiciona uma segunda ideia, reforçando que o segundo elemento também é verdadeiro — muitas vezes com ênfase.",
        whenToUse:
          "Em e-mails, relatórios e apresentações quando você quer valorizar dois resultados ou qualidades sem criar duas frases separadas.",
        example: "A equipe não só cumpriu as metas, mas também inovou nos processos.",
        note: "A vírgula antes de «mas também» é facultativa, mas comum para marcar pausa e ênfase.",
      },
      {
        id: "paralelismo",
        expression: "Paralelismo",
        register: "Recurso de coesão",
        meaning:
          "As formas gramaticais depois de «não só» e «mas também» devem pertencer à mesma categoria (dois verbos, dois substantivos, duas orações simétricas).",
        whenToUse:
          "Sempre que usar correlações. Quebras de paralelismo soam abruptas e reduzem a clareza em textos profissionais.",
        example: "Reflete não só disciplina operacional, mas também visão estratégica.",
        note: "Substantivo + substantivo; verbo + verbo; oração + oração.",
      },
      {
        id: "reconhecer-desempenho",
        expression: "reconhecer o desempenho",
        register: "Formal positivo",
        meaning: "Formulação típica de feedback institucional — reconhece resultados sem exageros emocionais.",
        whenToUse: "Abertura de e-mails de fechamento de ciclo, avaliações ou comunicados internos.",
        example: "Gostaria de reconhecer o desempenho da equipe neste trimestre.",
      },
      {
        id: "fortalecer-confianca",
        expression: "fortalecer a confiança dos clientes",
        register: "Negócios / relação com cliente",
        meaning: "Collocation frequente para descrever impacto comercial sem prometer resultados numéricos.",
        whenToUse: "Relatórios, atas e e-mails que conectam ação interna a benefício externo.",
        example: "Soluções que fortaleceram a confiança dos clientes.",
      },
    ],
  },
  quizBlocks: [
    {
      id: "quiz-paralelismo",
      question: "Qual frase mantém o paralelismo correto com «não só... mas também»?",
      hint: "Compare a categoria gramatical depois de cada parte da locução.",
      options: [
        {
          id: "a",
          text: "O relatório não só foi entregue no prazo, mas também clareza total.",
          feedback:
            "Incorreto: depois de «mas também» aparece um substantivo («clareza»), mas antes há uma oração com verbo («foi entregue»). Falta paralelismo.",
        },
        {
          id: "b",
          text: "O relatório não só foi entregue no prazo, mas também apresentou clareza exemplar.",
          correct: true,
          feedback:
            "Correto: em ambas as partes há estrutura verbal (foi entregue / apresentou), o que mantém equilíbrio e fluidez.",
        },
        {
          id: "c",
          text: "Não só o relatório, mas também entregue no prazo.",
          feedback:
            "Incorreto: a segunda parte não forma uma oração completa e a correlação fica truncada.",
        },
      ],
    },
    {
      id: "quiz-funcao",
      question: "Qual é a função principal de «não só... mas também» no trecho do e-mail?",
      options: [
        {
          id: "a",
          text: "Contraste exclusivo — escolher uma ideia em detrimento da outra.",
          feedback: "Incorreto: essa locução adiciona e reforça; não exclui a primeira ideia.",
        },
        {
          id: "b",
          text: "Adição com ênfase — destacar que a segunda informação também é relevante.",
          correct: true,
          feedback:
            "Correto: a equipe cumpriu metas e, além disso, trouxe soluções criativas. As duas ideias coexistem.",
        },
        {
          id: "c",
          text: "Concessão — admitir um ponto fraco antes de uma qualificação.",
          feedback: "Incorreto: concessão seria expressa por «embora», «apesar de», etc.",
        },
      ],
    },
    {
      id: "quiz-registro",
      question: "Em qual situação profissional a estrutura soa mais adequada?",
      options: [
        {
          id: "a",
          text: "Mensagem informal a um colega de confiança no chat interno.",
          feedback: "Possível, mas o registro completo da locução é mais típico de textos elaborados.",
        },
        {
          id: "b",
          text: "Parágrafo de fechamento em relatório trimestral para diretoria.",
          correct: true,
          feedback:
            "Correto: «não só... mas também» organiza dois resultados com tom formal — ideal para relatórios e apresentações.",
        },
        {
          id: "c",
          text: "Legenda descontraída em rede social pessoal.",
          feedback: "Incorreto: o registro da estrutura é mais formal do que o esperado nesse contexto.",
        },
      ],
    },
  ],
  transformExercise: {
    id: "rewrite-negocios",
    prompt: "Reescreva as duas frases abaixo em uma única frase de contexto profissional:",
    instruction:
      "Use a locução «não só... mas também» mantendo paralelismo. Sua resposta deve incluir as duas partes da locução.",
    placeholder: "A empresa não só..., mas também...",
    requiredFragments: ["nao so", "mas tambem"],
    modelAnswer:
      "A empresa não só ampliou as vendas no último trimestre, mas também melhorou a qualidade do atendimento ao cliente.",
    successMessage:
      "Ótimo! Você usou a locução correlativa com as duas partes e manteve um registro adequado ao contexto profissional.",
    partialMessage:
      "Quase lá — inclua «não só» e «mas também» na mesma frase e tente equilibrar as duas ideias (metas + atendimento).",
    revealLabel: "Ver resposta-modelo",
    checkLabel: "Verificar resposta",
  },
  closingNote: {
    title: "Próximo passo",
    body:
      "Depois de dominar «não só... mas também», experimente identificar a mesma estrutura em provas anteriores do Celpe-Bras e em textos reais de negócios. O paralelismo também aparece em outras correlações: «tanto... quanto», «ou... ou».",
    links: [
      { label: "Voltar à Prática", href: "/pt-br/pratica/polimento-de-base" },
      { label: "Teoria → Gramática", href: "/pt-br/teoria#gramatica" },
      { label: "Hub Prática", href: "/pt-br/pratica" },
    ],
  },
};
