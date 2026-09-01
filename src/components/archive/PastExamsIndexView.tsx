import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { archiveSlugs, getArchiveSession } from "@/content/archive";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

export function PastExamsIndexView({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const a = ui.archive;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: ui.breadcrumb.home, href: localizedPath(locale, "home") },
          { label: a.pastExams },
        ]}
      />
      <h1 className="font-serif text-4xl font-bold text-teal">{a.indexH1}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{a.indexLead}</p>

      <h2 className="mt-10 font-serif text-xl font-bold text-teal">{a.indexTitle}</h2>

      <ul className="archive-session-list">
        {archiveSlugs.map((slug) => {
          const session = getArchiveSession(slug, locale)!;
          return (
            <li key={slug}>
              <Link
                href={localizedPath(locale, "pastExamSession", { slug })}
                className="archive-session-card"
              >
                <div className="archive-session-kicker">{a.sessionLabel}</div>
                <h3 className="archive-session-title">{session.title}</h3>
                <p className="archive-session-summary">{session.lead}</p>
                <p className="archive-session-foot">
                  {session.application} · {session.stats.available} {a.materialsCount} →
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
