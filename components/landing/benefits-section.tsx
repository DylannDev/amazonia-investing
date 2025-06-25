import { SectionHeader } from "../ui/section-header";
import { ArrowButton } from "../ui/arrow-button";
import { Typography } from "../ui/typography";
import { CallButton } from "../ui/call-button";
import { BenefitCard } from "../ui/benefit-card";
import FadeInText, { FadeInImage, StaggeredCards } from "../ui/animations";

const benefits = [
  {
    investment: 150,
    monthlyReturn: 15,
    yearlyReturn: 180,
    threeYearReturn: 540,
    color: "blue" as const,
    image: "coin-3.svg",
    imgSize: "w-[40px] h-[40px] sm:w-[55px] sm:h-[55px]",
  },
  {
    investment: 500,
    monthlyReturn: 50,
    yearlyReturn: 600,
    threeYearReturn: 1800,
    color: "green" as const,
    image: "coin-1.svg",
    imgSize: "w-[50px] h-[50px] sm:w-[65px] sm:h-[65px]",
  },
  {
    investment: 1000,
    monthlyReturn: 100,
    yearlyReturn: 1200,
    threeYearReturn: 3600,
    color: "red" as const,
    image: "coin-2.svg",
    imgSize: "w-[60px] h-[60px] sm:w-[75px] sm:h-[75px]",
  },
];

export function BenefitsSection() {
  return (
    <section className="pt-20 pb-10 md:pt-32 md:pb-16">
      <div className="container mx-auto px-4">
        <SectionHeader
          badge="Votre Investissement"
          title="Rentabilisez votre investissement en 10 mois et percevez des revenus à vie"
          description="Dès 150€, commencez à percevoir jusqu'à 10% de rendement mensuel à vie. Voici ce que ça représente concrètement :"
        />

        <StaggeredCards
          stagger={0.2}
          delay={0.4}
          className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8"
        >
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.investment} {...benefit} index={index} />
          ))}
        </StaggeredCards>
        <FadeInImage
          direction="y"
          delay={0.6}
          className="flex flex-col md:flex-row items-center md:justify-between gap-8 p-12 rounded-3xl bg-yellow-200"
        >
          <FadeInText delay={0.8} className="text-center md:text-left">
            <Typography
              as="h3"
              variant="4xl"
              weight="semibold"
              lineHeight="tightest"
              className="mb-4 text-balance"
            >
              Vous souhaitez investir un montant plus important ?
            </Typography>
            <Typography
              as="p"
              variant="xl"
              weight="normal"
              className="mb-0 text-balance text-gray-600"
            >
              Simulez votre retour sur investissement dès maintenant
            </Typography>
          </FadeInText>
          <FadeInText delay={0.8} className="flex flex-col xl:flex-row gap-4">
            <CallButton variant="black" className="w-full" />
            <ArrowButton
              label="Simuler mes revenus"
              variant="outline"
              className="w-full"
            />
          </FadeInText>
        </FadeInImage>
      </div>
    </section>
  );
}
