import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Amazonia Investing",
  description:
    "Découvrez nos articles sur l'investissement, les revenus passifs et Amazonia Investing. Conseils, actualités et guides pour optimiser vos investissements.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
