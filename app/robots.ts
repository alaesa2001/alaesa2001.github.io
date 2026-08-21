import type { MetadataRoute } from "next";

const siteUrl = "https://alae-eddine-sahbou.vercel.app";
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl };
}
