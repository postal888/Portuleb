import { pathFor } from "../route-map";

export const ruUi = {
  locale: "ru" as const,
  nav: [
    { section: "celpeBras" as const, label: "Celpe-Bras" },
    { section: "pastExams" as const, label: "Прошлые экзамены" },
    { section: "practice" as const, label: "Практика" },
    { section: "reader" as const, label: "Читалка" },
    { section: "blog" as const, label: "Блог" },
    { section: "theory" as const, label: "Теория" },
    { section: "materials" as const, label: "Материалы" },
    { section: "contact" as const, label: "Контакты" },
    { section: "terms" as const, label: "Условия" },
  ],
  localeSwitcher: { label: "Язык", pt: "Português", en: "English", ru: "Русский" },
  breadcrumb: { home: "Главная" },
  footer: {
    taglineSuffix: "портал в разработке, раздел за разделом.",
    rights: "Все права защищены.",
  },
  archive: {
    pastExams: "Прошлые экзамены",
    sessionKicker: "Сессия архива",
    viewMaterials: "Смотреть материалы",
    viewStructure: "Структура экзамена",
    application: "Даты экзамена",
    result: "Результаты",
    materialsInArchive: "материалов в архиве",
    overview: "Обзор",
    sessionMaterials: "Материалы сессии",
    sessionMaterialsCopy:
      "Материалы по роли: письменная часть, аудио/видео, устная часть и официальное edital — не просто список файлов.",
    embeddedMedia: "PDF, видео и аудио",
    embeddedMediaCopy:
      "Файлы из локального архива. PDF открываются во встроенном просмотрщике; видео и аудио — с элементами управления.",
    writtenPart: "Письменная часть",
    cadernoAndTasks: "Сборник заданий и tarefas",
    writtenIntro:
      "Письменный экзамен длится около 3 часов и включает четыре интегрированных задания. Полный caderno ниже; каждая tarefa ссылается на свой материал.",
    fullCaderno: "Сборник заданий — полная письменная часть",
    taskStructure: "Структура 4 заданий",
    originalTaskNote: "Оригинальное название и формулировка на португальском (учебный материал).",
    oralPart: "Устная часть",
    oralTitle: "Личное взаимодействие",
    oralIntro:
      "20-минутное очное взаимодействие в двух этапах. Roteiros и элементы-провокаторы отделены от письменного caderno.",
    roteirosGuide: "Руководство по взаимодействию",
    roteirosCopy: "Как проходит беседа и как вопросы поддерживают диалог.",
    topicsTitle: "Примеры элементов-провокаторов",
    topicsCopy: "Некоторые темы этой сессии для быстрого обзора.",
    faqTitle: "На что отвечает эта страница",
    faqKicker: "FAQ сессии",
    faqIntro: "Как пользоваться материалами и где границы этого набора.",
    viewOnSite: "Смотреть на сайте",
    openInNewTab: "Открыть в новой вкладке",
    indexH1: "Архив Celpe-Bras — прошлые экзамены",
    indexTitle: "Сессии в архиве",
    indexLead:
      "Прошлые экзамены Celpe-Bras по изданиям: сборник заданий, видео к задачам, сценарии и материалы устной части.",
    sessionLabel: "Сессия",
    materialsCount: "материалов",
  },
  blog: {
    navLabel: "Блог",
    indexTitle: "Стратегии и материалы для чтения",
    indexSubtitle:
      "Статьи о подготовке к Celpe-Bras: стратегия, критерии оценки и связь с разделами Практика и Теория.",
    readArticle: "Читать статью →",
    featuredPill: "Избранное",
    taskPill: "Задание 1 — 2026/1",
    category: "Категория",
    readTime: "Время чтения",
    featured: "Избранная статья",
    sidebarSummary: "Краткое резюме",
    sidebarAudienceDefault: "Для кого эта стратегия",
    sidebarLinksTitle: "На этом сайте",
    sidebarLinksIntro: "После прочтения можно перейти к:",
    sidebarTags: "Теги",
    footerNote: "Новые статьи будут публиковаться в этом разделе.",
    celpeGuideLink: "Гид Celpe-Bras →",
    examArtifact: {
      transcript: "Оригинальная транскрипция (португальский)",
      prompt: "Оригинальное задание (португальский)",
      modelAnswer: "Образец ответа на португальском",
    },
    leadDefault: "Введение",
  },
  home: {
    metaTitle: "Celpe-Dê Pé — Подготовка к Celpe-Bras",
    heroLead:
      "Теория, практика, прошлые экзамены и стратегические статьи — портал подготовки шаг за шагом.",
    sectionsTitle: "Разделы сайта",
  },
} as const;

export function ruNavHref(section: (typeof ruUi.nav)[number]["section"]) {
  return pathFor("ru", section);
}
