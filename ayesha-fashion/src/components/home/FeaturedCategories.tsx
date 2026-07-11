"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/constants";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const featuredCards = [
  { ...CATEGORIES[0], aspect: "aspect-[3/4]", label: "Eveningwear" },
  { ...CATEGORIES[1], aspect: "aspect-[4/3]", label: "Accessories" },
  { ...CATEGORIES[2], aspect: "aspect-square", label: "Fine Jewelry" },
];

export function FeaturedCategories() {
  return (
    <section className="py-14 lg:py-16 bg-off-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
              The World of Ayesha
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-dark">
              Curated Editions
            </h2>
          </div>
          <Link
            href="/categories"
            className="group hidden sm:flex items-center gap-2 text-xs font-medium text-dark/50 hover:text-gold transition-colors"
          >
            <span>Explore All</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-5"
          style={{ gridTemplateRows: "350px" }}
        >
          {featuredCards.map((cat, i) => (
            <motion.div key={cat.slug} variants={cardVariants}>
              <Link
                href={`/shop?category=${cat.slug}`}
                className="group block relative h-full rounded-2xl overflow-hidden bg-lighter-gray"
                style={{ height: i === 0 ? "380px" : i === 1 ? "320px" : "350px", alignSelf: i === 1 ? "end" : "start" }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-[800ms] group-hover:scale-105"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute inset-0 ring-0 ring-gold/0 transition-all duration-500 group-hover:ring-[3px] group-hover:ring-gold/30 rounded-2xl" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {cat.label}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[11px] text-gold-light font-medium tracking-[0.2em] uppercase mb-1">
                    Shop
                  </p>
                  <h3 className="font-heading text-xl text-white font-bold">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="snap-start shrink-0 w-[65vw] h-[320px] relative rounded-2xl overflow-hidden bg-lighter-gray group"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-heading text-lg text-white font-semibold">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-dark/10 rounded-full text-xs font-medium text-dark/50 hover:border-gold hover:text-gold transition-all"
            >
              Explore All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
