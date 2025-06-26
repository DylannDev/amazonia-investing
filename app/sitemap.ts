import { MetadataRoute } from "next";
import { getBlogSlugs } from "../lib/utils";

interface BlogSlug {
  slug: string;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://amazonia-investing.com";
  const posts = getBlogSlugs();

  // Pages statiques avec priorité élevée
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Pages d'articles de blog
  const blogPages = posts.map((post: BlogSlug) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
