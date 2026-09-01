import Link from "next/link";
import { CelpeExamBanner } from "@/components/celpe-bras/CelpeExamBanner";
import { CelpeInstructionList } from "@/components/celpe-bras/CelpeInstructionList";
import { CelpeTaskStrip } from "@/components/celpe-bras/CelpeTaskStrip";
import { SectionHeading } from "@/components/decor/SectionHeading";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ScoreBandsTable } from "@/components/ui/ScoreBandsTable";
import { getCelpeBrasGuide } from "@/content/celpe-bras/guide";
import type { GuideAnchorKey } from "@/content/celpe-bras/guide-types";
import { examInstructions2026_1 } from "@/content/celpe-bras/exam-instructions";
import type { Locale } from "@/i18n/locales";
import { materialHash } from "@/i18n/anchors";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

function hash(anchors: Record<GuideAnchorKey, string>, key: GuideAnchorKey) {
  return `#${anchors[key]}`;
}

export function CelpeBrasGuideView({ locale }: { locale: Locale }) {
  const guide = getCelpeBrasGuide(locale);
  const ui = getUi(locale);
  const { anchors } = guide;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const bookletArchiveHref = `${localizedPath(locale, "pastExamSession", { slug: guide.booklet.pastExamSlug })}${materialHash(locale, guide.booklet.materialId)}`;

  return (
    <div className="celpe-guide">
      <JsonLd data={faqSchema} />
      <Breadcrumbs
        items={[
          { label: ui.breadcrumb.home, href: localizedPath(locale, "home") },
          { label: "Celpe-Bras" },
        ]}
      />

      <CelpeExamBanner locale={locale} />

      <div className="surface-card surface-card-lift celpe-hero-inner relative overflow-hidden p-6 sm:p-8">
        <span className="eyebrow">{guide.hero.eyebrow}</span>
        <h1 className="page-title relative mt-3 text-charcoal">{guide.hero.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{guide.hero.lead}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={hash(anchors, "booklet")} className="btn-primary">
            {guide.hero.ctaBooklet}
          </a>
          <Link href={localizedPath(locale, "pastExams")} className="btn-secondary">
            {guide.hero.ctaPastExams}
          </Link>
        </div>
      </div>

      <section id={anchors.booklet} className="surface-card mt-10 scroll-mt-24 p-6 sm:p-8">
        <SectionHeading title={guide.booklet.title} subtitle={guide.booklet.subtitle} />
        <CelpeTaskStrip label={guide.taskStripLabel} />
        <div className="mt-6">
          <CelpeInstructionList items={examInstructions2026_1} />
        </div>
        <Link href={bookletArchiveHref} className="celpe-caderno-link">
          {guide.booklet.linkLabel}
        </Link>
      </section>

      <section className="surface-card mt-10 p-6 sm:p-8">
        <SectionHeading title={guide.quickFactsTitle} />
        <ul className="mt-4 space-y-2 text-charcoal/85">
          {guide.quickFacts.map((fact) => (
            <li key={fact} className="flex gap-2">
              <span
                className="quick-fact-dot mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                aria-hidden
              />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface-card mt-10 p-6 sm:p-8">
        <SectionHeading title={guide.indexTitle} />
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {guide.indexLinks.map((item) => (
            <li key={item.anchor}>
              <a
                href={hash(anchors, item.anchor)}
                className="block rounded-lg px-3 py-2 text-[var(--celpe-blue)] transition-colors hover:bg-[var(--celpe-green-pale)] hover:text-[var(--celpe-green)]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section
        id={anchors.whatIs}
        className="surface-card mt-10 scroll-mt-24 space-y-4 p-6 sm:p-8"
      >
        <SectionHeading title={guide.whatIs.title} />
        {guide.whatIs.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="max-w-4xl leading-relaxed text-charcoal/90">
            {p}
          </p>
        ))}
      </section>

      <section
        id={anchors.howWorks}
        className="surface-card mt-10 scroll-mt-24 space-y-4 p-6 sm:p-8"
      >
        <SectionHeading title={guide.howWorks.title} />
        {guide.howWorks.paragraphs.map((p, i) => (
          <p key={i} className="max-w-4xl leading-relaxed text-charcoal/90">
            {locale === "pt-br" && i === 0 ? (
              <>
                O exame é dividido em duas partes: uma parte escrita e uma parte oral. A parte
                escrita tem cerca de <strong>3 horas</strong>, e a parte oral tem cerca de 20
                minutos.
              </>
            ) : (
              p
            )}
          </p>
        ))}
      </section>

      <section
        id={anchors.parts}
        className="surface-card mt-10 scroll-mt-24 space-y-4 p-6 sm:p-8"
      >
        <SectionHeading title={guide.parts.title} />
        <div className="grid gap-4 md:grid-cols-2">
          {guide.parts.cards.map((card) => (
            <article
              key={card.title}
              className={`surface-card-muted ${card.variant === "green" ? "celpe-parte-card" : "celpe-parte-card-alt"} p-5`}
            >
              <h3
                className={`font-semibold ${card.variant === "green" ? "text-[var(--celpe-green)]" : "text-[var(--celpe-blue)]"}`}
              >
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/85">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id={anchors.criteria}
        className="surface-card mt-10 scroll-mt-24 space-y-4 p-6 sm:p-8"
      >
        <SectionHeading title={guide.criteria.title} />
        {guide.criteria.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="max-w-4xl leading-relaxed text-charcoal/90">
            {p}
          </p>
        ))}
      </section>

      <section
        id={anchors.levels}
        className="surface-card mt-10 scroll-mt-24 space-y-4 p-6 sm:p-8"
      >
        <SectionHeading title={guide.levels.title} />
        {guide.levels.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="max-w-4xl leading-relaxed text-charcoal/90">
            {p}
          </p>
        ))}
        <ScoreBandsTable locale={locale} />
        <p className="surface-card-muted mt-5 max-w-4xl px-4 py-3 text-sm leading-relaxed text-charcoal/90">
          <span className="font-semibold text-[var(--celpe-green)]">
            {guide.levels.validityLabel}
          </span>{" "}
          {guide.levels.validityText}
        </p>
      </section>

      <section
        id={anchors.registration}
        className="surface-card mt-10 scroll-mt-24 space-y-4 p-6 sm:p-8"
      >
        <SectionHeading title={guide.registration.title} />
        {guide.registration.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="max-w-4xl leading-relaxed text-charcoal/90">
            {p}
          </p>
        ))}
      </section>

      <section className="surface-card mt-10 p-6 sm:p-8">
        <SectionHeading title={guide.nextSteps.title} />
        <ul className="mt-4 space-y-2 text-charcoal/90">
          {guide.nextSteps.items.map((item) => (
            <li key={item.label}>
              {item.type === "anchor" ? (
                <a
                  href={hash(anchors, item.anchor)}
                  className="text-[var(--celpe-blue)] hover:underline"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={localizedPath(
                    locale,
                    item.section,
                    item.slug ? { slug: item.slug } : {},
                  )}
                  className="text-[var(--celpe-blue)] hover:underline"
                >
                  {item.label}
                </Link>
              )}{" "}
              {item.suffix}
            </li>
          ))}
        </ul>
      </section>

      <section id={anchors.faq} className="surface-card mt-10 scroll-mt-24 p-6 sm:p-8">
        <SectionHeading title={guide.faqTitle} />
        <div className="mt-4">
          <FAQAccordion items={guide.faq} />
        </div>
      </section>
    </div>
  );
}
