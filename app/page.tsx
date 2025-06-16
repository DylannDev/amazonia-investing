import { HeroSection } from "@/components/landing/hero-section";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { WhySection } from "@/components/landing/why-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { FounderSection } from "@/components/landing/founder-section";
import { SimulatorSection } from "@/components/landing/simulator-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { DecorativeElements } from "./components/landing/decorative-elements";
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
      <HeroSection />
      <HighlightsSection />
      <BenefitsSection />
      <SimulatorSection />
      <HowItWorksSection />
      {/* <WhySection /> */}
      <FounderSection />
      <FaqSection />
      <TestimonialsSection />
      <BlogSection />
      <CtaSection />

      <DecorativeElements />
    </main>
  );
}
