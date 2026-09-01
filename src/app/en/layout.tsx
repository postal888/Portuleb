import { PublicLocaleLayout } from "@/components/layout/PublicLocaleLayout";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <PublicLocaleLayout locale="en">{children}</PublicLocaleLayout>;
}
