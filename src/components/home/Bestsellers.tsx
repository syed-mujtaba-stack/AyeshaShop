"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { getBestSellers } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function Bestsellers() {
  const products = getBestSellers().slice(0, 4);

  return (
    <section className="py-14 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-7"
        >
          <div>
            <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
              Bestsellers
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-dark">
              Most Wanted
            </h2>
          </div>
          <Link
            href="/best-sellers"
            className="group hidden sm:flex items-center gap-2 text-xs font-medium text-dark/50 hover:text-gold transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="hidden md:grid md:grid-cols-4 gap-4 lg:gap-5"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <Link
                href={`/product/${product.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-lighter-gray mb-3 transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-0.5">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-[600ms] group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  <div className="absolute inset-0 ring-0 ring-gold/0 transition-all duration-400 group-hover:ring-2 group-hover:ring-gold/20 rounded-xl" />
                  {product.discount && (
                    <span className="absolute top-3 left-3 text-[10px] font-semibold text-white bg-gold/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-medium-gray uppercase tracking-[0.15em] mb-0.5">
                  {product.brand.name}
                </p>
                <h3 className="text-sm font-medium text-dark group-hover:text-gold transition-colors truncate">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-sm font-semibold text-dark">
                    {formatPrice(product.price)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    <span className="text-[10px] text-medium-gray">{product.rating}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2" style={{ scrollbarWidth: "none" }}>
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="snap-start shrink-0 w-[50vw] group"
              >
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-lighter-gray mb-2">
                  <div
                    className="w-full h-full bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                  />
                </div>
                <p className="text-[10px] text-medium-gray uppercase truncate">{product.brand.name}</p>
                <p className="text-xs font-medium text-dark truncate">{product.name}</p>
                <p className="text-xs font-semibold text-dark">{formatPrice(product.price)}</p>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <Link
              href="/best-sellers"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-dark/10 rounded-full text-xs font-medium text-dark/50 hover:border-gold hover:text-gold transition-all"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
