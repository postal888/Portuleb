import { GUIDE_OFFICIAL_LINKS_EN } from "@/lib/seo/official-sources";
import type { CelpeBrasGuideContent } from "./guide-types";

export const celpeGuideEs: CelpeBrasGuideContent = {
  anchors: {
    booklet: "booklet-2026-1",
    whatIs: "what-is-celpe-bras",
    howWorks: "how-the-exam-works",
    parts: "exam-parts",
    criteria: "assessment-criteria",
    levels: "levels-and-results",
    registration: "registration-and-calendar",
    faq: "faq",
  },
  independenceNote:
    "Celpe-Dê Pé es una plataforma educativa independiente. El examen, las convocatorias, la inscripción y la certificación pertenecen al Inep/MEC. Este sitio no inscribe candidatos ni emite certificados.",
  datePublished: "2026-05-01",
  dateModified: "2026-11-25",
  officialSourcesTitle: "Fuentes oficiales",
  officialSources: GUIDE_OFFICIAL_LINKS_EN,
  hero: {
    eyebrow: "Guía del examen",
    title: "Celpe-Bras: guía completa del examen",
    lead:
      "El Celpe-Bras es el examen oficial de Brasil para certificar el dominio del portugués como lengua extranjera. En esta página te explicamos cómo funciona el examen, qué partes tiene, cómo se evalúa y dónde seguir la inscripción y los resultados.",
    ctaBooklet: "Ver el cuadernillo 2026/1",
    ctaPastExams: "Explorar exámenes anteriores",
  },
  booklet: {
    title: "Del cuadernillo de preguntas (2026/1)",
    subtitle:
      "Instrucciones de la portada del material oficial de la Parte Escrita, con los mismos colores y la misma estructura que el examen.",
    linkLabel: "Abrir el PDF del cuadernillo en el archivo →",
    pastExamSlug: "2026-1",
    materialId: "caderno",
  },
  taskStripLabel: "Cuatro tareas escritas (2026/1)",
  quickFactsTitle: "Datos clave",
  quickFacts: [
    "Examen oficial de Brasil que certifica el dominio del portugués para extranjeros.",
    "Se aplica en Brasil y en el exterior.",
    "Suele ofrecerse dos veces al año.",
    "Parte escrita (unas 3 horas, 4 tareas) y parte oral (unos 20 minutos).",
    "Certifica cuatro niveles de dominio.",
    "Las novedades oficiales se publican en el Sistema Celpe-Bras y en las páginas del Inep.",
  ],
  indexTitle: "En esta página",
  indexLinks: [
    { anchor: "booklet", label: "Cuadernillo 2026/1" },
    { anchor: "whatIs", label: "Qué es el Celpe-Bras" },
    { anchor: "howWorks", label: "Cómo funciona el examen" },
    { anchor: "parts", label: "Partes del examen" },
    { anchor: "criteria", label: "Criterios de evaluación" },
    { anchor: "levels", label: "Niveles y resultados" },
    { anchor: "registration", label: "Inscripción y calendario" },
    { anchor: "faq", label: "Preguntas frecuentes" },
  ],
  whatIs: {
    title: "Qué es el Celpe-Bras",
    paragraphs: [
      "El Celpe-Bras es el examen oficial de Brasil para certificar el dominio del portugués como lengua extranjera. Está reconocido por el gobierno brasileño y se usa cuando necesitas acreditar tu nivel de portugués en contextos académicos, profesionales o institucionales.",
      "El examen va más allá del conocimiento aislado de la gramática: observa cómo usas la lengua en situaciones comunicativas más amplias. Entender la lógica del examen importa tanto como el vocabulario, las estructuras y las reglas.",
    ],
  },
  howWorks: {
    title: "Cómo funciona el examen",
    paragraphs: [
      "El examen tiene dos partes: escrita y oral. La parte escrita dura unas tres horas; la parte oral, unos veinte minutos.",
      "La parte escrita combina tareas de comprensión y de producción; la parte oral evalúa la interacción cara a cara. Los evaluadores observan cómo interpretas los materiales, cómo organizas tus respuestas y cómo usas el portugués para cumplir objetivos comunicativos.",
    ],
  },
  parts: {
    title: "Partes del examen",
    cards: [
      {
        title: "Comprensión auditiva",
        body: "En la parte escrita debes comprender la información de los materiales de audio y usarla en las tareas propuestas.",
        variant: "green",
      },
      {
        title: "Comprensión de lectura",
        body: "La lectura entra en juego cuando interpretas textos escritos y usas esa información para producir respuestas adecuadas.",
        variant: "blue",
      },
      {
        title: "Producción escrita",
        body: "La producción escrita se evalúa mediante tareas basadas en video, audio y textos escritos. Lo importante es producir un texto que responda al enunciado, con claridad, coherencia y un uso funcional de la lengua.",
        variant: "green",
      },
      {
        title: "Entrevista oral",
        body: "La parte oral es una interacción cara a cara. Conversas con los evaluadores a partir de los temas y los elementos provocadores que se presentan durante la entrevista.",
        variant: "blue",
      },
    ],
  },
  criteria: {
    title: "Criterios de evaluación",
    paragraphs: [
      "El Celpe-Bras no se limita a contar errores gramaticales aislados. Considera tu desempeño de forma más amplia: cómo comprendes los materiales, cómo respondes a las tareas y si usas la lengua de manera adecuada.",
      "En la práctica, la evaluación se fija en la adecuación, la organización, la claridad y en si cumples el objetivo comunicativo. Saberlo te ayuda a evitar una preparación basada solo en memorizar reglas.",
    ],
  },
  levels: {
    title: "Niveles y resultados",
    paragraphs: [
      "El examen certifica cuatro niveles: Intermedio, Intermedio Superior, Avanzado y Avanzado Superior. Quienes no alcanzan la puntuación mínima no reciben certificación.",
      "La tabla siguiente resume las franjas que se usan en materiales de preparación y en los centros aplicadores; confirma siempre los criterios en la convocatoria oficial y en las orientaciones del Inep para tu edición:",
    ],
    validityLabel: "Validez del certificado.",
    validityText:
      "Según la información pública del Inep sobre el Celpe-Bras, el certificado no vence; confirma en el canal oficial si tu edición establece algo distinto.",
  },
  registration: {
    title: "Inscripción y calendario",
    paragraphs: [
      "El Celpe-Bras suele aplicarse dos veces al año, por lo general una en el primer semestre y otra en el segundo. Sigue la inscripción, las fechas del examen y los resultados en el Sistema Celpe-Bras y en los comunicados del Inep y de tu centro aplicador.",
      "Como las fechas y los procedimientos pueden cambiar en cada edición, usa siempre las fuentes oficiales que aparecen abajo; no tomes esta guía como fuente normativa.",
    ],
  },
  nextSteps: {
    title: "Próximos pasos",
    items: [
      {
        type: "link",
        section: "home",
        label: "Empieza tu preparación gratuita",
        suffix: "— Practica gratis con teoría, exámenes anteriores y ejercicios.",
      },
      {
        type: "anchor",
        anchor: "booklet",
        label: "Instrucciones del cuadernillo",
        suffix: "— Reglas de la Parte Escrita 2026/1.",
      },
      {
        type: "anchor",
        anchor: "parts",
        label: "Partes del examen",
        suffix: "— Conoce cada componente.",
      },
      {
        type: "link",
        section: "pastExams",
        label: "Archivo de exámenes anteriores",
        suffix: "— Explora ediciones y materiales anteriores.",
      },
      {
        type: "link",
        section: "practice",
        label: "Práctica",
        suffix: "— Entrena por habilidad.",
      },
      {
        type: "link",
        section: "blogPost",
        slug: "analise-tarefa-1-festival-fartura-2026-1",
        label: "Lee el blog",
        suffix: "— Análisis de la Tarea 1 (2026/1).",
      },
    ],
  },
  faqTitle: "Preguntas frecuentes",
  faq: [
    {
      question: "¿Cuándo es la próxima edición del Celpe-Bras (2026/2)?",
      answer:
        "Inscripción: del 27 de julio al 6 de agosto de 2026. Examen en Brasil: del 20 al 23 de octubre de 2026. Examen en el exterior: del 24 al 27 de noviembre de 2026. Resultados: 15 de diciembre de 2026 (Brasil) y 15 de enero de 2027 (exterior).",
    },
    {
      question: "¿Qué es el Celpe-Bras?",
      answer:
        "Es el examen oficial de Brasil para certificar el dominio del portugués como lengua extranjera.",
    },
    {
      question: "¿El examen tiene reconocimiento oficial?",
      answer: "Sí. Es el examen oficial reconocido por el gobierno brasileño para este fin.",
    },
    {
      question: "¿Cuáles son las partes del examen?",
      answer:
        "Una parte escrita y una parte oral. La parte escrita integra tareas de comprensión y de producción; la parte oral evalúa la interacción cara a cara en portugués.",
    },
    {
      question: "¿Cuántos niveles de certificación hay?",
      answer: "Cuatro niveles: Intermedio, Intermedio Superior, Avanzado y Avanzado Superior.",
    },
    {
      question: "¿El certificado vence?",
      answer:
        "Según la información pública del Inep, el certificado Celpe-Bras no vence. Confirma siempre en el canal oficial lo que corresponde a tu edición.",
    },
    {
      question: "¿Dónde seguir la inscripción y los resultados?",
      answer:
        "En el Sistema Celpe-Bras y en la página oficial del Celpe-Bras en el Inep (Gov.br), además de tu centro aplicador cuando haga falta.",
    },
  ],
};
