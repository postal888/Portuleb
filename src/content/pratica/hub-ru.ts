export const practiceHero = {
  eyebrow: "Практика",
  kicker: "Формат экзамена",
  title: "Слушать, читать, писать и укреплять базу",
  lead:
    "Здесь главное — делать: применять навыки в заданиях формата Celpe-Bras, с короткими упражнениями, когда нужно подтянуть грамматику и лексику.",
  stats: [
    { value: "4 области", label: "слушание, чтение, письмо, база" },
    { value: "2 потока", label: "письмо и базовые упражнения" },
    { value: "Теория", label: "правила и тесты в разделе Теория", link: "/ru/teoriya" },
  ],
} as const;

export const practiceTiles = [
  {
    id: "ouvir",
    icon: "O",
    badge: "Ввод",
    badgeVariant: "primary" as const,
    title: "Слушать",
    description:
      "Видео с синхронными субтитрами, глоссарием EN/RU и размеченными выражениями для аудирования.",
    meta: "listening",
    href: "#ouvir",
    variant: "default" as const,
  },
  {
    id: "ler",
    icon: "L",
    badge: "Ввод",
    badgeVariant: "primary" as const,
    title: "Читать",
    description: "Тексты и вопросы на понимание с фокусом на смысл и подготовку к письму.",
    meta: "reading",
    href: "#ler",
    variant: "default" as const,
  },
  {
    id: "escrever",
    icon: "E",
    badge: "Вывод",
    badgeVariant: "primary" as const,
    title: "Писать",
    description: "Письменная работа с обратной связью по критериям Celpe-Bras.",
    meta: "production + feedback",
    href: "#escrever-detalhe",
    variant: "highlight" as const,
  },
  {
    id: "polir-a-base",
    icon: "B",
    badge: "База",
    badgeVariant: "gold" as const,
    title: "Укрепить базу",
    description: "Короткие упражнения по грамматике и лексике: спряжения, времена, артикли, устойчивые выражения.",
    meta: "quick drills",
    href: "#polir-a-base-detalhe",
    variant: "support" as const,
  },
] as const;

export const polishBaseSteps = [
  {
    name: "Глаголы",
    description: "Быстрые упражнения на спряжение и узнавание форм.",
    pill: "короткий тест",
  },
  {
    name: "Времена",
    description: "Сопоставление времён глагола в объективных заданиях.",
    pill: "drill",
  },
  {
    name: "Артикли",
    description: "Артикли, сокращения и типичные выборы, влияющие на ясность.",
    pill: "core drill",
  },
  {
    name: "Слова",
    description: "Полезная лексика, коллокации и слова для заданий экзамена.",
    pill: "vocabulary",
  },
] as const;

export const writingSteps = [
  {
    name: "Часть 1",
    description: "После материалов для понимания — написать текст и получить структурированную обратную связь.",
    pill: "production",
  },
  {
    name: "Часть 2",
    description: "Параллельный сценарий для второй части с отдельным заданием и оценкой.",
    pill: "evaluation",
  },
  {
    name: "Обратная связь",
    description: "Оценка по адекватности, организации, ясности, связности и выполнению задания.",
    pill: "логика Celpe",
  },
] as const;

export const practiceUiRu = {
  home: "Главная",
  practice: "Практика",
  seeSkills: "К навыкам",
  goTheory: "Перейти к теории",
  practiceAreas: "Области практики",
  skills: "Навыки",
  skillsCopy:
    "Выберите область — слушание, чтение, письмо или базу — чтобы перейти к материалам и заданиям.",
  open: "Открыть",
  withinPractice: "Внутри практики",
  polishBase: "Укрепить базу",
  write: "Письмо",
  footerTheory: "Правила и тесты по темам — в разделе",
  footerTheoryLink: "Теория →",
  footerSoon: "Интерактивный контент будет подключён позже.",
  footerPast: "Смотреть прошлые экзамены →",
} as const;
