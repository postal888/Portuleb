import Link from "next/link";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { siteBrand } from "@/lib/brand";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

export function Footer({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  const nav = ui.nav;

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[var(--site-primary-hover)] bg-[var(--site-ink)] text-inverse">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <SiteLogo variant="footer" locale={locale} />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-inverse/80">
              {siteBrand.tagline} — {ui.footer.taglineSuffix}
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-inverse/85">
            {nav.map((item) => (
              <li key={item.section}>
                <Link
                  href={localizedPath(locale, item.section)}
                  className="rounded-full px-1 py-0.5 transition-colors hover:text-inverse hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 border-t border-inverse/15 pt-6 text-sm text-inverse/55">
          © {new Date().getFullYear()} {siteBrand.name}. {ui.footer.rights}
        </p>
      </div>
    </footer>
  );
}
