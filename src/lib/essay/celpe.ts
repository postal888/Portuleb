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

function factHit(text: string, fact: string): boolean {
  const hay = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const needles = fact
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/[/,]| e /)
    .map((part) => part.trim())
    .filter((part) => part.length >= 5);
  return needles.some((needle) => hay.includes(needle.slice(0, 18)));
}

export function mockCelpeScore(text: string, task: WritingTask): CelpeTaskScore {
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
