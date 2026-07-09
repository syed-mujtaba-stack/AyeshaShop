"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getNewArrivals } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const masonryImages = [
  "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=85",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=85",
  "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=85",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=85",
];

export function NewArrivalsSection() {
  const products = getNewArrivals().slice(0, 4);

  return (
    <section className="py-14 lg:py-16 bg-off-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
              New In
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-dark">
              The New Season
            </h2>
          </div>
          <Link
            href="/new-arrivals"
            className="group hidden sm:flex items-center gap-2 text-xs font-medium text-dark/50 hover:text-gold transition-colors"
          >
            <span>Shop New</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Desktop: asymmetrical masonry */}
        <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-3 lg:gap-4" style={{ height: "420px" }}>
          {/* Large image (tall) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-lighter-gray group"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-[800ms] group-hover:scale-105"
              style={{ backgroundImage: `url(${masonryImages[0]})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 ring-0 ring-gold/0 transition-all duration-500 group-hover:ring-[3px] group-hover:ring-gold/20 rounded-2xl" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[10px] text-gold-light font-semibold tracking-[0.2em] uppercase mb-1">
                Featured
              </p>
              <h3 className="font-heading text-xl text-white font-bold">
                Spring Silhouettes
              </h3>
            </div>
          </motion.div>

          {/* Top right - small square */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 row-span-1 relative rounded-xl overflow-hidden bg-lighter-gray group"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-[600ms] group-hover:scale-105"
              style={{ backgroundImage: `url(${masonryImages[1]})` }}
            />
            <div className="absolute inset-0 ring-0 ring-gold/0 transition-all duration-500 group-hover:ring-2 group-hover:ring-gold/20 rounded-xl" />
          </motion.div>

          {/* Bottom right - small square */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="col-span-1 row-span-1 relative rounded-xl overflow-hidden bg-lighter-gray group"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-[600ms] group-hover:scale-105"
              style={{ backgroundImage: `url(${masonryImages[2]})` }}
            />
            <div className="absolute inset-0 ring-0 ring-gold/0 transition-all duration-500 group-hover:ring-2 group-hover:ring-gold/20 rounded-xl" />
          </motion.div>

          {/* Far right - tall column with product info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 row-span-2 relative rounded-2xl overflow-hidden bg-dark group"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-[800ms] group-hover:scale-105"
              style={{ backgroundImage: `url(${masonryImages[3]})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/20" />
            <div className="absolute inset-0 ring-0 ring-gold/0 transition-all duration-500 group-hover:ring-[3px] group-hover:ring-gold/20 rounded-2xl" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[10px] text-gold-light font-semibold tracking-[0.2em] uppercase mb-3">
                Shop New
              </p>
              <Link
                href="/new-arrivals"
                className="inline-flex items-center gap-2 text-xs font-medium text-white border-b border-white/20 pb-1 hover:border-gold hover:text-gold transition-all"
              >
                Discover More <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Mobile: horizontal product cards */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2" style={{ scrollbarWidth: "none" }}>
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="snap-start shrink-0 w-[55vw] group"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-lighter-gray mb-2">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                  />
                </div>
                <p className="text-[10px] text-medium-gray uppercase tracking-[0.15em]">{product.brand.name}</p>
                <p className="text-xs font-medium text-dark truncate">{product.name}</p>
                <p className="text-xs font-semibold text-dark">{formatPrice(product.price)}</p>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <Link
              href="/new-arrivals"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-dark/10 rounded-full text-xs font-medium text-dark/50 hover:border-gold hover:text-gold transition-all"
            >
              Shop New <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
