import type { AssessmentToken, AssessmentTokenPublic } from "./types";

const BASIC_WORDS = new Set([
  "a", "o", "e", "de", "da", "do", "das", "dos", "em", "no", "na", "nos", "nas", "um", "uma",
  "uns", "umas", "que", "se", "por", "para", "com", "como", "mais", "mas", "ou", "ao", "aos",
  "à", "às", "eu", "ele", "ela", "eles", "elas", "nós", "você", "isso", "isto", "esse", "essa",
  "ser", "ter", "estar", "fazer", "ir", "ver", "dar", "dizer", "poder", "muito", "muita",
  "já", "também", "só", "quando", "onde", "quem", "não", "sim", "há", "tem", "foi", "são",
  "está", "estão", "entre", "sobre", "até", "após", "sem", "seu", "sua", "seus", "suas",
  "meu", "minha", "nosso", "nossa", "todo", "toda", "todos", "todas", "outro", "outra",
  "cada", "mesmo", "mesma", "ainda", "bem", "mal", "dia", "ano", "vez", "duas", "dois",
]);

const ADVANCED_HINTS = new Set([
  "desigualdade", "subrepresentação", "sobrerrepresentação", "multidisciplinares",
  "desenvoltura", "consequência", "invisibilização", "contratarem", "estabelecerem",
  "quilombolas", "escravização", "profissionais", "pesquisadores", "observou",
  "jornalismo", "editoriais", "circulação", "cantigas", "ciranda", "folclore",
  "alfabetização", "indicadores", "territorial", "implementação", "participação",
]);

function normalizeWord(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function classifyWord(word: string): import("./types").WordDifficultyBand {
  const norm = normalizeWord(word);
  if (!norm || norm.length <= 2) return "basic";
  if (BASIC_WORDS.has(norm)) return "basic";
  if (ADVANCED_HINTS.has(norm) || norm.length >= 11) return "advanced";
  if (norm.length >= 8) return "intermediate";
  return "basic";
}

const WORD_RE = /[\p{L}\p{M}]+(?:['-][\p{L}\p{M}]+)*/gu;

export function tokenizeParagraph(text: string, articleId: string, paragraphIndex: number): AssessmentToken[] {
  const tokens: AssessmentToken[] = [];
  let tokenIndex = 0;
  let lastIndex = 0;
  const wordRe = /[\p{L}\p{M}]+(?:['-][\p{L}\p{M}]+)*/gu;
  let match: RegExpExecArray | null;

  while ((match = wordRe.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index);
    if (before) {
      for (const ch of before) {
        tokens.push({
          id: `${articleId}-p${paragraphIndex}-t${tokenIndex++}`,
          surface: ch,
          clickable: false,
          difficultyBand: "basic",
        });
      }
    }

    const surface = match[0];
    tokens.push({
      id: `${articleId}-p${paragraphIndex}-t${tokenIndex++}`,
      surface,
      clickable: true,
      difficultyBand: classifyWord(surface),
    });
    lastIndex = match.index + surface.length;
  }

  const tail = text.slice(lastIndex);
  if (tail) {
    for (const ch of tail) {
      tokens.push({
        id: `${articleId}-p${paragraphIndex}-t${tokenIndex++}`,
        surface: ch,
        clickable: false,
        difficultyBand: "basic",
      });
    }
  }

  return tokens;
}

/** Split text into clickable word tokens per paragraph. */
export function tokenizeAssessmentText(text: string, articleId: string): AssessmentToken[] {
  const paragraphs = text.split(/\n\n+/).filter(Boolean);
  return paragraphs.flatMap((para, i) => tokenizeParagraph(para, articleId, i));
}

export function toPublicTokens(tokens: AssessmentToken[]): AssessmentTokenPublic[] {
  return tokens.map(({ id, surface, clickable }) => ({ id, surface, clickable }));
}
