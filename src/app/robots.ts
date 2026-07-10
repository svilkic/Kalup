import type { MetadataRoute } from "next";
import { getConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const { siteUrl } = getConfig().seo;
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
