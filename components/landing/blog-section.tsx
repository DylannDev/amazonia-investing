import React from "react";
import { Badge } from "../ui/badge";
import { Typography } from "../ui/typography";
import { blogArticles } from "@/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { BlogCard } from "../blog/blog-card";

function BlogSection() {
  return (
    <section className="pt-20 md:pt-32 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex items-end justify-between mb-12 text-white">
            <div className="flex flex-col space-y-4">
              <Badge>blog</Badge>
              <Typography
                as="h2"
                variant="5xl"
                weight="semibold"
                lineHeight="tightest"
                className="text-balance max-w-4xl mb-0"
              >
                Vous souhaitez en savoir plus sur Amazonia Investing ?
              </Typography>
            </div>
            <div className="flex items-center gap-4">
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
    </section>
  );
}

export default BlogSection;
