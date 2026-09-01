import type { ArchiveSession } from "./types";
import { buildStandardSession } from "./standard-session";

export const session2023_1: ArchiveSession = buildStandardSession({
  slug: "2023-1",
  eyebrow: "Provas Anteriores / 2023 / Sessão 1",
  title: "Celpe-Bras 2023/1",
  lead: "Prova escrita de abril de 2023: caderno completo, vídeos das tarefas 1 e 2, roteiros e elementos provocadores da parte oral.",
  application: "11 a 14/04/2023",
  resultDate: "30/05/2023",
  available: 5,
  missing: 1,
  missingLabel: "edital não no acervo",
  task1: {
    title: "Tarefa 1 (vídeo)",
    description: "Produção textual a partir do insumo em vídeo da Tarefa 1.",
    videoTitle: "Vídeo da Tarefa 1",
    videoDescription: "Insumo em vídeo da produção escrita — edição 2023/1.",
  },
  task2: {
    title: "Tarefa 2 (áudio/vídeo)",
    description: "Produção textual a partir do insumo em áudio ou vídeo da Tarefa 2.",
    videoTitle: "Áudio/vídeo da Tarefa 2",
    videoDescription: "Insumo em áudio/vídeo da produção escrita — edição 2023/1.",
  },
  oralTemas: ["Tema 1", "Tema 2", "Tema 3", "Tema 4", "Tema 5", "Tema 6"],
});
