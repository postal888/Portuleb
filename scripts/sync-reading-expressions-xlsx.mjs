import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const xlsxPath = process.argv[2] ?? "e:/EDU/Expressoes/expressoes.xlsx";
const expressionsOut = path.join(
  root,
  "src/content/practice/reading/comidas-gigantes-expressions.ts",
);
const articleOut = path.join(root, "src/content/practice/reading/comidas-gigantes.ts");

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function normalize(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Inline segment ids from docx import → guide ids from xlsx. */
const EXPRESSION_ID_ALIASES = {
  "ponto-de-partida": "o-ponto-de-partida",
  "chegou-a-servir": "chegar-a-servir",
  "saiu-caminhando": "sair-caminhando",
  "se-deu-conta": "dar-se-conta-de",
  "foram-contagiados-pelo-ritmo": "ser-contagiado-pelo-ritmo",
  "nao-tivesse-nem-ideia-da-dimensao": "nao-ter-ideia-da-dimensao",
  "repercussao-grandiosa": "ter-repercussao-grandiosa",
  "eu-costumo-dizer": "eu-costumo-dizer-que",
  "veio-a-acontecer": "vir-a-acontecer",
  "ao-longo": "ao-longo-dessas-decadas",
  "encabecados-por": "ser-encabecado-por",
  "mandou-fazer": "mandar-fazer",
  "pegou-a-familia-de-surpresa": "pegar-alguem-de-surpresa",
  "deu-certo": "dar-certo",
  "em-razao-da": "em-razao-de",
  "expectativa-e-de-compartilhar": "a-expectativa-e-de-verbo",
  promovendo: "promover-uma-experiencia",
  "deve-ter-captado": "deve-ter-participio",
  "homenagem-ao-sucesso-de": "fazer-uma-homenagem-a",
  "se-enche-de": "encher-se-de",
  "saia-do-papel": "sair-do-papel",
  "se-deslocarem": "se-deslocar-para",
  "se-deslocam": "se-deslocar-para",
  "vale-mencionar": "vale-mencionar-que",
  papel: "o-papel-de-x-em-y",
  "desfrutar-da-data": "desfrutar-de",
  orgulho: "ter-orgulho-de-ser-um-orgulho-para",
  "foi-o-coletivo-que": "foi-o-coletivo-que",
  "o-pilar": "a-pilar-fundamental",
};

function entryBases(portuguese) {
  return portuguese
    .split("/")
    .map((part) => part.split("(")[0]?.trim() ?? part)
    .filter(Boolean)
    .map(normalize);
}

function loadEntriesFromXlsx() {
  const tmpJson = path.join(root, "tmp-expressoes-sync.json");
  const py = spawnSync(
    "python",
    [
      "-c",
      `
import openpyxl, json, sys
wb = openpyxl.load_workbook(sys.argv[1], read_only=True)
rows = list(wb.active.iter_rows(values_only=True))
data = [{"portuguese": r[0], "english": r[1], "example": r[2], "explanation": r[3]} for r in rows[1:] if r[0]]
with open(sys.argv[2], "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)
`.trim(),
      xlsxPath,
      tmpJson,
    ],
    { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 },
  );
  if (py.status !== 0) throw new Error(py.stderr || "Failed to read xlsx");
  const rows = JSON.parse(fs.readFileSync(tmpJson, "utf8"));
  fs.unlinkSync(tmpJson);
  return rows.map((row, index) => ({
    id: slugify(row.portuguese) || `expr-${index + 1}`,
    portuguese: String(row.portuguese).trim(),
    english: String(row.english).trim(),
    example: String(row.example ?? "").trim(),
    explanation: String(row.explanation ?? "").trim(),
  }));
}

function findGuideEntry(segmentText, expressionId, entries) {
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  const aliasId = EXPRESSION_ID_ALIASES[expressionId] ?? expressionId;
  if (byId.has(aliasId)) return byId.get(aliasId);
  if (byId.has(expressionId)) return byId.get(expressionId);

  const normSegment = normalize(segmentText);
  return entries.find((entry) => {
    const bases = entryBases(entry.portuguese);
    return bases.some(
      (base) =>
        normSegment === base ||
        normSegment.includes(base) ||
        base.includes(normSegment),
    );
  });
}

function plain(text) {
  return { text };
}

function highlighted(text, expressionId) {
  return { text, highlight: true, expressionId };
}

function applyManualPatches(blocks) {
  const byId = new Map(blocks.map((block) => [block.id, block]));

  byId.get("par-2").segments = [
    plain(
      "Só neste ano, são mais de 70 festas dedicadas aos maiores pratos do mundo. E tem comida pra todos os gostos, de cuscuz a tapioca, de paçoca a tareco, de bolos a caldos. Esses eventos não são só um capricho megalomaníaco; para os pernambucanos, são como uma carta de amor às suas tradições e à culinária afetiva que faz parte do seu dia a dia, ",
    ),
    highlighted("tanto que", "tanto-que"),
    plain(" o "),
    highlighted("ponto de partida", "o-ponto-de-partida"),
    plain(
      " dessa história foi um caruaruense comum que, para criar um momento especial com os moradores da sua comunidade, fundou um ritual que se espalhou organicamente pela cidade.",
    ),
  ];

  byId.get("par-28").segments = [
    plain("André, criador do Cozido de Milho Gigante, ressalta "),
    highlighted("o papel", "o-papel-de-x-em-y"),
    plain(" dessas comemorações na movimentação dos bairros de Caruaru. "),
    highlighted("Graças a eles", "gracas-a-eles"),
    plain(
      ", o São João é descentralizado do centro e moradores, comerciantes e turistas de cada parte da cidade podem ",
    ),
    highlighted("desfrutar da data", "desfrutar-de"),
    plain(
      ". “Nós mantemos viva a nossa tradição dos festejos de rua, onde as famílias se reúnem e celebram o período junino com muita brincadeira e forró autêntico”, afirma ele.",
    ),
  ];

  byId.get("par-30").segments = [
    highlighted("Foi o coletivo que", "foi-o-coletivo-que"),
    plain(" construiu e segue construindo a totalidade da festa que se tornou um dos grandes destaques do Brasil. Tradições passadas de geração em geração, entre familiares, amigos e vizinhos de bairro são "),
    highlighted("o pilar fundamental", "a-pilar-fundamental"),
    plain(" do São João."),
  ];

  return [...byId.values()];
}

function filterHighlights(blocks, entries) {
  return blocks.map((block) => ({
    ...block,
    segments: block.segments.flatMap((segment) => {
      if (!segment.highlight) return [segment];

      const match = findGuideEntry(segment.text, segment.expressionId ?? "", entries);
      if (!match) {
        return [plain(segment.text)];
      }

      return [
        {
          text: segment.text,
          highlight: true,
          expressionId: match.id,
        },
      ];
    }),
  }));
}

function writeExpressionsFile(entries) {
  const body = `import type { ReadingExpressionGuide } from "./types";

export const comidasGigantesExpressionGuide: ReadingExpressionGuide = {
  sectionTitle: "Expressões do texto",
  intro:
    "Glossário com tradução, trecho do artigo e explicação em inglês — use depois da leitura para fixar vocabulário e estruturas.",
  entries: ${JSON.stringify(entries, null, 4).replace(/^/gm, "  ").trimStart()},
};
`;
  fs.writeFileSync(expressionsOut, body, "utf8");
}

function writeArticleFile(article) {
  const body = `import type { ReadingArticle } from "./types";
import { comidasGigantesExpressionGuide } from "./comidas-gigantes-expressions";
import {
  comidasGigantesSourceCredits,
  DEFAULT_ADAPTATION_NOTE,
  DEFAULT_DIDACTIC_DISCLAIMER,
} from "./comidas-gigantes-legal";

export const comidasGigantesCaruaru = ${JSON.stringify(article, null, 2)
    .replace(
      '"expressionGuide": null',
      "expressionGuide: comidasGigantesExpressionGuide",
    )
    .replace(
      '"didacticDisclaimer": null',
      "didacticDisclaimer: DEFAULT_DIDACTIC_DISCLAIMER",
    )
    .replace(
      '"adaptationNote": null',
      "adaptationNote: DEFAULT_ADAPTATION_NOTE",
    )
    .replace(
      '"sourceCredits": null',
      "sourceCredits: comidasGigantesSourceCredits",
    )} satisfies ReadingArticle;
`;
  fs.writeFileSync(articleOut, body, "utf8");
}

function loadArticleFromFile() {
  const raw = fs.readFileSync(articleOut, "utf8");
  const start = raw.indexOf("export const comidasGigantesCaruaru = ");
  const jsonStart = raw.indexOf("{", start);
  const jsonEnd = raw.lastIndexOf("} satisfies ReadingArticle;");
  if (start === -1 || jsonEnd === -1) {
    throw new Error("Could not parse comidas-gigantes.ts");
  }
  let jsonText = raw.slice(jsonStart, jsonEnd + 1);
  jsonText = jsonText
    .replace(
      '"expressionGuide": comidasGigantesExpressionGuide',
      '"expressionGuide": null',
    )
    .replace(
      '"didacticDisclaimer": DEFAULT_DIDACTIC_DISCLAIMER',
      '"didacticDisclaimer": null',
    )
    .replace('"adaptationNote": DEFAULT_ADAPTATION_NOTE', '"adaptationNote": null')
    .replace(
      '"sourceCredits": comidasGigantesSourceCredits',
      '"sourceCredits": null',
    );
  return JSON.parse(jsonText);
}

const entries = loadEntriesFromXlsx();
writeExpressionsFile(entries);

const article = loadArticleFromFile();
let blocks = filterHighlights(article.annotatedText.blocks, entries);
blocks = applyManualPatches(blocks);
article.annotatedText.blocks = blocks;
article.expressionGuide = null;
article.didacticDisclaimer = null;
article.adaptationNote = null;
article.sourceCredits = null;

writeArticleFile(article);

const highlights = blocks.flatMap((b) =>
  b.segments.filter((s) => s.highlight).map((s) => s.expressionId),
);
const unique = [...new Set(highlights)];
console.log(`Expressions from xlsx: ${entries.length}`);
console.log(`Highlights kept: ${highlights.length} (${unique.length} unique)`);
console.log(`Guide ids: ${entries.map((e) => e.id).join(", ")}`);
console.log(`Highlight ids: ${unique.join(", ")}`);

const missingInText = entries.filter(
  (e) => !unique.includes(e.id) && e.id !== "tanto-que",
);
if (missingInText.length) {
  console.warn(
    "Guide entries not highlighted in text:",
    missingInText.map((e) => e.id).join(", "),
  );
}
