import type { ArchiveSession } from "../types";
import { session2026_1 } from "../2026-1";

/** EN page wrapper — exam tasks and oral topic labels stay in Portuguese. */
export const session2026_1_en: ArchiveSession = {
  ...session2026_1,
  eyebrow: "Past exams / 2026 / Session 1",
  title: "Celpe-Bras 2026/1",
  lead: "Written exam materials, oral interaction scripts, official notice, and embedded PDFs, video, and audio in one place.",
  application: "Apr 28 – May 1, 2026",
  resultDate: "Jun 30, 2026",
  stats: { available: 6, missing: 0, missingLabel: "none missing" },
  blogAnalysis: {
    href: "/en/blog/analise-tarefa-1-festival-fartura-2026-1",
    label: "Task 1 analysis (blog)",
  },
  materials: session2026_1.materials.map((m) => ({
    ...m,
    title:
      m.id === "caderno"
        ? "Question booklet"
        : m.id === "audio-t2"
          ? "Task 2 audio/video"
          : m.id === "roteiros"
            ? "Interaction scripts"
            : m.id === "elementos"
              ? "Prompt elements"
              : m.id === "edital"
                ? "Notice 2026/1"
                : m.id === "video-t1"
                  ? "Task 1 video"
                  : m.title,
    description:
      m.id === "caderno"
        ? "Written exam with four integrated tasks."
        : m.id === "audio-t2"
          ? "QR Code menu — audio/video input for the written task."
          : m.id === "roteiros"
            ? "Questions and guidance for the oral interaction."
            : m.id === "elementos"
              ? "Set of 20 themes for face-to-face interaction."
              : m.id === "edital"
                ? "Schedule, exam structure, assessment and certification."
                : m.id === "video-t1"
                  ? "Festival Fartura — video input for the written task."
                  : m.description,
    category:
      m.category === "Parte escrita"
        ? "Written"
        : m.category === "Parte oral"
          ? "Oral"
          : m.category === "Edital"
            ? "Notice"
            : m.category.startsWith("Tarefa")
              ? m.category.replace("Tarefa", "Task")
              : m.category,
    action:
      m.action === "Abrir PDF"
        ? "Open PDF"
        : m.action === "Assistir"
          ? "Watch"
          : m.action === "Ler edital"
            ? "Read notice"
            : m.action,
  })),
  tasks: session2026_1.tasks.map((t) => ({
    ...t,
    number: t.number.replace("Tarefa", "Task"),
    stateLabel:
      t.stateLabel === "Vídeo" ? "Video" : t.stateLabel === "Áudio" ? "Audio" : "In booklet",
    input: t.input
      .replace("Insumo: vídeo", "Input: video")
      .replace("Insumo: áudio/vídeo", "Input: audio/video")
      .replace("Insumo: texto", "Input: text"),
    materialAction:
      t.materialAction === "Assistir vídeo"
        ? "Watch video"
        : t.materialAction === "Ouvir / assistir"
          ? "Listen / watch"
          : "View in booklet",
  })),
  asideNote:
    "The notice sets dates and structure; the booklet covers the four written tasks; scripts and prompt elements support the oral part.",
  oralTopics: {
    roteiros: ["20 minutes", "2 stages", "audio recording"],
    temas: session2026_1.oralTopics.temas,
  },
  faq: [
    {
      question: "What is complete?",
      answer:
        "Question booklet, task videos, interaction scripts, prompt elements, and notice — all viewable on this page.",
    },
    {
      question: "What is missing?",
      answer:
        "This edition is complete in the local archive for the files listed. New materials will be added when published officially.",
    },
    {
      question: "How do I navigate?",
      answer:
        "Use the cards to open the embedded viewer (PDF, video, or audio). Each file opens on-site; download is optional.",
    },
    {
      question: "How does this connect to practice?",
      answer:
        "Each block can later link to practice drills, Celpe-Bras guides, and exercises based on these inputs.",
    },
  ],
};
