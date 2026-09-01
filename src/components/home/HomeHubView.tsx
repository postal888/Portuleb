import Link from "next/link";
import { HubPathStrip } from "@/components/decor/HubPathStrip";
import { SectionHeading } from "@/components/decor/SectionHeading";
import { HomeHeroVisual } from "@/components/home/HomeHeroVisual";
import {
  featuredOutlineIcons,
  IconArrowRight,
  sectionOutlineIcons,
} from "@/components/home/HomeIcons";
import { getHomeContent } from "@/content/home";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";
import type { SectionKey } from "@/i18n/route-map";

export function HomeHubView({ locale }: { locale: Locale }) {
  const content = getHomeContent(locale);
  const nav = getUi(locale).nav.filter(
    (item) => !content.excludeSections.includes(item.section),
  );

  return (
    <div className="home-page pb-6">
      <section className="home-hero home-rise">
        <div className="home-hero-copy">
          <span className="eyebrow">{content.heroEyebrow}</span>
          <h1 className="page-title page-title-display mt-5 max-w-[16ch]">{content.heroTitle}</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{content.heroLead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={localizedPath(locale, "practice")} className="btn-primary">
              {content.ctaPrimary}
            </Link>
            <Link href={localizedPath(locale, "celpeBras")} className="btn-secondary">
              {content.ctaSecondary}
            </Link>
          </div>
        </div>
        <HomeHeroVisual
          progressLabel={content.heroVisual.progressLabel}
          progressLevel={content.heroVisual.progressLevel}
          journeyLabel={content.heroVisual.journeyLabel}
          journeyHint={content.heroVisual.journeyHint}
        />
      </section>

      <div className="home-panel surface-card home-rise home-rise-delay-1">
        {locale === "pt-br" ? (
          <div className="home-panel-block">
            <HubPathStrip />
          </div>
        ) : null}

        <section className={`home-panel-block ${locale === "pt-br" ? "home-panel-block-border" : ""}`}>
          <SectionHeading title={content.featuredTitle} subtitle={content.featuredSubtitle} />
          <ul className="home-stagger grid gap-4 sm:grid-cols-3">
            {content.featured.map((item) => {
              const href = localizedPath(
                locale,
                item.section,
                item.slug ? { slug: item.slug } : {},
              );
              const Icon =
                featuredOutlineIcons[item.section as keyof typeof featuredOutlineIcons] ??
                sectionOutlineIcons.materials;
              return (
                <li key={href}>
                  <Link href={href} className="hub-card hub-card-accent home-feature-card group">
                    <span className={`featured-icon ${item.iconClass}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-lg font-semibold text-teal">{item.label}</span>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{item.desc}</p>
                    {item.highlights?.length ? (
                      <ul className="home-feature-points">
                        {item.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    ) : null}
                    <span className="home-feature-cta">
                      {content.featuredOpen}
                      <IconArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="home-panel-block home-panel-block-border">
          <SectionHeading title={content.allSectionsTitle} />
          <ul className="home-stagger mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {nav.map((item) => {
              const href = localizedPath(locale, item.section);
              const Icon =
                sectionOutlineIcons[item.section as keyof typeof sectionOutlineIcons] ??
                sectionOutlineIcons.materials;
              return (
                <li key={href}>
                  <Link href={href} className="hub-card home-section-card group">
                    <span className="home-section-icon" aria-hidden>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-semibold text-teal">{item.label}</span>
                      {content.sectionHints?.[item.section as SectionKey] ? (
                        <span className="mt-0.5 block text-xs text-muted">
                          {content.sectionHints[item.section as SectionKey]}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
