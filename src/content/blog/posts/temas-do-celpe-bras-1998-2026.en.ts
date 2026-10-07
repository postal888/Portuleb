import type { BlogPost } from "../types";

const faq = [
  {
    question: "What is the Celpe-Bras exam about?",
    answer:
      "Celpe-Bras tests the ability to understand authentic Brazilian media and to talk about the country's real agenda. Across 54 editions (1998–2026), the core topics are culture and heritage (21% of tasks), health (12%), society and rights (11%), technology (11%), and the environment and food (10% each).",
  },
  {
    question: "Which topics appear most often on Celpe-Bras?",
    answer:
      "The most frequent are culture, art and heritage (museums, folk festivals, regional cooking). Next come health, society and rights, technology and media, the environment and gastronomy. Together, the cultural and social block accounts for more than half of all tasks.",
  },
  {
    question: "What language level does Celpe-Bras require?",
    answer:
      "The texts sit well above A2: the lexical core has more than 8,000 B1+ word forms. Celpe-Bras certifies from Intermediário to Avançado Superior; the expected production is roughly B1–C1 on the CEFR scale.",
  },
  {
    question: "How is the Celpe-Bras exam structured?",
    answer:
      "The written paper has four tasks. Tasks 1 and 2 start from authentic media: a video and an audio from Brazilian TV or radio. The oral part is the face-to-face interaction, with a script and prompt materials.",
  },
  {
    question: "How should I prepare for the oral part of Celpe-Bras?",
    answer:
      "Train with authentic media: TV news reports, radio interviews and Brazilian podcasts. Build topic vocabulary in the exam's core areas and get used to recordings with more than one speaker.",
  },
  {
    question: "Where can I find past Celpe-Bras exams?",
    answer:
      "The official UFRGS archive holds papers, audio, video, prompt materials and editais from 1998 on. On Celpe-Dê Pé the same editions are in Past exams, with the question booklet, video, audio, scripts and prompt materials.",
  },
];

export const temasCelpeBras1998_2026_en: BlogPost = {
  slug: "temas-do-celpe-bras-1998-2026",
  locale: "en",
  translationOf: "temas-do-celpe-bras-1998-2026",
  title: "Celpe-Bras topics: what the Brazilian exam asks in 28 years (1998–2026)",
  subtitle:
    "We analysed every edition published in the UFRGS archive — 54 papers and more than 100 video and audio tasks — and calculated which topics appear most, how the exam changed and how to use that in preparation.",
  seoTitle: "Celpe-Bras topics over 28 years: what the exam asks (1998–2026)",
  seoDescription:
    "We analysed all 54 editions of the Celpe-Bras exam from 1998 to 2026: which topics appear most, how the exam changed and how to prepare effectively.",
  eyebrow: "Blog / Exam analysis",
  category: "Exam analysis",
  readTime: "9 min",
  featured: true,
  publishedAt: "2026-10-07",
  tags: ["Celpe-Bras topics", "Celpe-Bras", "preparation", "1998–2026"],
  coverImage: "/blog/temas-celpe-bras/celpe-temas-distribuicao-en.png?v=3",
  coverAlt:
    "Celpe-Bras topic distribution 1998–2026: culture 21%, health 12%, society 11%, technology 11%, environment and food 10%",
  faq,
  sidebar: {
    summary:
      "Across 54 editions, culture and heritage are 21% of the video and audio tasks. The focus moved from nation and work to education and the environment, then to digital life and gastronomy.",
    facts: {
      title: "What the analysis covers",
      items: [
        "54 editions, 1998–2026.",
        "103 video and audio tasks.",
        "Lexical core: more than 8,000 B1+ forms.",
      ],
    },
    audienceHeading: "Who this is for",
    audience: [
      "Anyone choosing where to start preparing.",
      "Anyone who wants topic vocabulary, not a loose word list.",
      "Teachers building a path from the real papers.",
    ],
    links: [
      {
        label: "Past exams",
        href: "/en/past-exams",
        hint: "booklet, video, audio and scripts",
      },
      {
        label: "What Celpe-Bras is",
        href: "/en/celpe-bras",
        hint: "format and certification",
      },
      {
        label: "Writing check",
        href: "/en/writing",
        hint: "practice for the written part",
      },
      {
        label: "Practice",
        href: "/en/practice",
        hint: "tasks in the exam format",
      },
    ],
  },
  blocks: [
    {
      type: "geoBox",
      title: "In short",
      items: [
        "Celpe-Bras is Brazil's official exam for certifying proficiency in Portuguese.",
        "Across 54 editions (1998–2026), the core is culture and heritage (21% of tasks), health (12%), society and rights (11%), technology (11%), and the environment and food (10% each).",
        "Over 28 years the focus moved from nation and work to education and the environment, then to digital life and gastronomy.",
        "Lexical difficulty stays stable. The topic set keeps renewing: fake news in 2020, a digital menu with a QR code in 2026.",
      ],
    },
    {
      type: "figure",
      src: "/blog/temas-celpe-bras/celpe-temas-distribuicao-en.png?v=3",
      alt: "Celpe-Bras topic distribution 1998–2026: culture 21%, health 12%, society 11%, technology 11%, environment and food 10%",
      caption: "Share of oral tasks by dominant topic (54 editions, 103 tasks).",
    },
    { type: "h2", content: "What Celpe-Bras is and how the exam works" },
    {
      type: "p",
      content:
        "Celpe-Bras is Brazil's official exam certifying proficiency in Portuguese as a foreign language, run under Inep/MEC. The format of Tasks 1 and 2 has barely changed in 28 years: the first starts from a video, the second from an audio.",
    },
    {
      type: "ul",
      items: [
        "Task 1 — video: a television report, an informational piece.",
        "Task 2 — audio: a radio report or interview.",
        "Written part: the question booklet, with four tasks. The first two use those inputs.",
        "Oral part: face-to-face interaction, with an interaction script and prompt materials.",
      ],
    },
    {
      type: "p",
      content:
        "The key fact for preparation: the source texts of Tasks 1 and 2 are authentic journalistic material from Brazilian TV and radio, in standard Brazilian Portuguese, at a natural pace, and often with several speakers. Studying only textbook Portuguese is a strategic mistake.",
    },
    { type: "h2", content: "Which topics appear most on Celpe-Bras" },
    {
      type: "p",
      content:
        "Reducing each of the 103 video and audio tasks to its dominant topic, the distribution looks like this:",
    },
    {
      type: "table",
      headers: ["Topic", "Share of tasks"],
      rows: [
        ["Culture, art and heritage", "21%"],
        ["Health and well-being", "12%"],
        ["Society, citizenship and rights", "11%"],
        ["Technology, media and innovation", "11%"],
        ["Environment and sustainability", "10%"],
        ["Food and gastronomy", "10%"],
        ["Education", "8%"],
        ["Work and economy", "7%"],
        ["Tourism, cities and leisure", "5%"],
        ["History and national identity", "4%"],
        ["Language and literature", "2%"],
        ["Sport", "1%"],
      ],
    },
    {
      type: "p",
      content:
        "Culture and society are the backbone of the exam. Celpe-Bras is built around Brazilian identity and the social agenda, not around abstract essay prompts.",
    },
    { type: "h2", content: "How Celpe-Bras topics changed — over time" },
    {
      type: "figure",
      src: "/blog/temas-celpe-bras/celpe-temas-epocas-en.png?v=4",
      alt: "How Celpe-Bras topics shifted over ~5-year periods from 1998 to 2026",
      caption: "Share of each topic per ~5-year period — the agenda shifting over 28 years.",
    },
    { type: "h3", content: "1998–2007: nation, work and institutions" },
    {
      type: "p",
      content:
        "Beside culture, work and the economy and society/rights stand out (about 16% of tasks each), along with history. Topics include justice and the death penalty (1998), Brazilian independence (2001), labour law (2002) and the consumer's social responsibility (2004).",
    },
    { type: "h3", content: "2008–2016: education and the environment" },
    {
      type: "p",
      content:
        "Culture peaks (28%), and education (15%) and the environment (13%) grow: literacy with Pescando Letras, the Cultivando Água Boa project, river-basin recovery, ecological fashion and museums.",
    },
    { type: "h3", content: "2017–2026: digital life and food" },
    {
      type: "p",
      content:
        "The lead passes to technology and media (22%) and gastronomy (19%): the smart city, the electronic ballot box, fake news (2020), the culture of acceleration (2024), the digital menu with a QR code (2026), food festivals and conscious consumption. The exam reacts to everyday digitisation almost in real time.",
    },
    { type: "h2", content: "Which topics repeat across every edition" },
    {
      type: "ul",
      items: [
        "Food as cultural code: chocolate (2003), regional cooking (2008), cassava (2022), artisanal cheeses (2025), the Fartura food festival (2026).",
        "Museums and heritage: Fundação Darcy Ribeiro, Museu da Língua Portuguesa, Museu da Imigração, Museu da Vida (Fiocruz).",
        "The environment: the Pantanal (1998), the São Francisco river, water scarcity, the Atlantic Forest (2025).",
        "Health and the body: anabolic steroids, obesity, self-medication, workplace anxiety, biphasic sleep.",
      ],
    },
    {
      type: "p",
      content: "Vocabulary for food, the environment, health and culture pays off in any edition of the exam.",
    },
    { type: "h2", content: "How difficult is Celpe-Bras" },
    {
      type: "p",
      content:
        "The lexical-difficulty index by edition stays in a narrow band, about 1.5–1.9 on a B1→C2 scale, and does not rise over time: the exam does not get harder year by year. Even so, the lexical core sits well above A2. The corpus has more than 8,000 B1+ forms, many of them recurring topic vocabulary: sustentabilidade, reportagem, enunciado, acessibilidade, descarte, proficiência. Certification runs from Intermediário to Avançado Superior.",
    },
    { type: "h2", content: "How to prepare for Celpe-Bras — 4 conclusions" },
    {
      type: "ul",
      items: [
        "Study from the media, not only from the textbook. Brazilian TV news, radio interviews and podcasts are the closest match to the format.",
        "Build vocabulary from the exam's topics: culture and heritage, health, the environment, food, technology and society. Together they cover more than 70% of the agenda.",
        "Prepare for several speakers. The texts often have more than one interlocutor and overlapping voices.",
        "Follow Brazil's news agenda. Today's stories are the likely topics of the next editions.",
      ],
    },
    {
      type: "internalLinks",
      links: [
        { label: "Past exams on Celpe-Dê Pé", href: "/en/past-exams" },
        { label: "Celpe-Bras format and certification", href: "/en/celpe-bras" },
        { label: "Check a piece of writing in the exam format", href: "/en/writing" },
        { label: "Practice in the exam format", href: "/en/practice" },
        {
          label: "Official Celpe-Bras archive at UFRGS",
          href: "https://www.ufrgs.br/acervocelpebras/acervo/",
        },
      ],
    },
    { type: "h2", content: "Frequently asked questions about Celpe-Bras" },
    ...faq.flatMap((item) => [
      { type: "h3" as const, content: item.question },
      { type: "p" as const, content: item.answer },
    ]),
    {
      type: "callout",
      title: "Methodology.",
      content:
        "Analysis of all editions in the Celpe-Bras acervo (UFRGS), from 1998 to 2026 — 54 editions. Each video or audio task (Tasks 1 and 2) was assigned a dominant topic, for a total of 103 tasks. Published on 7 October 2026.",
    },
  ],
};
