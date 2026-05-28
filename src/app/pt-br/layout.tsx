import { PageDecor } from "@/components/decor/PageDecor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageDecor />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="site-main-inner flex-1">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}
