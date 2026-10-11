import type { WritingTask } from "@/content/writing/tasks";
import type { CheckEssayRequest, EssayExplanationLanguage, EssayMode } from "./types";

/** The candidate reads corrections in the language they browse the site in. */
const EXPLANATION_LANGUAGE: Record<EssayExplanationLanguage, string> = {
  pt: "Brazilian Portuguese",
  en: "English",
  ru: "Russian",
};

/** The kit transcribes the second viewing. Send the recording once. */
function undoubleTranscript(text: string): string {
  const paragraphs = text.split(/\n\n+/);
  if (paragraphs.length >= 4 && paragraphs.length % 2 === 0) {
    const half = paragraphs.length / 2;
    const same = paragraphs
      .slice(0, half)
      .filter((paragraph, index) => paragraph === paragraphs[half + index]).length;
    if (paragraphs[0] === paragraphs[half] && same / half >= 0.7) {
      return paragraphs.slice(0, half).join("\n\n");
    }
  }

  const speaker = text.match(/^(Falante\s+\d+:\s*)/)?.[1] ?? "";
  const body = text.slice(speaker.length);
  const probe = body.slice(0, 180);
  if (probe.length < 80) return text;
  const again = body.indexOf(probe, 80);
  if (again < 0) return text;
  const first = body.slice(0, again).trim();
  const second = body.slice(again).trim();
  const compareLen = Math.min(first.length, second.length, 400);
  if (compareLen >= 80 && first.slice(0, compareLen) === second.slice(0, compareLen)) {
    return `${speaker}${first}`.trim();
  }
  return text;
}

function sourceBlock(task: WritingTask): string {
  const media = task.sourceMedia;
  if (media?.kind === "video" || media?.kind === "audio") {
    const kind = media.kind === "video" ? "VIDEO" : "AUDIO";
    const watched = media.kind === "video" ? "watched this video" : "listened to this audio";
    return [
      `The candidate ${watched} and then wrote. They did not see a transcript.`,
      `The block below is the transcription of that ${kind.toLowerCase()}. It is the original text of the insumo.`,
      "Ignore speaker labels (Falante N) and sounds in square brackets. They are not facts.",
      "",
      "Judge relevance as two separate scores:",
      "- taskFulfillment: the essay against the PROMPT — genre, audience, purpose, and every point the prompt asks the candidate to explain, present, suggest or request. A fluent essay that does something else is off-task.",
      "- sourceComprehension: the essay against the TRANSCRIPTION. Credit information the recording actually contains and that serves the prompt. A missing side detail is not a miss. A person, number, cause or event the transcription does not support is invented. An essay that fits the genre but could have been written without the recording is not relevant to the source.",
      "- The KEY FACTS line is an incomplete hint. Do not use it as the checklist. The transcription decides what the recording said. The prompt decides what the task required.",
      "",
      `KEY FACTS (hints only, not the checklist): ${task.keyFacts.join(" | ")}`,
      "",
      `---TRANSCRIPTION OF THE ${kind}---`,
      undoubleTranscript(task.sourceText),
      "---END TRANSCRIPTION---",
    ].join("\n");
  }

  return [
    `KEY FACTS THE ESSAY SHOULD USE: ${task.keyFacts.join(" | ")}`,
    "",
    "---SOURCE TEXT (INSUMO)---",
    task.sourceText,
    "---END SOURCE---",
  ].join("\n");
}

const MODE_RULES: Record<EssayMode, string> = {
  strict:
    "Correct only clear grammar, spelling, agreement, preposition, article, and conjugation errors. Do not suggest style or naturalness changes.",
  natural:
    "Correct true errors, then add a few naturalness/collocation suggestions. Mark suggestions as severity=suggestion, never as error.",
  exam:
    "Celpe-Bras written exam mode. Prefer official-register Portuguese. Correct errors that would cost points (adequação, coesão, adequação linguística). Style suggestions only when the wording is unnatural for the exam genre. Keep the candidate's voice.",
  business:
    "Corporate Portuguese. Correct errors and flag wording that sounds informal or vague in a professional text. Mark tone upgrades as suggestion.",
};

export function buildEssayCheckPrompts(
  input: CheckEssayRequest,
  task?: WritingTask,
): {
  system: string;
  user: string;
} {
  const system = [
    "You are two things at once:",
    "1) a fragment-level proofreader for Portuguese learners;",
    "2) a Celpe-Bras rater for the written part.",
    "You never rewrite whole sentences when 1–3 words are wrong.",
    "You preserve the student's syntax whenever it is understandable.",
    "You return JSON only. No markdown. No commentary outside JSON.",
    "",
    "Hard rules for corrections:",
    "- Correct the smallest possible fragment (a letter, ending, article, preposition, or short phrase).",
    "- If only one word is wrong, originalFragment must be that word or ending — not the sentence.",
    "- Do not produce a fully rewritten essay.",
    "- Do not invent facts or change meaning.",
    "- True errors: severity=error or minor.",
    "- Unnatural but acceptable wording: severity=suggestion, and say it is a better/more natural option, not a serious error.",
    `- Write explanation, shortExplanation, usedFacts, missedFacts, inventedFacts, repeatedPatterns labels and every celpe comment in ${EXPLANATION_LANGUAGE[input.explanationLanguage]}.`,
    `- The essay itself stays Brazilian Portuguese: never correct, rewrite or translate it into ${EXPLANATION_LANGUAGE[input.explanationLanguage]}.`,
    "- Quote the wrong Portuguese fragment verbatim inside each explanation, then explain the rule in the requested language.",
    "- Offsets are 0-based UTF-16 indexes into the exact submitted essay.",
    "",
    "Celpe-Bras rating rules:",
    "- Score the essay against the TASK and the SOURCE TEXT (insumo), not against a perfect rewrite.",
    "- taskFulfillment: did the candidate write the requested genre for the requested audience and fulfill the communicative goal?",
    "- sourceComprehension: did they understand the insumo? Use facts accurately? Miss central information? Invent facts that are not in the source?",
    "- If the user message contains TRANSCRIPTION OF THE VIDEO or TRANSCRIPTION OF THE AUDIO, that transcription is the insumo the candidate watched or heard. sourceComprehension is relevance to that transcription. taskFulfillment is relevance to the PROMPT. Do not merge the two judgments, and do not replace the transcription with the short KEY FACTS hint.",
    "- organization: cohesion, paragraphing, readable order.",
    "- language: grammar, vocabulary, register — this is NOT the only score.",
    "- Do not reward copying the source verbatim. Reward selection and reorganization of information.",
    "- A grammatically clean text that ignores the task or the insumo cannot be Avançado.",
    "- A text with language errors can still score well on taskFulfillment if it answers the prompt and uses the source.",
    "- Scores are 0–5 (0 empty/off-task, 3 adequate Intermediário, 4 Intermediário Superior / Avançado, 5 Avançado Superior).",
    "- estimatedLevel must be one of: none, intermediario, intermediario-superior, avancado, avancado-superior.",
    "- usedFacts / missedFacts / inventedFacts: 2–4 thematic summaries in Brazilian Portuguese, not a checklist of names, dates or numbers.",
    "- Group details. Write 'história do assentamento e da ocupação', never '6 de abril', 'AAFAM', 'Fetape' as separate items.",
    "- Do not copy the KEY FACTS list item by item. Synthesize.",
    "",
    `Mode: ${input.mode}. ${MODE_RULES[input.mode]}`,
    `Source language: ${input.sourceLanguage}.`,
    "",
    "JSON shape:",
    "{",
    '  "estimatedLevel": "B1",',
    '  "celpe": {',
    '    "estimatedLevel": "intermediario-superior",',
    '    "taskFulfillment": { "score": 4, "comment": "..." },',
    '    "sourceComprehension": { "score": 3, "comment": "..." },',
    '    "organization": { "score": 4, "comment": "..." },',
    '    "language": { "score": 3, "comment": "..." },',
    '    "usedFacts": ["..."],',
    '    "missedFacts": ["..."],',
    '    "inventedFacts": ["..."],',
    '    "overallComment": "..."',
    "  },",
    '  "repeatedPatterns": [{ "key": "string", "label": "string", "count": 2 }],',
    '  "corrections": [{ "id": "c1", "sentenceIndex": 0, "originalFragment": "quatros", "correctedFragment": "quatro", "startOffset": 12, "endOffset": 19, "category": "agreement", "severity": "error", "explanation": "...", "shortExplanation": "...", "ruleHint": "...", "repeatedPatternKey": "quatro-plural" }]',
    "}",
    "",
    "category: grammar, spelling, agreement, preposition, article, verb, vocabulary, collocation, punctuation, style.",
    "severity: error, minor, suggestion.",
  ].join("\n");

  const user = [
    task
      ? [
          "Rate and correct this Celpe-Bras-style essay.",
          "",
          `TASK ID: ${task.id}`,
          `TASK: ${task.number} — ${task.title} (${task.cycle})`,
          `GENRE: ${task.genre}`,
          `AUDIENCE: ${task.audience}`,
          `PROMPT: ${task.prompt}`,
          `MUST DO: ${task.mustDo.join(" | ")}`,
          "",
          sourceBlock(task),
          "",
        ].join("\n")
      : "Analyze this student essay. Return JSON only.\n",
    "---ESSAY---",
    input.text,
    "---END---",
    "",
    "Return JSON only.",
  ].join("\n");

  return { system, user };
}
