import { SectionHeader } from "../ui/section-header";
import { ArrowButton } from "../ui/arrow-button";
import { Typography } from "../ui/typography";
import { CallButton } from "../ui/call-button";
import { BenefitCard } from "../ui/benefit-card";

const benefits = [
  {
    investment: 150,
    monthlyReturn: 26.25,
    yearlyReturn: 315,
    threeYearReturn: 945,
    color: "blue" as const,
    image: "coin-3.svg",
    imgSize: "w-[40px] h-[40px] sm:w-[55px] sm:h-[55px]",
  },
  {
    investment: 500,
    monthlyReturn: 87.5,
    yearlyReturn: 1050,
    threeYearReturn: 3150,
    color: "green" as const,
    image: "coin-1.svg",
    imgSize: "w-[50px] h-[50px] sm:w-[65px] sm:h-[65px]",
  },
  {
    investment: 1000,
    monthlyReturn: 175,
    yearlyReturn: 2100,
    threeYearReturn: 6300,
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
          title="Rentabilisez votre investissement en 6 mois et percevez des revenus à vie"
          description="Dès 150€, commencez à percevoir jusqu'à 17,5% de rendement mensuel à vie. Voici ce que ça représente concrètement :"
        />

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.investment} {...benefit} index={index} />
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-8 p-12 rounded-3xl bg-yellow-200">
          <div className="text-center md:text-left">
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
          </div>
          <div className="flex flex-col xl:flex-row gap-4">
            <CallButton variant="black" className="w-full" />
            <ArrowButton
              label="Simuler mes revenus"
              variant="outline"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
