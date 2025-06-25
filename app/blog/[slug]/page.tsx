import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { blogArticles } from "@/data";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import { BlogCta } from "@/components/blog/blog-cta";
import RelatedPosts from "@/components/blog/related-posts";
import FadeInText, { FadeInImage } from "@/components/ui/animations";

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
    description:
      "Découvrez comment faire travailler votre argent intelligemment grâce à notre approche simple, accessible et performante de l’investissement.",

    openGraph: {
      title: article.title,
      description:
        "Découvrez comment faire travailler votre argent intelligemment grâce à notre approche simple, accessible et performante de l’investissement.",
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
      <section className="relative pt-32 sm:pt-44 pb-5">
        <div className="container max-w-[64rem] mx-auto px-4">
          <div className="text-center">
            {/* Badge et métadonnées */}
            <FadeInText
              delay={0.2}
              className="flex flex-col items-center gap-4 mb-6"
            >
              <Badge variant="blue" isBgVisible>
                {article.category}
              </Badge>
              <div className="flex items-center gap-2 text-base font-medium text-gray-600">
                <span>Par {article.author}</span>
                <span>•</span>
                <span>{formatDate(article.date)}</span>
              </div>
            </FadeInText>

            {/* Titre */}
            <FadeInText delay={0.6}>
              <Typography
                as="h1"
                variant="5xl"
                weight="semibold"
                lineHeight="tightest"
                className="mb-10 text-balance"
              >
                {article.title}
              </Typography>
            </FadeInText>

            {/* Image principale */}
            <FadeInImage
              delay={0.8}
              className="relative w-full aspect-square sm:aspect-16/9 rounded-3xl overflow-hidden"
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1000px"
                priority
                fetchPriority="high"
              />
            </FadeInImage>
          </div>
        </div>
      </section>

      {/* Contenu de l'article */}
      <section className="pb-20 sm:pb-32">
        <div className="container max-w-[64rem] mx-auto px-4">
          <FadeInText delay={1}>
            <article
              className="rich-text max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </FadeInText>

          {/* Call-to-action */}
          <BlogCta />
        </div>
      </section>

      {/* Articles liés */}
      <RelatedPosts currentSlug={slug} />
    </main>
  );
};

export default BlogPostPage;
