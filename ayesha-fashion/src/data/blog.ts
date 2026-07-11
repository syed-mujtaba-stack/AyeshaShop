import { BlogArticle } from "@/types";

export const blogArticles: BlogArticle[] = [
  {
    id: "blog-1",
    title: "The Ultimate Guide to Luxury Evening Wear",
    slug: "ultimate-guide-luxury-evening-wear",
    excerpt: "Discover the essential elements of sophisticated evening attire, from fabric selection to accessory pairing.",
    content: "When it comes to luxury evening wear, every detail matters. From the choice of fabric to the cut of the silhouette, each element contributes to creating a look that is both elegant and memorable...",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&q=80",
    author: "Ayesha Khan",
    category: "Style Guide",
    tags: ["evening wear", "luxury", "style guide", "fashion tips"],
    publishedAt: new Date("2026-01-15"),
    readTime: 8,
  },
  {
    id: "blog-2",
    title: "Spring 2026: The Season's Most Coveted Trends",
    slug: "spring-2026-coveted-trends",
    excerpt: "From pastel power suits to floral maxi dresses, here's what you need in your wardrobe this spring.",
    content: "Spring 2026 brings a fresh wave of elegance to the fashion world. Designers are embracing soft silhouettes, delicate fabrics, and a palette that ranges from blushing pinks to serene blues...",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1200&q=80",
    author: "Sarah Ahmed",
    category: "Trends",
    tags: ["spring", "trends", "2026", "fashion"],
    publishedAt: new Date("2026-02-01"),
    readTime: 6,
  },
  {
    id: "blog-3",
    title: "Investment Pieces: Building a Timeless Wardrobe",
    slug: "investment-pieces-timeless-wardrobe",
    excerpt: "Learn which luxury items are worth the investment and how to build a wardrobe that transcends seasons.",
    content: "A truly luxurious wardrobe is built on investment pieces — items that never go out of style and only get better with age. From the perfect cashmere coat to an iconic leather handbag...",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80",
    author: "Zoya Malik",
    category: "Style Guide",
    tags: ["investment", "wardrobe", "timeless", "luxury"],
    publishedAt: new Date("2026-01-20"),
    readTime: 10,
  },
  {
    id: "blog-4",
    title: "The Art of Accessorizing: Less is More",
    slug: "art-of-accessorizing-less-is-more",
    excerpt: "Master the art of elegant accessorizing with these expert tips from our styling team.",
    content: "The difference between a good outfit and a great one often lies in the accessories. But the key to true elegance is knowing when less is more...",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1200&q=80",
    author: "Fatima Ali",
    category: "Tips",
    tags: ["accessories", "styling", "tips", "elegance"],
    publishedAt: new Date("2026-01-28"),
    readTime: 5,
  },
  {
    id: "blog-5",
    title: "Behind the Seams: Craftsmanship at Ayesha",
    slug: "behind-seams-craftsmanship-ayesha",
    excerpt: "An exclusive look into the artisanal techniques that make our collections extraordinary.",
    content: "Every Ayesha piece tells a story of craftsmanship passed down through generations. From hand-beaded embellishments to perfectly cut silhouettes...",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80",
    author: "Ayesha Khan",
    category: "Behind the Brand",
    tags: ["craftsmanship", "behind the scenes", "artisan", "quality"],
    publishedAt: new Date("2026-02-05"),
    readTime: 7,
  },
];

export const getBlogArticles = (): BlogArticle[] => blogArticles;

export const getBlogArticleBySlug = (slug: string): BlogArticle | undefined =>
  blogArticles.find((a) => a.slug === slug);
