import type { ArchiveSession } from "../types";
import { session2026_1 } from "../2026-1";

/** EN page wrapper — exam tasks and oral topic labels stay in Portuguese. */
export const session2026_1_en: ArchiveSession = {
  ...session2026_1,
  eyebrow: "Past exams / 2026 / Session 1",
  title: "Celpe-Bras 2026/1",
  lead:
    "Celpe-Bras is Brazil’s official Inep/MEC exam for the Certificate of Proficiency in Portuguese for Foreigners. This page gathers the written booklet, video/audio inputs, oral materials, and the 2026/1 notice.",
  notice:
    "celpe-depe.com is an independent project, not affiliated with Inep/MEC. Files here reproduce official or study materials; official registration and archives remain on Portal Gov.br and the Celpe-Bras System (celpebras.inep.gov.br).",
  application: "Apr 28 – May 1, 2026",
  applicationNote:
    "At accredited test centers in Brazil and abroad (official list on Inep). The edition had 3,513 candidates from 44 countries; exams finished on May 1, 2026.",
  resultDate: "Jun 30, 2026",
  resultNote:
    "Official publication in the Federal Official Gazette (DOU) and individual lookup in the Celpe-Bras System (celpebras.inep.gov.br).",
  stats: { available: 6, missing: 0, missingLabel: "none missing" },
  blogAnalysis: {
    href: "/en/blog/analise-tarefa-1-festival-fartura-2026-1",
    label: "Task 1 analysis (blog)",
  },
  guideLink: {
    href: "/en/celpe-bras",
    label: "What Celpe-Bras is and how the exam works",
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
                ? "Notice No. 8/2026 — Inep/MEC"
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
                ? "Notice No. 8 of February 20, 2026 (published in the DOU): schedule, registration, structure, assessment, and certification for Celpe-Bras 2026/1."
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
    "2026/1 registration: Feb 24–Mar 6, 2026 via the Celpe-Bras System (celpebras.inep.gov.br), including fee, specialized assistance, and social-name rules in the notice. The certificate may be required for programs such as PEC-G/PEC-PLE — check each program’s own notice.",
  oralTopics: {
    roteiros: ["20 minutes", "2 stages", "audio recording"],
    temas: session2026_1.oralTopics.temas,
  },
  faq: [
    {
      question: "What is complete?",
      answer:
        "Question booklet, task videos, interaction scripts, prompt elements, and Notice No. 8/2026 — all viewable on this page.",
    },
    {
      question: "What is missing?",
      answer:
        "This edition is complete in the local archive for the files listed. New materials will be added when published officially by Inep.",
    },
    {
      question: "How do I navigate?",
      answer:
        "Use the cards to open the embedded viewer (PDF, video, or audio). Each file opens on-site; download is optional.",
    },
    {
      question: "Where do I register for the official exam?",
      answer:
        "In the Celpe-Bras System (celpebras.inep.gov.br), according to each edition’s notice. This site does not register candidates or issue certificates.",
    },
    {
      question: "Is this site official?",
      answer:
        "No. celpe-depe.com is independent preparation. Materials and dates here support study; the normative source is Inep/MEC (Portal Gov.br and the Federal Official Gazette).",
    },
    {
      question: "How does this connect to practice?",
      answer:
        "Each block can feed exercises and analyses on the site (such as the Task 1 blog analysis), without replacing Inep’s official archive or channels.",
    },
  ],
};
