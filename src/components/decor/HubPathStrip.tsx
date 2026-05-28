import Link from "next/link";

const steps = [
  { href: "/pt-br/teoria", label: "Teoria", desc: "revisar base" },
  { href: "/pt-br/pratica", label: "Prática", desc: "aplicar no formato" },
  { href: "/pt-br/provas-anteriores", label: "Provas", desc: "materiais reais" },
] as const;

export function HubPathStrip() {
  return (
    <div className="hub-path-strip surface-card-muted p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--site-faint)]">
        Jornada sugerida
      </p>
      <ol className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0">
        {steps.map((step, i) => (
          <li key={step.href} className="flex flex-1 items-center gap-2 sm:gap-0">
            <Link href={step.href} className="hub-path-step group">
              <span className="hub-path-num">{i + 1}</span>
              <span>
                <span className="block font-semibold text-teal group-hover:underline">
                  {step.label}
                </span>
                <span className="block text-xs text-muted">{step.desc}</span>
              </span>
            </Link>
            {i < steps.length - 1 ? (
              <span className="hub-path-arrow hidden text-[var(--site-faint)] sm:mx-2 sm:inline" aria-hidden>
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
