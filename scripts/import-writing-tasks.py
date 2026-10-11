"""Build historical Celpe-Bras writing tasks from the parte escrita HTML kit."""
from __future__ import annotations

import html
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(r"E:\EDU\CELPE\Analise\materiais\provas")
OCR_PATH = Path(r"D:\Temp\celpe-ocr.json")
OUT_TS = Path(r"e:\GIT\Portulebre_hub\src\content\writing\historical-tasks.ts")
IMG_DIR = Path(r"e:\GIT\Portulebre_hub\public\writing\insumos")

# Hand-edited tasks already in tasks.ts. Do not replace them with OCR.
CURATED = {
    ("2025/2", "3"),
    ("2025/2", "4"),
    ("2025/1", "3"),
    ("2025/1", "4"),
    ("2024/2", "3"),
    ("2024/2", "4"),
    ("2023/2", "3"),
    ("2023/2", "4"),
}

ROMAN = {"I": "1", "II": "2", "III": "3", "IV": "4", "1": "1", "2": "2", "3": "3", "4": "4"}
VIDEO_FILES = ("tarefa1-video.mp4", "tarefa1-video.m4v")
AUDIO_FILES = ("tarefa2-audio.m4a", "tarefa2-audio.mp3", "tarefa2-audio.mp4", "tarefa2-audio.m4v")


def media_for(edition: str, number: str) -> dict | None:
    names = VIDEO_FILES if number == "1" else AUDIO_FILES if number == "2" else ()
    folder = ROOT / "media" / edition
    for name in names:
        if (folder / name).is_file():
            kind = "video" if number == "1" else "audio"
            return {"kind": kind, "src": f"/api/writing-media/{edition}/{name}"}
    return None


def clean(text: str) -> str:
    text = html.unescape(text)
    text = text.replace("\xa0", " ")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def collapse_repeated_pass(text: str) -> str:
    """The kit transcribes the second viewing as well. Keep one pass."""
    paras = [part for part in text.split("\n\n") if part.strip()]
    if len(paras) < 4 or len(paras) % 2:
        return text
    half = len(paras) // 2
    if paras[0] != paras[half]:
        return text
    same = sum(left == right for left, right in zip(paras[:half], paras[half:]))
    if same / half < 0.7:
        return text
    return "\n\n".join(paras[:half])


def paragraphs_from_tr(block: str) -> str:
    chunks = re.findall(r"<p>(.*?)</p>", block, flags=re.S)
    lines = []
    for chunk in chunks:
        chunk = re.sub(r'<span class="tc">.*?</span>', "", chunk)
        chunk = re.sub(r'<span class="spk">([^<]*)</span>', r"\1 ", chunk)
        chunk = re.sub(r"<[^>]+>", "", chunk)
        line = clean(chunk)
        if not line or re.fullmatch(r"\[[^\]]+\]", line):
            continue
        lines.append(line)
    text = collapse_repeated_pass("\n\n".join(lines))
    if len(text) > 9000:
        text = text[:9000].rsplit(" ", 1)[0] + "…"
    return text


def facts_from_prompt(prompt: str, title: str) -> list[str]:
    match = re.search(
        r"(?:abord\w+|apresent\w+|explic\w+|destac\w+|salient\w+|incluindo|com base n[oa]s? informações)[^.]{8,180}",
        prompt,
        flags=re.I,
    )
    if not match:
        return [title]
    parts = re.split(r",| e ", match.group(0))
    facts = []
    for part in parts:
        part = re.sub(r"^(?:abord\w+|apresent\w+|explic\w+|destac\w+|salient\w+|incluindo|com base n[oa]s? informações)\s+", "", part, flags=re.I)
        part = part.strip(" .;")
        if 8 <= len(part) <= 90:
            facts.append(part[0].lower() + part[1:] if part else part)
    return facts[:4] or [title]


def main() -> None:
    ocr = json.loads(OCR_PATH.read_text(encoding="utf-8-sig"))
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    tasks = []
    for path in sorted(ROOT.glob("celpe-*.html")):
        edition = path.name.removeprefix("celpe-").removesuffix(".html")
        cycle = edition.replace("-", "/", 1)
        raw = path.read_text(encoding="utf-8")
        parts = re.split(r'<div class="tarefa ', raw)[1:]
        for part in parts:
            tab = re.search(r'class="tab">\s*Tarefa\s+([IV1234]+)\s*<span class="ti">([^<]+)</span>', part)
            enunciado = re.search(r'class="enunciado">(.*?)</div>', part, flags=re.S)
            if not tab or not enunciado:
                continue
            number = ROMAN[tab.group(1)]
            if (cycle, number) in CURATED:
                continue
            label = clean(tab.group(2))
            title = label.split("·")[0].strip() or label
            prompt = clean(re.sub(r"<[^>]+>", "", enunciado.group(1)))
            genre_match = re.search(r"Escreva sua resposta \(([^)]+)\)", part)
            genre = clean(genre_match.group(1)) if genre_match else "texto da parte escrita"
            tr = re.search(r'<div class="tr">(.*?)</div>\s*</details>', part, flags=re.S)
            img = re.search(r'<img src="(media/[^"]+)"', part)
            task_id = f"{edition}-t{number}"
            source_image = None
            if tr:
                source = paragraphs_from_tr(tr.group(1))
            elif img:
                rel = img.group(1).removeprefix("media/")
                source = clean(ocr.get(rel, ""))
                src_png = ROOT / "media" / rel
                dest = IMG_DIR / f"{task_id}.jpg"
                with Image.open(src_png) as image:
                    image = image.convert("RGB")
                    image.thumbnail((1400, 2200))
                    image.save(dest, "JPEG", quality=72, optimize=True)
                source_image = f"/writing/insumos/{task_id}.jpg"
            else:
                continue
            if len(source) < 40:
                continue
            tasks.append(
                {
                    "id": task_id,
                    "cycle": cycle,
                    "number": f"Tarefa {number}",
                    "title": title,
                    "shortLabel": f"{cycle} · T{number}",
                    "genre": genre,
                    "audience": "interlocutor indicado no enunciado",
                    "timeHint": "parte escrita",
                    "prompt": prompt,
                    "sourceKicker": f"Insumo · prova {cycle} · Tarefa {number}",
                    "sourceTitle": title,
                    "sourceText": source,
                    "sourceImage": source_image,
                    "keyFacts": facts_from_prompt(prompt, title),
                    "mustDo": [
                        f"escrever no gênero pedido: {genre}",
                        "usar informações do insumo, sem inventar dados",
                        "dirigir o texto ao interlocutor do enunciado",
                    ],
                }
            )
            if tasks[-1]["sourceImage"] is None:
                del tasks[-1]["sourceImage"]
            media = None if tasks[-1].get("sourceImage") else media_for(edition, number)
            if media:
                tasks[-1]["sourceMedia"] = media

    def rank(task: dict) -> tuple:
        year, rest = task["cycle"].split("/")
        major, _, minor = rest.partition(".")
        num = int(re.search(r"\d+", task["number"]).group(0))
        return (-int(year), -int(major), -int(minor or 0), num)

    tasks.sort(key=rank)
    ids = ",\n  ".join(json.dumps(task["id"], ensure_ascii=False) for task in tasks)
    body = ",\n  ".join(json.dumps(task, ensure_ascii=False, indent=2) for task in tasks)
    # json.dumps of the whole object uses 2-space indent inside; prefix the array items.
    OUT_TS.write_text(
        "import type { WritingTask } from \"./tasks\";\n\n"
        f"export const HISTORICAL_WRITING_TASK_IDS = [\n  {ids},\n] as const;\n\n"
        "export const HISTORICAL_WRITING_TASKS: WritingTask[] = "
        + json.dumps(tasks, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print(f"tasks {len(tasks)} images {sum(1 for t in tasks if t.get('sourceImage'))}")


if __name__ == "__main__":
    main()
