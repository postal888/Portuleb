import type { Locale } from "@/i18n/locales";
import type { SectionKey } from "@/i18n/route-map";

export type HomeFeatured = {
  section: SectionKey;
  slug?: string;
  label: string;
  desc: string;
  icon: string;
  iconClass: string;
  highlights?: string[];
};

export type HomeContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroVisual: {
    progressLabel: string;
    progressLevel: string;
    journeyLabel: string;
    journeyHint: string;
  };
  featuredTitle: string;
  featuredSubtitle: string;
  featuredOpen: string;
  allSectionsTitle: string;
  featured: HomeFeatured[];
  sectionIcons: Partial<Record<SectionKey, string>>;
  sectionHints?: Partial<Record<SectionKey, string>>;
  excludeSections: SectionKey[];
};

const pt: HomeContent = {
  heroEyebrow: "Preparação gratuita",
  heroTitle: "Preparação para o Celpe-Bras",
  heroLead:
    "Prepare-se para o Celpe-Bras de graça: teoria, prática, provas anteriores e estratégias reais — tudo em um só lugar.",
  ctaPrimary: "Começar a praticar",
  ctaSecondary: "Ver o guia do exame",
  heroVisual: {
    progressLabel: "Seu progresso",
    progressLevel: "Intermediário",
    journeyLabel: "Rumo ao certificado",
    journeyHint: "Um passo de cada vez",
  },
  featuredTitle: "Em destaque",
  featuredSubtitle: "Comece por estes caminhos — cada um com materiais próprios.",
  featuredOpen: "Abrir",
  allSectionsTitle: "Todas as seções",
  featured: [
    {
      section: "blogPost",
      slug: "analise-tarefa-1-festival-fartura-2026-1",
      label: "Blog",
      desc: "Análise Tarefa 1 — Festival Fartura",
      icon: "B",
      iconClass: "featured-icon-accent",
      highlights: ["Estratégia de resposta", "Vocabulário útil", "Modelo comentado"],
    },
    {
      section: "celpeBras",
      label: "Celpe-Bras",
      desc: "Guia completo do exame",
      icon: "C",
      iconClass: "featured-icon-teal",
      highlights: ["Formato e etapas", "Níveis e faixas", "Dicas práticas"],
    },
    {
      section: "pastExamSession",
      slug: "2026-1",
      label: "Provas 2026/1",
      desc: "Caderno, vídeo e materiais",
      icon: "P",
      iconClass: "featured-icon-teal",
      highlights: ["Caderno oficial", "Vídeo da prova", "Roteiro oral"],
    },
  ],
  sectionIcons: {
    celpeBras: "◆",
    pastExams: "◇",
    practice: "○",
    assessment: "◎",
    theory: "△",
    blog: "✦",
    materials: "□",
  },
  sectionHints: {
    celpeBras: "Guia do exame",
    pastExams: "Edições anteriores",
    practice: "Exercícios por habilidade",
    theory: "Gramática e base",
    blog: "Análises e estratégias",
    materials: "Recursos extras",
  },
  excludeSections: ["contact", "terms", "assessment"],
};

const en: HomeContent = {
  heroEyebrow: "Free preparation",
  heroTitle: "Celpe-Bras exam preparation",
  heroLead:
    "Prepare for the Celpe-Bras for free: theory, practice, past exams and real strategies — all in one place.",
  ctaPrimary: "Start practicing",
  ctaSecondary: "See the exam guide",
  heroVisual: {
    progressLabel: "Your progress",
    progressLevel: "Intermediate",
    journeyLabel: "Path to the certificate",
    journeyHint: "One step at a time",
  },
  featuredTitle: "Featured",
  featuredSubtitle: "Start with these paths — each with its own materials.",
  featuredOpen: "Open",
  allSectionsTitle: "All sections",
  featured: [
    {
      section: "blogPost",
      slug: "analise-tarefa-1-festival-fartura-2026-1",
      label: "Blog",
      desc: "Task 1 analysis — Festival Fartura",
      icon: "B",
      iconClass: "featured-icon-accent",
      highlights: ["Response strategy", "Useful vocabulary", "Annotated model"],
    },
    {
      section: "celpeBras",
      label: "Celpe-Bras",
      desc: "Complete exam guide",
      icon: "C",
      iconClass: "featured-icon-teal",
      highlights: ["Format & stages", "Score bands", "Practical tips"],
    },
    {
      section: "pastExamSession",
      slug: "2026-1",
      label: "2026/1 exam",
      desc: "Booklet, video and materials",
      icon: "P",
      iconClass: "featured-icon-teal",
      highlights: ["Official booklet", "Exam video", "Oral script"],
    },
  ],
  sectionIcons: {
    celpeBras: "◆",
    pastExams: "◇",
    practice: "○",
    theory: "△",
    blog: "✦",
    materials: "□",
  },
  sectionHints: {
    celpeBras: "Exam guide",
    pastExams: "Past editions",
    practice: "Skill drills",
    theory: "Grammar foundation",
    blog: "Analyses & tactics",
    materials: "Extra resources",
  },
  excludeSections: ["contact", "terms"],
};

const ru: HomeContent = {
  heroEyebrow: "Бесплатная подготовка",
  heroTitle: "Подготовка к Celpe-Bras",
  heroLead:
    "Готовьтесь к Celpe-Bras бесплатно: теория, практика, прошлые экзамены и реальные стратегии — всё в одном месте.",
  ctaPrimary: "Начать практику",
  ctaSecondary: "Гид по экзамену",
  heroVisual: {
    progressLabel: "Ваш прогресс",
    progressLevel: "Средний уровень",
    journeyLabel: "Путь к сертификату",
    journeyHint: "Шаг за шагом",
  },
  featuredTitle: "Избранное",
  featuredSubtitle: "Начните с этих разделов — у каждого свои материалы.",
  featuredOpen: "Открыть",
  allSectionsTitle: "Все разделы",
  featured: [
    {
      section: "blogPost",
      slug: "analise-tarefa-1-festival-fartura-2026-1",
      label: "Блог",
      desc: "Разбор задания 1 — Festival Fartura",
      icon: "B",
      iconClass: "featured-icon-accent",
      highlights: ["Стратегия ответа", "Полезная лексика", "Разбор модели"],
    },
    {
      section: "celpeBras",
      label: "Celpe-Bras",
      desc: "Полный гид по экзамену",
      icon: "C",
      iconClass: "featured-icon-teal",
      highlights: ["Формат и этапы", "Уровни баллов", "Практические советы"],
    },
    {
      section: "pastExamSession",
      slug: "2026-1",
      label: "Экзамен 2026/1",
      desc: "Caderno, видео и материалы",
      icon: "P",
      iconClass: "featured-icon-teal",
      highlights: ["Официальный caderno", "Видео экзамена", "Устный сценарий"],
    },
  ],
  sectionIcons: {
    celpeBras: "◆",
    pastExams: "◇",
    practice: "○",
    theory: "△",
    blog: "✦",
    materials: "□",
  },
  sectionHints: {
    celpeBras: "Гид по экзамену",
    pastExams: "Прошлые сессии",
    practice: "Упражнения",
    theory: "Грамматика",
    blog: "Разборы и стратегии",
    materials: "Доп. материалы",
  },
  excludeSections: ["contact", "terms"],
};

export function getHomeContent(locale: Locale): HomeContent {
  if (locale === "en") return en;
  if (locale === "ru") return ru;
  return pt;
}
