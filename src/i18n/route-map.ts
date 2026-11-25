import { LOCALES, type Locale } from "./locales";

/** Stable section keys — used for metadata, switcher, sitemap. */
export type SectionKey =
  | "home"
  | "celpeBras"
  | "examCycle"
  | "pastExams"
  | "pastExamSession"
  | "practice"
  | "theory"
  | "theoryTopic"
  | "reader"
  | "blog"
  | "blogPost"
  | "materials"
  | "contact"
  | "terms"
  | "assessment"
  | "writing"
  | "practiceListening"
  | "practiceReading"
  | "practiceWriting"
  | "practiceFoundation";

type RouteTemplate = {
  paths: Record<Locale, string>;
  /**
   * If false, no public URL outside pt-br for EN/RU switcher (falls back to locale home).
   * Spanish (`es`) paths may still point at a real EN/PT URL for hub deep-links.
   */
  enMirror: boolean;
};

/**
 * Spanish mirror owns a subset of public URLs (EN parity minus writer/practice).
 * Unowned sections fall back to PT/EN so nav never 404s — without thin ES stubs.
 */
const ROUTES: Record<SectionKey, RouteTemplate> = {
  home: {
    paths: { "pt-br": "/pt-br", en: "/en", ru: "/ru", es: "/es" },
    enMirror: true,
  },
  celpeBras: {
    paths: {
      "pt-br": "/pt-br/celpe-bras",
      en: "/en/celpe-bras",
      ru: "/ru/celpe-bras",
      es: "/es/celpe-bras",
    },
    enMirror: true,
  },
  examCycle: {
    paths: {
      "pt-br": "/pt-br/celpe-bras/{cycle}",
      en: "/pt-br/celpe-bras/{cycle}",
      ru: "/pt-br/celpe-bras/{cycle}",
      es: "/pt-br/celpe-bras/{cycle}",
    },
    enMirror: false,
  },
  pastExams: {
    paths: {
      "pt-br": "/pt-br/provas-anteriores",
      en: "/en/past-exams",
      ru: "/ru/proshlye-ekzameny",
      es: "/es/examenes-anteriores",
    },
    enMirror: true,
  },
  pastExamSession: {
    paths: {
      "pt-br": "/pt-br/provas-anteriores/{slug}",
      en: "/en/past-exams/{slug}",
      ru: "/ru/proshlye-ekzameny/{slug}",
      es: "/es/examenes-anteriores/{slug}",
    },
    enMirror: true,
  },
  practice: {
    paths: {
      "pt-br": "/pt-br/pratica",
      en: "/en/practice",
      ru: "/ru/praktika",
      // No ES practice surface — funnel to PT.
      es: "/pt-br/pratica",
    },
    enMirror: true,
  },
  theory: {
    paths: {
      "pt-br": "/pt-br/teoria",
      en: "/en/theory",
      ru: "/ru/teoriya",
      es: "/es/teoria",
    },
    enMirror: true,
  },
  theoryTopic: {
    paths: {
      "pt-br": "/pt-br/teoria/{slug}",
      en: "/pt-br/teoria/{slug}",
      ru: "/pt-br/teoria/{slug}",
      es: "/pt-br/teoria/{slug}",
    },
    enMirror: false,
  },
  reader: {
    paths: {
      "pt-br": "/pt-br/leitor",
      en: "/en/reader",
      ru: "/ru/chitalka",
      es: "/es/lector",
    },
    enMirror: true,
  },
  blog: {
    paths: {
      "pt-br": "/pt-br/blog",
      en: "/en/blog",
      ru: "/ru/blog",
      es: "/es/blog",
    },
    enMirror: true,
  },
  blogPost: {
    paths: {
      "pt-br": "/pt-br/blog/{slug}",
      en: "/en/blog/{slug}",
      ru: "/ru/blog/{slug}",
      es: "/es/blog/{slug}",
    },
    enMirror: true,
  },
  materials: {
    paths: {
      "pt-br": "/pt-br/materiais",
      en: "/en/materials",
      ru: "/ru/materialy",
      es: "/pt-br/materiais",
    },
    enMirror: true,
  },
  contact: {
    paths: {
      "pt-br": "/pt-br/contato",
      en: "/en/contact",
      ru: "/ru/kontakt",
      es: "/es/contacto",
    },
    enMirror: true,
  },
  terms: {
    paths: {
      "pt-br": "/pt-br/termos",
      en: "/en/terms",
      ru: "/ru/usloviya",
      es: "/pt-br/termos",
    },
    enMirror: true,
  },
  assessment: {
    paths: {
      "pt-br": "/pt-br/avaliacao",
      en: "/pt-br/avaliacao",
      ru: "/pt-br/avaliacao",
      es: "/pt-br/avaliacao",
    },
    enMirror: false,
  },
  writing: {
    paths: {
      "pt-br": "/pt-br/escrever",
      en: "/en/writing",
      ru: "/ru/pismo",
      // No ES writer surface — funnel to PT.
      es: "/pt-br/escrever",
    },
    enMirror: true,
  },
  practiceListening: {
    paths: {
      "pt-br": "/pt-br/pratica/compreensao-auditiva",
      en: "/pt-br/pratica/compreensao-auditiva",
      ru: "/pt-br/pratica/compreensao-auditiva",
      es: "/pt-br/pratica/compreensao-auditiva",
    },
    enMirror: false,
  },
  practiceReading: {
    paths: {
      "pt-br": "/pt-br/pratica/compreensao-leitura",
      en: "/pt-br/pratica/compreensao-leitura",
      ru: "/pt-br/pratica/compreensao-leitura",
      es: "/pt-br/pratica/compreensao-leitura",
    },
    enMirror: false,
  },
  practiceWriting: {
    paths: {
      "pt-br": "/pt-br/pratica/producao-escrita",
      en: "/pt-br/pratica/producao-escrita",
      ru: "/pt-br/pratica/producao-escrita",
      es: "/pt-br/pratica/producao-escrita",
    },
    enMirror: false,
  },
  practiceFoundation: {
    paths: {
      "pt-br": "/pt-br/pratica/polimento-de-base",
      en: "/pt-br/pratica/polimento-de-base",
      ru: "/pt-br/pratica/polimento-de-base",
      es: "/pt-br/pratica/polimento-de-base",
    },
    enMirror: false,
  },
};

/** Sections that have a dedicated Spanish public page (freeze-safe new URLs only). */
export const ES_OWNED_SECTIONS: ReadonlySet<SectionKey> = new Set([
  "home",
  "celpeBras",
  "pastExams",
  "pastExamSession",
  "theory",
  "reader",
  "blog",
  "blogPost",
  "contact",
]);

export type ParsedRoute = {
  locale: Locale;
  section: SectionKey;
  params: Record<string, string>;
};

function fill(template: string, params: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => params[key] ?? "");
}

export function pathFor(
  locale: Locale,
  section: SectionKey,
  params: Record<string, string> = {},
): string {
  return fill(ROUTES[section].paths[locale], params);
}

export function getSectionPath(locale: Locale, section: SectionKey): string {
  return ROUTES[section].paths[locale];
}

export function parsePathname(pathname: string): ParsedRoute | null {
  const normalized = pathname.split("?")[0].replace(/\/$/, "") || "/";

  for (const section of Object.keys(ROUTES) as SectionKey[]) {
    // Prefer SWITCHER locales before `es` so /en/past-exams/{slug} parses as EN,
    // not as the ES fallback that reuses the same path template.
    for (const locale of LOCALES) {
      const template = ROUTES[section].paths[locale];
      const parts = template.split("/").filter(Boolean);
      const pathParts = normalized.split("/").filter(Boolean);
      if (parts.length !== pathParts.length) continue;

      const params: Record<string, string> = {};
      let match = true;
      for (let i = 0; i < parts.length; i++) {
        const seg = parts[i];
        const actual = pathParts[i];
        if (seg.startsWith("{") && seg.endsWith("}")) {
          params[seg.slice(1, -1)] = actual;
        } else if (seg !== actual) {
          match = false;
          break;
        }
      }
      if (match) {
        // If ES reuses an EN/PT path, keep the real host locale when templates collide.
        if (locale === "es" && !ES_OWNED_SECTIONS.has(section)) {
          continue;
        }
        return { locale, section, params };
      }
    }
  }
  return null;
}

export { localeFromPathname } from "./locales";

type AlternateOptions = {
  enBlogSlug?: string;
  hasEnBlogPost?: boolean;
  ruBlogSlug?: string;
  hasRuBlogPost?: boolean;
};

function blogPostParams(
  locale: Locale,
  params: Record<string, string>,
  options: AlternateOptions,
): Record<string, string> {
  if (locale === "en" && options.enBlogSlug) return { slug: options.enBlogSlug };
  if (locale === "ru" && options.ruBlogSlug) return { slug: options.ruBlogSlug };
  return params;
}

export function getAlternatePath(
  pathname: string,
  targetLocale: Locale,
  options: AlternateOptions = {},
): string {
  const parsed = parsePathname(pathname);
  if (!parsed) return pathFor(targetLocale, "home");

  const { section, params } = parsed;

  if (section === "blogPost" && targetLocale === "en" && options.hasEnBlogPost === false) {
    return pathFor("en", "blog");
  }
  if (section === "blogPost" && targetLocale === "ru" && options.hasRuBlogPost === false) {
    return pathFor("ru", "blog");
  }

  // Spanish switcher targets: only owned sections stay on /es; otherwise ES home.
  if (targetLocale === "es" && !ES_OWNED_SECTIONS.has(section)) {
    return pathFor("es", "home");
  }

  if (targetLocale !== "pt-br" && targetLocale !== "es" && !ROUTES[section].enMirror) {
    return pathFor(targetLocale, "home");
  }

  return pathFor(targetLocale, section, blogPostParams(targetLocale, params, options));
}

/**
 * Language alternates for PT/EN/RU pages.
 * Intentionally never emits `es` — Spanish mirror ships without reciprocal hreflang
 * so frozen traffic pages keep an unchanged <head>.
 */
type HrefLangCode = "pt-BR" | "en" | "ru" | "x-default";

export function alternatesForSection(
  section: SectionKey,
  params: Record<string, string> = {},
  options: AlternateOptions = {},
): Partial<Record<HrefLangCode, string>> | undefined {
  const ptPath = pathFor("pt-br", section, params);
  const result: Partial<Record<HrefLangCode, string>> = {
    "pt-BR": ptPath,
    "x-default": ptPath,
  };

  if (section === "blogPost") {
    if (options.hasEnBlogPost) {
      result.en = pathFor("en", section, blogPostParams("en", params, options));
    }
    if (options.hasRuBlogPost) {
      result.ru = pathFor("ru", section, blogPostParams("ru", params, options));
    }
    return result;
  }

  if (!ROUTES[section].enMirror) {
    return result;
  }

  result.en = pathFor("en", section, params);
  result.ru = pathFor("ru", section, params);
  return result;
}

export { ROUTES };
