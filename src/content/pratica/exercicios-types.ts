export type ExerciseGroup = "basico" | "avancado";

export type ExerciseType = "fill" | "qa" | "verbIr";

export type FillItem = { s: string; a: string | string[] };
export type QaItem = { q: string; a: string; hint?: string };
export type VerbIrItem = { q: string; verb: string; resp: string };

export type ExerciseItem = FillItem | QaItem | VerbIrItem;

export type ExerciseExample =
  | { s: string; a: string | string[] }
  | { q: string; a: string }
  | null;

export type ExerciseSet = {
  id: string;
  group: ExerciseGroup;
  label: string;
  header: string;
  instructions: string;
  conjugation: string | null;
  example: ExerciseExample;
  total: number;
  type: ExerciseType;
  items: ExerciseItem[];
};

export type ExerciciosData = {
  version: number;
  sets: ExerciseSet[];
};

export type ExerciciosMessages = {
  kicker: string;
  title: string;
  copy: string;
  groupBasic: string;
  groupAdvanced: string;
  chooseExercise: string;
  hint: string;
  hideHint: string;
  answerLabel: string;
  checkItem: string;
  checkAll: string;
  restart: string;
  score: string;
  correct: string;
  review: string;
  yourAnswer: string;
  freeRespPlaceholder: string;
  qaPlaceholder: string;
  modelAnswer: string;
  verb: string;
  resultExcellent: string;
  resultGood: string;
  resultNeedsWork: string;
  conjugationLabel: string;
  exampleLabel: string;
  loading: string;
  loadError: string;
};
