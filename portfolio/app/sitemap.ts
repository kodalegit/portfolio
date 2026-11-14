import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/writing`, lastModified: posts[0]?.date, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({ url: `${site.url}/writing/${p.slug}`, lastModified: p.date, priority: 0.7 })),
  ];
}
