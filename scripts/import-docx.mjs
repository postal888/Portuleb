import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseDocumentBuffer } from "../src/lib/admin/blog-import.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docxPath =
  process.argv[2] ??
  "C:/Users/lenovo/Downloads/celpebras_2025_blog_article.docx";

const buf = fs.readFileSync(docxPath);
const hints = await parseDocumentBuffer(buf, path.basename(docxPath));
const outDir = path.join(__dirname, "..", "data", "blog", "posts");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `${hints.post.slug}.json`);
fs.writeFileSync(outPath, JSON.stringify(hints.post, null, 2), "utf8");
console.log(`Saved: ${outPath}`);
console.log(`Title: ${hints.post.title}`);
console.log(`Slug: ${hints.post.slug}`);
