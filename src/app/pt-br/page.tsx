import Link from "next/link";
import { mainNav } from "@/lib/nav";

export default function HomePage() {
  return (
    <section>
      <h1 className="font-serif text-4xl font-bold text-teal">PortuLebre Hub</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        Portal em construção passo a passo. Escolha uma seção no menu ou abaixo.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mainNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-xl border border-tan/40 bg-cream-dark/30 p-5 transition-colors hover:border-teal/40 hover:bg-teal/5"
            >
              <span className="font-serif text-lg font-semibold text-teal">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
