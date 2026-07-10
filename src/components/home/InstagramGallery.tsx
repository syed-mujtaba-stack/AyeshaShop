"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, ArrowRight } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&q=85",
  "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=85",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&q=85",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=85",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=85",
];

export function InstagramGallery() {
  return (
    <section className="py-14 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-6"
        >
          <div>
            <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
              Follow Us
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-dark">
              @ayesha_fashion
            </h2>
          </div>
          <Link
            href="#"
            className="group hidden sm:flex items-center gap-2 text-xs font-medium text-dark/50 hover:text-gold transition-colors"
          >
            <Camera className="h-3.5 w-3.5" />
            <span>Follow</span>
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      {/* Desktop gallery row */}
      <div className="hidden md:block max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-3 lg:gap-4">
          {images.map((src, i) => (
            <motion.a
              key={i}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group relative flex-1 aspect-square rounded-xl overflow-hidden bg-lighter-gray"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-[600ms] group-hover:scale-105"
                style={{ backgroundImage: `url(${src})` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
              <div className="absolute inset-0 ring-0 ring-gold/0 transition-all duration-400 group-hover:ring-2 group-hover:ring-gold/20 rounded-xl" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <Camera className="h-4 w-4 text-dark" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Mobile horizontal scroll */}
      <div className="md:hidden -mx-4 px-4">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2" style={{ scrollbarWidth: "none" }}>
          {images.map((src, i) => (
            <motion.a
              key={i}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="snap-start shrink-0 w-[65vw] aspect-square rounded-xl overflow-hidden bg-lighter-gray group"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${src})` }}
              />
            </motion.a>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-dark/10 rounded-full text-xs font-medium text-dark/50 hover:border-gold hover:text-gold transition-all"
          >
            <Camera className="h-3.5 w-3.5" />
            <span>Follow @ayesha_fashion</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
