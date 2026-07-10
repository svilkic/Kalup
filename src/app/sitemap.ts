import type { MetadataRoute } from "next";
import { getConfig, getContent } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = getConfig().seo;
  const pages = (getContent().pages ?? []).filter((p) => p.slug && p.title);
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...pages.map((p) => ({
      url: `${siteUrl}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
