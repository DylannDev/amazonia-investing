import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { blogArticles } from "@/data";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { CallButton } from "@/components/ui/call-button";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Génération des métadonnées dynamiques
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((article) => article.slug === slug);

  if (!article) {
    return {
      title: "Article non trouvé - Amazonia Investing",
      description: "L'article que vous recherchez n'existe pas.",
    };
  }

  return {
    title: `${article.title} - Amazonia Investing`,
    description: `Découvrez ${article.title} sur Amazonia Investing. Investissement unique, revenus mensuels à vie.`,
    openGraph: {
      title: article.title,
      description: `Découvrez ${article.title} sur Amazonia Investing.`,
      images: [article.image],
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

// Génération des paramètres statiques
export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

const BlogPostPage = async ({
  params,
}: BlogPostPageProps): Promise<React.ReactNode> => {
  const { slug } = await params;
  const article = blogArticles.find((article) => article.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="">
      {/* Header de l'article */}
      <section className="relative pt-16 sm:pt-28 pb-5">
        <div className="container max-w-[64rem] mx-auto px-4">
          <div className="text-center">
            {/* Badge et métadonnées */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <Badge variant="blue" isBgVisible>
                {article.category}
              </Badge>
              <div className="flex items-center gap-2 text-base font-medium text-gray-600">
                <span>Par {article.author}</span>
                <span>•</span>
                <span>{formatDate(article.date)}</span>
              </div>
            </div>

            {/* Titre */}
            <Typography
              as="h1"
              variant="5xl"
              weight="semibold"
              lineHeight="tightest"
              className="mb-10 text-balance"
            >
              {article.title}
            </Typography>

            {/* Image principale */}
            <div className="relative w-full aspect-square sm:aspect-16/9 rounded-3xl overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1200px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contenu de l'article */}
      <section className="pb-20 sm:pb-32">
        <div className="container max-w-[64rem] mx-auto px-4">
          <div className="">
            <article
              className="rich-text max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Call-to-action */}
            <div className="mt-16 px-6 py-12 sm:p-12 bg-blue-50 rounded-3xl">
              <div className="text-center">
                <Typography
                  as="h3"
                  variant="4xl"
                  weight="semibold"
                  className="mb-4"
                >
                  Prêt à commencer votre investissement ?
                </Typography>
                <Typography
                  as="p"
                  variant="xl"
                  weight="normal"
                  className="mb-6 text-gray-600"
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

export default BlogPostPage;
