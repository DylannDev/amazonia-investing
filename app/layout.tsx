import type { Metadata } from "next";
import { Outfit, Urbanist } from "next/font/google";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Amazonia Investing",
    default:
      "Amazonia Investing - Investissement Unique, Revenus Mensuels à Vie",
  },
  description:
    "Investissez une seule fois à partir de 150€ et percevez jusqu'à 17,5% de rendement mensuel à vie. Gestion 100% déléguée par un trader professionnel.",
  keywords: [
    "investissement",
    "revenus mensuels",
    "trading",
    "investissement passif",
    "rendement mensuel",
    "amazonia investing",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${outfit.variable} font-outfit antialiased overflow-x-hidden`}
      >
        <Navbar />
        <div className="min-h-screen pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
