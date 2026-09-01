import type { ArchiveSession } from "../types";
import { session2025_1 } from "../2025-1";

export const session2025_1_en: ArchiveSession = {
  ...session2025_1,
  eyebrow: "Past exams / 2025 / Session 1",
  title: "Celpe-Bras 2025/1",
  lead: "March 2025 written exam: full question booklet, Task 1 and 2 videos, oral scripts and prompt elements.",
  application: "Mar 11 – 14, 2025",
  resultDate: "May 27, 2025",
  stats: { available: 5, missing: 1, missingLabel: "notice not in archive" },
  materials: session2025_1.materials.map((m) => ({
    ...m,
    title:
      m.id === "caderno"
        ? "Question booklet"
        : m.id === "video-t1"
          ? "Task 1 video"
          : m.id === "video-t2"
            ? "Task 2 audio/video"
            : m.id === "roteiros"
              ? "Interaction scripts"
              : m.id === "elementos"
                ? "Prompt elements"
                : m.id === "edital"
                  ? "Notice 2025/1"
                  : m.title,
    description:
      m.id === "caderno"
        ? "Written exam with four integrated tasks."
        : m.id === "video-t1"
          ? "Park visit — Caminhos do Mar / Old Santos Road."
          : m.id === "video-t2"
            ? "A Última Floresta — documentary and interview with Luiz Bolognesi."
            : m.id === "roteiros"
              ? "Questions and guidance for the oral interaction."
              : m.id === "elementos"
                ? "Prompt themes for face-to-face interaction (2025/1)."
                : m.id === "edital"
                  ? "Not included in this local package — see the official Celpe-Bras site."
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
          : m.action === "Indisponível"
            ? "Unavailable"
            : m.action,
    badge: m.badge === "Ausente" ? "Missing" : m.badge,
  })),
  tasks: session2025_1.tasks.map((t) => ({
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
  oralTopics: {
    roteiros: ["20 minutes", "2 stages", "audio recording"],
    temas: session2025_1.oralTopics.temas,
  },
  faq: [
    {
      question: "What is complete?",
      answer:
        "Question booklet, Task 1 video, Task 2 audio/video, scripts and prompt elements — all viewable here.",
    },
    {
      question: "What is missing?",
      answer: "The official notice is not in this file package. Other listed materials are in the local archive.",
    },
    {
      question: "How do I navigate?",
      answer:
        "Use the cards to open the embedded viewer (PDF, video, or audio). Each file opens on-site; download is optional.",
    },
  ],
};
