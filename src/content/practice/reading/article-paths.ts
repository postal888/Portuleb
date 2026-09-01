/** pt-BR reading article URL under /pt-br/pratica/{categoryPath}/{slug} */
export function readingArticlePath(categoryPath: string, slug: string): string {
  return `/pt-br/pratica/${categoryPath}/${slug}`;
}
