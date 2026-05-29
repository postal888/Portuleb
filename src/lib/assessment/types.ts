export type AssessmentStatus = "active" | "paused" | "archived";

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type WordDifficultyBand = "basic" | "intermediate" | "advanced";

export type AssessmentConfidence = "baixa" | "média" | "alta";

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface AssessmentToken {
  id: string;
  surface: string;
  clickable: boolean;
  /** Server-side only — used for vocabulary scoring. */
  difficultyBand: WordDifficultyBand;
}

export interface AssessmentArticle {
  id: string;
  status: AssessmentStatus;
  cefrTargetMin: CefrLevel;
  cefrTargetMax: CefrLevel;
  title: string;
  sourceLabel: string;
  sourceDate?: string;
  text: string;
  questions: AssessmentQuestion[];
  /** Precomputed at pool load; includes difficulty bands. */
  tokens: AssessmentToken[];
}

export interface AssessmentSessionPreset {
  id: string;
  status: AssessmentStatus;
  /** Three article ids ordered from easier to harder receptive load. */
  articleIds: [string, string, string];
}

export interface AssessmentQuestionPublic {
  id: string;
  prompt: string;
  options: string[];
}

export interface AssessmentTokenPublic {
  id: string;
  surface: string;
  clickable: boolean;
}

export interface AssessmentStepPublic {
  stepIndex: number;
  article: {
    id: string;
    title: string;
    sourceLabel: string;
    sourceDate?: string;
    cefrTargetMin: CefrLevel;
    cefrTargetMax: CefrLevel;
    paragraphs: { tokens: AssessmentTokenPublic[] }[];
    questions: AssessmentQuestionPublic[];
  };
}

export interface AssessmentSessionPublic {
  sessionId: string;
  totalSteps: number;
  steps: AssessmentStepPublic[];
}

export interface AssessmentStepAnswer {
  articleId: string;
  answers: { questionId: string; selectedIndex: number }[];
  unknownTokenIds: string[];
}

export interface AssessmentSubmitRequest {
  sessionId: string;
  steps: AssessmentStepAnswer[];
}

export interface AssessmentQuestionFeedback {
  questionId: string;
  correct: boolean;
  explanation?: string;
}

export interface AssessmentSubmitResult {
  correct: number;
  total: number;
  readingRange: string;
  vocabularyRange: string;
  confidence: AssessmentConfidence;
  recommendation: string;
  stepFeedback: {
    articleId: string;
    correct: number;
    total: number;
    feedback: AssessmentQuestionFeedback[];
  }[];
}

export const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
} as const;

export const CEFR_LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
