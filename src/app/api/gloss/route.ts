import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Gloss = { en: string; ru: string };

const memory = new Map<string, Gloss>();

function normalize(word: string): string {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    .trim();
}

async function translate(text: string, langpair: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;
  const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 * 30 } });
  if (!res.ok) return "";
  const data = (await res.json()) as {
    responseData?: { translatedText?: string };
  };
  const out = data.responseData?.translatedText?.trim() ?? "";
  if (!out || /MYMEMORY WARNING/i.test(out)) return "";
  return out;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
  const key = normalize(q);
  if (!key || key.length > 48) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const cached = memory.get(key);
  if (cached) return NextResponse.json({ word: key, ...cached, cached: true });

  const [en, ru] = await Promise.all([
    translate(q, "pt|en"),
    translate(q, "pt|ru"),
  ]);

  const gloss: Gloss = {
    en: en || q,
    ru: ru || en || q,
  };
  memory.set(key, gloss);
  return NextResponse.json({ word: key, ...gloss, cached: false });
}
