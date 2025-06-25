import { Card } from "../ui/card";
import { Typography } from "../ui/typography";

interface PainCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "blue" | "green" | "red" | "yellow";
}

export function PainCard({ icon, title, description, color }: PainCardProps) {
  const colorClasses = {
    blue: {
      icon: "text-blue-400 border-blue-300 bg-blue-100",
      description: "bg-blue-200 text-blue-900",
    },
    green: {
      icon: "text-green-400 border-green-300 bg-green-100",
      description: "bg-green-200 text-green-900",
    },
    red: {
      icon: "text-red-400 border-red-300 bg-red-100",
      description: "bg-red-200 text-red-900",
    },
    yellow: {
      icon: "text-yellow-400 border-yellow-300 bg-yellow-100",
      description: "bg-yellow-200 text-yellow-900",
    },
  };

  const currentColor = colorClasses[color];

  return (
    <Card>
      <div className="flex flex-col items-center gap-6 h-full">
        <div
          className={`p-4 rounded-full flex items-center justify-center text-3xl border-2 ${currentColor.icon}`}
        >
          {icon}
        </div>
        <div className="flex flex-col justify-between gap-2 h-full">
          <Typography
            as="h4"
            variant="2xl"
            weight="medium"
            className="text-center flex-1 xl:min-h-[110px] 2xl:min-h-auto"
          >
            {title}
          </Typography>
          <Typography
            as="p"
            variant="lg"
            weight="normal"
            className={`p-6 rounded-xl h-full text-balance ${currentColor.description}`}
          >
            {description}
          </Typography>{" "}
        </div>
      </div>
    </Card>
  );
}
