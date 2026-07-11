"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { CATEGORIES } from "@/constants";
import { getAllProducts } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categoryImages: Record<string, string> = {
  "luxury-dresses":
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
  "designer-bags":
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
  "fine-jewelry":
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
  "premium-beauty":
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
  "luxury-perfumes":
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
  "designer-shoes":
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
};

const categoryDescriptions: Record<string, string> = {
  "luxury-dresses": "Evening gowns, cocktail dresses, and sophisticated separates",
  "designer-bags": "Handcrafted totes, clutches, and statement bags",
  "fine-jewelry": "Diamonds, pearls, and precious gemstone creations",
  "premium-beauty": "Skincare-infused cosmetics and luxury treatments",
  "luxury-perfumes": "Captivating fragrances from master perfumers",
  "designer-shoes": "Stilettos, pumps, and artisanal footwear",
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function CategoriesPage() {
  const allProducts = getAllProducts();

  const categoriesWithCount = CATEGORIES.map((cat) => ({
    ...cat,
    productCount: allProducts.filter((p) => p.category.slug === cat.slug).length,
    products: allProducts.filter((p) => p.category.slug === cat.slug).slice(0, 4),
  }));

  return (
    <div className="min-h-screen bg-off-white">
      <div className="bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/80">Categories</span>
            </nav>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
              Shop by Category
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl">
              Explore our curated categories, each featuring the finest in luxury fashion and accessories.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categoriesWithCount.map((category, i) => (
            <motion.div
              key={category.slug}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Link href={`/shop?categories=${category.slug}`} className="group block">
                <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden mb-4">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage: `url(${categoryImages[category.slug]})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-xl md:text-2xl text-white font-bold mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {category.productCount} {category.productCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
                <p className="text-medium-gray text-sm leading-relaxed mb-3">
                  {categoryDescriptions[category.slug]}
                </p>
                <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                  Explore Collection <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {categoriesWithCount.map((category) =>
        category.products.length > 0 ? (
          <section key={`products-${category.slug}`} className="border-t border-light-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-8"
              >
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark">
                    {category.name}
                  </h2>
                  <p className="text-medium-gray text-sm mt-1">
                    {categoryDescriptions[category.slug]}
                  </p>
                </div>
                <Link href={`/shop?categories=${category.slug}`}>
                  <Button variant="ghost" size="sm" className="text-gold">
                    View All <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {category.products.map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={idx} />
                ))}
              </div>
            </div>
          </section>
        ) : null
      )}

      <div className="border-t border-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6">
              <LayoutGrid className="h-8 w-8 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">
              Can&apos;t Decide?
            </h2>
            <p className="text-medium-gray text-sm md:text-base max-w-md mx-auto mb-8">
              Browse our complete collection or let our style consultants help
              you find the perfect piece.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/shop">
                <Button variant="primary" size="lg">
                  Shop All Products
                </Button>
              </Link>
              <Link href="/collections">
                <Button variant="secondary" size="lg">
                  View Collections
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
