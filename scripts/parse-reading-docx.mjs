import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { extractDocxParagraphs } from "../src/lib/admin/document-parser.ts";

const docxPath =
  process.argv[2] ?? "C:/Users/lenovo/Downloads/comidas-gigantes-anotado.docx";

function fixSpacing(s) {
  return s
    .replace(/nordestinoscom/gi, "nordestinos com")
    .replace(/grandesdestaques/gi, "grandes destaques")
    .replace(/doscarros-chefe/gi, "dos carros-chefe")
    .replace(/opponto/gi, "o ponto")
    .replace(/quese/gi, "que se")
    .replace(/casalchegou/gi, "casal chegou")
    .replace(/umcarro/gi, "um carro")
    .replace(/esaiu/gi, "e saiu")
    .replace(/elese/gi, "ele se")
    .replace(/queforam/gi, "que foram")
    .replace(/coisachamou/gi, "coisa chamou")
    .replace(/eunão/gi, "eu não")
    .replace(/umarepercussão/gi, "uma repercussão")
    .replace(/sóveio/gi, "só veio")
    .replace(/umatradição/gi, "uma tradição")
    .replace(/própriosencabeçados/gi, "próprios encabeçados")
    .replace(/Caruaru étão/gi, "Caruaru é tão")
    .replace(/Karinamandou/gi, "Karina mandou")
    .replace(/repercussãopegou/gi, "repercussão pegou")
    .replace(/ideiadeu/gi, "ideia deu")
    .replace(/localse/gi, "local se")
    .replace(/ededesfrutar/gi, "e desfrutar")
    .replace(/sãosinônimos/gi, "são sinônimos")
    .replace(/esperaansiosamente/gi, "espera ansiosamente")
    .replace(/grandegeradora/gi, "grande geradora")
    .replace(/Tambémvale/gi, "Também vale")
    .replace(/tambémfornece/gi, "também fornece")
    .replace(/Monteiro,ressalta/gi, "Monteiro, ressalta")
    .replace(/Caruaru\.Graças/gi, "Caruaru. Graças")
    .replace(/família ese/gi, "família e se")
    .replace(/umorgulho/gi, "um orgulho")
    .replace(/esesegue/gi, "e se segue")
    .replace(/bairro sãoo/gi, "bairro são o")
    .replace(/festasaia/gi, "festa saia")
    .replace(/\s+/g, " ")
    .trim();
}

function slug(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function parseSegments(text) {
  const segments = [];
  const exprMap = new Map();
  const re = /\(([^)]+)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    const before = text.slice(last, m.index);
    const ptRaw = before.match(/([^.!?,;:\n]*?)\s*$/)?.[1]?.trim() ?? before.trim();
    const prefix = before.slice(0, before.length - ptRaw.length);
    if (prefix) segments.push({ text: prefix });
    if (ptRaw) {
      const id = slug(ptRaw);
      if (!exprMap.has(id)) exprMap.set(id, { pt: ptRaw, en: m[1].trim() });
      segments.push({ text: ptRaw, highlight: true, expressionId: id });
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) segments.push({ text: text.slice(last) });
  return { segments, exprMap };
}

const buf = fs.readFileSync(docxPath);
const paras = await extractDocxParagraphs(buf);
const allExpr = new Map();
const blocks = [];

for (let i = 1; i < paras.length; i++) {
  const text = fixSpacing(paras[i].text);
  if (!text) continue;

  const isSection =
    text.length < 80 &&
    !text.includes("(") &&
    (text === "Tradição coletiva" || text === "Muito além do sabor");

  if (isSection) {
    blocks.push({ id: slug(text), title: text, context: undefined, segments: [] });
    continue;
  }

  const { segments, exprMap } = parseSegments(text);
  for (const [k, v] of exprMap) allExpr.set(k, v);

  if (blocks.length && blocks[blocks.length - 1].segments.length === 0) {
    blocks[blocks.length - 1].segments = segments;
  } else {
    blocks.push({
      id: `par-${i}`,
      title: i === 1 ? "Introdução" : undefined,
      context: undefined,
      segments,
    });
  }
}

const cards = [...allExpr.entries()].map(([id, { pt, en }]) => ({
  id,
  expression: pt,
  register: "Texto jornalístico",
  meaning: en,
  whenToUse: "Expressão destacada no texto sobre as comidas gigantes de Caruaru.",
  example: pt,
}));

const out = {
  meta: {
    slug: "comidas-gigantes-caruaru",
    title: paras[0]?.text ?? "Comidas gigantes de Caruaru",
  },
  blocks: blocks.filter((b) => b.segments.length > 0),
  cards,
};

const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "tmp-comidas-gigantes.json");
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), "utf8");
console.log(`Saved ${outPath}`);
console.log(`Blocks: ${out.blocks.length}, Cards: ${out.cards.length}`);
