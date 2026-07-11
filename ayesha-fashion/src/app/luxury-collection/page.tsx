"use client";

import { Suspense, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Diamond,
  ChevronDown,
  PackageOpen,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { products as allProducts, getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
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

const perks = [
  {
    icon: ShieldCheck,
    title: "Authenticity Guaranteed",
    description: "Every piece is certified genuine",
  },
  {
    icon: Truck,
    title: "Complimentary Shipping",
    description: "On orders over PKR 50,000",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Hassle-free returns & exchanges",
  },
];

function LuxuryCollectionContent() {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "featured");
  const [showSort, setShowSort] = useState(false);

  const luxuryProducts = useMemo(() => {
    return allProducts.filter(
      (p) =>
        p.price >= 100000 ||
        p.tags.includes("luxury") ||
        p.tags.includes("limited")
    );
  }, []);

  const sortedProducts = useMemo(() => {
    const result = [...luxuryProducts];
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
      case "featured":
      default:
        result.sort((a, b) => (a.isFeatured === b.isFeatured ? 0 : a.isFeatured ? -1 : 1));
        break;
    }
    return result;
  }, [sort, luxuryProducts]);

  const featured = getFeaturedProducts();
  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label || "Featured";

  const heroProduct = featured[0] || allProducts[0];

  return (
    <div className="min-h-screen bg-off-white">
      <div className="relative h-[60vh] md:h-[75vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              heroProduct?.images[0] ||
              "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
            })`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute top-6 left-0 right-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/80">Luxury Collection</span>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 rounded-full text-gold text-xs font-medium mb-4 backdrop-blur-sm">
              <Diamond className="h-3.5 w-3.5" />
              The Pinnacle of Luxury
            </div>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-4 leading-tight">
              The Luxury <br />
              Collection
            </h1>
            <p className="text-white/70 text-sm md:text-lg max-w-lg mb-6">
              Exquisite pieces defined by rare craftsmanship, exceptional
              materials, and timeless design. For those who accept nothing but
              the finest.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#products">
                <Button variant="primary" size="lg">
                  Explore Collection
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-dark"
                >
                  Private Viewing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative -mt-16 z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-light-gray p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <div key={perk.title} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gold/10 shrink-0">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">{perk.title}</p>
                    <p className="text-xs text-medium-gray">{perk.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark">
              The Collection
            </h2>
            <p className="text-medium-gray text-sm mt-1">
              <span className="font-medium text-dark">{sortedProducts.length}</span>{" "}
              {sortedProducts.length === 1 ? "piece" : "pieces"}
            </p>
          </div>

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
              No pieces available
            </h3>
            <p className="text-medium-gray text-sm md:text-base max-w-md mx-auto mb-8">
              The Luxury Collection is being refreshed. Please check back soon.
            </p>
            <Link href="/shop">
              <Button variant="primary">Browse Full Collection</Button>
            </Link>
          </motion.div>
        )}
      </div>

      {featured.length > 0 && (
        <section className="border-t border-light-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-2">
                Featured Pieces
              </h2>
              <p className="text-medium-gray text-sm mb-8">
                Exceptional designs selected by our curators
              </p>
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            >
              {featured.slice(0, 8).map((product, index) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <section className="bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Diamond className="h-12 w-12 text-gold mx-auto mb-6" />
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4">
              Beyond the Collection
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto mb-8">
              Experience luxury reimagined. From private appointments to
              bespoke commissions, discover a world of unparalleled elegance.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="gold-gradient"
                >
                  Book Private Appointment
                </Button>
              </Link>
              <Link href="/categories">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-dark"
                >
                  Browse Categories
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function LuxuryCollectionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-off-white flex items-center justify-center">
          <div className="animate-pulse text-medium-gray">Loading...</div>
        </div>
      }
    >
      <LuxuryCollectionContent />
    </Suspense>
  );
}
