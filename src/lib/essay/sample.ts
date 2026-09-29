import type { Correction } from "./types";

/** Seeded Celpe-style text with fragment-level problems for local/dev. */
export const SAMPLE_ESSAY_PT = [
  "Hoje em dia o mercado corporativo de vale-alimentaçao e vale-refeição foi representado por quatros empresas grandes que disputa o cliente com cartões e aplicativos.",
  "O Festival Fartura chega nestas cidades com uma proposta simples: mostrar a diversidade da culinaria brasileira e convidar o leitor a sentar na mesa.",
  "Na seção de gastronomia, a gente precisa apresentar o festival com calor e clareza. Os chefs vem de várias regiões, os pratos conta historias de família e o público prova sabores que o supermercado não entrega.",
  "Não é só um evento de comida: é um convite para conhecer o país pelo paladar.",
  "Se você ainda não foi, vale deixar a agenda aberta. Leve um amigo, prove um prato que você nunca pediu e escreva depois o que sentiu.",
  "O Fartura funciona como uma vitrine do Brasil que cabe em um fim de semana — e o jornal pode ajudar o leitor a chegar lá sem medo de errar o caminho.",
].join(" ");

export const SAMPLE_CORRECTIONS: Correction[] = [
  {
    id: "c1",
    sentenceIndex: 0,
    originalFragment: "",
    correctedFragment: ",",
    category: "punctuation",
    severity: "minor",
    explanation: "Depois da fórmula “Hoje em dia” costuma ir vírgula.",
    shortExplanation: "Vírgula depois da fórmula introdutória.",
    ruleHint: "hoje-em-dia + vírgula",
    repeatedPatternKey: "intro-comma",
  },
  {
    id: "c2",
    sentenceIndex: 0,
    originalFragment: "çao",
    correctedFragment: "ção",
    category: "spelling",
    severity: "error",
    explanation: "O certo é alimentação. No sufixo -ção vai til.",
    shortExplanation: "alimentação com ção.",
    ruleHint: "ção",
    repeatedPatternKey: "accent-cao",
  },
  {
    id: "c3",
    sentenceIndex: 0,
    originalFragment: "foi representado por",
    correctedFragment: "é concentrado em",
    category: "collocation",
    severity: "suggestion",
    explanation: "Para o mercado soa mais natural “é concentrado em” do que “foi representado por”. É sugestão de naturalidade, não erro grave.",
    shortExplanation: "Melhor opção: é concentrado em.",
    ruleHint: "colocação de mercado",
    repeatedPatternKey: "market-collocation",
  },
  {
    id: "c4",
    sentenceIndex: 0,
    originalFragment: "quatros",
    correctedFragment: "quatro",
    category: "agreement",
    severity: "error",
    explanation: "“quatro” não recebe desinência de plural.",
    shortExplanation: "quatro, sem -s.",
    ruleHint: "numerais",
    repeatedPatternKey: "quatro-plural",
  },
  {
    id: "c5",
    sentenceIndex: 0,
    originalFragment: "disputa",
    correctedFragment: "disputam",
    category: "agreement",
    severity: "error",
    explanation: "O sujeito “empresas” está no plural: disputam.",
    shortExplanation: "empresas disputam.",
    ruleHint: "concordância verbal",
    repeatedPatternKey: "sv-agreement",
  },
  {
    id: "c6",
    sentenceIndex: 1,
    originalFragment: "nestas",
    correctedFragment: "a estas",
    category: "preposition",
    severity: "minor",
    explanation: "Com o verbo chegar o usual é “chegar a”: chega a estas cidades.",
    shortExplanation: "chegar a.",
    ruleHint: "chegar a",
    repeatedPatternKey: "chegar-a",
  },
  {
    id: "c7",
    sentenceIndex: 1,
    originalFragment: "culinaria",
    correctedFragment: "culinária",
    category: "spelling",
    severity: "error",
    explanation: "Falta o acento: culinária.",
    shortExplanation: "culinária.",
    ruleHint: "acento",
    repeatedPatternKey: "missing-accent",
  },
  {
    id: "c8",
    sentenceIndex: 2,
    originalFragment: "vem",
    correctedFragment: "vêm",
    category: "verb",
    severity: "error",
    explanation: "A 3ª pessoa do plural de vir é vêm.",
    shortExplanation: "eles vêm.",
    ruleHint: "vir",
    repeatedPatternKey: "vir-vem",
  },
  {
    id: "c9",
    sentenceIndex: 2,
    originalFragment: "conta",
    correctedFragment: "contam",
    category: "agreement",
    severity: "error",
    explanation: "“os pratos” pedem a forma contam.",
    shortExplanation: "pratos contam.",
    ruleHint: "concordância verbal",
    repeatedPatternKey: "sv-agreement",
  },
  {
    id: "c10",
    sentenceIndex: 2,
    originalFragment: "historias",
    correctedFragment: "histórias",
    category: "spelling",
    severity: "error",
    explanation: "O certo é histórias.",
    shortExplanation: "histórias.",
    ruleHint: "acento",
    repeatedPatternKey: "missing-accent",
  },
];

export function locateSampleCorrections(text: string): Correction[] {
  const used = new Set<string>();
  return SAMPLE_CORRECTIONS.map((item, index): Correction | null => {
    if (!item.originalFragment) {
      const anchor = text.indexOf("Hoje em dia");
      if (anchor < 0) return null;
      const start = anchor + "Hoje em dia".length;
      if (text[start] === ",") return null;
      return { ...item, id: item.id || `c${index + 1}`, startOffset: start, endOffset: start };
    }

    let from = 0;
    let start = -1;
    while (from <= text.length) {
      const found = text.indexOf(item.originalFragment, from);
      if (found < 0) break;
      const key = `${found}:${found + item.originalFragment.length}`;
      if (!used.has(key)) {
        start = found;
        used.add(key);
        break;
      }
      from = found + 1;
    }
    if (start < 0) return null;
    return {
      ...item,
      startOffset: start,
      endOffset: start + item.originalFragment.length,
    };
  }).filter((item): item is Correction => item !== null);
}
