export type VerbPersonKey = "eu" | "tu" | "voce_ele_ela" | "nos" | "eles_voces";

export type VerbPersonForms = Partial<Record<VerbPersonKey, string | null>>;

export type VerbTenseCard = {
  id: string;
  tenseLabel: string;
  forms: VerbPersonForms | null;
  exampleEu: string | null;
  infoNote?: string;
};

export type VerbDeck = {
  id: string;
  infinitive: string;
  title: string;
  cards: VerbTenseCard[];
};

export type VerbOption = { key: string; label: string };

export type VerbExampleTooltip = { en: string; note?: string };

export type VerbosData = {
  version: number;
  personOptions: { key: VerbPersonKey; label: string }[];
  tenseOptions: VerbOption[];
  decks: VerbDeck[];
  tooltips: Record<string, VerbExampleTooltip>;
};

export type VerbosMessages = {
  tabTables: string;
  tabQuiz: string;
  title: string;
  intro: string;
  legendPersons: string;
  legendVerbs: string;
  legendTenses: string;
  all: string;
  clear: string;
  colTense: string;
  colForm: string;
  colExample: string;
  warnNoVerb: string;
  warnNoTense: string;
  warnNoPerson: string;
  enHead: string;
  quizIntro: string;
  quizCount: string;
  quizCountMax: string;
  quizCombos: string;
  quizStart: string;
  quizSetupError: string;
  quizQuestion: string;
  quizPrompt: string;
  quizPerson: string;
  quizExit: string;
  quizDone: string;
  quizResult: string;
  quizSetup: string;
  quizRetry: string;
  loading: string;
  loadError: string;
};
