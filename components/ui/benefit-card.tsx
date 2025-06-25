import { FloatingCoins } from "./floating-coins";
import { ArrowButton } from "./arrow-button";
import { Card } from "./card";

type CardColor = "blue" | "green" | "red" | "yellow";

interface BenefitCardProps {
  investment: number;
  monthlyReturn: number;
  yearlyReturn: number;
  threeYearReturn: number;
  color: CardColor;
  image: string;
  index?: number;
  imgSize: string;
}

const colorClasses: Record<CardColor, string> = {
  blue: "text-blue-900 bg-blue-200 border-blue-300",
  green: "text-green-900 bg-green-200 border-green-300",
  red: "text-red-900 bg-red-200 border-red-300",
  yellow: "text-yellow-900 bg-yellow-200 border-yellow-300",
};

export function BenefitCard({
  investment,
  monthlyReturn,
  yearlyReturn,
  threeYearReturn,
  color,
  image,
  index = 0,
  imgSize,
}: BenefitCardProps) {
  return (
    <Card
      className={`${
        index === 2 ? "col-span-1 md:col-span-2 lg:col-span-1" : ""
      }`}
    >
      <div className="pt-2 mb-4 flex flex-col items-center justify-center gap-2">
        <div className="relative w-full h-[75px] flex justify-center mb-4">
          <FloatingCoins
            src={image}
            className={`top-[50%] translate-y-[-50%] ${imgSize}`}
            delay={0}
          />
        </div>
        <div className="text-4xl font-bold">{investment}€</div>
        <div className="text-lg text-gray-600">Investissement initial</div>
      </div>
      <div className={`rounded-xl px-6 ${colorClasses[color]}`}>
        <div
          className={`flex items-center justify-between py-6 border-b-2 border-dashed ${colorClasses[color]}`}
        >
          <span className="text-base">Revenu mensuel</span>
          <div className="text-2xl font-semibold">{monthlyReturn}€</div>
        </div>
        <div
          className={`flex items-center justify-between py-6 border-b-2 border-dashed ${colorClasses[color]}`}
        >
          <span className="text-base">Revenu annuel</span>
          <div className="text-2xl font-semibold">{yearlyReturn}€</div>
        </div>
        <div className="flex items-center justify-between py-6">
          <span className="text-base">Revenu sur 3 ans</span>
          <div className="text-2xl font-semibold">{threeYearReturn}€</div>
        </div>
      </div>
      <div className="mt-6">
        <ArrowButton
          label={`Investir ${investment}€`}
          href={`https://wa.me/+594694252185?text=${encodeURIComponent(
            `Bonjour ! Je suis intéressé(e) par un investissement de ${investment}€ avec Amazonia Investing. Pouvez-vous m’en dire plus ?`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="black"
          className="w-full"
        />
      </div>
    </Card>
  );
}
