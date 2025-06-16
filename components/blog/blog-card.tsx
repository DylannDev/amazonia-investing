"use client";

import Link from "next/link";
import Image from "next/image";
import { BlogArticle } from "@/types/articles";
import { Typography } from "../ui/typography";
import { ArrowRotateButton } from "../ui/button-arrow-rotate";
import { formatDate } from "@/lib/utils";

export function BlogCard({ article }: { article: BlogArticle }) {
  return (
    <Link
      href={`/realisations/${article.slug}`}
      className="group cursor-pointer bg-white border-2 border-white w-full rounded-4xl overflow-hidden"
    >
      <div className="flex flex-col w-full h-full">
        <div className="w-full aspect-square max-h-[300px] relative rounded-t-4xl overflow-hidden">
          <Image
            src={article.image}
            alt="Amazonia Investing blog article"
            fill
            sizes="25vw"
            className="object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>

        <div className="relative flex flex-1 flex-col justify-between gap-8 p-6">
          <Typography
            as="h3"
            variant="2xl"
            weight="semibold"
            lineHeight="tight"
            className="line-clamp-4 sm:line-clamp-3 mb-0 group-hover:text-blue-400 transition-colors duration-300"
          >
            {article.title}
          </Typography>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <Typography
                as="span"
                variant="base"
                weight="normal"
                lineHeight="tight"
                className="text-gray-500"
              >
                Publié par {article.author}
              </Typography>
              <Typography
                as="span"
                variant="base"
                weight="normal"
                lineHeight="tight"
                className="text-gray-500"
              >
                Le {formatDate(article.date)}
              </Typography>
            </div>

            <ArrowRotateButton small />
          </div>
        </div>
      </div>
    </Link>
  );
}
