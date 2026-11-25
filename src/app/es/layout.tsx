import { PublicLocaleLayout } from "@/components/layout/PublicLocaleLayout";

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return <PublicLocaleLayout locale="es">{children}</PublicLocaleLayout>;
}
