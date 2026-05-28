import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export function SectionPlaceholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <>
      <Breadcrumbs items={[{ label: "Início", href: "/pt-br" }, { label: title }]} />
      <h1 className="font-serif text-4xl font-bold text-teal">{title}</h1>
      <p className="mt-4 max-w-2xl text-muted">
        {description ?? "Esta seção será construída no próximo passo."}
      </p>
    </>
  );
}
