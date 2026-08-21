import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, formatBlogDate, getBlogPost, getRelatedPosts } from "../blog-data";
import BlogThemeToggle from "../blog-theme";
import { withBasePath } from "../../site-path";

const siteUrl = "https://alae-eddine-sahbou.vercel.app";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, ...post.tags, "Alae-Eddine Sahbou"],
    authors: [{ name: "Alae-Eddine Sahbou", url: siteUrl }],
    alternates: { canonical: path },
    openGraph: {
      title: `${post.title} | Alae-Eddine Sahbou`,
      description: post.excerpt,
      url: path,
      type: "article",
      publishedTime: `${post.publishedAt}T08:00:00Z`,
      authors: [siteUrl],
      tags: post.tags,
      images: [{ url: post.image, width: 1200, height: 675, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Alae-Eddine Sahbou`,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post);
  const canonical = `${siteUrl}/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: canonical,
    author: { "@type": "Person", name: "Alae-Eddine Sahbou", url: siteUrl },
    publisher: { "@type": "Person", name: "Alae-Eddine Sahbou", url: siteUrl },
    articleSection: post.category,
    keywords: post.tags.join(", "),
    inLanguage: "en",
  };

  return (
    <main className="article-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className="blog-nav">
        <Link className="logo" href="/" aria-label="Alae-Eddine Sahbou — home">AS<span>.</span></Link>
        <div className="blog-nav-actions"><nav aria-label="Blog navigation"><Link href="/blog">All articles</Link><Link href="/">Portfolio</Link></nav><BlogThemeToggle /></div>
      </header>

      <article>
        <header className="article-hero wrap">
          <Link className="article-back" href="/blog">← Engineering blog</Link>
          <p className="article-meta"><span>{post.category}</span><time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time><span>{post.readingTime} min read</span></p>
          <h1>{post.title}</h1>
          <p className="article-lead">{post.excerpt}</p>
          <div className="article-tags">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
        </header>

        <figure className="article-cover wrap">
          <img src={withBasePath(post.image)} alt={`Editorial visual for ${post.title}`} width="1200" height="675" />
          <figcaption>Photo: <a href={post.imageSource} target="_blank" rel="noreferrer">Unsplash</a></figcaption>
        </figure>

        <div className="article-body wrap">
          <p className="article-opening">The difficult part of {post.focus} is rarely the first implementation. The real work is making the decision understandable, observable, and safe as traffic, data, and team ownership change.</p>

          <section>
            <p className="article-section-number">01</p>
            <h2>The engineering context</h2>
            <p>{post.perspective} That means beginning with the outcome the system must protect, then identifying the assumptions that could fail under production conditions.</p>
            <p>Teams often reach for a familiar pattern before writing down the problem. A better starting point is to describe the expected load, the ownership boundary, the acceptable failure behavior, and the recovery objective. Those constraints make tradeoffs visible and prevent a fashionable tool from becoming the architecture.</p>
          </section>

          <aside className="article-callout">
            <span>Core idea</span>
            <p>Make the important constraint explicit before choosing the implementation.</p>
          </aside>

          <section>
            <p className="article-section-number">02</p>
            <h2>A practical way to approach it</h2>
            <p>{post.practice} Keep the first version narrow enough that its behavior can be explained, tested, and operated by more than one person.</p>
            <ol>
              <li><strong>Define the contract.</strong> Write down inputs, outputs, ownership, guarantees, and expected failure modes.</li>
              <li><strong>Design for recovery.</strong> Decide how the system behaves during partial failure and how an operator can restore service.</li>
              <li><strong>Add evidence.</strong> Instrument the path before optimizing it so decisions use real workload data.</li>
              <li><strong>Review the boundary.</strong> Confirm that security, data ownership, and change responsibility remain clear.</li>
            </ol>
          </section>

          <section>
            <p className="article-section-number">03</p>
            <h2>Questions worth answering</h2>
            <ul>
              <li>Which user or business outcome becomes unreliable if this design fails?</li>
              <li>What happens when the same request, event, or job is processed more than once?</li>
              <li>Which assumption changes first when volume grows by an order of magnitude?</li>
              <li>Can another engineer diagnose and recover the system without hidden knowledge?</li>
              <li>How can the design evolve without requiring a risky all-at-once migration?</li>
            </ul>
          </section>

          <section>
            <p className="article-section-number">04</p>
            <h2>Measure the result</h2>
            <p>{post.measure} A useful review combines technical health with the product outcome. A faster component has little value if users still encounter failed tasks or the team cannot deploy it safely.</p>
            <p>Choose a small baseline before the change, then compare it after release. Keep the measurements close to the decision and set a date to review whether the original assumptions still hold.</p>
          </section>

          <section>
            <p className="article-section-number">05</p>
            <h2>Closing perspective</h2>
            <p>Strong engineering around {post.focus} comes from clarity more than complexity. Make contracts visible, keep recovery practical, and let production evidence guide the next iteration. The result is a system that is easier to trust and a team that can improve it with confidence.</p>
          </section>

          <footer className="article-author">
            <div className="article-author-mark">AS</div>
            <div><strong>Written by Alae-Eddine Sahbou</strong><p>Backend and cloud engineer writing about dependable systems, research software, and technical leadership.</p></div>
          </footer>
        </div>
      </article>

      <aside className="related wrap" aria-labelledby="related-title">
        <div className="related-heading"><p className="kicker">Continue reading</p><h2 id="related-title">Related articles</h2></div>
        <div className="blog-grid">{related.map((item) => <article className="blog-card" key={item.slug}><Link className="blog-card-image" href={`/blog/${item.slug}`}><img src={withBasePath(item.image)} alt="" width="1200" height="675" loading="lazy" /></Link><p className="blog-card-meta"><span>{item.category}</span><time dateTime={item.publishedAt}>{formatBlogDate(item.publishedAt)}</time></p><h3><Link href={`/blog/${item.slug}`}>{item.title}</Link></h3><div className="blog-card-footer"><span>{item.readingTime} min read</span><Link href={`/blog/${item.slug}`} aria-label={`Read ${item.title}`}>↗</Link></div></article>)}</div>
      </aside>

      <footer className="wrap blog-footer"><Link className="logo" href="/">AS<span>.</span></Link><Link href="/blog">All 100 articles</Link><p>© 2026 Alae-Eddine Sahbou</p></footer>
    </main>
  );
}
