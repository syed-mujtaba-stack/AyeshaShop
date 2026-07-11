"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function LuxuryCollections() {
  return (
    <section className="bg-dark overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 min-h-[420px]">
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative h-[300px] lg:h-auto overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-[1000ms] group-hover:scale-105"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=800&q=85)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/60 to-transparent lg:bg-gradient-to-r lg:from-dark/40 lg:to-transparent" />
          <div className="absolute inset-0 ring-0 ring-gold/0 transition-all duration-500 group-hover:ring-[3px] group-hover:ring-gold/20" />

          {/* Decorative label on image */}
          <div className="absolute top-6 left-6 hidden lg:block">
            <span className="text-[10px] font-semibold text-white/50 tracking-[0.3em] uppercase border border-white/10 px-3 py-1.5 rounded-full">
              Since 2024
            </span>
          </div>
        </motion.div>

        {/* Content side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center px-6 sm:px-8 lg:px-14 py-12 lg:py-0"
        >
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-gold/60" />
              <p className="text-gold-light text-[11px] font-semibold tracking-[0.25em] uppercase">
                New Collection
              </p>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-white font-bold mb-4 leading-tight">
              Evening Elegance
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Breathtaking gowns and cocktail dresses for your most memorable moments. Each piece is a celebration of craftsmanship and timeless beauty.
            </p>
            <div className="flex gap-3">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 h-10 px-5 bg-gold text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-gold-dark transition-all duration-300"
              >
                Explore
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/shop?category=luxury-dresses"
                className="inline-flex items-center gap-2 h-10 px-5 border border-white/20 text-white/70 text-xs font-medium rounded-full hover:border-gold/50 hover:text-gold-light transition-all duration-300"
              >
                Shop Dresses
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
