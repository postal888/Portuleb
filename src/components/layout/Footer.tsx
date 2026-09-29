import Link from "next/link";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { siteBrand } from "@/lib/brand";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

export function Footer({ locale }: { locale: Locale }) {
  const ui = getUi(locale);

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <SiteLogo variant="footer" locale={locale} />
        <ul className="site-footer-nav">
          {ui.nav.map((item) => (
            <li key={item.section}>
              <Link href={localizedPath(locale, item.section)}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <p className="site-footer-copy">
          © {new Date().getFullYear()} {siteBrand.name}
        </p>
      </div>
    </footer>
  );
}
