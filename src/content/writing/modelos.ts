import modelosData from "./modelos-data.json";

export type ModeloRow = { label: string; text: string };
export type ModeloPhraseGroup = { title: string; items: string[] };
export type ModeloTaskRef = {
  cycle: string;
  number: string;
  genre: string;
  title: string;
};

export type ModeloType = {
  id: string;
  title: string;
  where: string;
  summary: string;
  genres: string;
  promptWords: string;
  structure: ModeloRow[];
  structureNote: string;
  exampleLabel: string;
  exampleCycle: string;
  exampleNumber: string;
  examplePrompt: string;
  exampleRows: ModeloRow[];
  exampleNote: string;
  phrases: ModeloPhraseGroup[];
  variants: ModeloRow[];
  checklist: string[];
  tasks: ModeloTaskRef[];
};

export const writingModelos = modelosData as {
  title: string;
  intro: string;
  questionsTitle: string;
  questions: { q: string; a: string }[];
  types: ModeloType[];
  other: string;
  note: string;
};
