import type { Metadata } from "next";
import { Outfit, Urbanist } from "next/font/google";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { WhatsappStickyButton } from "@/components/ui/whatsapp-sticky-button";
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
      "Amazonia Investing - Investissement unique, Revenu passif mensuel à vie",
  },
  description:
    "Investissement dès 150€. Recevez un revenu passif mensuel jusqu’à 17,5%. Placement rentable, rendement élevé, gestion 100% déléguée.",
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
      <body className={`${outfit.variable} font-outfit antialiased`}>
        <Navbar />
        <div className="min-h-screen pt-16">{children}</div>
        <Footer />
        <WhatsappStickyButton />
      </body>
    </html>
  );
}
