import { HeroSection } from "@/components/landing/hero-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { FounderSection } from "@/components/landing/founder-section";
import { SimulatorSection } from "@/components/landing/simulator-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { TrustSection } from "@/components/landing/trust-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { HighlightsSection } from "@/components/landing/highlights-section";
import BlogSection from "@/components/landing/blog-section";

export const metadata = {
  title: "Amazonia Investing - Investissement Unique, Revenus Mensuels à Vie",
  description:
    "Investissez une seule fois à partir de 150€ et percevez jusqu'à 17,5% de rendement mensuel à vie. Gestion 100% déléguée par un trader professionnel.",
};

export default function Home() {
  return (
    <main>
      <div className="m-0 p-0 overflow-hidden">
        <HeroSection />
        <BenefitsSection />
        <SimulatorSection />
        <HowItWorksSection />
        <TrustSection />
        <TestimonialsSection />
        <FounderSection />
      </div>
      <FaqSection />
      <HighlightsSection />
      <BlogSection />
      <CtaSection />
    </main>
  );
}
