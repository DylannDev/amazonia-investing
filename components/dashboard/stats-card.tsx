interface StatsCardProps {
  title: string; // ex: "Total hebdomadaire"
  value: string; // ex: "2 450,00 €"
  subtitle?: string; // ex: "Semaine 32 — 8 paiements"
  icon: React.ReactNode; // icône Lucide
  tone?: "blue" | "green" | "red" | "yellow"; // variante couleur légère
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  tone = "blue",
  className,
}: StatsCardProps) {
  const tones = {
    blue: {
      box: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-200",
      title: "text-blue-800",
      value: "text-blue-700",
      sub: "text-blue-600",
    },
    green: {
      box: "bg-green-50 border-green-200",
      iconBg: "bg-green-200",
      title: "text-green-800",
      value: "text-green-700",
      sub: "text-green-600",
    },
    red: {
      box: "bg-red-50 border-red-200",
      iconBg: "bg-red-200",
      title: "text-red-800",
      value: "text-red-700",
      sub: "text-red-600",
    },
    yellow: {
      box: "bg-yellow-50 border-yellow-200",
      iconBg: "bg-yellow-200",
      title: "text-yellow-800",
      value: "text-yellow-800",
      sub: "text-yellow-600",
    },
  };
  const t = tones[tone];
  return (
    <div className={`border rounded-lg p-4 w-full ${t.box} ${className ?? ""}`}>
      <div className="flex items-center gap-4">
        <div className={`shrink-0 p-2 ${t.iconBg} rounded-lg`}>{icon}</div>
        <div className="min-w-0">
          <h3 className={`text-lg font-semibold ${t.title} truncate`}>
            {title}
          </h3>
          <p className={`text-2xl font-bold ${t.value}`}>{value}</p>
          {subtitle ? (
            <p className={`text-xs ${t.sub} mt-0.5`}>{subtitle}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
