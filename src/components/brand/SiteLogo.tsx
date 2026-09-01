import Image from "next/image";
import Link from "next/link";
import { siteBrand } from "@/lib/brand";
import type { Locale } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n-links";

type SiteLogoProps = {
  variant?: "header" | "footer" | "hero";
  linked?: boolean;
  locale?: Locale;
};

const ICON_PX = 40;

export function SiteLogo({ variant = "header", linked = true, locale = "pt-br" }: SiteLogoProps) {
  const homeHref = localizedPath(locale, "home");
  const isFooter = variant === "footer";
  const isHero = variant === "hero";

  if (isHero) {
    const hero = (
      <Image
        src={siteBrand.logoLockupSrc}
        alt={siteBrand.logoAlt}
        width={696}
        height={572}
        className="brand-hero-lockup"
        priority
        sizes="(max-width: 640px) 90vw, 360px"
      />
    );
    return linked ? (
      <Link href={homeHref} className="brand-link brand-link-hero">
        {hero}
      </Link>
    ) : (
      hero
    );
  }

  const iconPx = isFooter ? 44 : ICON_PX;

  const content = (
    <span className={`brand-lockup ${isFooter ? "brand-lockup-footer" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${siteBrand.logoIconSrc}?v=3`}
        alt=""
        width={iconPx}
        height={iconPx}
        className="brand-logo-icon"
        decoding="async"
        aria-hidden
      />
      <span className="brand-text">
        <span className="brand-name">{siteBrand.name}</span>
        <span className={`brand-tagline ${isFooter ? "brand-tagline-footer" : ""}`}>
          {siteBrand.tagline}
          {locale === "en" ? (
            <span className="brand-tagline-hint"> · one step at a time</span>
          ) : locale === "ru" ? (
            <span className="brand-tagline-hint"> · шаг за шагом</span>
          ) : null}
        </span>
      </span>
    </span>
  );

  if (!linked) return content;

  return (
    <Link href={homeHref} className="brand-link group">
      {content}
    </Link>
  );
}
