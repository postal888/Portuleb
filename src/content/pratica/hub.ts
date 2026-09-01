export const practiceHero = {
  eyebrow: "Prática",
  kicker: "Formato do exame",
  title: "Ouvir, ler, escrever e polir a base",
  lead:
    "Aqui o foco é fazer: aplicar habilidades em tarefas no estilo Celpe-Bras, com drills curtos quando precisar reforçar gramática e vocabulário.",
  stats: [
    { value: "4 entradas", label: "ouvir, ler, escrever, polir a base" },
    { value: "2 fluxos", label: "produção escrita e drills de base" },
    { value: "Teoria", label: "regras e testes na seção Teoria", link: "/pt-br/teoria" },
  ],
} as const;

export const practiceTiles = [
  {
    id: "ouvir",
    icon: "O",
    badge: "Input",
    badgeVariant: "primary" as const,
    title: "Ouvir",
    description:
      "Vídeos com legendas sincronizadas, glossário EN/RU e expressões anotadas para treinar compreensão oral.",
    meta: "compreensão oral",
    href: "#ouvir",
    variant: "default" as const,
  },
  {
    id: "ler",
    icon: "L",
    badge: "Input",
    badgeVariant: "primary" as const,
    title: "Ler",
    description:
      "Textos e questões de compreensão, com foco em extrair sentido e preparar a produção escrita.",
    meta: "compreensão escrita",
    href: "#ler",
    variant: "default" as const,
  },
  {
    id: "escrever",
    icon: "E",
    badge: "Output",
    badgeVariant: "primary" as const,
    title: "Escrever",
    description:
      "Produção de texto nas duas partes da preparação, com avaliação alinhada aos critérios do Celpe-Bras.",
    meta: "produção + avaliação",
    href: "#escrever-detalhe",
    variant: "highlight" as const,
  },
  {
    id: "polir-a-base",
    icon: "B",
    badge: "Foundation",
    badgeVariant: "gold" as const,
    title: "Polir a base",
    description:
      "Exercícios curtos de gramática e vocabulário: conjugações, tempos, artigos, palavras e estruturas fixas.",
    meta: "drills rápidos",
    href: "#polir-a-base-detalhe",
    variant: "support" as const,
  },
] as const;

export const polishBaseSteps = [
  {
    name: "Verbos",
    description: "Treinos rápidos de conjugação e reconhecimento de formas frequentes.",
    pill: "teste curto",
  },
  {
    name: "Tempos",
    description: "Contraste entre tempos verbais com exercícios objetivos e correção imediata.",
    pill: "drill",
  },
  {
    name: "Artigos",
    description: "Uso de artigos, contrações e escolhas comuns que afetam a clareza.",
    pill: "fixar base",
  },
  {
    name: "Palavras",
    description: "Vocabulário útil, collocations e revisão de palavras importantes para as tarefas.",
    pill: "vocabulário",
  },
] as const;

export const writingSteps = [
  {
    name: "Parte 1",
    description:
      "Após estímulos de compreensão, o candidato escreve o texto da tarefa e recebe feedback estruturado.",
    pill: "produção",
  },
  {
    name: "Parte 2",
    description: "Cenário paralelo para a segunda parte, com prompt e avaliação separados.",
    pill: "avaliação",
  },
  {
    name: "Feedback",
    description:
      "Avaliação por adequação, organização, clareza, coesão e conformidade com a proposta.",
    pill: "Celpe logic",
  },
] as const;
