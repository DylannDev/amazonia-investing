import React from "react";
import Link from "next/link";
import Image from "next/image";
import { blogArticles } from "@/data";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { CallButton } from "@/components/ui/call-button";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Amazonia Investing",
  description:
    "Découvrez nos articles sur l'investissement, les revenus passifs et Amazonia Investing. Conseils, actualités et guides pour optimiser vos investissements.",
};

const BlogPage = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative pt-20 pb-12 sm:pt-32 sm:pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="blue" className="mb-6">
              Blog
            </Badge>
            <Typography
              as="h1"
              variant="5xl"
              weight="semibold"
              lineHeight="tightest"
              className="mb-6 text-balance"
            >
              Découvrez nos articles sur l'investissement
            </Typography>
            <Typography
              as="p"
              variant="xl"
              weight="normal"
              className="mb-8 text-gray-600 text-balance"
            >
              Conseils, actualités et guides pour optimiser vos investissements
              et générer des revenus passifs avec Amazonia Investing.
            </Typography>
          </div>
        </div>
      </section>

      {/* Liste des articles */}
      <section className="pb-20 sm:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {blogArticles.map((article, index) => (
                <article
                  key={article.slug}
                  className="group bg-white border-2 border-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/blog/${article.slug}`}>
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <span>Par {article.author}</span>
                        <span>•</span>
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <Typography
                        as="h2"
                        variant="2xl"
                        weight="semibold"
                        lineHeight="tight"
                        className="mb-4 group-hover:text-blue-600 transition-colors duration-300"
                      >
                        {article.title}
                      </Typography>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                          Lire l'article →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Call-to-action */}
            <div className="mt-16 text-center">
              <div className="max-w-2xl mx-auto">
                <Typography
                  as="h3"
                  variant="3xl"
                  weight="semibold"
                  className="mb-4"
                >
                  Prêt à commencer votre investissement ?
                </Typography>
                <Typography
                  as="p"
                  variant="lg"
                  weight="normal"
                  className="mb-8 text-gray-600"
                >
                  Rejoignez les investisseurs qui perçoivent déjà un revenu
                  mensuel régulier grâce à Amazonia Investing.
                </Typography>
                <CallButton variant="blue" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
