"use client";

import React, { useState, useMemo } from "react";
import { blogArticles } from "@/data";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCta } from "@/components/blog/blog-cta";
import { BlogFilters } from "@/components/blog/blog-filters";
import { SectionHeader } from "@/components/ui/section-header";
import FadeInText, { StaggeredGrid } from "@/components/ui/animations";
import { cn } from "@/lib/utils";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  // Extraire toutes les catégories uniques
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(blogArticles.map((article) => article.category)),
    ];
    return uniqueCategories;
  }, []);

  // Filtrer les articles selon la catégorie sélectionnée
  const filteredArticles = useMemo(() => {
    if (selectedCategory === "Tous") {
      return blogArticles;
    }
    return blogArticles.filter(
      (article) => article.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <main>
      {/* Header */}
      <section className="relative pt-28 pb-12 sm:pt-48 sm:pb-10 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader
              badge="blog"
              title="Découvrez nos articles sur l'investissement"
              description="Conseils, actualités et guides pour optimiser vos investissements et générer des revenus passifs avec Amazonia Investing."
              isSectionDark
            />
            {/* Filtres */}
            <FadeInText delay={0.6}>
              <BlogFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </FadeInText>
          </div>
        </div>
      </section>

      {/* Liste des articles */}
      <section className="pb-20 pt-20 sm:pb-32 bg-white">
        <div className="container mx-auto px-4">
          <StaggeredGrid
            delay={0.2}
            stagger={0.2}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6"
          >
            {filteredArticles.map((article, index) => {
              const isLast = index === filteredArticles.length - 1;
              const isSecondToLast = index === filteredArticles.length - 2;
              const isOdd = filteredArticles.length % 2 === 1;
              const isEven = filteredArticles.length % 2 === 0;

              let className = "";

              // Au-dessus de xl (grid-cols-6)
              if (isEven && isSecondToLast) {
                className = "xl:col-span-3";
              } else if (isEven && isLast) {
                className = "xl:col-span-3";
              } else if (isOdd && isLast) {
                className = "xl:col-span-2";
              } else {
                className = "xl:col-span-2";
              }

              // Au-dessus de md (grid-cols-2)
              if (isOdd && isLast) {
                className += " md:col-span-2";
              }

              return (
                <BlogCard
                  key={article.slug}
                  article={article}
                  className={className}
                />
              );
            })}
          </StaggeredGrid>

          {/* Call-to-action */}
          <BlogCta />
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
