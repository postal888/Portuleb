export const practiceHero = {
  eyebrow: "Practice",
  kicker: "Exam format",
  title: "Listen, read, write and strengthen the basics",
  lead:
    "The focus here is doing: applying skills in Celpe-Bras-style tasks, with short drills when you need to reinforce grammar and vocabulary.",
  stats: [
    { value: "4 areas", label: "listen, read, write, strengthen basics" },
    { value: "2 flows", label: "writing and base drills" },
    { value: "Theory", label: "rules and quizzes in Theory", link: "/en/theory" },
  ],
} as const;

export const practiceTiles = [
  {
    id: "ouvir",
    icon: "O",
    badge: "Input",
    badgeVariant: "primary" as const,
    title: "Listen",
    description:
      "Videos with synced captions, EN/RU glossary and annotated expressions for listening practice.",
    meta: "listening",
    href: "#ouvir",
    variant: "default" as const,
  },
  {
    id: "ler",
    icon: "L",
    badge: "Input",
    badgeVariant: "primary" as const,
    title: "Read",
    description: "Texts and comprehension questions focused on meaning and writing prep.",
    meta: "reading",
    href: "#ler",
    variant: "default" as const,
  },
  {
    id: "escrever",
    icon: "E",
    badge: "Output",
    badgeVariant: "primary" as const,
    title: "Write",
    description: "Written production with feedback aligned to Celpe-Bras criteria.",
    meta: "production + feedback",
    href: "#escrever-detalhe",
    variant: "highlight" as const,
  },
  {
    id: "polir-a-base",
    icon: "B",
    badge: "Foundation",
    badgeVariant: "gold" as const,
    title: "Strengthen the basics",
    description: "Short grammar and vocabulary drills: conjugation, tenses, articles, fixed phrases.",
    meta: "quick drills",
    href: "#polir-a-base-detalhe",
    variant: "support" as const,
  },
] as const;

export const polishBaseSteps = [
  {
    name: "Verbs",
    description: "Quick conjugation and form recognition drills.",
    pill: "short test",
  },
  {
    name: "Tenses",
    description: "Contrast verb tenses with objective exercises.",
    pill: "drill",
  },
  {
    name: "Articles",
    description: "Articles, contractions and common choices that affect clarity.",
    pill: "core drill",
  },
  {
    name: "Words",
    description: "Useful vocabulary, collocations and task-relevant word review.",
    pill: "vocabulary",
  },
] as const;

export const writingSteps = [
  {
    name: "Part 1",
    description: "After comprehension stimuli, write the task text and receive structured feedback.",
    pill: "production",
  },
  {
    name: "Part 2",
    description: "Parallel scenario for the second part with separate prompt and evaluation.",
    pill: "evaluation",
  },
  {
    name: "Feedback",
    description: "Scored on adequacy, organisation, clarity, cohesion and task fulfilment.",
    pill: "Celpe logic",
  },
] as const;

export const practiceUiEn = {
  home: "Home",
  practice: "Practice",
  seeSkills: "See skills",
  goTheory: "Go to Theory",
  practiceAreas: "Practice areas",
  skills: "Skills",
  skillsCopy: "Escolha uma área — ouvir, ler, escrever ou polir a base — para ver materiais e tarefas.",
  open: "Open",
  withinPractice: "Within Practice",
  polishBase: "Polish the base",
  write: "Write",
  footerTheory: "For rules and quizzes by topic, see",
  footerTheoryLink: "Theory →",
  footerSoon: "Interactive content will be linked soon.",
  footerPast: "Browse past exams →",
} as const;
