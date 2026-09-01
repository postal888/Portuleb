import type { ArchiveSession } from "@/content/archive/types";
import type { Locale } from "@/i18n/locales";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/i18n/metadata";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

/** Approximate session date from slug (2026-1 → May, 2026-2 → Nov). */
export function archiveSessionDateFromSlug(slug: string): string {
  const [yearStr, termStr] = slug.split("-");
  const year = Number(yearStr);
  const term = Number(termStr);
  if (!Number.isFinite(year) || !Number.isFinite(term)) {
    return new Date().toISOString().slice(0, 10);
  }
  const month = term === 2 ? "11" : "05";
  return `${year}-${month}-01`;
}

export function buildArchiveSessionJsonLd(
  locale: Locale,
  slug: string,
  session: ArchiveSession,
) {
  const ui = getUi(locale);
  const path = localizedPath(locale, "pastExamSession", { slug });
  const date = archiveSessionDateFromSlug(slug);

  const breadcrumb = breadcrumbJsonLd(locale, [
    { name: ui.breadcrumb.home, path: localizedPath(locale, "home") },
    { name: ui.archive.pastExams, path: localizedPath(locale, "pastExams") },
    { name: session.title },
  ]);

  const article = articleJsonLd(locale, {
    path,
    headline: session.title,
    description: session.lead,
    datePublished: date,
    dateModified: date,
    section: ui.archive.pastExams,
    keywords: ["Celpe-Bras", session.title, "provas anteriores"],
  });

  const faq = session.faq.length > 0 ? faqJsonLd(session.faq) : null;
  return faq ? [article, breadcrumb, faq] : [article, breadcrumb];
}
