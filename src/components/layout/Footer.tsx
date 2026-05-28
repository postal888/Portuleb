import Link from "next/link";
import { mainNav } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-teal-light/30 bg-teal text-inverse before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-inverse/30 before:to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-serif text-2xl font-bold tracking-tight">PortuLebre Hub</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-inverse/80">
              Portal em construção — preparação para o Celpe-Bras, seção por seção.
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-inverse/85">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-1 py-0.5 transition-colors hover:text-inverse hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-10 border-t border-inverse/15 pt-6 text-sm text-inverse/55">
          © {new Date().getFullYear()} PortuLebre. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
