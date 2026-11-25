export const theoryHero = {
  eyebrow: "Teoría",
  kicker: "Base de estudio",
  title: "Reglas, ejemplos y quizzes por tema",
  lead:
    "Explicaciones breves, tablas y ejemplos de estudio — con un camino claro a los quizzes y luego a la práctica en formato de examen.",
  stats: [
    { value: "3 áreas", label: "gramática, vocabulario, géneros" },
    { value: "4 temas", label: "ejemplos listos para repasar" },
    { value: "Práctica", label: "aplicar el formato del examen (PT)", link: "/pt-br/pratica" },
  ],
} as const;

export const theoryCards = [
  {
    num: "01",
    title: "Gramática",
    description: "Gramática esencial: tiempos, conjugación, artículos, concordancia y más.",
    link: "Abrir teoría →",
    href: "#gramatica",
  },
  {
    num: "02",
    title: "Vocabulario esencial",
    description: "Grupos temáticos, colocaciones y unidades para ejercicios y escritura.",
    link: "Ver listas →",
    href: "#vocabulario",
  },
  {
    num: "03",
    title: "Géneros y estructura",
    description: "Notas breves de género y cómo organizar distintos tipos de texto del examen.",
    link: "Ver ejemplos →",
    href: "#generos",
  },
] as const;

export const theoryFlow = [
  {
    num: "A",
    title: "Repasa la regla",
    description: "Lectura rápida de la explicación y los ejemplos.",
  },
  {
    num: "B",
    title: "Haz quizzes",
    description: "Quizzes cortos por tema: tiempos, verbos, artículos, palabras.",
  },
  {
    num: "C",
    title: "Aplica en formato de examen",
    description: "Luego ve a la práctica en portugués — Escuchar, Leer o Escribir.",
    link: "/pt-br/pratica",
  },
] as const;

export const sampleTopics = [
  {
    title: "Presente vs pasado",
    description: "Explicación, tabla, ejemplos cortos y acceso al quiz.",
  },
  {
    title: "Artículos y contracciones",
    description: "Repaso de reglas y microejercicios para fijar patrones.",
  },
  {
    title: "Vocabulario de opinión",
    description: "Palabras y estructuras útiles para las tareas de escritura.",
  },
  {
    title: "Estructura del texto",
    description: "Cómo organizar una respuesta: apertura, desarrollo, cierre.",
  },
] as const;

export const theoryUiEs = {
  home: "Inicio",
  theory: "Teoría",
  seeAxes: "Ver áreas de estudio",
  goPractice: "Ir a la práctica (PT)",
  reference: "Referencia",
  axes: "Áreas de estudio",
  axesCopy:
    "Explicaciones breves, tablas, ejemplos y quizzes — la base antes de la práctica en formato de examen.",
  journey: "De la teoría a la práctica",
  thenPractice: "Después practicar",
  openPractice: "Abrir práctica (PT) →",
  sampleThemes: "Temas de ejemplo",
  topics: "Temas",
  theoryTest: "Teoría + quiz",
  footerSoon: "Los quizzes y las páginas por tema se enlazarán pronto.",
  footerPractice: "Cuando estés listo para tareas en formato de examen, ve a",
  footerPracticeLink: "Práctica (PT) →",
  verbsKicker: "Herramienta interactiva",
  verbsTitle: "Conjugaciones verbales",
  verbsCopy:
    "Filtra por verbo, tiempo y persona, estudia las tablas de conjugación y ponte a prueba con un quiz rápido.",
} as const;
