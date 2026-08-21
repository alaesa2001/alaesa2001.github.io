import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function request(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the English portfolio with complete metadata", async () => {
  const response = await request();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="en"/);
  assert.match(html, /<title>Alae-Eddine Sahbou \| Backend &amp; Cloud Engineer<\/title>/);
  assert.match(html, /<meta name="description" content="Portfolio of Alae-Eddine Sahbou/);
  assert.match(html, /<link rel="canonical" href="https:\/\/alae-eddine-sahbou\.vercel\.app"/);
  assert.match(html, /<meta name="robots" content="index, follow"/);
  assert.match(html, /<meta name="google-site-verification" content="DNpmw6KaQ0da9J0XOdzXLHaetzEQGmWaVoTmYz3NT7A"/);
  assert.match(html, /https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-FW7MNZ7GPE/);
  assert.match(html, /gtag\("config","G-FW7MNZ7GPE"\)/);
  assert.match(html, /<script type="application\/ld\+json">/);
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /I build systems/);
  assert.match(html, /href="\/"[^>]*aria-current="page"[^>]*hrefLang="en"[^>]*>EN<\/a>/);
  assert.match(html, /href="\/fr"[^>]*hrefLang="fr"[^>]*>FR<\/a>/);
  assert.match(html, /localStorage\.getItem\("theme"\)/);
  assert.match(html, /id="primary-navigation"/);
  assert.match(html, /aria-controls="primary-navigation"/);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /\/brands\/digicall-partner\.jpg/);
  assert.match(html, /\/brands\/plum-networks\.png/);
  assert.match(html, /\/brands\/prosystems\.jpg/);
  assert.match(html, /https:\/\/www\.linkedin\.com\/in\/alae-eddine-sahbou\//);
  assert.match(html, /https:\/\/www\.instagram\.com\/alaesahbou\//);
  assert.match(html, /https:\/\/web\.facebook\.com\/alae\.sa\.3/);
  assert.match(html, /https:\/\/github\.com\/alaesa2001/);
  assert.match(html, /https:\/\/buscophylo\.inra\.org\.ma\//);
  assert.match(html, /https:\/\/moroccomrbgd\.net\//);
  assert.match(html, /Biotechnology Researcher/);
  assert.match(html, /May 2026 — Present/);
  assert.match(html, /Full-stack Engineer/);
  assert.match(html, /Mar. 2024 — Present/);
  assert.match(html, /RocketDevs/);
  assert.match(html, /\/brands\/rocketdevs\.jpeg/);
  assert.match(html, /https:\/\/rocketdevs\.com\//);
  assert.match(html, /DGC Partner/);
  assert.match(html, /Borderline Solutions/);
  assert.match(html, /\/brands\/borderline-solutions\.jpg/);
  assert.match(html, /https:\/\/graviton\.ma\//);
  assert.match(html, /https:\/\/quicklivraison\.ma\//);
  assert.match(html, /https:\/\/www\.orange\.ma\//);
  assert.match(html, /https:\/\/plumnetworks\.co\.uk\//);
  assert.match(html, /https:\/\/www\.um6p\.ma\//);
  assert.match(html, /Programming for the Internet of Things Project/);
  assert.match(html, /DevOps on AWS: Code, Build, and Test/);
  assert.match(html, /https:\/\/www\.coursera\.org\/account\/accomplishments\/verify\/9NBK0HO3EOTZ/);
  assert.match(html, /BriefAI/);
  assert.match(html, /ChessAI/);
  assert.match(html, /EmotionDetector/);
  assert.match(html, /"hasCredential"/);
  assert.match(html, /Consortium coordinated by INH/);
  assert.match(html, /\/brands\/mmrbgd-logo\.jpg/);
  assert.match(html, /class="social-icon"/);
});

test("server-renders indexable French and Arabic portfolio routes", async () => {
  const [frenchResponse, arabicResponse] = await Promise.all([request("/fr"), request("/ar")]);
  assert.equal(frenchResponse.status, 200);
  assert.equal(arabicResponse.status, 200);

  const [french, arabic] = await Promise.all([frenchResponse.text(), arabicResponse.text()]);
  assert.match(french, /<title>Alae-Eddine Sahbou \| Ingénieur Backend &amp; Cloud<\/title>/);
  assert.match(french, /<main lang="fr" dir="ltr">/);
  assert.match(french, /Je conçois des systèmes/);
  assert.match(french, /Expérience professionnelle/);
  assert.match(french, /rel="canonical" href="https:\/\/alae-eddine-sahbou\.vercel\.app\/fr"/);
  assert.match(french, /hrefLang="ar"/);

  assert.match(arabic, /<title>علاء الدين صهبو \| مهندس برمجيات خلفية وسحابية<\/title>/);
  assert.match(arabic, /<main lang="ar" dir="rtl">/);
  assert.match(arabic, /أبني أنظمة/);
  assert.match(arabic, /الخبرة المهنية/);
  assert.match(arabic, /rel="canonical" href="https:\/\/alae-eddine-sahbou\.vercel\.app\/ar"/);
  assert.match(arabic, /hrefLang="fr"/);
});

test("exposes crawl, styled sitemap, feed, install, and favicon assets", async () => {
  const [robots, sitemap, sitemapStylesheet, feed, manifest] = await Promise.all([
    request("/robots.txt"),
    request("/sitemap.xml"),
    request("/sitemap.xsl"),
    request("/blog/feed.xml"),
    request("/manifest.webmanifest"),
  ]);

  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/alae-eddine-sahbou\.vercel\.app\/sitemap\.xml/);
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get("content-type") ?? "", /^application\/xml\b/i);
  const sitemapText = await sitemap.text();
  assert.match(sitemapText, /<\?xml-stylesheet type="text\/xsl" href="\/sitemap\.xsl"\?>/);
  assert.match(sitemapText, /<loc>https:\/\/alae-eddine-sahbou\.vercel\.app<\/loc>/);
  assert.match(sitemapText, /<loc>https:\/\/alae-eddine-sahbou\.vercel\.app\/fr<\/loc>/);
  assert.match(sitemapText, /<loc>https:\/\/alae-eddine-sahbou\.vercel\.app\/ar<\/loc>/);
  assert.match(sitemapText, /hreflang="x-default"/);
  assert.match(sitemapText, /<loc>https:\/\/alae-eddine-sahbou\.vercel\.app\/blog<\/loc>/);
  assert.match(sitemapText, /\/blog\/from-developer-to-technical-leader<\/loc>/);
  const blogArticleUrls = sitemapText.match(/<loc>https:\/\/alae-eddine-sahbou\.vercel\.app\/blog\/[^<]+<\/loc>/g) ?? [];
  assert.equal(blogArticleUrls.length, 100);
  assert.equal(sitemapStylesheet.status, 200);
  assert.match(sitemapStylesheet.headers.get("content-type") ?? "", /^text\/xsl\b/i);
  assert.match(await sitemapStylesheet.text(), /<h1>XML Sitemap<\/h1>/);
  assert.equal(feed.status, 200);
  assert.match(feed.headers.get("content-type") ?? "", /^application\/rss\+xml\b/i);
  const feedText = await feed.text();
  assert.match(feedText, /<title>Engineering Blog by Alae-Eddine Sahbou<\/title>/);
  assert.equal((feedText.match(/<item>/g) ?? []).length, 100);
  assert.match(feedText, /\/blog\/from-developer-to-technical-leader/);
  assert.equal(manifest.status, 200);
  assert.match(await manifest.text(), /"short_name"\s*:\s*"Alae Sahbou"/);

  await Promise.all([
    access(new URL("../public/favicon.ico", import.meta.url)),
    access(new URL("../public/icon-192.png", import.meta.url)),
    access(new URL("../public/icon-512.png", import.meta.url)),
    access(new URL("../public/apple-touch-icon.png", import.meta.url)),
    access(new URL("../public/brands/digicall-partner.jpg", import.meta.url)),
    access(new URL("../public/brands/plum-networks.png", import.meta.url)),
    access(new URL("../public/brands/prosystems.jpg", import.meta.url)),
    access(new URL("../public/brands/rocketdevs.jpeg", import.meta.url)),
    access(new URL("../public/brands/borderline-solutions.jpg", import.meta.url)),
  ]);

  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /html,body\{max-width:100%;overflow-x:hidden;overflow-x:clip\}/);
  assert.match(css, /main\{width:100%;max-width:100%;overflow-x:clip\}/);
  assert.match(css, /\.projects\{display:grid;grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css, /@media\(max-width:700px\)\{\.projects\{grid-template-columns:1fr\}/);
  assert.match(css, /\.project-meta\{align-items:flex-start;flex-direction:column\}/);
  assert.match(css, /\.article-shell>article>\.article-hero\{height:auto;min-height:0;position:relative/);
});

test("renders the 100-post blog archive and indexable article pages", async () => {
  const blogResponse = await request("/blog");
  assert.equal(blogResponse.status, 200);
  const blog = await blogResponse.text();
  assert.match(blog, /<title>Engineering Blog \| Alae-Eddine Sahbou<\/title>/);
  assert.match(blog, /One hundred practical articles/);
  assert.match(blog, /"@type":"Blog"/);
  assert.match(blog, /"blogPost":\[/);
  assert.match(blog, /<link rel="alternate" type="application\/rss\+xml" href="https:\/\/alae-eddine-sahbou\.vercel\.app\/blog\/feed\.xml"/);
  const slugs = new Set([...blog.matchAll(/href="\/blog\/([^"#]+)"/g)].map((match) => match[1]).filter((slug) => !slug.endsWith(".jpg")));
  assert.equal(slugs.size, 100);

  const articleResponse = await request("/blog/from-developer-to-technical-leader");
  assert.equal(articleResponse.status, 200);
  const article = await articleResponse.text();
  assert.match(article, /<title>From Developer to Technical Leader \| Alae-Eddine Sahbou<\/title>/);
  assert.match(article, /<link rel="canonical" href="https:\/\/alae-eddine-sahbou\.vercel\.app\/blog\/from-developer-to-technical-leader"/);
  assert.match(article, /<meta property="og:type" content="article"/);
  assert.match(article, /"@type":"BlogPosting"/);
  assert.match(article, /https:\/\/alae-eddine-sahbou\.vercel\.app\/blog\/leadership\.jpg/);
  assert.doesNotMatch(article, /\/og\.png/);
  assert.match(article, /The engineering context/);
  assert.match(article, /Related articles/);

  const secondArticleResponse = await request("/blog/designing-idempotent-apis-that-survive-retries");
  assert.equal(secondArticleResponse.status, 200);
  const secondArticle = await secondArticleResponse.text();
  assert.match(secondArticle, /<title>Designing Idempotent APIs That Survive Retries \| Alae-Eddine Sahbou<\/title>/);
  assert.match(secondArticle, /https:\/\/alae-eddine-sahbou\.vercel\.app\/blog\/backend\.jpg/);
  assert.doesNotMatch(secondArticle, /\/og\.png/);
});
