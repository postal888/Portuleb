/** Normalize user input for lightweight fragment checks (accents, case, spacing). */
export function normalizeLessonText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

export function includesAllFragments(text: string, fragments: string[]): boolean {
  const norm = normalizeLessonText(text);
  return fragments.every((f) => norm.includes(normalizeLessonText(f)));
}
