/** Typed lesson model — reuse for future Prática modules. See src/content/practice/README.md */

export type PracticeLessonMeta = {
  slug: string;
  /** URL segment under /pt-br/pratica/{categoryPath}/ */
  categoryPath: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  level: string;
  duration: string;
  tags: string[];
};

export type AnnotatedSegment = {
  text: string;
  highlight?: boolean;
  /** Links to expressionCards[].id for tooltip / scroll target */
  expressionId?: string;
};

export type AnnotatedTextBlock = {
  id: string;
  title?: string;
  context?: string;
  segments: AnnotatedSegment[];
  /** Optional full-block English translation (shown under the Portuguese line). */
  en?: string;
  /** Optional full-block Russian translation. */
  ru?: string;
};

export type ExpressionCardData = {
  id: string;
  expression: string;
  register: string;
  meaning: string;
  whenToUse: string;
  example: string;
  note?: string;
};

export type QuizOption = {
  id: string;
  text: string;
  correct?: boolean;
  feedback: string;
};

export type MultipleChoiceBlock = {
  id: string;
  question: string;
  options: QuizOption[];
  hint?: string;
};

export type RewriteExerciseData = {
  id: string;
  prompt: string;
  instruction: string;
  placeholder: string;
  requiredFragments: string[];
  modelAnswer: string;
  successMessage: string;
  partialMessage: string;
  revealLabel: string;
  checkLabel: string;
};

export type PracticeLesson = {
  meta: PracticeLessonMeta;
  hero: {
    kicker: string;
    title: string;
    lead: string;
    objectives: string[];
  };
  annotatedText: {
    sectionTitle: string;
    intro: string;
    blocks: AnnotatedTextBlock[];
  };
  expressions: {
    sectionTitle: string;
    intro: string;
    cards: ExpressionCardData[];
  };
  quizBlocks: MultipleChoiceBlock[];
  transformExercise: RewriteExerciseData;
  closingNote: {
    title: string;
    body: string;
    links: { label: string; href: string }[];
  };
};
