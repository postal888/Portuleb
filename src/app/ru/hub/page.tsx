import type { Metadata } from "next";
import { HomeHubView } from "@/components/home/HomeHubView";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Hub",
};

export default function HubArchivePage() {
  return <HomeHubView locale="ru" />;
}
