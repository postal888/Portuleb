export const theoryHero = {
  eyebrow: "Theory",
  kicker: "Study base",
  title: "Rules, examples and quizzes by topic",
  lead:
    "Short explanations, tables and study examples — with a clear path to quizzes and then exam-format Practice.",
  stats: [
    { value: "3 areas", label: "grammar, vocabulary, genres" },
    { value: "4 topics", label: "ready-to-review examples" },
    { value: "Practice", label: "apply exam format after theory", link: "/en/practice" },
  ],
} as const;

export const theoryCards = [
  {
    num: "01",
    title: "Grammar",
    description: "Core grammar: tenses, conjugation, articles, agreement and more.",
    link: "Open theory →",
    href: "#grammar",
  },
  {
    num: "02",
    title: "Essential vocabulary",
    description: "Thematic word groups, collocations and units for drills and writing.",
    link: "See lists →",
    href: "#vocabulary",
  },
  {
    num: "03",
    title: "Genres and structure",
    description: "Brief genre notes and how to organise different exam text types.",
    link: "See examples →",
    href: "#generos",
  },
] as const;

export const theoryFlow = [
  {
    num: "A",
    title: "Review the rule",
    description: "Quick read of the explanation and examples.",
  },
  {
    num: "B",
    title: "Take quizzes",
    description: "Short quizzes by topic: tenses, verbs, articles, words.",
  },
  {
    num: "C",
    title: "Apply in exam format",
    description: "Then go to Practice — Listen, Read or Write.",
    link: "/en/practice",
  },
] as const;

export const sampleTopics = [
  {
    title: "Present vs past",
    description: "Explanation, table, short examples and a quiz shortcut.",
  },
  {
    title: "Articles and contractions",
    description: "Rule review and micro-drills to fix patterns.",
  },
  {
    title: "Opinion vocabulary",
    description: "Words and structures useful for writing tasks.",
  },
  {
    title: "Text structure",
    description: "How to organise an answer: opening, body, closing.",
  },
] as const;

export const theoryUiEn = {
  home: "Home",
  theory: "Theory",
  seeAxes: "See study areas",
  goPractice: "Go to Practice",
  reference: "Reference",
  axes: "Study areas",
  axesCopy: "Short explanations, tables, examples and quizzes — the base before exam-format Practice.",
  journey: "From theory to practice",
  thenPractice: "Then practise",
  openPractice: "Open Practice →",
  sampleThemes: "Sample themes",
  topics: "Topics",
  theoryTest: "Theory + quiz",
  footerSoon: "Quizzes and topic pages will be linked soon.",
  footerPractice: "When you are ready for exam-format tasks, go to",
  footerPracticeLink: "Practice →",
  verbsKicker: "Interactive tool",
  verbsTitle: "Verb conjugations",
  verbsCopy:
    "Filter by verb, tense and person, study the conjugation tables, then test yourself with a quick quiz.",
} as const;
