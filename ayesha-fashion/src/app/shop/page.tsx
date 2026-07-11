"use client";

import { Suspense, useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, PackageOpen, RotateCcw } from "lucide-react";
import { ProductCard } from "@/components/common/ProductCard";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { ShopHeader } from "@/components/shop/ShopHeader";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { products as allProducts } from "@/data/products";

const PRODUCTS_PER_PAGE = 12;
const PRICE_MIN = 0;
const PRICE_MAX = 600000;

type ViewMode = "grid" | "list";

interface FilterState {
  categories: string[];
  brands: string[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  search: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function parsePrice(value: string, fallback: number): number {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
}

export default function ShopPageWrapper() {
  return (
    <Suspense fallback={<ShopPageSkeleton />}>
      <ShopPage />
    </Suspense>
  );
}

function ShopPageSkeleton() {
  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="skeleton h-4 w-32 rounded mb-6" />
        <div className="skeleton h-10 w-72 rounded-lg mb-6" />
        <div className="flex gap-8">
          <div className="hidden lg:block w-[300px] shrink-0">
            <div className="rounded-2xl border border-light-gray/50 overflow-hidden">
              <div className="p-5 space-y-4">
                <div className="skeleton h-8 w-full rounded-lg" />
                <div className="skeleton h-8 w-full rounded-lg" />
                <div className="skeleton h-8 w-full rounded-lg" />
                <div className="skeleton h-8 w-full rounded-lg" />
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="skeleton h-12 rounded-xl mb-6" />
            <ProductGridSkeleton count={12} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const gridRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<FilterState>(() => ({
    categories: searchParams.get("categories")?.split(",").filter(Boolean) || [],
    brands: searchParams.get("brands")?.split(",").filter(Boolean) || [],
    colors: searchParams.get("colors")?.split(",").filter(Boolean) || [],
    sizes: searchParams.get("sizes")?.split(",").filter(Boolean) || [],
    priceRange: [
      parsePrice(searchParams.get("minPrice") || "", PRICE_MIN),
      parsePrice(searchParams.get("maxPrice") || "", PRICE_MAX),
    ],
    search: searchParams.get("search") || "",
  }));
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(page) || page < 1 ? 1 : page;
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);
  const [prevFilters, setPrevFilters] = useState(JSON.stringify(filters));

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    filters.colors.length +
    filters.sizes.length +
    (filters.priceRange[0] > PRICE_MIN || filters.priceRange[1] < PRICE_MAX ? 1 : 0) +
    (filters.search ? 1 : 0);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.name.toLowerCase().includes(query) ||
          p.category.name.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) =>
        filters.categories.includes(p.category.slug)
      );
    }

    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand.slug));
    }

    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => filters.colors.includes(c.name.toLowerCase()))
      );
    }

    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => filters.sizes.includes(s.name))
      );
    }

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

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
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
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
  }, [filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * PRODUCTS_PER_PAGE,
    safePage * PRODUCTS_PER_PAGE
  );

  const updateURL = useCallback(
    (f: FilterState, s: string, p: number) => {
      const params = new URLSearchParams();
      if (f.categories.length > 0) params.set("categories", f.categories.join(","));
      if (f.brands.length > 0) params.set("brands", f.brands.join(","));
      if (f.colors.length > 0) params.set("colors", f.colors.join(","));
      if (f.sizes.length > 0) params.set("sizes", f.sizes.join(","));
      if (f.priceRange[0] > PRICE_MIN) params.set("minPrice", String(f.priceRange[0]));
      if (f.priceRange[1] < PRICE_MAX) params.set("maxPrice", String(f.priceRange[1]));
      if (f.search) params.set("search", f.search);
      if (s !== "newest") params.set("sort", s);
      if (p > 1) params.set("page", String(p));
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL(filters, sort, safePage);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, sort, safePage, updateURL]);

  useEffect(() => {
    const filtersChanged = JSON.stringify(filters) !== prevFilters;
    if (filtersChanged) setCurrentPage(1);
    setPrevFilters(JSON.stringify(filters));
  }, [filters, prevFilters]);

  useEffect(() => {
    if (safePage !== currentPage) setCurrentPage(safePage);
  }, [safePage, currentPage]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSort(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const clearAllFilters = () => {
    handleFilterChange({
      categories: [],
      brands: [],
      colors: [],
      sizes: [],
      priceRange: [PRICE_MIN, PRICE_MAX],
      search: "",
    });
  };

  return (
    <div className="min-h-screen bg-off-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex gap-8 lg:gap-10">
          {/* Desktop sidebar */}
          <AnimatePresence mode="wait">
            {showDesktopFilters && (
              <motion.aside
                key="desktop-filters"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="hidden lg:block w-[300px] shrink-0"
              >
                <div className="bg-white rounded-2xl border border-light-gray/50 shadow-sm sticky top-24 overflow-hidden">
                  <ShopFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    totalProducts={allProducts.length}
                    filteredCount={filteredProducts.length}
                    isMobile={false}
                  />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main content */}
          <div className="flex-1 min-w-0" ref={gridRef}>
            <ShopHeader
              sort={sort}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalProducts={allProducts.length}
              filteredCount={filteredProducts.length}
              onToggleFilters={() => {
                if (window.innerWidth < 1024) {
                  setShowMobileFilters(true);
                } else {
                  setShowDesktopFilters(!showDesktopFilters);
                }
              }}
              activeFilterCount={activeFilterCount}
              showFilters={showDesktopFilters}
            />

            {/* Mobile filter button */}
            <div className="lg:hidden mt-4">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="w-full h-10 flex items-center justify-center gap-2 bg-white border border-light-gray rounded-xl text-xs font-medium text-dark/60 hover:border-gold/30 hover:text-gold transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-gold text-white text-[9px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Product grid / list */}
            <div className="mt-6">
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lighter-gray mb-5">
                    <PackageOpen className="h-8 w-8 text-medium-gray" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-dark mb-2">
                    No products found
                  </h3>
                  <p className="text-medium-gray text-sm max-w-md mx-auto mb-6">
                    Try adjusting your filters or search criteria.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 h-9 px-5 bg-dark text-white text-xs font-medium rounded-lg hover:bg-dark-gray transition-all"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Clear All Filters
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  {viewMode === "grid" ? (
                    <motion.div
                      key="grid-view"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5"
                    >
                      {paginatedProducts.map((product) => (
                        <motion.div key={product.id} variants={itemVariants}>
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="list-view"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-3"
                    >
                      {paginatedProducts.map((product) => (
                        <motion.div key={product.id} variants={itemVariants}>
                          <ProductCard product={product} variant="horizontal" />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && paginatedProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-10 flex items-center justify-center gap-2"
              >
                <button
                  onClick={() => handlePageChange(safePage - 1)}
                  disabled={safePage <= 1}
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-200",
                    safePage <= 1
                      ? "border-light-gray text-light-gray cursor-not-allowed"
                      : "border-border text-dark/60 hover:border-gold/40 hover:text-gold"
                  )}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>

                {generatePaginationNumbers(safePage, totalPages).map(
                  (pageNum, idx) =>
                    pageNum === "..." ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="flex items-center justify-center w-9 h-9 text-medium-gray text-xs"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum as number)}
                        className={cn(
                          "flex items-center justify-center w-9 h-9 rounded-lg text-xs font-medium transition-all duration-200",
                          safePage === pageNum
                            ? "bg-dark text-white shadow-sm"
                            : "border border-border text-dark/60 hover:border-gold/40 hover:text-gold"
                        )}
                        aria-label={`Page ${pageNum}`}
                        aria-current={safePage === pageNum ? "page" : undefined}
                      >
                        {pageNum}
                      </button>
                    )
                )}

                <button
                  onClick={() => handlePageChange(safePage + 1)}
                  disabled={safePage >= totalPages}
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-200",
                    safePage >= totalPages
                      ? "border-light-gray text-light-gray cursor-not-allowed"
                      : "border-border text-dark/60 hover:border-gold/40 hover:text-gold"
                  )}
                  aria-label="Next page"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl"
            >
              <ShopFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClose={() => setShowMobileFilters(false)}
                isMobile
                totalProducts={allProducts.length}
                filteredCount={filteredProducts.length}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function generatePaginationNumbers(
  current: number,
  total: number
): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  if (current <= 3) {
    for (let i = 1; i <= Math.min(4, total); i++) pages.push(i);
    if (current !== total) {
      pages.push("...");
      pages.push(total);
    }
  } else if (current >= total - 2) {
    pages.push(1);
    pages.push("...");
    for (let i = total - 3; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push("...");
    pages.push(current - 1);
    pages.push(current);
    pages.push(current + 1);
    pages.push("...");
    pages.push(total);
  }

  return pages;
}
