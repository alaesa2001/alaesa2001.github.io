import { blogPosts } from "../blog/blog-data";
import { withBasePath } from "../site-path";

const siteUrl = "https://alae-eddine-sahbou.vercel.app";
export const dynamic = "force-static";

const escapeXml = (value: string) => value
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&apos;");

type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
  alternates?: boolean;
};

const entries: SitemapEntry[] = [
  { url: siteUrl, lastModified: "2026-08-21", changeFrequency: "monthly", priority: 1, alternates: true },
  { url: `${siteUrl}/fr`, lastModified: "2026-08-21", changeFrequency: "monthly", priority: 0.9, alternates: true },
  { url: `${siteUrl}/ar`, lastModified: "2026-08-21", changeFrequency: "monthly", priority: 0.9, alternates: true },
  { url: `${siteUrl}/blog`, lastModified: "2026-08-21", changeFrequency: "weekly", priority: 0.85 },
  ...blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  })),
];

const languageLinks = [
  ["en", siteUrl],
  ["fr", `${siteUrl}/fr`],
  ["ar", `${siteUrl}/ar`],
  ["x-default", siteUrl],
].map(([language, url]) => `<xhtml:link rel="alternate" hreflang="${language}" href="${url}"/>`).join("");

export async function GET() {
  const urls = entries.map((entry) => `<url><loc>${escapeXml(entry.url)}</loc>${entry.alternates ? languageLinks : ""}<lastmod>${entry.lastModified}</lastmod><changefreq>${entry.changeFrequency}</changefreq><priority>${entry.priority}</priority></url>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="${withBasePath("/sitemap.xsl")}"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
