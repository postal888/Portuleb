import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || (ch === "\r" && next === "\n")) {
      if (ch === "\r") i++;
      row.push(field);
      field = "";
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    if (row.some((cell) => cell.trim())) rows.push(row);
  }

  return rows;
}

function cleanExplanation(text) {
  return text.replace(/\.dictionary\.[^\s]+/gi, ".").trim();
}

const csvPath =
  process.argv[2] ??
  "C:/Users/lenovo/Downloads/Portuguese-English-Shortexamplefromtext-Explanatio.csv";

const raw = fs.readFileSync(csvPath, "utf8").replace(/^\uFEFF/, "");
const rows = parseCsv(raw);
const [header, ...dataRows] = rows;

const entries = dataRows.map((cells, index) => {
  const [portuguese, english, example, explanation] = cells.map((c) => c.trim());
  const id = slugify(portuguese) || `expr-${index + 1}`;
  return {
    id,
    portuguese,
    english,
    example,
    explanation: cleanExplanation(explanation),
  };
});

const outPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "content",
  "practice",
  "reading",
  "comidas-gigantes-expressions.ts",
);

const body = `import type { ReadingExpressionGuide } from "./types";

export const comidasGigantesExpressionGuide: ReadingExpressionGuide = {
  sectionTitle: "Expressões do texto",
  intro:
    "Glossário com tradução, trecho do artigo e explicação em inglês — use depois da leitura para fixar vocabulário e estruturas.",
  entries: ${JSON.stringify(entries, null, 4).replace(/^/gm, "  ").trimStart()},
};
`;

fs.writeFileSync(outPath, body, "utf8");
console.log(`Saved ${outPath} (${entries.length} entries from ${header?.join(", ")})`);
