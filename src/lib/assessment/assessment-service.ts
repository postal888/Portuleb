import { assessmentArticles, assessmentSessionPresets } from "./assessment-pool";
import { buildStepEvidence, scoreAssessmentSession } from "./assessment-scoring";
import { toPublicTokens } from "./assessment-tokenizer";
import type {
  AssessmentArticle,
  AssessmentQuestionPublic,
  AssessmentSessionPublic,
  AssessmentStepAnswer,
  AssessmentSubmitResult,
} from "./types";

function getActivePresets() {
  return assessmentSessionPresets.filter((p) => p.status === "active");
}

export function getArticleById(id: string): AssessmentArticle | undefined {
  return assessmentArticles.find((a) => a.id === id && a.status === "active");
}

function toPublicQuestion(q: AssessmentArticle["questions"][number]): AssessmentQuestionPublic {
  return { id: q.id, prompt: q.prompt, options: q.options };
}

function buildSessionFromPreset(presetId: string): AssessmentSessionPublic | null {
  const preset = assessmentSessionPresets.find((p) => p.id === presetId && p.status === "active");
  if (!preset) return null;

  const steps = preset.articleIds.map((articleId, stepIndex) => {
    const article = getArticleById(articleId);
    if (!article) throw new Error(`Artigo ausente: ${articleId}`);

    return {
      stepIndex,
      article: {
        id: article.id,
        title: article.title,
        sourceLabel: article.sourceLabel,
        sourceDate: article.sourceDate,
        cefrTargetMin: article.cefrTargetMin,
        cefrTargetMax: article.cefrTargetMax,
        paragraphs: article.text.split(/\n\n+/).filter(Boolean).map((para, pIdx) => ({
          tokens: toPublicTokens(
            article.tokens.filter((t) => t.id.startsWith(`${article.id}-p${pIdx}-`)),
          ),
        })),
        questions: article.questions.map(toPublicQuestion),
      },
    };
  });

  return {
    sessionId: preset.id,
    totalSteps: steps.length,
    steps,
  };
}

export function pickNextSession(excludePresetIds: string[] = []): AssessmentSessionPublic | null {
  const active = getActivePresets();
  if (active.length === 0) return null;

  const exclude = new Set(excludePresetIds.filter(Boolean));
  const fresh = active.filter((p) => !exclude.has(p.id));
  const pool = fresh.length > 0 ? fresh : active;

  return buildSessionFromPreset(pool[0]!.id);
}

export function parseExcludeParam(raw: string | null): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function scoreSubmission(
  sessionId: string,
  steps: AssessmentStepAnswer[],
): AssessmentSubmitResult | { error: string } {
  const preset = assessmentSessionPresets.find((p) => p.id === sessionId);
  if (!preset || preset.status !== "active") {
    return { error: "Sessão não encontrada ou indisponível." };
  }

  if (steps.length !== preset.articleIds.length) {
    return { error: "Envie respostas para todos os textos da sessão." };
  }

  let totalCorrect = 0;
  let totalQuestions = 0;
  const stepEvidenceList = [];
  const stepFeedback: AssessmentSubmitResult["stepFeedback"] = [];

  for (const stepInput of steps) {
    const article = getArticleById(stepInput.articleId);
    if (!article || !preset.articleIds.includes(article.id)) {
      return { error: `Artigo inválido na sessão: ${stepInput.articleId}` };
    }

    const answerMap = new Map(stepInput.answers.map((a) => [a.questionId, a.selectedIndex]));
    let correct = 0;
    const feedback: AssessmentSubmitResult["stepFeedback"][number]["feedback"] = [];

    for (const question of article.questions) {
      const selected = answerMap.get(question.id);
      const isCorrect =
        selected !== undefined &&
        Number.isInteger(selected) &&
        selected >= 0 &&
        selected < question.options.length &&
        selected === question.correctIndex;
      if (isCorrect) correct += 1;
      feedback.push({
        questionId: question.id,
        correct: isCorrect,
        explanation: question.explanation,
      });
    }

    totalCorrect += correct;
    totalQuestions += article.questions.length;

    const ratio = article.questions.length > 0 ? correct / article.questions.length : 0;
    stepEvidenceList.push(
      buildStepEvidence(
        article.id,
        article.cefrTargetMin,
        article.cefrTargetMax,
        ratio,
        article.tokens,
        stepInput.unknownTokenIds ?? [],
      ),
    );

    stepFeedback.push({
      articleId: article.id,
      correct,
      total: article.questions.length,
      feedback,
    });
  }

  const aggregate = scoreAssessmentSession(stepEvidenceList);

  return {
    correct: totalCorrect,
    total: totalQuestions,
    readingRange: aggregate.readingRange,
    vocabularyRange: aggregate.vocabularyRange,
    confidence: aggregate.confidence,
    recommendation: aggregate.recommendation,
    stepFeedback,
  };
}
