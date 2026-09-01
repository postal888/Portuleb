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
  | "practiceListening"
  | "practiceReading"
  | "practiceWriting"
  | "practiceFoundation";

type RouteTemplate = {
  paths: Record<Locale, string>;
  /** If false, no public URL outside pt-br (switcher falls back to locale home). */
  enMirror: boolean;
};

const ROUTES: Record<SectionKey, RouteTemplate> = {
  home: { paths: { "pt-br": "/pt-br", en: "/en", ru: "/ru" }, enMirror: true },
  celpeBras: {
    paths: { "pt-br": "/pt-br/celpe-bras", en: "/en/celpe-bras", ru: "/ru/celpe-bras" },
    enMirror: true,
  },
  examCycle: {
    paths: {
      "pt-br": "/pt-br/celpe-bras/{cycle}",
      en: "/pt-br/celpe-bras/{cycle}",
      ru: "/pt-br/celpe-bras/{cycle}",
    },
    enMirror: false,
  },
  pastExams: {
    paths: {
      "pt-br": "/pt-br/provas-anteriores",
      en: "/en/past-exams",
      ru: "/ru/proshlye-ekzameny",
    },
    enMirror: true,
  },
  pastExamSession: {
    paths: {
      "pt-br": "/pt-br/provas-anteriores/{slug}",
      en: "/en/past-exams/{slug}",
      ru: "/ru/proshlye-ekzameny/{slug}",
    },
    enMirror: true,
  },
  practice: {
    paths: { "pt-br": "/pt-br/pratica", en: "/en/practice", ru: "/ru/praktika" },
    enMirror: true,
  },
  theory: {
    paths: { "pt-br": "/pt-br/teoria", en: "/en/theory", ru: "/ru/teoriya" },
    enMirror: true,
  },
  theoryTopic: {
    paths: {
      "pt-br": "/pt-br/teoria/{slug}",
      en: "/pt-br/teoria/{slug}",
      ru: "/pt-br/teoria/{slug}",
    },
    enMirror: false,
  },
  reader: {
    paths: { "pt-br": "/pt-br/leitor", en: "/en/reader", ru: "/ru/chitalka" },
    enMirror: true,
  },
  blog: {
    paths: { "pt-br": "/pt-br/blog", en: "/en/blog", ru: "/ru/blog" },
    enMirror: true,
  },
  blogPost: {
    paths: {
      "pt-br": "/pt-br/blog/{slug}",
      en: "/en/blog/{slug}",
      ru: "/ru/blog/{slug}",
    },
    enMirror: true,
  },
  materials: {
    paths: { "pt-br": "/pt-br/materiais", en: "/en/materials", ru: "/ru/materialy" },
    enMirror: true,
  },
  contact: {
    paths: { "pt-br": "/pt-br/contato", en: "/en/contact", ru: "/ru/kontakt" },
    enMirror: true,
  },
  terms: {
    paths: { "pt-br": "/pt-br/termos", en: "/en/terms", ru: "/ru/usloviya" },
    enMirror: true,
  },
  assessment: {
    paths: { "pt-br": "/pt-br/avaliacao", en: "/pt-br/avaliacao", ru: "/pt-br/avaliacao" },
    enMirror: false,
  },
  practiceListening: {
    paths: {
      "pt-br": "/pt-br/pratica/compreensao-auditiva",
      en: "/en/practice/listening",
      ru: "/ru/praktika/listening",
    },
    enMirror: false,
  },
  practiceReading: {
    paths: {
      "pt-br": "/pt-br/pratica/compreensao-leitura",
      en: "/en/practice/reading",
      ru: "/ru/praktika/reading",
    },
    enMirror: false,
  },
  practiceWriting: {
    paths: {
      "pt-br": "/pt-br/pratica/producao-escrita",
      en: "/en/practice/writing",
      ru: "/ru/praktika/writing",
    },
    enMirror: false,
  },
  practiceFoundation: {
    paths: {
      "pt-br": "/pt-br/pratica/polimento-de-base",
      en: "/en/practice/foundation-polish",
      ru: "/ru/praktika/foundation-polish",
    },
    enMirror: false,
  },
};

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
      if (match) return { locale, section, params };
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

  if (targetLocale !== "pt-br" && !ROUTES[section].enMirror) {
    return pathFor(targetLocale, "home");
  }

  return pathFor(targetLocale, section, blogPostParams(targetLocale, params, options));
}

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
