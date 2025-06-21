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
import { Shadow } from "../ui/shadow";

function BlogSection() {
  return (
    <section className="pt-20 md:pt-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex flex-col lg:flex-row items-center md:items-start lg:items-end justify-between mb-12 text-white">
            <SectionHeader
              badge="blog"
              title="Vous souhaitez en savoir plus sur Amazonia Investing ?"
              textAlign="left"
              sectionDark
            />

            <div className="flex items-center gap-4 mt-8 lg:mt-0">
              <CarouselPrevious className="static text-white border-2 border-white hover:bg-blue-300 hover:text-white cursor-pointer hover:border-blue-300 transition-colors duration-300" />
              <CarouselNext className="static text-white border-2 border-white hover:bg-blue-300 hover:text-white cursor-pointer hover:border-blue-300 transition-colors duration-300" />
            </div>
          </div>

          <CarouselContent>
            {blogArticles.map((article, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 flex justify-center w-full"
              >
                <BlogCard article={article} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Shadow
          className="-top-60 -left-60"
          color="blue"
          size="md"
          zIndex="z-0"
        />
      </div>
    </section>
  );
}

export default BlogSection;
