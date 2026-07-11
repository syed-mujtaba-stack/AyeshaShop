import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogArticleBySlug, getBlogArticles } from "@/data/blog";
import { SITE_NAME } from "@/constants";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getBlogArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getBlogArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://ayesha-fashion.com"}/blog/${article.slug}`;

  return (
    <>
      <article className="py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-medium-gray hover:text-gold transition-colors mb-10 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="mb-10">
            <span className="inline-block text-gold text-sm font-medium uppercase tracking-wider mb-3">
              {article.category}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-dark font-bold leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-medium-gray">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" /> {article.author}
              </span>
              <span className="w-1 h-1 rounded-full bg-medium-gray/40" />
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {formatDate(article.publishedAt)}
              </span>
              <span className="w-1 h-1 rounded-full bg-medium-gray/40" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {article.readTime} min read
              </span>
            </div>
          </div>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-12">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="font-heading text-xl text-dark leading-relaxed mb-6 italic">
              {article.excerpt}
            </p>
            <p className="text-medium-gray leading-relaxed whitespace-pre-line">
              {article.content}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-10">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-lighter-gray text-dark border border-border"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-10 pt-8 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <span className="font-heading text-gold font-bold text-lg">
                  {article.author.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="text-dark font-medium text-sm">{article.author}</p>
                <p className="text-medium-gray text-xs">Author & Fashion Curator</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-medium-gray">Share:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-lighter-gray flex items-center justify-center hover:bg-gold/10 hover:text-gold transition-colors text-medium-gray"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="py-20 bg-off-white px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl text-dark font-bold">Related Articles</h2>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-3" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-gold/20 transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-gold text-xs font-medium uppercase tracking-wider">{related.category}</span>
                    <h3 className="font-heading text-lg font-semibold text-dark mt-1 group-hover:text-gold transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-medium-gray text-sm mt-1 line-clamp-2">{related.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
