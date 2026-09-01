import type { CelpeBrasGuideContent } from "./guide-types";

export const celpeGuideEn: CelpeBrasGuideContent = {
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
  hero: {
    eyebrow: "Exam guide",
    title: "Celpe-Bras: complete exam guide",
    lead:
      "The Celpe-Bras is Brazil's official proficiency exam in Portuguese as a foreign language. This page explains how the exam works, its parts, how assessment works, and where to follow registration and results.",
    ctaBooklet: "View 2026/1 booklet",
    ctaPastExams: "Browse past exams",
  },
  booklet: {
    title: "From the question booklet (2026/1)",
    subtitle:
      "Cover instructions from the official Written Part material — same colours and structure as the exam.",
    linkLabel: "Open booklet PDF in the archive →",
    pastExamSlug: "2026-1",
    materialId: "caderno",
  },
  taskStripLabel: "Four written tasks (2026/1)",
  quickFactsTitle: "Quick facts",
  quickFacts: [
    "Brazil's official Portuguese proficiency exam for foreigners.",
    "Held in Brazil and abroad.",
    "Usually offered twice a year.",
    "Written part (~3 hours, 4 tasks) and oral part (~20 minutes).",
    "Certifies four proficiency levels.",
    "Official updates are published on the Celpe-Bras/Inep system and pages.",
  ],
  indexTitle: "On this page",
  indexLinks: [
    { anchor: "booklet", label: "2026/1 booklet" },
    { anchor: "whatIs", label: "What is the Celpe-Bras" },
    { anchor: "howWorks", label: "How the exam works" },
    { anchor: "parts", label: "Exam parts" },
    { anchor: "criteria", label: "Assessment criteria" },
    { anchor: "levels", label: "Levels and results" },
    { anchor: "registration", label: "Registration and calendar" },
    { anchor: "faq", label: "FAQ" },
  ],
  whatIs: {
    title: "What is the Celpe-Bras",
    paragraphs: [
      "The Celpe-Bras is Brazil's official certificate of Portuguese proficiency for foreigners. It is recognised by the Brazilian government and used when you need to prove your level of Portuguese in academic, professional or institutional contexts.",
      "The exam looks beyond isolated grammar knowledge: it observes how you use the language in broader communicative situations. Understanding the exam logic matters as much as vocabulary, structures and rules.",
    ],
  },
  howWorks: {
    title: "How the exam works",
    paragraphs: [
      "The exam has two parts: written and oral. The written part lasts about three hours; the oral part about twenty minutes.",
      "The written part combines comprehension and production tasks; the oral part assesses face-to-face interaction. Examiners observe how you interpret materials, organise responses and use Portuguese to meet communicative goals.",
    ],
  },
  parts: {
    title: "Exam parts",
    cards: [
      {
        title: "Listening comprehension",
        body: "In the written part, you must understand information in audio materials and use it in the proposed tasks.",
        variant: "green",
      },
      {
        title: "Reading",
        body: "Reading appears when you interpret written texts and use that information to produce appropriate responses.",
        variant: "blue",
      },
      {
        title: "Written production",
        body: "Written production is assessed through tasks based on video, audio and written inputs. The focus is on producing a text that fits the prompt, with clarity, coherence and functional use of the language.",
        variant: "green",
      },
      {
        title: "Oral interview",
        body: "The oral part is a face-to-face interaction. You converse with examiners using themes and prompts presented during the interview.",
        variant: "blue",
      },
    ],
  },
  criteria: {
    title: "Assessment criteria",
    paragraphs: [
      "The Celpe-Bras does not only count isolated grammar mistakes. It considers your performance more broadly: how you understand materials, respond to tasks and use the language appropriately.",
      "In practice, assessment looks at adequacy, organisation, clarity and whether you fulfil the communicative goal. That helps you avoid preparation based only on memorising rules.",
    ],
  },
  levels: {
    title: "Levels and results",
    paragraphs: [
      "The exam certifies four levels: Intermediate, Upper Intermediate, Advanced and Upper Advanced. Candidates below the minimum score are not certified.",
      "Many test centres and explanatory materials present score bands as follows:",
    ],
    validityLabel: "Certificate validity.",
    validityText: "The Celpe-Bras certificate does not expire.",
  },
  registration: {
    title: "Registration and calendar",
    paragraphs: [
      "The Celpe-Bras is usually held twice a year, often once in the first and once in the second semester. Follow registration, exam dates and results on the official system and Inep / test-centre communications.",
      "Because dates and procedures can change each edition, always check the official Celpe-Bras page on Inep and the registration system.",
    ],
  },
  nextSteps: {
    title: "Next steps",
    items: [
      {
        type: "link",
        section: "home",
        label: "Start your free preparation",
        suffix: "— Practice for free with theory, past exams and exercises.",
      },
      {
        type: "anchor",
        anchor: "booklet",
        label: "Booklet instructions",
        suffix: "— Written Part 2026/1 rules.",
      },
      {
        type: "anchor",
        anchor: "parts",
        label: "Exam parts",
        suffix: "— Understand each component.",
      },
      {
        type: "link",
        section: "pastExams",
        label: "Past exams archive",
        suffix: "— Browse past editions and materials.",
      },
      {
        type: "link",
        section: "practice",
        label: "Practice",
        suffix: "— Train by skill.",
      },
      {
        type: "link",
        section: "blogPost",
        slug: "analise-tarefa-1-festival-fartura-2026-1",
        label: "Read the blog",
        suffix: "— Task 1 analysis (2026/1).",
      },
    ],
  },
  faqTitle: "FAQ",
  faq: [
    {
      question: "When is the next Celpe-Bras session (2026/2)?",
      answer:
        "Registration: 27 July – 6 August 2026. Exam in Brazil: 20–23 October 2026. Exam abroad: 24–27 November 2026. Results: 15 December 2026 (Brazil) and 15 January 2027 (abroad).",
    },
    {
      question: "What is the Celpe-Bras?",
      answer:
        "It is Brazil's official exam to certify proficiency in Portuguese as a foreign language.",
    },
    {
      question: "Is the exam officially recognised?",
      answer: "Yes. It is the certificate officially recognised by the Brazilian government.",
    },
    {
      question: "What are the exam parts?",
      answer:
        "A written part and an oral part. The written part links comprehension and production tasks; the oral part assesses face-to-face interaction in Portuguese.",
    },
    {
      question: "How many certification levels exist?",
      answer: "Four levels: Intermediate, Upper Intermediate, Advanced and Upper Advanced.",
    },
    {
      question: "Does the certificate expire?",
      answer: "No. The Celpe-Bras certificate does not expire.",
    },
    {
      question: "Where to follow registration and results?",
      answer:
        "On the official exam system and Celpe-Bras/Inep pages, plus your test centre when needed.",
    },
  ],
};
