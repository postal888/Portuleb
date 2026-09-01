import { pathFor } from "../route-map";

export const enUi = {
  locale: "en" as const,
  nav: [
    { section: "celpeBras" as const, label: "Celpe-Bras" },
    { section: "pastExams" as const, label: "Past exams" },
    { section: "practice" as const, label: "Practice" },
    { section: "reader" as const, label: "Reader" },
    { section: "blog" as const, label: "Blog" },
    { section: "theory" as const, label: "Theory" },
    { section: "materials" as const, label: "Materials" },
    { section: "contact" as const, label: "Contact" },
    { section: "terms" as const, label: "Terms" },
  ],
  localeSwitcher: { label: "Language", pt: "Português", en: "English", ru: "Русский" },
  breadcrumb: { home: "Home" },
  footer: {
    taglineSuffix: "portal under construction, section by section.",
    rights: "All rights reserved.",
  },
  archive: {
    pastExams: "Past exams",
    sessionKicker: "Archive session",
    viewMaterials: "View materials",
    viewStructure: "View exam structure",
    application: "Exam dates",
    result: "Results",
    materialsInArchive: "materials in archive",
    overview: "Overview",
    sessionMaterials: "Session materials",
    sessionMaterialsCopy:
      "Materials grouped by role: written exam, audio/video inputs, oral interaction scripts, and official notice — not a loose file list.",
    embeddedMedia: "PDFs, video and audio",
    embeddedMediaCopy:
      "Files served from the local archive. PDFs open in the embedded viewer; video and audio use playback controls.",
    writtenPart: "Written exam",
    cadernoAndTasks: "Question booklet and tasks",
    writtenIntro:
      "Three-hour written exam with four integrated tasks. The full booklet is below; each task links to its input material.",
    fullCaderno: "Question booklet — full written exam",
    taskStructure: "Structure of the 4 tasks",
    originalTaskNote: "Original task title and prompt in Portuguese (study material).",
    oralPart: "Oral exam",
    oralTitle: "Face-to-face interaction",
    oralIntro:
      "Twenty-minute in-person interaction in two stages. Scripts and prompt elements are separate from the written booklet.",
    roteirosGuide: "Interaction guide",
    roteirosCopy: "How the interaction is run and how questions support the conversation.",
    topicsTitle: "Sample prompt elements",
    topicsCopy: "Some themes from this edition, shown for quick reference.",
    faqTitle: "Questions this page answers",
    faqKicker: "Session FAQ",
    faqIntro: "How to use the materials and what this archive does not include.",
    viewOnSite: "View on this site",
    openInNewTab: "Open in new tab",
    indexH1: "Celpe-Bras archive — past exams",
    indexTitle: "Sessions in the archive",
    indexLead:
      "Past Celpe-Bras exams by edition: question booklet, task videos, oral scripts and the prompts used in the face-to-face interaction.",
    sessionLabel: "Session",
    materialsCount: "materials",
  },
  blog: {
    navLabel: "Blog",
    indexTitle: "Strategy and reading",
    indexSubtitle:
      "Articles on Celpe-Bras preparation: strategy, assessment criteria, and links to Practice and Theory on the hub.",
    readArticle: "Read article →",
    featuredPill: "Featured",
    taskPill: "Task 1 — 2026/1",
    category: "Category",
    readTime: "Reading time",
    featured: "Featured article",
    sidebarSummary: "Quick summary",
    sidebarAudienceDefault: "Who this is for",
    sidebarLinksTitle: "On this site",
    sidebarLinksIntro: "After reading, you may want to visit:",
    sidebarTags: "Tags",
    footerNote: "More articles will be published in this section.",
    celpeGuideLink: "Celpe-Bras guide →",
    examArtifact: {
      transcript: "Original transcript (Portuguese)",
      prompt: "Original prompt (Portuguese)",
      modelAnswer: "Model answer in Portuguese",
    },
    leadDefault: "Introduction",
  },
  home: {
    metaTitle: "Celpe-Dê Pé — Celpe-Bras exam preparation",
    heroLead:
      "Theory, practice, past exams and strategy articles — a step-by-step preparation portal.",
    sectionsTitle: "Site sections",
  },
} as const;

export function enNavHref(section: (typeof enUi.nav)[number]["section"]) {
  return pathFor("en", section);
}
