import fs from "fs";
import { extractDocxParagraphs } from "../src/lib/admin/document-parser.ts";

const buf = fs.readFileSync("e:/GIT/Content_Depe/Blog/Artigos/Completo/celpe-bras-blog-seo-pt.docx");
const paras = await extractDocxParagraphs(buf);
const source = paras.filter((p) => p.style === "SourceCode");
const keys = new Set();
for (const p of source) {
  for (const m of p.text.matchAll(/([a-z_]+):(?="|\/)/gi)) keys.add(m[1]);
}
console.log("keys:", [...keys].sort());
source.sort((a, b) => b.text.length - a.text.length).slice(0, 5).forEach((p) => {
  console.log("\n---", p.text.length, "---\n", p.text);
});
