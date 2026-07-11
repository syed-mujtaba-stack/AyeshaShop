"use client";

import { Suspense, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  X,
  PackageOpen,
  ChevronDown,
} from "lucide-react";
import { products as allProducts } from "@/data/products";
import { CATEGORIES } from "@/constants";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
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

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = searchParams.get("q") || "";
  const categoryFilter = searchParams.get("category") || "";
  const sortParam = searchParams.get("sort") || "relevance";

  const [searchInput, setSearchInput] = useState(query);
  const [sort, setSort] = useState(sortParam);
  const [showSort, setShowSort] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.name.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category.slug === selectedCategory);
    }

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
      case "relevance":
      default:
        if (query) {
          const q = query.toLowerCase();
          result.sort((a, b) => {
            const aName = a.name.toLowerCase().includes(q) ? 2 : 0;
            const bName = b.name.toLowerCase().includes(q) ? 2 : 0;
            const aTag = a.tags.some((t) => t.toLowerCase().includes(q)) ? 1 : 0;
            const bTag = b.tags.some((t) => t.toLowerCase().includes(q)) ? 1 : 0;
            return bName + bTag - (aName + aTag);
          });
        }
        break;
    }

    return result;
  }, [query, selectedCategory, sort]);

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label || "Relevance";

  const updateURL = useCallback(
    (q: string, cat: string, s: string) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat) params.set("category", cat);
      if (s !== "relevance") params.set("sort", s);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname]
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      updateURL(searchInput, selectedCategory, sort);
    },
    [searchInput, selectedCategory, sort, updateURL]
  );

  const handleClear = useCallback(() => {
    setSearchInput("");
    setSelectedCategory("");
    setSort("relevance");
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  const [prevQuery, setPrevQuery] = useState(query);
  const [prevCategory, setPrevCategory] = useState(categoryFilter);
  const [prevSort, setPrevSort] = useState(sortParam);

  if (prevQuery !== query) {
    setPrevQuery(query);
    setSearchInput(query);
  }
  if (prevCategory !== categoryFilter) {
    setPrevCategory(categoryFilter);
    setSelectedCategory(categoryFilter);
  }
  if (prevSort !== sortParam) {
    setPrevSort(sortParam);
    setSort(sortParam);
  }

  const hasActiveFilters = !!selectedCategory;

  return (
    <div className="min-h-screen bg-off-white">
      <div className="bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
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
              <span className="text-white/80">Search</span>
            </nav>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-6">
              Search
            </h1>
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-medium-gray" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search for products, brands, categories..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold transition-colors"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      updateURL("", selectedCategory, sort);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {query && (
              <p className="text-sm text-medium-gray">
                Results for &ldquo;<span className="font-medium text-dark">{query}</span>&rdquo;
                {" — "}
                <span className="font-medium text-dark">{filteredProducts.length}</span>{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            )}
            {!query && !hasActiveFilters && (
              <p className="text-sm text-medium-gray">
                Enter a search term or browse our categories below
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm border rounded-lg transition-colors",
                showFilters || hasActiveFilters
                  ? "border-gold text-gold bg-gold/5"
                  : "border-border text-dark hover:border-gold/30"
              )}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="bg-gold text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                  1
                </span>
              )}
            </button>

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
                          updateURL(query, selectedCategory, option.value);
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

            {(query || hasActiveFilters) && (
              <button
                onClick={handleClear}
                className="flex items-center gap-1 text-sm text-medium-gray hover:text-error transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white rounded-xl border border-light-gray p-4 md:p-6">
                <p className="text-xs font-medium text-dark uppercase tracking-wider mb-3">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory("");
                      updateURL(query, "", sort);
                    }}
                    className={cn(
                      "px-3 py-1.5 text-xs rounded-lg border transition-colors",
                      !selectedCategory
                        ? "bg-dark text-white border-dark"
                        : "border-border text-dark hover:border-gold/30"
                    )}
                  >
                    All
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        updateURL(query, cat.slug, sort);
                      }}
                      className={cn(
                        "px-3 py-1.5 text-xs rounded-lg border transition-colors",
                        selectedCategory === cat.slug
                          ? "bg-dark text-white border-dark"
                          : "border-border text-dark hover:border-gold/30"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProducts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filteredProducts.map((product, index) => (
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
              {query
                ? `No results for "${query}"`
                : "No products found"}
            </h3>
            <p className="text-medium-gray text-sm md:text-base max-w-md mx-auto mb-8">
              {query
                ? "We couldn't find any products matching your search. Try different keywords or browse our categories."
                : "Try adjusting your filters or browse our full collection."}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="primary" onClick={handleClear}>
                {query ? "Clear Search" : "Clear Filters"}
              </Button>
              <Link href="/shop">
                <Button variant="secondary">Browse All Products</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {!query && !hasActiveFilters && (
        <div className="border-t border-light-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-6">
                Browse by Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {CATEGORIES.map((cat, i) => (
                  <motion.div
                    key={cat.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={`/shop?categories=${cat.slug}`}
                      className="block text-center p-4 bg-white rounded-xl border border-light-gray hover:border-gold/30 hover:shadow-sm transition-all group"
                    >
                      <p className="text-sm font-medium text-dark group-hover:text-gold transition-colors">
                        {cat.name}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-off-white flex items-center justify-center">
          <div className="animate-pulse text-medium-gray">Loading...</div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
