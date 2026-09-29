import type { ArchiveSession } from "./types";

export type { ArchiveSession, SessionMaterial, SessionTask } from "./types";

export const session2026_1: ArchiveSession = {
  slug: "2026-1",
  eyebrow: "Provas Anteriores / 2026 / Sessão 1",
  title: "Celpe-Bras 2026/1",
  lead:
    "O Celpe-Bras é o exame oficial do Inep/MEC para obtenção do Certificado de Proficiência em Língua Portuguesa para Estrangeiros. Nesta página você encontra o caderno da prova escrita, os insumos em vídeo/áudio, a parte oral e o edital da 1ª edição de 2026.",
  notice:
    "celpe-depe.com é uma iniciativa independente, não vinculada institucionalmente ao Inep/MEC. Os arquivos aqui reproduzem materiais oficiais ou derivados para estudo; o acervo oficial e a inscrição ficam no Portal Gov.br e no Sistema Celpe-Bras (celpebras.inep.gov.br).",
  application: "28/04 a 01/05/2026",
  applicationNote:
    "Em postos aplicadores credenciados no Brasil e no exterior (lista oficial no Inep). A edição registrou 3.513 inscritos de 44 países; provas finalizadas em 1º/05/2026.",
  resultDate: "30/06/2026",
  resultNote:
    "Divulgação oficial no Diário Oficial da União e consulta individual no Sistema Celpe-Bras (celpebras.inep.gov.br).",
  stats: { available: 6, missing: 0, missingLabel: "nenhum ausente" },
  blogAnalysis: {
    href: "/pt-br/blog/analise-tarefa-1-festival-fartura-2026-1",
    label: "Análise da Tarefa 1 no blog",
  },
  guideLink: {
    href: "/pt-br/celpe-bras",
    label: "O que é o Celpe-Bras e como funciona o exame",
  },
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
      title: "Edital nº 8/2026 — Inep/MEC",
      description:
        "Edital nº 8, de 20 de fevereiro de 2026 (publicado no DOU): cronograma, inscrição, estrutura, avaliação e certificação do Celpe-Bras 2026/1.",
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
  ],
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
  ],
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
  asideNote:
    "Inscrições da edição 2026/1: 24/02 a 06/03/2026 pelo Sistema Celpe-Bras (celpebras.inep.gov.br), com regras de taxa, atendimento especializado e nome social no edital. O certificado pode ser exigido em programas como PEC-G/PEC-PLE — consulte o edital específico do programa.",
  faq: [
    {
      question: "O que está completo?",
      answer:
        "Caderno de questões, vídeos das tarefas, roteiros, elementos provocadores e edital nº 8/2026 — todos visualizáveis nesta página.",
    },
    {
      question: "O que falta?",
      answer:
        "Nesta edição o acervo local está completo para os arquivos listados. Novos materiais serão adicionados conforme o índice oficial do Inep.",
    },
    {
      question: "Como navegar?",
      answer:
        "Use os cards para ir ao visualizador embutido (PDF, vídeo ou áudio). Cada material abre no próprio site, sem download obrigatório.",
    },
    {
      question: "Onde me inscrevo no exame oficial?",
      answer:
        "No Sistema Celpe-Bras (celpebras.inep.gov.br), conforme o edital da edição. Este site não realiza inscrição nem emite certificado.",
    },
    {
      question: "Este site é oficial?",
      answer:
        "Não. celpe-depe.com é preparação independente. Materiais e datas aqui ajudam o estudo; a fonte normativa é o Inep/MEC (Portal Gov.br e Diário Oficial da União).",
    },
    {
      question: "Como isso vira prática de estudo?",
      answer:
        "Cada bloco pode gerar exercícios e análises no site (como a análise da Tarefa 1 no blog), sem substituir o acervo ou os canais oficiais do Inep.",
    },
  ],
};
