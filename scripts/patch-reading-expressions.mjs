import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const target = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "content",
  "practice",
  "reading",
  "comidas-gigantes.ts",
);

let content = fs.readFileSync(target, "utf8");

if (!content.includes("comidas-gigantes-expressions")) {
  content = content.replace(
    'import type { ReadingArticle } from "./types";',
    'import type { ReadingArticle } from "./types";\nimport { comidasGigantesExpressionGuide } from "./comidas-gigantes-expressions";',
  );
}

const start = content.indexOf('  "expressions": {');
const end = content.indexOf('  "closingNote": {');
if (start === -1) {
  if (content.includes("expressionGuide")) {
    console.log("Already patched:", target);
    process.exit(0);
  }
  throw new Error("expressions block not found");
}
if (end === -1) throw new Error("closingNote not found");

content =
  content.slice(0, start) +
  '  "expressionGuide": comidasGigantesExpressionGuide,\n' +
  content.slice(end);

fs.writeFileSync(target, content);
console.log("Patched", target);
