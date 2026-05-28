import type { MaterialKind } from "@/lib/materials/registry";

export type SessionTask = {
  number: string;
  title: string;
  description: string;
  state: "ok" | "missing";
  stateLabel: string;
  input: string;
  materialHref: string;
  materialAction: string;
};

export type SessionMaterial = {
  id: string;
  materialId: string;
  kind: MaterialKind;
  badge?: string;
  badgeVariant?: "default" | "neutral" | "missing";
  icon: string;
  title: string;
  description: string;
  category: string;
  action: string;
  href: string;
  dimmed: boolean;
};

export const session2026_1 = {
  slug: "2026-1",
  eyebrow: "Provas Anteriores / 2026 / Sessão 1",
  title: "Celpe-Bras 2026/1",
  lead: "Uma página da sessão que reúne a prova escrita, os materiais da parte oral e o edital oficial em um só lugar.",
  application: "28/04 a 01/05/2026",
  resultDate: "30/06/2026",
  stats: { available: 6, missing: 0, missingLabel: "nenhum ausente" },
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
      id: "audio-t2",
      materialId: "audio-t2",
      kind: "video",
      icon: "▶",
      title: "Áudio da Tarefa 2",
      description: "Cardápio QR Code — insumo em vídeo/áudio da produção escrita.",
      category: "Tarefa 2",
      action: "Assistir",
      href: "#material-audio-t2",
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
      icon: "20",
      title: "Elementos provocadores",
      description: "Conjunto com 20 temas para a interação face a face.",
      category: "Parte oral",
      action: "Abrir PDF",
      href: "#material-elementos",
      dimmed: false,
    },
    {
      id: "edital",
      materialId: "edital",
      kind: "pdf",
      badge: "Oficial",
      badgeVariant: "neutral",
      icon: "§",
      title: "Edital 2026/1",
      description: "Cronograma, estrutura do exame, avaliação e certificação.",
      category: "Edital",
      action: "Ler edital",
      href: "#material-edital",
      dimmed: false,
    },
    {
      id: "video-t1",
      materialId: "video-t1",
      kind: "video",
      icon: "V",
      title: "Vídeo da Tarefa 1",
      description: "Festival Fartura — insumo em vídeo da produção escrita.",
      category: "Tarefa 1",
      action: "Assistir",
      href: "#material-video-t1",
      dimmed: false,
    },
  ] satisfies SessionMaterial[],
  tasks: [
    {
      number: "Tarefa 1",
      title: "Festival Fartura",
      description:
        "Produção de um artigo para a seção de gastronomia a partir de um vídeo sobre o festival.",
      state: "ok" as const,
      stateLabel: "Vídeo",
      input: "Insumo: vídeo",
      materialHref: "#material-video-t1",
      materialAction: "Assistir vídeo",
    },
    {
      number: "Tarefa 2",
      title: "Cardápio QR Code",
      description:
        "Carta aberta aos gestores da cidade defendendo uma lei para regulamentar a questão discutida no áudio.",
      state: "ok" as const,
      stateLabel: "Áudio",
      input: "Insumo: áudio/vídeo",
      materialHref: "#material-audio-t2",
      materialAction: "Ouvir / assistir",
    },
    {
      number: "Tarefa 3",
      title: "Cantigas de roda",
      description:
        "E-mail para a escola sugerindo a inclusão de cantigas de roda e seus benefícios para o desenvolvimento infantil.",
      state: "ok" as const,
      stateLabel: "No caderno",
      input: "Insumo: texto",
      materialHref: "#material-caderno",
      materialAction: "Ver no caderno",
    },
    {
      number: "Tarefa 4",
      title: "Desigualdade racial na mídia brasileira",
      description:
        "Proposta à diretoria defendendo o aumento da diversidade nos cargos de chefia com ações concretas.",
      state: "ok" as const,
      stateLabel: "No caderno",
      input: "Insumo: texto",
      materialHref: "#material-caderno",
      materialAction: "Ver no caderno",
    },
  ] satisfies SessionTask[],
  oralTopics: {
    roteiros: ["20 minutos", "2 etapas", "gravação em áudio"],
    temas: [
      "Profissão",
      "Tecnologia e trabalho",
      "Pix",
      "Vacinação",
      "Diplomacia do clima",
      "Vini Jr.",
    ],
  },
  faq: [
    {
      question: "O que está completo?",
      answer:
        "Caderno de questões, vídeos das tarefas, roteiros, elementos provocadores e edital — todos visualizáveis nesta página.",
    },
    {
      question: "O que falta?",
      answer:
        "Nesta edição o acervo local está completo para os arquivos listados. Novos materiais serão adicionados conforme o índice oficial.",
    },
    {
      question: "Como navegar?",
      answer:
        "Use os cards para ir ao visualizador embutido (PDF, vídeo ou áudio). Cada material abre no próprio site, sem download obrigatório.",
    },
    {
      question: "Como isso vira produto?",
      answer:
        "Cada bloco pode ganhar prática derivada, links para Celpe-Bras e exercícios baseados nos insumos da sessão.",
    },
  ],
};
