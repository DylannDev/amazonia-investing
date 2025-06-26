import { blogArticles } from "@/data";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface BlogArticle {
  slug: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const formatDate = (input: Date | string): string => {
  const date = typeof input === "string" ? new Date(input) : input;

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};

export function getBlogSlugs() {
  return (blogArticles as unknown as BlogArticle[]).map((post) => ({
    slug: post.slug,
  }));
}
