import type { Metadata } from "next";
import Link from "next/link";
import { blogCategories, blogPosts, formatBlogDate } from "./blog-data";
import BlogThemeToggle from "./blog-theme";
import { withBasePath } from "../site-path";

const siteUrl = "https://alae-eddine-sahbou.vercel.app";
const description = "Engineering notes by Alae-Eddine Sahbou on backend systems, cloud, DevOps, architecture, data, security, product engineering, bioinformatics, AI, and technical leadership.";

export const metadata: Metadata = {
  title: "Engineering Blog",
  description,
  keywords: ["software engineering blog", "backend engineering", "cloud architecture", "DevOps", "bioinformatics", "AI engineering", "Alae-Eddine Sahbou"],
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/feed.xml" } },
  openGraph: {
    title: "Engineering Blog | Alae-Eddine Sahbou",
    description,
    url: "/blog",
    type: "website",
    images: [{ url: blogPosts[0].image, width: 1200, height: 675, alt: blogPosts[0].title }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog | Alae-Eddine Sahbou",
    description,
    images: [blogPosts[0].image],
  },
};

const postsByYear = blogPosts.reduce<Record<string, typeof blogPosts>>((groups, post) => {
  const year = post.publishedAt.slice(0, 4);
  groups[year] = groups[year] ? [...groups[year], post] : [post];
  return groups;
}, {});

export default function BlogIndex() {
  const featured = blogPosts[0];
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Engineering Blog by Alae-Eddine Sahbou",
    description,
    url: `${siteUrl}/blog`,
    inLanguage: "en",
    author: { "@type": "Person", name: "Alae-Eddine Sahbou", url: siteUrl },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      url: `${siteUrl}/blog/${post.slug}`,
      image: `${siteUrl}${post.image}`,
      articleSection: post.category,
      keywords: post.tags.join(", "),
    })),
  };

  return (
    <main className="blog-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema).replace(/</g, "\\u003c") }} />
      <header className="blog-nav">
        <Link className="logo" href="/" aria-label="Alae-Eddine Sahbou — home">AS<span>.</span></Link>
        <div className="blog-nav-actions"><Link className="blog-back" href="/">← Portfolio</Link><BlogThemeToggle /></div>
      </header>

      <section className="blog-hero wrap">
        <p className="kicker">Engineering journal · 2022—2026</p>
        <h1>Notes from building<br/><em>systems that last.</em></h1>
        <p>One hundred practical articles on architecture, delivery, cloud, research software, and the engineering decisions behind dependable products.</p>
        <div className="blog-category-list" aria-label="Blog categories">
          {blogCategories.map((category) => <span key={category}>{category}</span>)}
        </div>
      </section>

      <section className="wrap blog-featured">
        <Link href={`/blog/${featured.slug}`} className="blog-featured-image">
          <img src={withBasePath(featured.image)} alt="" width="1200" height="675" />
        </Link>
        <div>
          <p className="blog-card-meta"><span>{featured.category}</span><time dateTime={featured.publishedAt}>{formatBlogDate(featured.publishedAt)}</time></p>
          <h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
          <p>{featured.excerpt}</p>
          <div className="blog-tags">{featured.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <Link className="blog-read" href={`/blog/${featured.slug}`}>Read article <span>↗</span></Link>
        </div>
      </section>

      <div className="wrap blog-archive">
        {years.map((year) => (
          <section className="blog-year" key={year} aria-labelledby={`year-${year}`}>
            <div className="blog-year-heading">
              <h2 id={`year-${year}`}>{year}</h2>
              <span>{postsByYear[year].length} articles</span>
            </div>
            <div className="blog-grid">
              {postsByYear[year].filter((post) => post.slug !== featured.slug).map((post) => (
                <article className="blog-card" key={post.slug}>
                  <Link className="blog-card-image" href={`/blog/${post.slug}`} aria-label={post.title}>
                    <img src={withBasePath(post.image)} alt="" width="1200" height="675" loading="lazy" />
                  </Link>
                  <p className="blog-card-meta"><span>{post.category}</span><time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time></p>
                  <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <span>{post.readingTime} min read</span>
                    <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>↗</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="wrap blog-footer">
        <Link className="logo" href="/">AS<span>.</span></Link>
        <p>100 articles · 10 categories · 2022—2026</p>
        <p>© 2026 Alae-Eddine Sahbou</p>
      </footer>
    </main>
  );
}
