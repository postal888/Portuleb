# i18n implementation report (EN `/en`)

## Routing strategy

**Parallel locale trees** (not `[locale]` with mixed segments):

- `app/pt-br/...` — unchanged URLs (`/pt-br/provas-anteriores`, etc.)
- `app/en/...` — English paths with **different segment names** (`/en/past-exams`, etc.)

Path mapping is centralized in `src/i18n/route-map.ts` (`pathFor`, `parsePathname`, `getAlternatePath`). No string replacement.

## Route map (pt-BR ↔ en)

| Section | pt-BR | en |
|--------|-------|-----|
| home | `/pt-br` | `/en` |
| celpeBras | `/pt-br/celpe-bras` | `/en/celpe-bras` |
| pastExams | `/pt-br/provas-anteriores` | `/en/past-exams` |
| pastExamSession | `/pt-br/provas-anteriores/{slug}` | `/en/past-exams/{slug}` |
| practice | `/pt-br/pratica` | `/en/practice` |
| theory | `/pt-br/teoria` | `/en/theory` |
| blog | `/pt-br/blog` | `/en/blog` |
| blogPost | `/pt-br/blog/{slug}` | `/en/blog/{slug}` (only if EN post exists) |
| materials | `/pt-br/materiais` | `/en/materials` |
| contact | `/pt-br/contato` | `/en/contact` |
| terms | `/pt-br/termos` | `/en/terms` |
| assessment | `/pt-br/avaliacao` | *(no EN mirror — noindex PT only)* |

**Reserved (no public routes in v1):** `practiceListening`, `practiceReading`, `practiceWriting`, `practiceFoundation`.

## Pages fully localized (UI + metadata)

- `/en` home
- `/en/celpe-bras` (guide + FAQ EN; official booklet instructions stay PT)
- `/en/past-exams`, `/en/past-exams/2025-1`, `/en/past-exams/2026-1`
- `/en/practice`, `/en/theory`
- `/en/materials`, `/en/contact`, `/en/terms`
- `/en/blog` (EN post list only)

## Partially localized (by design)

- **Past exam sessions:** English chrome, FAQ, material cards; **task titles/descriptions and oral theme labels remain Portuguese** (authentic study material).
- **Blog pilot** `analise-tarefa-1-festival-fartura-2026-1`: English analysis; `examArtifact` / `lexGrid` blocks keep Portuguese source text.
- **Celpe-Bras EN:** `examInstructions2026_1` rendered in Portuguese with English framing.

## Intentionally not in EN

- `/pt-br/avaliacao` (noindex, no EN route)
- `/admin`, `/api/*`
- Blog posts without `EN_BLOG_SLUGS` entry (no thin `/en/blog/...` pages)
- Future practice sub-routes

## English blog pilot

- Slug: `analise-tarefa-1-festival-fartura-2026-1`
- File: `src/content/blog/posts/analise-tarefa-1-festival-fartura-2026-1.en.ts`
- Registry: `src/lib/blog/locale.ts` (`EN_BLOG_SLUGS`)

## SEO

- `buildPageMetadata()` in `src/i18n/metadata.ts`: canonical per locale, `alternates.languages` for real pairs only
- **No `x-default` in v1**
- Sitemap: both locales for static + archive sessions; EN blog URLs only for slugs in `EN_BLOG_SLUGS`

## Key files added

- `src/i18n/locales.ts`, `route-map.ts`, `metadata.ts`, `ui/pt-br.ts`, `ui/en.ts`
- `src/lib/i18n-links.ts`, `src/lib/blog/locale.ts`
- `src/content/archive/en/2025-1.ts`, `2026-1.ts`, `index.ts`
- `src/content/blog/posts/analise-tarefa-1-festival-fartura-2026-1.en.ts`
- `src/content/home/index.ts`, `src/content/pratica/hub-en.ts`, `src/content/teoria/hub-en.ts`
- `src/components/layout/LocaleSwitcher.tsx`, `PublicLocaleLayout.tsx`, `LocaleHtmlLang.tsx`
- `src/app/en/**` (all public EN routes)

## Key files changed

- Layout: `Header`, `Footer`, `SiteLogo`, `ArchiveSessionView`, `BlogArticleView`, `BlogIndexView`, `PracticeHubView`, `TheoryHubView`, `ArticleBlocks`, `SectionPlaceholder`
- PT pages: metadata via `buildPageMetadata`; shared views with `locale="pt-br"`
- `src/app/sitemap.ts`, `src/lib/blog/loader.ts`, `src/content/blog/types.ts`
- `src/lib/nav.ts` (delegates to `getUi` + `localizedPath`)

## Follow-up TODOs

1. Roll out EN blog articles one-by-one (add slug to `EN_BLOG_SLUGS` + `.en.ts` post file).
2. Expand EN `celpe-bras` page to full parity with PT guide (sections still on PT page).
3. When practice sub-routes go live, add to `route-map` and create **both** PT and EN folders together.
4. Optional: move shared CSS from `app/pt-br/...` to `src/styles/`.
5. Deploy and verify hreflang in Search Console after indexing.
