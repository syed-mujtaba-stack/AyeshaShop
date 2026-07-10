"use client";

import { Suspense, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Award, ChevronDown, PackageOpen } from "lucide-react";
import { getBestSellers } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Best Rated", value: "rating" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function BestSellersContent() {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "popular");
  const [showSort, setShowSort] = useState(false);

  const bestSellers = useMemo(() => getBestSellers(), []);

  const sortedProducts = useMemo(() => {
    const result = [...bestSellers];
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "popular":
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
    return result;
  }, [sort, bestSellers]);

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label || "Most Popular";

  return (
    <div className="min-h-screen bg-off-white">
      <div className="bg-gradient-to-br from-dark via-dark to-dark-gray relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/80 to-dark/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/80">Best Sellers</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 rounded-full text-gold text-xs font-medium mb-4">
              <Award className="h-3.5 w-3.5" />
              Customer Favorites
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
              Best Sellers
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl">
              Our most-loved pieces, handpicked by customers like you. These
              are the designs that define luxury.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-medium-gray">
            <span className="font-medium text-dark">{sortedProducts.length}</span>{" "}
            {sortedProducts.length === 1 ? "best seller" : "best sellers"}
          </p>

          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-dark border border-border rounded-lg hover:border-gold/30 transition-colors"
            >
              Sort: <span className="font-medium">{currentSortLabel}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  showSort && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl border border-border shadow-lg z-20 overflow-hidden"
                >
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSort(option.value);
                        setShowSort(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-sm transition-colors",
                        sort === option.value
                          ? "bg-gold/5 text-gold font-medium"
                          : "text-dark hover:bg-lighter-gray"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {sortedProducts.map((product, index) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12 md:mt-16 bg-white rounded-2xl border border-light-gray p-8 md:p-12 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6">
                <Award className="h-8 w-8 text-gold" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">
                Why They&apos;re Best Sellers
              </h2>
              <p className="text-medium-gray text-sm md:text-base max-w-lg mx-auto mb-8">
                Each piece earns its place through exceptional craftsmanship,
                timeless design, and the approval of our discerning clientele.
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-gold">4.7+</p>
                  <p className="text-xs text-medium-gray mt-1">Avg. Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-gold">500+</p>
                  <p className="text-xs text-medium-gray mt-1">Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-gold">98%</p>
                  <p className="text-xs text-medium-gray mt-1">Satisfaction</p>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 md:py-24"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-lighter-gray mb-6">
              <PackageOpen className="h-10 w-10 text-medium-gray" />
            </div>
            <h3 className="font-heading text-xl md:text-2xl font-semibold text-dark mb-2">
              No best sellers yet
            </h3>
            <p className="text-medium-gray text-sm md:text-base max-w-md mx-auto mb-8">
              Our best sellers are being curated. Check back soon.
            </p>
            <Link href="/shop">
              <Button variant="primary">Browse Full Collection</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function BestSellersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-off-white flex items-center justify-center">
          <div className="animate-pulse text-medium-gray">Loading...</div>
        </div>
      }
    >
      <BestSellersContent />
    </Suspense>
  );
}
