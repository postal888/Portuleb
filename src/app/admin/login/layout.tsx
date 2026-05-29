import { Suspense } from "react";

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<p className="text-muted">Carregando…</p>}>{children}</Suspense>;
}
