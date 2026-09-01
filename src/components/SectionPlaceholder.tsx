import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import type { Locale } from "@/i18n/locales";
import { getUi } from "@/i18n/ui";
import { localizedPath } from "@/lib/i18n-links";

export function SectionPlaceholder({
  locale,
  title,
  description,
}: {
  locale: Locale;
  title: string;
  description?: string;
}) {
  const ui = getUi(locale);
  const defaultDesc =
    locale === "en"
      ? "This section will be built in a later step."
      : locale === "ru"
        ? "Этот раздел будет добавлен на следующем этапе."
        : "Esta seção será construída no próximo passo.";

  return (
    <>
      <Breadcrumbs
        items={[
          { label: ui.breadcrumb.home, href: localizedPath(locale, "home") },
          { label: title },
        ]}
      />
      <h1 className="font-serif text-4xl font-bold text-teal">{title}</h1>
      <p className="mt-4 max-w-2xl text-muted">{description ?? defaultDesc}</p>
    </>
  );
}
