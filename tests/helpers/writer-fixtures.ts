type WriterStore = typeof import("@/lib/writer/store");

/** Correction shape as produced before `explanation` replaced `explanationRu` — kept to test back-compat reads. */
export const FIXTURE_ANALYSIS = {
  correctedAnnotatedHtml: "<p>texto</p>",
  corrections: [
    {
      id: "c1",
      sentenceIndex: 0,
      originalFragment: "fazem",
      correctedFragment: "faz",
      category: "grammar",
      severity: "error",
      explanationRu: "Concordância verbal.",
    },
  ],
  stats: {
    total: 1,
    grammar: 1,
    spelling: 0,
    agreement: 1,
    preposition: 0,
    article: 0,
    verb: 1,
    vocabulary: 0,
    collocation: 0,
    punctuation: 0,
    style: 0,
    repeatedPatterns: [],
    focusAreas: [],
  },
};

/** A submission that already survived the whole check lifecycle, ready for delivery tests. */
export function finishedSubmission(
  store: WriterStore,
  overrides: Record<string, unknown> = {},
): string {
  const id = crypto.randomUUID();
  store.createSubmission({
    id,
    sessionId: null,
    email: "Candidato@Example.com",
    locale: "pt-br",
    taskId: "mandacaru-2025-2",
    text: "Um texto com algumas palavras para a prova.",
    wordCount: 8,
    ...overrides,
  });
  store.setSubmissionStatus(id, "analyzing");
  store.completeSubmission(id, {
    analysisJson: JSON.stringify(FIXTURE_ANALYSIS),
    celpeLevel: null,
    scoresJson: null,
    provider: "openai",
    model: "gpt-4.1-mini",
    mock: false,
    analysisDurationMs: 1500,
  });
  return id;
}
