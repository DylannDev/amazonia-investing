import { Typography } from "../ui/typography";
import { BsChatSquareQuote } from "react-icons/bs";

export function FounderQuote() {
  return (
    <div className="rounded-2xl p-8 bg-yellow-200 w-full lg:max-w-2xl">
      <div className="mb-4 flex items-center gap-2">
        <BsChatSquareQuote className="text-4xl text-yellow-900" />
        <div className="h-[2px] flex-1 bg-yellow-900" />
      </div>
      <Typography
        as="p"
        variant="xl"
        weight="medium"
        className="text-yellow-900"
      >
        "Mon objectif est de rendre l'investissement accessible à tous, tout en
        garantissant des rendements stables et réguliers. Chaque client est
        unique, et je m'engage à personnaliser l'accompagnement selon vos
        besoins."
      </Typography>
    </div>
  );
}
