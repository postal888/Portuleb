import fs from "fs";
import { parseBulkDocxBuffer } from "../src/lib/admin/blog-import.ts";

const buf = fs.readFileSync("e:/GIT/Content_Depe/Blog/Artigos/Completo/celpe-bras-blog-seo-pt.docx");
const articles = await parseBulkDocxBuffer(buf);
console.log("articles:", articles.length);
console.log("\nFirst article:");
const a = articles[0];
console.log("\nFirst article:");
if (a) {
  console.log("title:", a.title);
  console.log("slug:", a.slug);
  console.log("seoTitle:", a.seoTitle);
  console.log("faq:", a.post.faq?.length);
  console.log("blocks:", a.post.blocks.map((b) => b.type).join(", "));
  console.log("tags:", a.post.tags.join(", "));
}

console.log("\nLast article:");
const z = articles.at(-1);
if (z) {
  console.log("title:", z.title);
  console.log("slug:", z.slug);
  console.log("seo:", z.post.seoTitle);
}
