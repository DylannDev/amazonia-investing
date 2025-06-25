import React from "react";
import { blogArticles } from "@/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { BlogCard } from "../blog/blog-card";
import { SectionHeader } from "../ui/section-header";
import { Container } from "../ui/container";
import { ArrowButton } from "../ui/arrow-button";

interface RelatedPostsProps {
  currentSlug?: string;
}

function RelatedPosts({ currentSlug }: RelatedPostsProps) {
  // Filtrer les articles pour exclure l'article actuel
  const filteredArticles = React.useMemo(() => {
    if (!currentSlug) {
      return blogArticles;
    }
    return blogArticles.filter((article) => article.slug !== currentSlug);
  }, [currentSlug]);

  return (
    <section className="pb-10 relative overflow-hidden">
      <Container className="relative z-10">
        {/* Header */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex flex-col px-2 lg:flex-row items-center md:items-start lg:items-end justify-between mb-12">
            <div className="flex flex-col gap-0 md:gap-12">
              <SectionHeader
                title="Découvrez nos derniers articles sur l'investissement"
                textAlign="left"
              />
              <ArrowButton
                label="Tous les articles"
                href="/blog"
                variant="outline"
                className="w-fit hidden md:flex"
              />
            </div>

            <div className="hidden lg:flex items-center gap-4 mt-8 lg:mt-0">
              <CarouselPrevious className="static text-black border-2 border-black hover:bg-blue-300 hover:text-white cursor-pointer hover:border-blue-300 active:bg-blue-300 active:border-blue-300 active:text-white active:scale-95 transition-colors duration-150" />
              <CarouselNext className="static text-black border-2 border-black hover:bg-blue-300 hover:text-white cursor-pointer hover:border-blue-300 active:bg-blue-300 active:border-blue-300 active:text-white active:scale-95 transition-colors duration-150" />
            </div>
          </div>

          <CarouselContent className="px-2" isRelatedPosts>
            {filteredArticles.map((article, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 flex justify-center w-full"
              >
                <BlogCard article={article} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex flex-col-reverse min-[500px]:flex-row items-center gap-6 justify-center min-[500px]:justify-between md:justify-center">
            <ArrowButton
              label="Tous les articles"
              href="/blog"
              variant="outline"
              className="w-fit flex md:hidden"
            />
            <div className="flex lg:hidden justify-center items-center gap-4 mt-2 lg:mt-0">
              <CarouselPrevious className="static text-black border-2 border-black hover:bg-blue-300 hover:text-white cursor-pointer hover:border-blue-300 active:bg-blue-300 active:border-blue-300 active:text-white active:scale-95 transition-colors duration-150" />
              <CarouselNext className="static text-black border-2 border-black hover:bg-blue-300 hover:text-white cursor-pointer hover:border-blue-300 active:bg-blue-300 active:border-blue-300 active:text-white active:scale-95 transition-colors duration-150" />
            </div>
          </div>
        </Carousel>
      </Container>
    </section>
  );
}

export default RelatedPosts;
