import type { ArchiveSession } from "./types";
import { buildStandardSession } from "./standard-session";

export const session2025_2: ArchiveSession = buildStandardSession({
  slug: "2025-2",
  eyebrow: "Provas Anteriores / 2025 / Sessão 2",
  title: "Celpe-Bras 2025/2",
  lead: "Prova escrita de outubro de 2025: caderno completo, vídeos das tarefas 1 (Armário coletivo) e 2 (Selo Arte), roteiros e elementos provocadores.",
  application: "07 a 10/10/2025",
  resultDate: "09/12/2025",
  available: 5,
  missing: 1,
  missingLabel: "edital não no acervo",
  task1: {
    title: "Armário coletivo",
    description: "Produção textual a partir do vídeo sobre armário coletivo.",
    videoTitle: "Vídeo da Tarefa 1",
    videoDescription: "Armário coletivo — insumo em vídeo da produção escrita.",
  },
  task2: {
    title: "Selo Arte",
    description: "Produção textual a partir do insumo em áudio/vídeo sobre Selo Arte.",
    videoTitle: "Áudio/vídeo da Tarefa 2",
    videoDescription: "Selo Arte — insumo em áudio/vídeo da produção escrita.",
  },
  oralTemas: ["Tema 1", "Tema 2", "Tema 3", "Tema 4", "Tema 5", "Tema 6"],
});
