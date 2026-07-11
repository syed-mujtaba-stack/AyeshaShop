"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Heart, Eye } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export function TrendingProducts() {
  const products = getFeaturedProducts().slice(0, 6);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={containerRef} className="py-14 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
              The Edit
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-dark">
              Curated for You
            </h2>
          </div>
          <Link
            href="/shop"
            className="group hidden sm:flex items-center gap-2 text-xs font-medium text-dark/50 hover:text-gold transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      <div className="relative">
        <motion.div
          style={{ x }}
          className="flex gap-4 lg:gap-5 pl-4 sm:pl-6 lg:pl-[calc((100vw-1280px)/2)]"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group shrink-0 w-[240px] sm:w-[270px] lg:w-[300px]"
            >
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-lighter-gray mb-3 transition-all duration-500 group-hover:shadow-xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-[600ms] group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute inset-0 ring-0 ring-gold/0 transition-all duration-400 group-hover:ring-2 group-hover:ring-gold/20 rounded-xl" />

                  {product.isNew && (
                    <span className="absolute top-3 left-3 text-[10px] font-semibold text-white bg-dark/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      New
                    </span>
                  )}

                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <span className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="h-3.5 w-3.5 text-dark" />
                    </span>
                    <span className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Eye className="h-3.5 w-3.5 text-dark" />
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="block w-full py-2 bg-white/90 backdrop-blur-md text-dark text-[10px] font-semibold uppercase tracking-wider text-center rounded-lg">
                      Quick View
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-medium-gray uppercase tracking-[0.15em] mb-0.5">
                  {product.brand.name}
                </p>
                <h3 className="text-sm font-medium text-dark group-hover:text-gold transition-colors truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-sm font-semibold text-dark">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-[11px] text-medium-gray line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-7 sm:hidden">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-dark/10 rounded-full text-xs font-medium text-dark/50 hover:border-gold hover:text-gold transition-all"
        >
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </section>
  );
}
