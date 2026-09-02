# i18n implementation report (pt-BR / en / ru)

## Routing strategy

**Parallel locale trees** (not `[locale]` with mixed segments):

- `app/pt-br/...` — canonical content, richest tree
- `app/en/...` — English paths with **different segment names** (`/en/past-exams`)
- `app/ru/...` — Russian paths, transliterated segments (`/ru/proshlye-ekzameny`)

Locales are declared in `src/i18n/locales.ts` (`LOCALES = ["pt-br", "en", "ru"]`,
default `pt-br`). Path mapping is centralized in `src/i18n/route-map.ts`
(`pathFor`, `parsePathname`, `getAlternatePath`, `alternatesForSection`).
Never string-replace a locale prefix; go through `localizedPath()`.

## Route map

| Section | pt-BR | en | ru |
|---|---|---|---|
| home | `/pt-br` | `/en` | `/ru` |
| celpeBras | `/pt-br/celpe-bras` | `/en/celpe-bras` | `/ru/celpe-bras` |
| pastExams | `/pt-br/provas-anteriores` | `/en/past-exams` | `/ru/proshlye-ekzameny` |
| pastExamSession | `…/{slug}` | `…/{slug}` | `…/{slug}` |
| practice | `/pt-br/pratica` | `/en/practice` | `/ru/praktika` |
| theory | `/pt-br/teoria` | `/en/theory` | `/ru/teoriya` |
| reader | `/pt-br/leitor` | `/en/reader` | `/ru/chitalka` |
| blog | `/pt-br/blog` | `/en/blog` | `/ru/blog` |
| blogPost | `/pt-br/blog/{slug}` | `/en/blog/{slug}` * | `/ru/blog/{slug}` * |
| materials | `/pt-br/materiais` | `/en/materials` | `/ru/materialy` |
| contact | `/pt-br/contato` | `/en/contact` | `/ru/kontakt` |
| terms | `/pt-br/termos` | `/en/terms` | `/ru/usloviya` |

\* only for slugs registered in `EN_BLOG_SLUGS` / `RU_BLOG_SLUGS`
(`src/lib/blog/locale.ts`). No thin placeholder translations.

## Sections without a locale mirror

These have `enMirror: false`. **Their `en` and `ru` entries deliberately hold the
pt-BR URL**, because `pathFor()` does not consult `enMirror` — a locale-specific
path here would render links and tiles pointing at a 404.

| Section | Single URL |
|---|---|
| theoryTopic | `/pt-br/teoria/{slug}` |
| examCycle | `/pt-br/celpe-bras/{cycle}` |
| assessment | `/pt-br/avaliacao` |
| practiceListening | `/pt-br/pratica/compreensao-auditiva` |
| practiceReading | `/pt-br/pratica/compreensao-leitura` |
| practiceWriting | `/pt-br/pratica/producao-escrita` |
| practiceFoundation | `/pt-br/pratica/polimento-de-base` |

`getAlternatePath()` sends the locale switcher to the locale home for these
sections, so a reader on `/en/practice` is not silently dropped onto a
Portuguese lesson by the switcher — but in-page tiles do link to the pt-BR
lesson, which is the only version that exists.

## Localized pages

Fully localized (UI + metadata) in all three locales: home, `celpe-bras`,
`past-exams` index and sessions, `practice`, `theory`, `reader`, `blog` index,
`materials`, `contact`, `terms`.

Partially localized by design:

- **Past exam sessions** — localized chrome, FAQ and material cards; task
  titles, oral theme labels and official booklet instructions stay Portuguese
  as authentic study material.
- **Blog translations** — analysis is translated; `examArtifact` and `lexGrid`
  blocks keep the Portuguese source text.

Not localized at all: `/admin`, `/api/*`, theory topics, exam cycles,
assessment, practice lesson pages.

## Thin placeholder pages

`materials`, `contact` and `terms` render `SectionPlaceholder` — an `h1` plus
one "this section will be built later" sentence — in **all three locales**.
All nine URLs exist and return 200 (`/en/materials` included; it was never a
404), but they are **excluded from `staticSections` in `src/app/sitemap.ts`**
so nine thin pages are not advertised for indexing. They remain reachable
through the nav. Add them back to `staticSections` once they carry content.

## SEO

- `buildPageMetadata()` in `src/i18n/metadata.ts` — canonical per locale plus
  `alternates.languages`.
- **`x-default` is emitted** and always points at the pt-BR path
  (`alternatesForSection` in `route-map.ts`). Earlier revisions of this document
  claimed there was no `x-default`; that is no longer true.
- Alternates are emitted only for real pairs: sections without a mirror expose
  `pt-BR` + `x-default` only, and blog posts expose `en`/`ru` only when a
  translated post is registered.
- `hreflang` codes: `pt-BR`, `en`, `ru` (`hreflangCode()`); `og:locale` uses
  `pt_BR` / `en_US` / `ru_RU`.
- Sitemap covers all three locales for static sections and archive sessions;
  theory topics, exam cycles, practice lessons and reading articles are pt-BR
  only. Placeholder sections are omitted (see above).

## Key files

- `src/i18n/` — `locales.ts`, `route-map.ts`, `metadata.ts`, `anchors.ts`,
  `ui/{pt-br,en,ru}.ts`
- `src/lib/i18n-links.ts`, `src/lib/blog/locale.ts`, `src/lib/blog/locale-meta.ts`
- `src/content/archive/{en,ru}/*`, `localize-en.ts`, `localize-ru.ts`
- `src/content/{pratica,teoria}/hub-{en,ru}.ts`, `src/content/celpe-bras/guide-{en,ru}.ts`
- `src/components/layout/LocaleSwitcher.tsx`, `PublicLocaleLayout.tsx`, `LocaleHtmlLang.tsx`
- `src/proxy.ts` — sets `x-site-locale` (migrated from `middleware.ts` for Next 16)

## Anchors across locales

Section ids are locale-specific and come from `src/i18n/anchors.ts`
(`practiceAnchors`, `theoryAnchors`, `archiveAnchors`, `materialDomId`). Never
hardcode an id in a view: `PracticeHubView` used a literal `id="habilidades"`,
which silently broke `/en/practice#skills` and `/ru/praktika#navyki`.

## Follow-up TODOs

1. Do **not** create thin EN/RU copies of PT articles. A translation ships only
   with the full text; until then the slug stays out of `EN_BLOG_SLUGS` /
   `RU_BLOG_SLUGS`.
2. Give the nine placeholder pages real content, then return the sections to
   `staticSections`. `contact` and `terms` matter most: they are trust pages.
3. Expand the EN and RU `celpe-bras` pages toward parity with the PT guide.
4. If practice lesson pages are ever localized, create the locale folder and
   flip `enMirror` in the same change — not one without the other.
5. Verify hreflang and `x-default` in Search Console after the next deploy.
