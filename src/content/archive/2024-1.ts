import type { ArchiveSession } from "./types";
import { buildStandardSession } from "./standard-session";

export const session2024_1: ArchiveSession = buildStandardSession({
  slug: "2024-1",
  eyebrow: "Provas Anteriores / 2024 / Sessão 1",
  title: "Celpe-Bras 2024/1",
  lead: "Prova escrita de abril de 2024: caderno completo, vídeos das tarefas 1 (Museu da Vida) e 2 (Estatuto Racial), roteiros e elementos provocadores.",
  application: "09 a 12/04/2024",
  resultDate: "28/05/2024",
  available: 5,
  missing: 1,
  missingLabel: "edital não no acervo",
  task1: {
    title: "Museu da Vida",
    description: "Produção textual a partir do vídeo sobre o Museu da Vida.",
    videoTitle: "Vídeo da Tarefa 1",
    videoDescription: "Museu da Vida — insumo em vídeo da produção escrita.",
  },
  task2: {
    title: "Estatuto Racial",
    description: "Produção textual a partir do insumo em áudio/vídeo sobre o Estatuto Racial.",
    videoTitle: "Áudio/vídeo da Tarefa 2",
    videoDescription: "Estatuto Racial — insumo em áudio/vídeo da produção escrita.",
  },
  oralTemas: ["Tema 1", "Tema 2", "Tema 3", "Tema 4", "Tema 5", "Tema 6"],
});
