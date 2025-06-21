import { ExampleCard } from "./example-card";

const examples = [
  { investment: 1000, monthlyReturn: 175, variant: "blue" as const },
  { investment: 2000, monthlyReturn: 350, variant: "green" as const },
  { investment: 5000, monthlyReturn: 875, variant: "red" as const },
];

export function SimulatorExamples() {
  return (
    <div className="space-y-4">
      <div className="text-center text-lg text-gray-600">
        Exemples de rendements mensuels :
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {examples.map((example) => (
          <ExampleCard
            key={example.investment}
            investment={example.investment}
            monthlyReturn={example.monthlyReturn}
            variant={example.variant}
          />
        ))}
      </div>
    </div>
  );
}
