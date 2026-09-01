import { PublicLocaleLayout } from "@/components/layout/PublicLocaleLayout";

export default function PtBrLayout({ children }: { children: React.ReactNode }) {
  return <PublicLocaleLayout locale="pt-br">{children}</PublicLocaleLayout>;
}
