export const theoryHero = {
  eyebrow: "Teoria",
  kicker: "Base de estudo",
  title: "Regras, exemplos e testes por tema",
  lead:
    "Explicações curtas, tabelas e exemplos do material de estudo — com saída clara para quizzes e, depois, para a Prática no formato do exame.",
  stats: [
    { value: "3 eixos", label: "gramática, vocabulário, gêneros" },
    { value: "4 tópicos", label: "exemplos prontos para revisar e testar" },
    { value: "Prática", label: "aplicar no formato depois da teoria", link: "/pt-br/pratica" },
  ],
} as const;

export const theoryCards = [
  {
    num: "01",
    title: "Gramática",
    description:
      "Regras básicas, tempos, conjugações, artigos, preposições, concordância e demais tópicos do núcleo gramatical.",
    link: "Abrir teoria →",
    href: "#gramatica",
  },
  {
    num: "02",
    title: "Vocabulário essencial",
    description:
      "Palavras, grupos temáticos, collocations e unidades úteis que seguem para drills e produção escrita.",
    link: "Ver listas →",
    href: "#vocabulario",
  },
  {
    num: "03",
    title: "Gêneros e estrutura",
    description:
      "Explicações breves de gêneros e de como organizar diferentes tipos de texto nas tarefas do exame.",
    link: "Ver exemplos →",
    href: "#generos",
  },
] as const;

export const theoryFlow = [
  {
    num: "A",
    title: "Revisar a regra",
    description: "Leitura rápida da explicação e dos exemplos.",
  },
  {
    num: "B",
    title: "Fazer testes",
    description: "Testes curtos por tema: tempos, verbos, artigos, palavras.",
  },
  {
    num: "C",
    title: "Aplicar no formato",
    description: "Depois, ir à Prática — Ouvir, Ler ou Escrever.",
    link: "/pt-br/pratica",
  },
] as const;

/** Roadmap of topics being written — publicados aparecem nos eixos acima. */
export const sampleTopics = [
  {
    title: "Concordância verbal",
    description:
      "Quando o verbo concorda com o sujeito: coletivos, sujeito posposto e «um dos que».",
  },
  {
    title: "Gerúndio e particípio",
    description: "Formas nominais, tempos compostos e o «gerundismo» que aparece na escrita.",
  },
  {
    title: "«Mais» ou «mas»",
    description: "Duas palavras quase idênticas no som e opostas na função, com teste rápido.",
  },
  {
    title: "Voz passiva",
    description: "Passiva analítica e sintética, e o efeito de formalidade que ela cria no texto.",
  },
] as const;
