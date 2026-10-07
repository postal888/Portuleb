import type { BlogPost } from "../types";

const faq = [
  {
    question: "Sobre o que é o exame Celpe-Bras?",
    answer:
      "O Celpe-Bras avalia a capacidade de compreender a mídia brasileira autêntica e de falar sobre a pauta real do país. Pela análise de 54 edições (1998–2026), o núcleo de temas é cultura e patrimônio (21% das tarefas), saúde (12%), sociedade e direitos (11%), tecnologia (11%), meio ambiente e alimentação (10% cada).",
  },
  {
    question: "Quais temas mais aparecem no Celpe-Bras?",
    answer:
      "Os mais frequentes são cultura, arte e patrimônio (museus, festas populares, cozinha regional). Em seguida vêm saúde, sociedade e direitos, tecnologia e mídia, meio ambiente e gastronomia. Juntos, o bloco cultural e social responde por mais da metade das tarefas.",
  },
  {
    question: "Qual nível de língua é necessário para o Celpe-Bras?",
    answer:
      "Os textos estão bem acima do nível A2: o núcleo lexical tem mais de 8000 formas de nível B1+. O Celpe-Bras concede certificação na escala de Intermediário a Avançado Superior; em termos de CEFR, a produção esperada fica em torno de B1–C1.",
  },
  {
    question: "Como é estruturado o exame Celpe-Bras?",
    answer:
      "A parte escrita tem quatro tarefas. As tarefas 1 e 2 partem de mídia autêntica: um vídeo e um áudio da TV ou do rádio brasileiros. A parte oral é a interação face a face, com roteiro e elementos provocadores.",
  },
  {
    question: "Como se preparar para a parte oral do Celpe-Bras?",
    answer:
      "Treine com mídia autêntica: reportagens de telejornais, entrevistas de rádio e podcasts brasileiros. Monte um vocabulário temático nas áreas-chave do exame e acostume-se com gravações com vários falantes.",
  },
  {
    question: "Onde encontrar provas antigas do Celpe-Bras?",
    answer:
      "O acervo oficial da UFRGS reúne provas, áudios, vídeos, elementos provocadores e editais desde 1998. No Celpe-Dê Pé, as edições estão em Provas Anteriores, com caderno, vídeo, áudio, roteiros e elementos provocadores.",
  },
];

export const temasCelpeBras1998_2026: BlogPost = {
  slug: "temas-do-celpe-bras-1998-2026",
  locale: "pt-br",
  title: "Temas do Celpe-Bras: sobre o que é o exame brasileiro em 28 anos (1998–2026)",
  subtitle:
    "Analisamos todas as edições publicadas no acervo da UFRGS — 54 provas e mais de 100 tarefas de vídeo e áudio — e calculamos quais temas mais aparecem, como o exame mudou e como usar isso na preparação.",
  seoTitle: "Temas do Celpe-Bras em 28 anos: sobre o exame (1998–2026)",
  seoDescription:
    "Analisamos as 54 edições do Celpe-Bras de 1998 a 2026: quais temas mais aparecem, como o exame mudou e como se preparar com eficiência.",
  eyebrow: "Blog / Análise de prova",
  category: "Análise de prova",
  readTime: "9 min",
  featured: true,
  publishedAt: "2026-10-07",
  tags: ["temas do Celpe-Bras", "Celpe-Bras", "preparação", "1998–2026"],
  coverImage: "/blog/temas-celpe-bras/celpe-temas-distribuicao.png?v=3",
  coverAlt:
    "Distribuição dos temas do Celpe-Bras 1998–2026: cultura 21%, saúde 12%, sociedade 11%, tecnologia 11%, meio ambiente e alimentação 10%",
  faq,
  sidebar: {
    summary:
      "Em 54 edições, cultura e patrimônio são 21% das tarefas de vídeo e áudio. O foco passou de nação e trabalho para educação e meio ambiente, e depois para vida digital e gastronomia.",
    facts: {
      title: "Base da análise",
      items: [
        "54 edições, 1998–2026.",
        "103 tarefas de vídeo e áudio.",
        "Núcleo lexical: mais de 8000 formas B1+.",
      ],
    },
    audienceHeading: "Para quem é este texto",
    audience: [
      "Quem escolhe por onde começar a preparação.",
      "Quem quer um vocabulário temático, não uma lista solta.",
      "Professores que montam um percurso a partir das provas reais.",
    ],
    links: [
      {
        label: "Provas Anteriores",
        href: "/pt-br/provas-anteriores",
        hint: "caderno, vídeo, áudio e roteiros",
      },
      {
        label: "O que é o Celpe-Bras",
        href: "/pt-br/celpe-bras",
        hint: "formato e certificação",
      },
      {
        label: "Correção de redação",
        href: "/pt-br/escrever",
        hint: "treino da parte escrita",
      },
      {
        label: "Prática de escuta",
        href: "/pt-br/pratica/compreensao-auditiva",
        hint: "áudio no formato do exame",
      },
    ],
  },
  blocks: [
    {
      type: "geoBox",
      title: "Em resumo",
      items: [
        "O Celpe-Bras é o exame oficial de certificação de proficiência em português do Brasil.",
        "Em 54 edições (1998–2026), o núcleo é cultura e patrimônio (21% das tarefas), saúde (12%), sociedade e direitos (11%), tecnologia (11%), meio ambiente e alimentação (10% cada).",
        "Em 28 anos o foco migrou da nação e do trabalho para a educação e o meio ambiente, e depois para a vida digital e a gastronomia.",
        "A dificuldade lexical se mantém estável. O repertório de temas se renova: fake news em 2020, cardápio digital por QR code em 2026.",
      ],
    },
    {
      type: "figure",
      src: "/blog/temas-celpe-bras/celpe-temas-distribuicao.png?v=3",
      alt: "Distribuição dos temas do Celpe-Bras 1998–2026: cultura 21%, saúde 12%, sociedade 11%, tecnologia 11%, meio ambiente e alimentação 10%",
      caption: "Distribuição das tarefas orais por tema dominante (54 edições, 103 tarefas).",
    },
    { type: "h2", content: "O que é o Celpe-Bras e como o exame funciona" },
    {
      type: "p",
      content:
        "O Celpe-Bras é o exame oficial de certificação de proficiência em português como língua estrangeira do Brasil, realizado sob a égide do Inep/MEC. O formato das tarefas 1 e 2 quase não mudou em 28 anos: a primeira parte de um vídeo, a segunda de um áudio.",
    },
    {
      type: "ul",
      items: [
        "Tarefa 1 — vídeo: uma reportagem de televisão, matéria informativa.",
        "Tarefa 2 — áudio: uma reportagem de rádio ou entrevista.",
        "Parte escrita: Caderno de Questões, com quatro tarefas. As duas primeiras usam esses insumos.",
        "Parte oral: interação face a face, com Roteiro de Interação e Elementos Provocadores.",
      ],
    },
    {
      type: "p",
      content:
        "O dado-chave para a preparação: os textos-fonte das tarefas 1 e 2 são materiais jornalísticos autênticos da TV e do rádio brasileiros, em português brasileiro padrão, ritmo natural e muitas vezes com vários falantes. Estudar só com um português de livro didático é um erro estratégico.",
    },
    { type: "h2", content: "Quais temas mais aparecem no Celpe-Bras" },
    {
      type: "p",
      content:
        "Reduzindo cada uma das 103 tarefas de vídeo e áudio ao seu tema dominante, a distribuição fica assim:",
    },
    {
      type: "table",
      headers: ["Tema", "Parte das tarefas"],
      rows: [
        ["Cultura, arte e patrimônio", "21%"],
        ["Saúde e bem-estar", "12%"],
        ["Sociedade, cidadania e direitos", "11%"],
        ["Tecnologia, mídia e inovação", "11%"],
        ["Meio ambiente e sustentabilidade", "10%"],
        ["Alimentação e gastronomia", "10%"],
        ["Educação", "8%"],
        ["Trabalho e economia", "7%"],
        ["Turismo, cidades e lazer", "5%"],
        ["História e identidade nacional", "4%"],
        ["Língua e literatura", "2%"],
        ["Esporte", "1%"],
      ],
    },
    {
      type: "p",
      content:
        "Cultura e sociedade são a espinha dorsal do exame. O Celpe-Bras se constrói em torno da identidade brasileira e da pauta social, e não de temas de redação abstratos.",
    },
    { type: "h2", content: "Como os temas do Celpe-Bras mudaram — três épocas" },
    {
      type: "figure",
      src: "/blog/temas-celpe-bras/celpe-temas-epocas.png?v=4",
      alt: "Evolução dos temas do Celpe-Bras por períodos de ~5 anos (1998–2026)",
      caption: "Participação de cada tema por período de ~5 anos — a migração da pauta ao longo de 28 anos.",
    },
    { type: "h3", content: "1998–2007: nação, trabalho e instituições" },
    {
      type: "p",
      content:
        "Ao lado da cultura, destacam-se trabalho e economia e sociedade/direitos (cerca de 16% das tarefas cada), além de história. Pautas: justiça e pena de morte (1998), independência do Brasil (2001), legislação trabalhista (2002), responsabilidade social do consumidor (2004).",
    },
    { type: "h3", content: "2008–2016: educação e meio ambiente" },
    {
      type: "p",
      content:
        "A cultura atinge o pico (28%) e crescem educação (15%) e meio ambiente (13%): alfabetização com o Pescando Letras, o projeto Cultivando Água Boa, recuperação de bacias, moda ecológica e museus.",
    },
    { type: "h3", content: "2017–2026: digital e comida" },
    {
      type: "p",
      content:
        "A liderança passa para tecnologia e mídia (22%) e gastronomia (19%): cidade inteligente, urna eletrônica, fake news (2020), a cultura da aceleração (2024), o cardápio digital com QR code (2026), festivais gastronômicos e consumo consciente. O exame reage à digitalização do cotidiano quase em tempo real.",
    },
    { type: "h2", content: "Quais temas se repetem em todas as edições" },
    {
      type: "ul",
      items: [
        "Comida como código cultural: chocolate (2003), cozinha regional (2008), mandioca (2022), queijos artesanais (2025), festival gastronômico Fartura (2026).",
        "Museus e patrimônio: Fundação Darcy Ribeiro, Museu da Língua Portuguesa, Museu da Imigração, Museu da Vida (Fiocruz).",
        "Meio ambiente: Pantanal (1998), rio São Francisco, escassez de água, Mata Atlântica (2025).",
        "Saúde e corpo: anabolizantes, obesidade, automedicação, ansiedade corporativa, sono bifásico.",
      ],
    },
    {
      type: "p",
      content:
        "Vocabulário de comida, meio ambiente, saúde e cultura compensa em qualquer edição do exame.",
    },
    { type: "h2", content: "Qual é a dificuldade do Celpe-Bras" },
    {
      type: "p",
      content:
        "O índice de dificuldade lexical por edição se mantém numa faixa estreita, cerca de 1,5–1,9 na escala B1→C2, e não cresce com o tempo: o exame não fica mais difícil ano a ano. Ainda assim, o núcleo lexical está bem acima do A2. O corpus tem mais de 8000 formas de nível B1+, boa parte delas vocabulário temático recorrente: sustentabilidade, reportagem, enunciado, acessibilidade, descarte, proficiência. A certificação vai de Intermediário a Avançado Superior.",
    },
    { type: "h2", content: "Como se preparar para o Celpe-Bras — 4 conclusões" },
    {
      type: "ul",
      items: [
        "Estude pela mídia, não só pelo livro didático. Telejornais, entrevistas de rádio e podcasts brasileiros são o treino mais fiel ao formato.",
        "Monte o vocabulário pelos temas do exame: cultura e patrimônio, saúde, meio ambiente, comida, tecnologia e sociedade. Juntos, passam de 70% das pautas.",
        "Prepare-se para vários falantes. Os textos trazem com frequência mais de um interlocutor e sobreposições.",
        "Acompanhe a pauta do Brasil. As notícias de hoje são os temas prováveis das próximas edições.",
      ],
    },
    {
      type: "internalLinks",
      links: [
        { label: "Provas Anteriores no Celpe-Dê Pé", href: "/pt-br/provas-anteriores" },
        { label: "Formato e certificação do Celpe-Bras", href: "/pt-br/celpe-bras" },
        { label: "Corrigir uma redação no formato do exame", href: "/pt-br/escrever" },
        { label: "Treinar compreensão auditiva", href: "/pt-br/pratica/compreensao-auditiva" },
        {
          label: "Acervo oficial do Celpe-Bras na UFRGS",
          href: "https://www.ufrgs.br/acervocelpebras/acervo/",
        },
      ],
    },
    { type: "h2", content: "Perguntas frequentes sobre o Celpe-Bras" },
    ...faq.flatMap((item) => [
      { type: "h3" as const, content: item.question },
      { type: "p" as const, content: item.answer },
    ]),
    {
      type: "callout",
      title: "Metodologia.",
      content:
        "Análise de todas as edições do acervo do Celpe-Bras (UFRGS), de 1998 a 2026 — 54 edições. A cada tarefa de vídeo ou áudio (Tarefas 1 e 2) atribuiu-se um tema dominante, totalizando 103 tarefas. Publicado em 7 de outubro de 2026.",
    },
  ],
};
