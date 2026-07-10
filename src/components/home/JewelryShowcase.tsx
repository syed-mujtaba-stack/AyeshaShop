"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProductsByCategory } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const jewelryProducts = getProductsByCategory("fine-jewelry").slice(0, 2);
const jewelryBg = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=85";

export function JewelryShowcase() {
  return (
    <section className="bg-off-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto lg:grid lg:grid-cols-3 lg:min-h-[400px]">
        {/* Editorial banner - spans 2 cols */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative lg:col-span-2 h-[280px] lg:h-auto overflow-hidden group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-[1000ms] group-hover:scale-105"
            style={{ backgroundImage: `url(${jewelryBg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 ring-0 ring-gold/0 transition-all duration-700 group-hover:ring-[3px] group-hover:ring-gold/20" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-px bg-gold-light/60" />
              <p className="text-gold-light text-[11px] font-semibold tracking-[0.25em] uppercase">
                Fine Jewelry
              </p>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white font-bold mb-2">
              Jewelry & Timepieces
            </h2>
            <p className="text-white/50 text-sm mb-4 max-w-md leading-relaxed">
              Handcrafted pieces that capture light and celebrate life&apos;s most precious moments.
            </p>
            <Link
              href="/shop?category=fine-jewelry"
              className="inline-flex items-center gap-2 h-9 px-5 bg-gold text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-gold-dark transition-all duration-300"
            >
              Discover <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </motion.div>

        {/* Product column */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-0 p-3 lg:p-0">
          {jewelryProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`${i === 0 ? "lg:h-1/2" : "lg:h-1/2"} ${i === 0 ? "" : "lg:border-t lg:border-white/10"}`}
            >
              <Link
                href={`/product/${product.slug}`}
                className={`group flex ${i === 0 ? "lg:flex-row" : "lg:flex-row"} items-center gap-3 lg:gap-4 p-3 lg:p-5 h-full bg-white lg:bg-transparent rounded-xl lg:rounded-none transition-all duration-300 hover:shadow-md lg:hover:shadow-none lg:hover:bg-white/50`}
              >
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden bg-lighter-gray shrink-0">
                  <div
                    className="w-full h-full bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-medium-gray uppercase tracking-[0.15em] mb-0.5">
                    {product.brand.name}
                  </p>
                  <h3 className="text-xs lg:text-sm font-medium text-dark group-hover:text-gold transition-colors truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs lg:text-sm font-semibold text-dark mt-0.5">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
