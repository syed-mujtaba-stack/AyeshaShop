import Link from "next/link";
import { getBlogArticles } from "@/data/blog";
import { SITE_NAME } from "@/constants";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function BlogPage() {
  const articles = getBlogArticles();

  const categories = [...new Set(articles.map((a) => a.category))];

  return (
    <>
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80)" }}
        />
        <div className="absolute inset-0 bg-dark/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-block text-gold-light text-sm tracking-[0.3em] uppercase mb-4">Journal</span>
            <h1 className="font-heading text-4xl md:text-6xl text-white font-bold mb-4">
              The AYESHA Edit
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Stories, style guides, and insights from the world of luxury fashion.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <span
                key={category}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-lighter-gray text-dark border border-border hover:bg-gold/10 hover:text-gold hover:border-gold/20 transition-colors"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <article
                key={article.id}
                className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-gold/20 transition-all duration-500"
              >
                <Link href={`/blog/${article.slug}`} className="block aspect-[4/3] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-medium-gray mb-3">
                    <span className="text-gold font-medium uppercase tracking-wider">{article.category}</span>
                    <span className="w-1 h-1 rounded-full bg-medium-gray/40" />
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-medium-gray/40" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime} min read
                    </span>
                  </div>
                  <Link href={`/blog/${article.slug}`}>
                    <h2 className="font-heading text-xl font-semibold text-dark mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                  </Link>
                  <p className="text-medium-gray text-sm leading-relaxed line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-medium-gray">By {article.author}</span>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 text-gold text-sm font-medium hover:underline"
                    >
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
