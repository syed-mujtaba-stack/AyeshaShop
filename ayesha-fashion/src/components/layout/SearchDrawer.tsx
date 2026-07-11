"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useUI } from "@/hooks/use-ui";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export function SearchDrawer() {
  const { isSearchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof products>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (query.length > 1) {
      const q = query.toLowerCase();
      setResults(
        products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.name.toLowerCase().includes(q) ||
            p.brand.name.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q))
        )
      );
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={closeSearch}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xl"
          >
            <div className="max-w-3xl mx-auto px-4 py-6">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-medium-gray shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search luxury fashion..."
                  className="flex-1 text-lg bg-transparent border-none outline-none placeholder:text-medium-gray"
                />
                <button
                  onClick={closeSearch}
                  className="p-2 hover:bg-lighter-gray rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {results.length > 0 && (
                <div className="mt-4 border-t border-border pt-4 max-h-[60vh] overflow-y-auto">
                  <p className="text-xs text-medium-gray mb-3">
                    {results.length} result{results.length !== 1 && "s"} found
                  </p>
                  <div className="space-y-2">
                    {results.slice(0, 6).map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 p-2 hover:bg-lighter-gray rounded-lg transition-colors group"
                      >
                        <div
                          className="w-14 h-14 rounded-lg bg-cover bg-center shrink-0"
                          style={{ backgroundImage: `url(${product.images[0]})` }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-dark truncate group-hover:text-gold transition-colors">
                            {product.name}
                          </p>
                          <p className="text-xs text-medium-gray truncate">
                            {product.brand.name}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-dark shrink-0">
                          {formatPrice(product.price)}
                        </p>
                      </Link>
                    ))}
                  </div>
                  {results.length > 6 && (
                    <Link
                      href={`/shop?q=${encodeURIComponent(query)}`}
                      onClick={closeSearch}
                      className="flex items-center justify-center gap-2 mt-3 py-2.5 text-sm font-medium text-gold hover:bg-gold/5 rounded-lg transition-colors"
                    >
                      View all results
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              )}
              {query.length > 1 && results.length === 0 && (
                <div className="mt-4 border-t border-border pt-8 text-center">
                  <p className="text-medium-gray">No results found for &quot;{query}&quot;</p>
                  <p className="text-xs text-medium-gray mt-1">Try searching for something else</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
