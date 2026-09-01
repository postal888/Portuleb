import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MaterialViewer } from "@/components/archive/MaterialViewer";
import type { ArchiveSession } from "@/content/archive/types";
import type { Locale } from "@/i18n/locales";
import { archiveAnchors } from "@/i18n/anchors";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

function badgeClass(variant: "default" | "neutral" | "missing") {
  if (variant === "neutral") return "archive-badge neutral";
  if (variant === "missing") return "archive-badge missing";
  return "archive-badge";
}

export function ArchiveSessionView({
  session,
  locale,
}: {
  session: ArchiveSession;
  locale: Locale;
}) {
  const ui = getUi(locale);
  const a = ui.archive;
  const anchors = archiveAnchors(locale);

  return (
    <div className="archive">
      <div className="archive-wrap">
        <Breadcrumbs
          items={[
            { label: ui.breadcrumb.home, href: localizedPath(locale, "home") },
            { label: a.pastExams, href: localizedPath(locale, "pastExams") },
            { label: session.title },
          ]}
        />

        <section className="archive-hero">
          <div className="archive-eyebrow">{session.eyebrow}</div>
          <div className="archive-hero-grid">
            <article className="archive-hero-card">
              <div className="archive-kicker">{a.sessionKicker}</div>
              <h1>{session.title}</h1>
              <p className="archive-lead">{session.lead}</p>
              <div className="archive-cta-row">
                <a className="archive-btn archive-btn-primary" href={`#${anchors.materials}`}>
                  {a.viewMaterials}
                </a>
                <a className="archive-btn archive-btn-secondary" href={`#${anchors.written}`}>
                  {a.viewStructure}
                </a>
                {session.blogAnalysis ? (
                  <Link
                    className="archive-btn archive-btn-secondary"
                    href={session.blogAnalysis.href}
                  >
                    {session.blogAnalysis.label}
                  </Link>
                ) : null}
                {session.guideLink ? (
                  <Link
                    className="archive-btn archive-btn-secondary"
                    href={session.guideLink.href}
                  >
                    {session.guideLink.label}
                  </Link>
                ) : null}
              </div>
            </article>
            <aside className="archive-meta-card">
              <div>
                <div className="archive-meta-label">{a.application}</div>
                <div className="archive-meta-value">{session.application}</div>
              </div>
              <div>
                <div className="archive-meta-label">{a.result}</div>
                <div className="archive-meta-value">{session.resultDate}</div>
              </div>
              <div className="archive-stats">
                <div className="archive-stat">
                  <strong>{session.stats.available}</strong>
                  <span>{a.materialsInArchive}</span>
                </div>
                <div className="archive-stat">
                  <strong>{session.stats.missing}</strong>
                  <span>{session.stats.missingLabel}</span>
                </div>
              </div>
              {session.asideNote ? (
                <p className="archive-footer-note">{session.asideNote}</p>
              ) : null}
            </aside>
          </div>
        </section>

        <section className="archive-section" id={anchors.materials}>
          <div className="archive-section-card">
            <div className="archive-section-head">
              <div>
                <div className="archive-kicker">{a.overview}</div>
                <h2 className="archive-section-title">{a.sessionMaterials}</h2>
              </div>
              <p className="archive-section-copy">{a.sessionMaterialsCopy}</p>
            </div>
            <div className="archive-materials-grid">
              {session.materials.map((m) => (
                <article
                  key={m.id}
                  className={`archive-material-card${m.dimmed ? " dimmed" : ""}`}
                >
                  <div className="archive-material-top">
                    {m.badge ? (
                      <span className={badgeClass(m.badgeVariant ?? "neutral")}>{m.badge}</span>
                    ) : (
                      <span />
                    )}
                    <div className="archive-icon">{m.icon}</div>
                  </div>
                  <div>
                    <h3>{m.title}</h3>
                    <p className="archive-muted">{m.description}</p>
                  </div>
                  <div className="archive-meta-line">
                    <span>{m.category}</span>
                    <a href={m.href}>{m.action}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="archive-section" id={anchors.viewOnSite}>
          <div className="archive-section-card">
            <div className="archive-section-head">
              <div>
                <div className="archive-kicker">{a.viewOnSite}</div>
                <h2 className="archive-section-title">{a.embeddedMedia}</h2>
              </div>
              <p className="archive-section-copy">{a.embeddedMediaCopy}</p>
            </div>
            <div className="archive-viewers">
              {session.materials
                .filter((m) => m.materialId !== "caderno" && !m.dimmed)
                .map((m) => (
                  <MaterialViewer
                    key={m.materialId}
                    sessionSlug={session.slug}
                    materialId={m.materialId}
                    kind={m.kind}
                    title={m.title}
                    openInNewTabLabel={a.openInNewTab}
                  />
                ))}
            </div>
          </div>
        </section>

        <section className="archive-section" id={anchors.written}>
          <div className="archive-section-card">
            <div className="archive-section-head">
              <div>
                <div className="archive-kicker">{a.writtenPart}</div>
                <h2 className="archive-section-title">{a.cadernoAndTasks}</h2>
              </div>
              <p className="archive-section-copy">{a.writtenIntro}</p>
            </div>

            <MaterialViewer
              locale={locale}
              sessionSlug={session.slug}
              materialId="caderno"
              kind="pdf"
              title={a.fullCaderno}
              openInNewTabLabel={a.openInNewTab}
            />

            <h3 className="archive-subsection-title">{a.taskStructure}</h3>
            {locale !== "pt-br" ? (
              <p className="archive-muted text-sm mb-3">{a.originalTaskNote}</p>
            ) : null}
            <div className="archive-task-list">
              {session.tasks.map((t) => (
                <article key={t.number} className="archive-task-card">
                  <div className="archive-task-no">{t.number}</div>
                  <div>
                    <h3>{t.title}</h3>
                    <p className="archive-muted">{t.description}</p>
                  </div>
                  <div className="archive-task-aside">
                    <span>{t.input}</span>
                    {t.materialHref ? (
                      <a href={t.materialHref} className="archive-task-link">
                        {t.materialAction}
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="archive-section" id={anchors.oral}>
          <div className="archive-section-card">
            <div className="archive-section-head">
              <div>
                <div className="archive-kicker">{a.oralPart}</div>
                <h2 className="archive-section-title">{a.oralTitle}</h2>
              </div>
              <p className="archive-section-copy">{a.oralIntro}</p>
            </div>
            <div className="archive-oral-grid">
              <article className="archive-oral-card">
                <div className="archive-kicker">
                  {locale === "en" ? "Scripts" : locale === "ru" ? "Roteiros" : "Roteiros"}
                </div>
                <h3>{a.roteirosGuide}</h3>
                <p className="archive-muted">{a.roteirosCopy}</p>
                <div className="archive-topics">
                  {session.oralTopics.roteiros.map((t) => (
                    <span key={t} className="archive-topic">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
              <article className="archive-oral-card">
                <div className="archive-kicker">
                  {locale === "en" ? "Themes" : locale === "ru" ? "Temas" : "Temas"}
                </div>
                <h3>{a.topicsTitle}</h3>
                <p className="archive-muted">{a.topicsCopy}</p>
                <div className="archive-topics">
                  {session.oralTopics.temas.map((t) => (
                    <span key={t} className="archive-topic">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="archive-section">
          <div className="archive-section-card">
            <div className="archive-section-head">
              <div>
                <div className="archive-kicker">{a.faqKicker}</div>
                <h2 className="archive-section-title">{a.faqTitle}</h2>
              </div>
              <p className="archive-section-copy">{a.faqIntro}</p>
            </div>
            <div className="archive-faq-grid">
              {session.faq.map((item) => (
                <article key={item.question} className="archive-faq-card">
                  <h3>{item.question}</h3>
                  <p className="archive-muted">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
