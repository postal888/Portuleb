import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Celpe-Dê Pé",
  description: "Preparação para o Celpe-Bras — um passo de cada vez",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={sourceSans.variable}>
      <body className="min-h-screen flex flex-col font-sans">{children}</body>
    </html>
  );
}
