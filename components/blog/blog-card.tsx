"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogArticle } from "@/types/articles";
import { Typography } from "../ui/typography";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { PiArrowRightBold } from "react-icons/pi";

export function BlogCard({
  article,
  className,
}: {
  article: BlogArticle;
  className?: string;
}) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className={cn("group cursor-pointer", className)}
    >
      <div className="flex flex-col w-full h-full bg-white border-2 border-white shadow-md hover:shadow-lg transition-all duration-150 rounded-4xl overflow-hidden">
        <div className="w-full aspect-square max-h-[300px] relative rounded-t-4xl overflow-hidden">
          <Image
            src={article.image}
            alt="Amazonia Investing blog article"
            fill
            sizes="33vw"
            loading="lazy"
            className="object-cover object-center transition-transform duration-150 ease-in-out group-hover:scale-105"
          />
        </div>

        <div className="relative flex flex-1 flex-col justify-between gap-4 px-6 py-8">
          <Badge variant="blue" isBgVisible isBlogCard>
            {article.category}
          </Badge>

          <Typography
            as="h3"
            variant="2xl"
            weight="semibold"
            lineHeight="tight"
            className="line-clamp-4 sm:line-clamp-3 mb-0 group-hover:text-blue-400 transition-colors duration-150"
          >
            {article.title}
          </Typography>
          <div className="flex items-end justify-between">
            <Typography
              as="p"
              variant="sm"
              weight="medium"
              lineHeight="tight"
              className="text-gray-400 flex flex-col gap-1"
            >
              <span>Par {article.author}</span>

              <span>{formatDate(article.date)}</span>
            </Typography>

            <Typography
              as="p"
              variant="lg"
              weight="semibold"
              lineHeight="tight"
              className="text-black group-hover:text-blue-300 transition-colors duration-150 flex gap-1 items-center"
            >
              Lire l'article
              <PiArrowRightBold className="text-xl group-hover:translate-x-1 transition-transform duration-150" />
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}
