# Practice lesson modules

Structured interactive lessons live under `/pt-br/pratica/{category}/{slug}`.

## Add a new lesson

1. Create `src/content/practice/{slug}.ts` exporting a `PracticeLesson` object (see `types.ts`).
2. Register it in `src/content/practice/index.ts` (`practiceLessons` array).
3. Add a route at `src/app/pt-br/pratica/{categoryPath}/{slug}/page.tsx` — copy from `estruturas-portugues-negocios/page.tsx` and import your lesson.
4. Link the lesson from `src/content/pratica/hub.ts` (`practiceLessons` list) so it appears on the Prática hub.
5. Sitemap entries are generated automatically from the registry in `index.ts`.

Reuse the renderer in `src/components/practice/lesson/`; only the content file should change for most new lessons.
