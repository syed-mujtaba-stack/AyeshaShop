"use client";

import { Suspense, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sparkles, ChevronDown, PackageOpen } from "lucide-react";
import { getNewArrivals } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
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

function NewArrivalsContent() {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [showSort, setShowSort] = useState(false);

  const newArrivals = useMemo(() => getNewArrivals(), []);

  const sortedProducts = useMemo(() => {
    const result = [...newArrivals];
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
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }
    return result;
  }, [sort, newArrivals]);

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label || "Newest";

  return (
    <div className="min-h-screen bg-off-white">
      <div className="bg-gradient-to-br from-dark via-dark to-dark-gray relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80')] bg-cover bg-center opacity-10" />
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
              <span className="text-white/80">New Arrivals</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 rounded-full text-gold text-xs font-medium mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Fresh from the Atelier
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
              New Arrivals
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl">
              Discover the latest additions to our collection — from
              show-stopping evening gowns to the season&apos;s most coveted
              accessories.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-medium-gray">
            <span className="font-medium text-dark">{sortedProducts.length}</span>{" "}
            {sortedProducts.length === 1 ? "new arrival" : "new arrivals"}
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
              No new arrivals yet
            </h3>
            <p className="text-medium-gray text-sm md:text-base max-w-md mx-auto mb-8">
              We&apos;re refreshing our collection. Check back soon for the
              latest luxury arrivals.
            </p>
            <Link href="/shop">
              <Button variant="primary">Browse Full Collection</Button>
            </Link>
          </motion.div>
        )}
      </div>

      <div className="border-t border-light-gray mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-3">
              Want Early Access?
            </h2>
            <p className="text-medium-gray text-sm md:text-base max-w-md mx-auto mb-8">
              Subscribe to receive notifications about our latest drops and
              exclusive pre-launch previews.
            </p>
            <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:border-gold transition-colors"
              />
              <Button variant="primary">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function NewArrivalsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-off-white flex items-center justify-center">
          <div className="animate-pulse text-medium-gray">Loading...</div>
        </div>
      }
    >
      <NewArrivalsContent />
    </Suspense>
  );
}
