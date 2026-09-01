import fs from "fs";
import JSZip from "jszip";

const buf = fs.readFileSync(
  process.argv[2] ?? "C:/Users/lenovo/Downloads/comidas-gigantes-anotado.docx",
);
const zip = await JSZip.loadAsync(buf);
const rels = await zip.file("word/_rels/document.xml.rels")?.async("string");
const xml = await zip.file("word/document.xml")?.async("string");
const core = await zip.file("docProps/core.xml")?.async("string");
console.log("CORE:\n", core);
const urls = `${xml ?? ""}${rels ?? ""}`.match(/https?:\/\/[^\s"'<>]+/g) ?? [];
console.log("URLS:", urls);
