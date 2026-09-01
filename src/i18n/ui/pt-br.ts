import { pathFor } from "../route-map";

export const ptBrUi = {
  locale: "pt-br" as const,
  nav: [
    { section: "celpeBras" as const, label: "Celpe-Bras" },
    { section: "pastExams" as const, label: "Provas Anteriores" },
    { section: "practice" as const, label: "Prática" },
    { section: "reader" as const, label: "Leitor" },
    { section: "assessment" as const, label: "Avaliação" },
    { section: "blog" as const, label: "Blog" },
    { section: "theory" as const, label: "Teoria" },
    { section: "materials" as const, label: "Materiais" },
    { section: "contact" as const, label: "Contato" },
    { section: "terms" as const, label: "Termos" },
  ],
  localeSwitcher: { label: "Idioma", pt: "Português", en: "English", ru: "Русский" },
  breadcrumb: { home: "Início" },
  footer: {
    taglineSuffix: "portal em construção, seção por seção.",
    rights: "Todos os direitos reservados.",
  },
  archive: {
    pastExams: "Provas Anteriores",
    sessionKicker: "Sessão do acervo",
    viewMaterials: "Ver materiais",
    viewStructure: "Ver estrutura da prova",
    application: "Aplicação",
    result: "Resultado",
    materialsInArchive: "materiais no acervo",
    overview: "Visão geral",
    sessionMaterials: "Materiais da sessão",
    sessionMaterialsCopy:
      "O acervo organizado por função: prova escrita, áudio, parte oral e edital — sem expor apenas nomes de arquivo soltos.",
    embeddedMedia: "PDFs, vídeo e áudio",
    embeddedMediaCopy:
      "Arquivos servidos do acervo local. PDFs abrem no leitor embutido; vídeo e áudio com controles de reprodução.",
    writtenPart: "Parte escrita",
    cadernoAndTasks: "Caderno de questões e tarefas",
    writtenIntro:
      "Prova escrita de 3 horas com quatro tarefas integradas. O caderno completo está abaixo; cada tarefa indica o insumo correspondente.",
    fullCaderno: "Caderno de questões — prova escrita completa",
    taskStructure: "Estrutura das 4 tarefas",
    originalTaskNote: "Título e enunciado originais em português (material de estudo).",
    oralPart: "Parte oral",
    oralTitle: "Interação face a face",
    oralIntro:
      "Interação presencial de 20 minutos em duas etapas. Roteiros e elementos provocadores em bloco separado da prova escrita.",
    roteirosGuide: "Guia da conversa",
    roteirosCopy: "Como a interação deve ser conduzida e como as perguntas funcionam como apoio.",
    topicsTitle: "Exemplos de elementos provocadores",
    topicsCopy: "Alguns temas da edição para dar densidade visual ao acervo.",
    faqTitle: "Perguntas que a página responde",
    faqKicker: "FAQ da sessão",
    faqIntro: "Como usar os materiais e onde estão os limites deste conjunto.",
    viewOnSite: "Visualizar no site",
    openInNewTab: "Abrir em nova aba",
    indexH1: "Acervo Celpe-Bras — provas anteriores",
    indexTitle: "Sessões no acervo",
    indexLead:
      "Acervo de provas anteriores do Celpe-Bras por edição: caderno de questões, vídeos das tarefas, roteiros e elementos provocadores da parte oral.",
    sessionLabel: "Sessão",
    materialsCount: "materiais",
  },
  blog: {
    navLabel: "Blog",
    indexTitle: "Estratégias e leituras",
    indexSubtitle:
      "Artigos sobre preparação para o Celpe-Bras: estratégia, critérios de avaliação e conexão com Prática e Teoria no hub.",
    readArticle: "Ler artigo →",
    featuredPill: "Em destaque",
    taskPill: "Tarefa 1 — 2026/1",
    category: "Categoria",
    readTime: "Tempo de leitura",
    featured: "Artigo em destaque",
    sidebarSummary: "Resumo rápido",
    sidebarAudienceDefault: "Para quem é esta estratégia?",
    sidebarLinksTitle: "Conectando com o site",
    sidebarLinksIntro: "Depois desta leitura, você pode ir para:",
    sidebarTags: "Tags",
    footerNote: "Novos artigos serão publicados nesta seção.",
    celpeGuideLink: "Guia Celpe-Bras →",
    examArtifact: {
      transcript: "Transcrição original (português)",
      prompt: "Enunciado original (português)",
      modelAnswer: "Resposta-modelo em português",
    },
    leadDefault: "Introdução",
  },
  home: {
    metaTitle: "Celpe-Dê Pé — Preparação para o Celpe-Bras",
    heroLead:
      "Teoria, prática, provas anteriores e leituras sobre estratégia — portal em construção, seção por seção.",
    sectionsTitle: "Seções do portal",
  },
} as const;

/** Resolve nav href for PT */
export function ptNavHref(section: (typeof ptBrUi.nav)[number]["section"]) {
  return pathFor("pt-br", section);
}
