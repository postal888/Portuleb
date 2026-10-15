import type { ArchiveSession } from "./types";

export type StandardSessionMeta = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  application: string;
  resultDate: string;
  available: number;
  missing: number;
  missingLabel: string;
  task1: {
    title: string;
    description: string;
    videoTitle: string;
    videoDescription: string;
  };
  task2: {
    title: string;
    description: string;
    videoTitle: string;
    videoDescription: string;
  };
  task3?: { title: string; description: string };
  task4?: { title: string; description: string };
  oralTemas: string[];
  edital?: { available: boolean; description?: string };
  blogAnalysis?: { href: string; label: string };
  asideNote?: string;
  /** Defaults keep every core file present, as on the 2023–2026 pages. */
  present?: {
    caderno?: boolean;
    videoT1?: boolean;
    videoT2?: boolean;
    roteiros?: boolean;
    elementos?: boolean;
  };
  task1Kind?: "video" | "audio";
  task2Kind?: "video" | "audio";
};

export function buildStandardSession(meta: StandardSessionMeta): ArchiveSession {
  const task3 = meta.task3 ?? {
    title: "Tarefa 3",
    description: "Produção textual a partir do insumo escrito no caderno de questões.",
  };
  const task4 = meta.task4 ?? {
    title: "Tarefa 4",
    description: "Produção textual a partir do insumo escrito no caderno de questões.",
  };

  const editalAvailable = meta.edital?.available ?? false;
  const has = {
    caderno: meta.present?.caderno ?? true,
    videoT1: meta.present?.videoT1 ?? true,
    videoT2: meta.present?.videoT2 ?? true,
    roteiros: meta.present?.roteiros ?? true,
    elementos: meta.present?.elementos ?? true,
  };
  const task1Kind = meta.task1Kind ?? "video";
  const task2Kind = meta.task2Kind ?? "video";

  function slot(on: boolean, item: ArchiveSession["materials"][number]) {
    if (on) return item;
    return {
      ...item,
      badge: "Ausente",
      badgeVariant: "missing" as const,
      description: "Não incluído neste pacote local.",
      action: "Indisponível",
      href: "#materiais",
      dimmed: true,
    };
  }

  return {
    slug: meta.slug,
    eyebrow: meta.eyebrow,
    title: meta.title,
    lead: meta.lead,
    application: meta.application,
    resultDate: meta.resultDate,
    stats: {
      available: meta.available,
      missing: meta.missing,
      missingLabel: meta.missingLabel,
    },
    ...(meta.blogAnalysis ? { blogAnalysis: meta.blogAnalysis } : {}),
    materials: [
      slot(has.caderno, {
        id: "caderno",
        materialId: "caderno",
        kind: "pdf",
        icon: "PDF",
        title: "Caderno de questões",
        description: "Prova escrita com 4 tarefas integradas.",
        category: "Parte escrita",
        action: "Abrir PDF",
        href: "#parte-escrita",
        dimmed: false,
      }),
      slot(has.videoT1, {
        id: "video-t1",
        materialId: "video-t1",
        kind: task1Kind,
        icon: "V",
        title: meta.task1.videoTitle,
        description: meta.task1.videoDescription,
        category: "Tarefa 1",
        action: task1Kind === "audio" ? "Ouvir" : "Assistir",
        href: "#material-video-t1",
        dimmed: false,
      }),
      slot(has.videoT2, {
        id: "video-t2",
        materialId: "video-t2",
        kind: task2Kind,
        icon: "▶",
        title: meta.task2.videoTitle,
        description: meta.task2.videoDescription,
        category: "Tarefa 2",
        action: task2Kind === "audio" ? "Ouvir" : "Assistir",
        href: "#material-video-t2",
        dimmed: false,
      }),
      slot(has.roteiros, {
        id: "roteiros",
        materialId: "roteiros",
        kind: "pdf",
        icon: "R",
        title: "Roteiros de interação",
        description: "Perguntas e orientação para a condução da parte oral.",
        category: "Parte oral",
        action: "Abrir PDF",
        href: "#material-roteiros",
        dimmed: false,
      }),
      slot(has.elementos, {
        id: "elementos",
        materialId: "elementos",
        kind: "pdf",
        icon: "EP",
        title: "Elementos provocadores",
        description: "Temas para a interação face a face.",
        category: "Parte oral",
        action: "Abrir PDF",
        href: "#material-elementos",
        dimmed: false,
      }),
      {
        id: "edital",
        materialId: "edital",
        kind: "pdf",
        badge: editalAvailable ? "Oficial" : "Ausente",
        badgeVariant: editalAvailable ? "neutral" : "missing",
        icon: "§",
        title: `Edital ${meta.title.replace("Celpe-Bras ", "")}`,
        description:
          meta.edital?.description ??
          (editalAvailable
            ? "Cronograma, estrutura do exame, avaliação e certificação."
            : "Não incluído neste pacote local — consulte o site oficial do Celpe-Bras."),
        category: "Edital",
        action: editalAvailable ? "Ler edital" : "Indisponível",
        href: editalAvailable ? "#material-edital" : "#materiais",
        dimmed: !editalAvailable,
      },
    ],
    tasks: [
      {
        number: "Tarefa 1",
        title: meta.task1.title,
        description: meta.task1.description,
        state: has.videoT1 ? "ok" : "missing",
        stateLabel: has.videoT1 ? (task1Kind === "audio" ? "Áudio" : "Vídeo") : "Ausente",
        input: task1Kind === "audio" ? "Insumo: áudio" : "Insumo: vídeo",
        materialHref: has.videoT1 ? "#material-video-t1" : "#materiais",
        materialAction: has.videoT1
          ? task1Kind === "audio"
            ? "Ouvir"
            : "Assistir vídeo"
          : "Indisponível",
      },
      {
        number: "Tarefa 2",
        title: meta.task2.title,
        description: meta.task2.description,
        state: has.videoT2 ? "ok" : "missing",
        stateLabel: has.videoT2
          ? meta.task2Kind === "video"
            ? "Vídeo"
            : "Áudio"
          : "Ausente",
        input: has.videoT2
          ? meta.task2Kind === "audio"
            ? "Insumo: áudio"
            : meta.task2Kind === "video"
              ? "Insumo: vídeo"
              : "Insumo: áudio/vídeo"
          : "Insumo: áudio/vídeo",
        materialHref: has.videoT2 ? "#material-video-t2" : "#materiais",
        materialAction: has.videoT2 ? "Ouvir / assistir" : "Indisponível",
      },
      {
        number: "Tarefa 3",
        title: task3.title,
        description: task3.description,
        state: has.caderno ? "ok" : "missing",
        stateLabel: has.caderno ? "No caderno" : "Ausente",
        input: "Insumo: texto",
        materialHref: has.caderno ? "#material-caderno" : "#materiais",
        materialAction: has.caderno ? "Ver no caderno" : "Indisponível",
      },
      {
        number: "Tarefa 4",
        title: task4.title,
        description: task4.description,
        state: has.caderno ? "ok" : "missing",
        stateLabel: has.caderno ? "No caderno" : "Ausente",
        input: "Insumo: texto",
        materialHref: has.caderno ? "#material-caderno" : "#materiais",
        materialAction: has.caderno ? "Ver no caderno" : "Indisponível",
      },
    ],
    oralTopics: {
      roteiros: ["20 minutos", "2 etapas", "gravação em áudio"],
      temas: meta.oralTemas,
    },
    ...(meta.asideNote ? { asideNote: meta.asideNote } : {}),
    faq: [
      {
        question: "O que está completo?",
        answer:
          has.caderno && has.videoT1 && has.videoT2 && has.roteiros && has.elementos
            ? "Caderno de questões, vídeos das tarefas 1 e 2, roteiros e elementos provocadores — todos visualizáveis nesta página."
            : `Nesta página dá para abrir o que está no acervo local: ${[
                has.caderno ? "caderno de questões" : null,
                has.videoT1 ? "insumo da tarefa 1" : null,
                has.videoT2 ? "insumo da tarefa 2" : null,
                has.roteiros ? "roteiros" : null,
                has.elementos ? "elementos provocadores" : null,
                editalAvailable ? "edital" : null,
              ]
                .filter(Boolean)
                .join(", ")}.`,
      },
      {
        question: "O que falta?",
        answer:
          meta.missing > 0
            ? `${meta.missingLabel.charAt(0).toUpperCase()}${meta.missingLabel.slice(1)}. Demais materiais listados estão no acervo local.`
            : "Nesta edição o acervo local está completo para os arquivos listados.",
      },
      {
        question: "Como navegar?",
        answer:
          "Use os cards para ir ao visualizador embutido (PDF, vídeo ou áudio). Cada material abre no próprio site, sem download obrigatório.",
      },
    ],
  };
}
