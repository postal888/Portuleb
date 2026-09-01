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
      {
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
      },
      {
        id: "video-t1",
        materialId: "video-t1",
        kind: "video",
        icon: "V",
        title: meta.task1.videoTitle,
        description: meta.task1.videoDescription,
        category: "Tarefa 1",
        action: "Assistir",
        href: "#material-video-t1",
        dimmed: false,
      },
      {
        id: "video-t2",
        materialId: "video-t2",
        kind: "video",
        icon: "▶",
        title: meta.task2.videoTitle,
        description: meta.task2.videoDescription,
        category: "Tarefa 2",
        action: "Assistir",
        href: "#material-video-t2",
        dimmed: false,
      },
      {
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
      },
      {
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
      },
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
        state: "ok",
        stateLabel: "Vídeo",
        input: "Insumo: vídeo",
        materialHref: "#material-video-t1",
        materialAction: "Assistir vídeo",
      },
      {
        number: "Tarefa 2",
        title: meta.task2.title,
        description: meta.task2.description,
        state: "ok",
        stateLabel: "Áudio",
        input: "Insumo: áudio/vídeo",
        materialHref: "#material-video-t2",
        materialAction: "Ouvir / assistir",
      },
      {
        number: "Tarefa 3",
        title: task3.title,
        description: task3.description,
        state: "ok",
        stateLabel: "No caderno",
        input: "Insumo: texto",
        materialHref: "#material-caderno",
        materialAction: "Ver no caderno",
      },
      {
        number: "Tarefa 4",
        title: task4.title,
        description: task4.description,
        state: "ok",
        stateLabel: "No caderno",
        input: "Insumo: texto",
        materialHref: "#material-caderno",
        materialAction: "Ver no caderno",
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
          "Caderno de questões, vídeos das tarefas 1 e 2, roteiros e elementos provocadores — todos visualizáveis nesta página.",
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
