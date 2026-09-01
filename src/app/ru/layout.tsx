import { PublicLocaleLayout } from "@/components/layout/PublicLocaleLayout";

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return <PublicLocaleLayout locale="ru">{children}</PublicLocaleLayout>;
}
