import type { ArchiveSession } from "./types";
import { buildStandardSession } from "./standard-session";

export const session2024_2: ArchiveSession = buildStandardSession({
  slug: "2024-2",
  eyebrow: "Provas Anteriores / 2024 / Sessão 2",
  title: "Celpe-Bras 2024/2",
  lead: "Prova escrita de outubro de 2024: caderno completo, vídeos das tarefas 1 (Cultura da aceleração) e 2 (Raduan Nassar), roteiros e elementos provocadores.",
  application: "08 a 11/10/2024",
  resultDate: "10/12/2024",
  available: 5,
  missing: 1,
  missingLabel: "edital não no acervo",
  task1: {
    title: "Cultura da aceleração",
    description: "Produção textual a partir do vídeo sobre cultura da aceleração.",
    videoTitle: "Vídeo da Tarefa 1",
    videoDescription: "Cultura da aceleração — insumo em vídeo da produção escrita.",
  },
  task2: {
    title: "Raduan Nassar",
    description: "Produção textual a partir do insumo em áudio/vídeo sobre Raduan Nassar.",
    videoTitle: "Áudio/vídeo da Tarefa 2",
    videoDescription: "Raduan Nassar — insumo em áudio/vídeo da produção escrita.",
  },
  oralTemas: ["Tema 1", "Tema 2", "Tema 3", "Tema 4", "Tema 5", "Tema 6"],
});
