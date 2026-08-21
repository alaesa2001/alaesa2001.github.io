import { blogPosts } from "../blog-data";

const siteUrl = "https://alae-eddine-sahbou.vercel.app";
export const dynamic = "force-static";

const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function GET() {
  const items = blogPosts.map((post) => `<item><title>${escapeXml(post.title)}</title><link>${siteUrl}/blog/${post.slug}</link><guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid><pubDate>${new Date(`${post.publishedAt}T08:00:00Z`).toUTCString()}</pubDate><description>${escapeXml(post.excerpt)}</description><category>${escapeXml(post.category)}</category></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Engineering Blog by Alae-Eddine Sahbou</title><link>${siteUrl}/blog</link><description>Practical notes on software engineering, cloud, bioinformatics, AI, and technical leadership.</description><language>en</language><lastBuildDate>${new Date(`${blogPosts[0].publishedAt}T08:00:00Z`).toUTCString()}</lastBuildDate><atom:link href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
