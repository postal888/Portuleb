import type { Locale } from "./locales";

export function archiveAnchors(locale: Locale) {
  if (locale === "en") {
    return {
      materials: "materials",
      viewOnSite: "view-on-site",
      written: "written-exam",
      oral: "oral-part",
    } as const;
  }
  if (locale === "ru") {
    return {
      materials: "materialy",
      viewOnSite: "smotret-na-sajte",
      written: "pismennaya-chast",
      oral: "ustnaya-chast",
    } as const;
  }
  return {
    materials: "materiais",
    viewOnSite: "visualizar",
    written: "parte-escrita",
    oral: "parte-oral",
  } as const;
}

export function materialDomId(locale: Locale, materialId: string): string {
  if (locale === "en" && materialId === "caderno") return "material-booklet";
  if (locale === "ru" && materialId === "caderno") return "material-sbornik";
  return `material-${materialId}`;
}

export function materialHash(locale: Locale, materialId: string): string {
  return `#${materialDomId(locale, materialId)}`;
}

export function theoryAnchors(locale: Locale) {
  if (locale === "en") return { main: "study-areas", verbs: "verbs" } as const;
  if (locale === "ru") return { main: "razdely", verbs: "glagoly" } as const;
  return { main: "eixos", verbs: "verbos" } as const;
}

export function practiceAnchors(locale: Locale) {
  if (locale === "en") {
    return {
      skills: "skills",
      listen: "listen",
      read: "read",
      writeDetail: "writing-detail",
      polishDetail: "foundation-detail",
      exercises: "exercises",
    } as const;
  }
  if (locale === "ru") {
    return {
      skills: "navyki",
      listen: "slushat",
      read: "chitat",
      writeDetail: "pismo-detal",
      polishDetail: "polirovka-detal",
      exercises: "uprazhneniya",
    } as const;
  }
  return {
    skills: "habilidades",
    listen: "ouvir",
    read: "ler",
    writeDetail: "escrever-detalhe",
    polishDetail: "polir-a-base-detalhe",
    exercises: "exercicios",
  } as const;
}
