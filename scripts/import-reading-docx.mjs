import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { extractAnnotatedReading } from "../src/lib/admin/reading-docx-parser.ts";

const docxPath =
  process.argv[2] ?? "C:/Users/lenovo/Downloads/comidas-gigantes-anotado.docx";

const buf = fs.readFileSync(docxPath);
const data = await extractAnnotatedReading(buf);

const article = {
  meta: {
    slug: "comidas-gigantes-caruaru",
    categoryPath: "compreensao-leitura",
    title: data.title,
    seoTitle: "Comidas gigantes de Caruaru — leitura anotada",
    seoDescription:
      "Texto jornalístico sobre as comidas gigantes de Caruaru com expressões destacadas, traduções e análise para prática de leitura.",
    eyebrow: "Prática · Compreensão escrita",
    level: "Intermediário avançado",
    duration: "20–25 min",
    tags: ["leitura", "vocabulário", "cultura", "Pernambuco"],
  },
  hero: {
    kicker: "Leitura anotada",
    title: "Comidas gigantes de Caruaru",
    lead:
      "Leia o texto completo com expressões em destaque, consulte o glossário abaixo de cada trecho e treine vocabulário em contexto real de reportagem cultural.",
    objectives: [
      "Identificar expressões-chave em texto jornalístico",
      "Relacionar trechos em português com equivalentes em inglês",
      "Ampliar vocabulário sobre cultura, tradição e eventos regionais",
    ],
  },
  annotatedText: {
    sectionTitle: "Texto com expressões destacadas",
    intro:
      "As expressões em destaque aparecem no glossário ao final da página. O texto original permanece em português.",
    blocks: data.paragraphs.map((p) => ({
      id: p.id,
      title: p.title,
      segments: p.segments.map(({ text, highlight, expressionId }) => ({
        text,
        ...(highlight ? { highlight: true, expressionId } : {}),
      })),
    })),
  },
  expressionGuide: "comidasGigantesExpressionGuide",
  didacticDisclaimer: "DEFAULT_DIDACTIC_DISCLAIMER",
  adaptationNote: "DEFAULT_ADAPTATION_NOTE",
  sourceCredits: "comidasGigantesSourceCredits",
  closingNote: {
    title: "Próximo passo",
    body:
      "Depois de ler, volte às provas anteriores do Celpe-Bras e identifique estruturas semelhantes em textos longos. Você também pode praticar vocabulário na seção Polir a base.",
    links: [
      { label: "Voltar a Ler", href: "/pt-br/pratica/compreensao-leitura" },
      { label: "Polir a base", href: "/pt-br/pratica/polimento-de-base" },
      { label: "Hub Prática", href: "/pt-br/pratica" },
    ],
  },
};

const outPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "content",
  "practice",
  "reading",
  "comidas-gigantes.ts",
);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(
  outPath,
  `import type { ReadingArticle } from "./types";
import { comidasGigantesExpressionGuide } from "./comidas-gigantes-expressions";
import {
  comidasGigantesSourceCredits,
  DEFAULT_ADAPTATION_NOTE,
  DEFAULT_DIDACTIC_DISCLAIMER,
} from "./comidas-gigantes-legal";

export const comidasGigantesCaruaru = ${JSON.stringify(article, null, 2)
    .replace(
      '"expressionGuide": "comidasGigantesExpressionGuide"',
      "expressionGuide: comidasGigantesExpressionGuide",
    )
    .replace(
      '"didacticDisclaimer": "DEFAULT_DIDACTIC_DISCLAIMER"',
      "didacticDisclaimer: DEFAULT_DIDACTIC_DISCLAIMER",
    )
    .replace(
      '"adaptationNote": "DEFAULT_ADAPTATION_NOTE"',
      "adaptationNote: DEFAULT_ADAPTATION_NOTE",
    )
    .replace(
      '"sourceCredits": "comidasGigantesSourceCredits"',
      "sourceCredits: comidasGigantesSourceCredits",
    )} satisfies ReadingArticle;
`,
  "utf8",
);

console.log(`Saved ${outPath}`);
console.log(`Paragraphs: ${data.paragraphs.length}, inline highlights: ${data.expressions.length}`);
