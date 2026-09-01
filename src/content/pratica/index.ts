import type { Locale } from "@/i18n/locales";

import { localizedPath } from "@/lib/i18n-links";

import type { SectionKey } from "@/i18n/route-map";

import * as pt from "./hub";

import * as en from "./hub-en";

import * as ru from "./hub-ru";



const TILE_SECTION: Record<string, SectionKey> = {

  ouvir: "practiceListening",

  ler: "practiceReading",

  escrever: "practiceWriting",

  "polir-a-base": "practiceFoundation",

};



function mapTiles<T extends { id: string; href: string }>(locale: Locale, tiles: readonly T[]) {

  return tiles.map((tile) => ({

    ...tile,

    href: localizedPath(locale, TILE_SECTION[tile.id] ?? "practice"),

  }));

}



export function getPracticeHub(locale: Locale) {

  if (locale === "en") {

    return { ...en, practiceTiles: mapTiles("en", en.practiceTiles), ui: en.practiceUiEn };

  }

  if (locale === "ru") {

    return { ...ru, practiceTiles: mapTiles("ru", ru.practiceTiles), ui: ru.practiceUiRu };

  }

  return { ...pt, practiceTiles: mapTiles("pt-br", pt.practiceTiles), ui: null as null };

}

