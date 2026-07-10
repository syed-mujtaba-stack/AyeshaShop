"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProductsByCategory } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const beautyProducts = getProductsByCategory("premium-beauty").slice(0, 1);
const perfumeProducts = getProductsByCategory("luxury-perfumes").slice(0, 1);
const beautyBg = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=85";

export function BeautyEdit() {
  const items = [...beautyProducts, ...perfumeProducts];

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto lg:grid lg:grid-cols-2 lg:min-h-[380px]">
        {/* Product grid side */}
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-px bg-gold/60" />
              <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase">
                Beauty Edit
              </p>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-dark mb-1">
              The Beauty Room
            </h2>
            <p className="text-dark/50 text-sm mb-5 max-w-sm leading-relaxed">
              Discover curated skincare, makeup, and fragrances from the world&apos;s finest houses.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {items.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="group block"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-lighter-gray mb-2.5 transition-all duration-500 group-hover:shadow-lg">
                    <div
                      className="w-full h-full bg-cover bg-center transition-all duration-[600ms] group-hover:scale-105"
                      style={{ backgroundImage: `url(${product.images[0]})` }}
                    />
                  </div>
                  <p className="text-[10px] text-medium-gray uppercase tracking-[0.15em]">{product.brand.name}</p>
                  <p className="text-xs font-medium text-dark group-hover:text-gold transition-colors truncate">{product.name}</p>
                  <p className="text-xs font-semibold text-dark mt-0.5">{formatPrice(product.price)}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4"
          >
            <Link
              href="/shop?category=premium-beauty"
              className="inline-flex items-center gap-2 text-xs font-medium text-dark/50 hover:text-gold transition-colors"
            >
              <span>Shop All Beauty</span>
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[260px] lg:h-auto order-1 lg:order-2 overflow-hidden group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-[1000ms] group-hover:scale-105"
            style={{ backgroundImage: `url(${beautyBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-white/20 via-transparent to-transparent hidden lg:block" />
          <div className="absolute inset-0 ring-0 ring-gold/0 transition-all duration-700 group-hover:ring-[3px] group-hover:ring-gold/20" />
        </motion.div>
      </div>
    </section>
  );
}
