import type { WritingTask } from "@/content/writing/tasks";
import { celpeTaskScoreSchema } from "./schema";
import type { CelpeLevel, CelpeTaskScore } from "./types";

function clampScore(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(5, Math.round(value * 2) / 2));
}

function levelFromAverage(average: number): CelpeLevel {
  if (average < 1.6) return "none";
  if (average < 2.7) return "intermediario";
  if (average < 3.6) return "intermediario-superior";
  if (average < 4.4) return "avancado";
  return "avancado-superior";
}

export function normalizeCelpe(raw: unknown): CelpeTaskScore | undefined {
  const parsed = celpeTaskScoreSchema.safeParse(raw);
  if (!parsed.success) return undefined;
  const row = parsed.data;
  const scores = [
    row.taskFulfillment.score,
    row.sourceComprehension.score,
    row.organization.score,
    row.language.score,
  ].map(clampScore);
  return {
    ...row,
    taskFulfillment: { ...row.taskFulfillment, score: scores[0] },
    sourceComprehension: { ...row.sourceComprehension, score: scores[1] },
    organization: { ...row.organization, score: scores[2] },
    language: { ...row.language, score: scores[3] },
    estimatedLevel: row.estimatedLevel || levelFromAverage(scores.reduce((a, b) => a + b, 0) / 4),
  };
}

const TRANSCRIPT_STOP = new Set([
  "tambem",
  "porque",
  "quando",
  "entao",
  "durante",
  "exemplo",
  "pessoas",
  "pessoa",
  "justamente",
  "atraves",
  "primeiro",
  "segundo",
  "terceiro",
  "sempre",
  "depois",
  "antes",
  "fazer",
  "feito",
  "podem",
  "vamos",
  "voces",
  "gente",
  "coisa",
  "coisas",
  "muito",
  "pouco",
  "ainda",
  "mesmo",
  "sobre",
  "entre",
  "falante",
  "musica",
  "proximo",
  "candidato",
  "escreva",
  "texto",
  "tarefa",
]);

function fold(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function contentWords(text: string): string[] {
  return fold(text)
    .replace(/falante\s+\d+/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length >= 6 && !TRANSCRIPT_STOP.has(word));
}

function clip(sentence: string): string {
  const clean = sentence.replace(/\s+/g, " ").trim();
  return clean.length > 110 ? `${clean.slice(0, 107)}...` : clean;
}

function factHit(text: string, fact: string): boolean {
  const hay = fold(text);
  const needles = fold(fact)
    .split(/[/,]| e /)
    .map((part) => part.trim())
    .filter((part) => part.length >= 5);
  return needles.some((needle) => hay.includes(needle.slice(0, 18)));
}

function mockFromTranscript(text: string, task: WritingTask): CelpeTaskScore {
  const essay = fold(text);
  const sentences = task.sourceText
    .replace(/\[[^\]]*\]/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.replace(/Falante\s+\d+:/gi, "").trim())
    .filter((sentence) => contentWords(sentence).length >= 3);

  const uniqueSentences: string[] = [];
  const seen = new Set<string>();
  for (const sentence of sentences) {
    const key = fold(sentence).slice(0, 80);
    if (seen.has(key)) continue;
    seen.add(key);
    uniqueSentences.push(sentence);
  }

  const hits = uniqueSentences.filter((sentence) => {
    const words = [...new Set(contentWords(sentence))];
    const found = words.filter((word) => essay.includes(word));
    return found.length >= 2 && found.length / words.length >= 0.34;
  });
  const missed = uniqueSentences.filter((sentence) => !hits.includes(sentence));
  const coverage = uniqueSentences.length ? hits.length / uniqueSentences.length : 0;

  const promptWords = [...new Set(contentWords(task.prompt))];
  const promptHits = promptWords.filter((word) => essay.includes(word)).length;
  const promptRatio = promptWords.length ? promptHits / promptWords.length : 0;

  const comprehension = 1 + coverage * 4;
  const fulfillment = 1.5 + promptRatio * 2 + Math.min(1.5, coverage * 3);
  const language = text.length > 400 ? 3 : 2;
  const organization = text.split(/\n+/).length > 1 ? 3.5 : 3;
  const scores = [fulfillment, comprehension, organization, language];
  const average = scores.reduce((sum, score) => sum + score, 0) / 4;
  const relevant = coverage >= 0.28 && promptRatio >= 0.15;

  return {
    estimatedLevel: levelFromAverage(average),
    taskFulfillment: {
      score: clampScore(fulfillment),
      comment: relevant
        ? "O texto se aproxima do que o enunciado pede e se apoia na gravação."
        : "A proposta está só parcialmente cumprida: o texto não cobre o que o enunciado pede a partir da gravação.",
    },
    sourceComprehension: {
      score: clampScore(comprehension),
      comment:
        coverage >= 0.28
          ? "Há informações da transcrição no texto, reorganizadas para a tarefa."
          : "Pouca coisa da transcrição do vídeo ou do áudio aparece. A relevância ao insumo fica fraca.",
    },
    organization: {
      score: clampScore(organization),
      comment: "Organização aceitável para treino; a banca ainda espera parágrafos com função clara.",
    },
    language: {
      score: clampScore(language),
      comment: "A língua comunica, mas não é o único critério — a tarefa e o insumo pesam mais.",
    },
    usedFacts: hits.slice(0, 4).map(clip),
    missedFacts: missed.slice(0, 4).map(clip),
    inventedFacts: [],
    overallComment:
      "Estimativa local: a relevância foi medida pela transcrição da gravação e pelo enunciado, não pela lista curta de fatos.",
  };
}

export function mockCelpeScore(text: string, task: WritingTask): CelpeTaskScore {
  if (task.sourceMedia) return mockFromTranscript(text, task);
  const used = task.keyFacts.filter((fact) => factHit(text, fact));
  const missed = task.keyFacts.filter((fact) => !factHit(text, fact));
  const genreHit =
    text.toLowerCase().includes("festival") ||
    text.toLowerCase().includes("e-mail") ||
    text.toLowerCase().includes("proposta") ||
    text.toLowerCase().includes("coorden");
  const comprehension = Math.min(5, 1 + used.length);
  const fulfillment = Math.min(5, (genreHit ? 3 : 2) + Math.min(2, used.length));
  const language = text.length > 400 ? 3 : 2;
  const organization = text.split(/\n+/).length > 1 ? 3.5 : 3;
  const scores = [fulfillment, comprehension, organization, language];
  const average = scores.reduce((a, b) => a + b, 0) / 4;

  return {
    estimatedLevel: levelFromAverage(average),
    taskFulfillment: {
      score: clampScore(fulfillment),
      comment:
        used.length >= 3
          ? "O texto se aproxima da proposta e usa parte do insumo."
          : "A proposta está só parcialmente cumprida — faltam elementos pedidos e fatos do insumo.",
    },
    sourceComprehension: {
      score: clampScore(comprehension),
      comment:
        used.length >= 3
          ? "Há sinais de leitura do insumo, mas ainda faltam informações centrais."
          : "Poucos fatos do texto-fonte aparecem. A banca lê isso como compreensão fraca do insumo.",
    },
    organization: {
      score: clampScore(organization),
      comment: "Organização aceitável para treino; a banca ainda espera parágrafos com função clara.",
    },
    language: {
      score: clampScore(language),
      comment: "A língua comunica, mas não é o único critério — a tarefa e o insumo pesam mais.",
    },
    usedFacts: used,
    missedFacts: missed.slice(0, 6),
    inventedFacts: [],
    overallComment:
      "Estimativa local de demonstração. Com o motor de IA, a banca virtual compara gênero, público, fatos do insumo e língua.",
  };
}
