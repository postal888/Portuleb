import Link from "next/link";
import { mainNav } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-tan/30 bg-teal text-inverse">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="font-serif text-2xl font-bold">PortuLebre Hub</p>
        <p className="mt-2 max-w-xl text-sm text-inverse/80">
          Portal em construção — seção por seção, do zero.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-inverse/80">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-inverse">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-inverse/60">
          © {new Date().getFullYear()} PortuLebre. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
