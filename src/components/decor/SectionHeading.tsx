export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-heading-line" aria-hidden />
      <div>
        <h2 className="section-title m-0">{title}</h2>
        {subtitle ? <p className="mt-1 max-w-xl text-sm text-muted">{subtitle}</p> : null}
      </div>
    </div>
  );
}
