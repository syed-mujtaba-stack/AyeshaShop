"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLoaderReady } from "@/components/common/LoaderContext";

const slides = [
  {
    title: "Spring 2026 Collection",
    subtitle: "Where Elegance Meets Modernity",
    description: "Discover our latest curation of luxury pieces designed for the confident, sophisticated woman.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1440&q=80",
    cta: "Explore Collection",
    href: "/collections",
  },
  {
    title: "Timeless Evening Gowns",
    subtitle: "Crafted for Moments That Matter",
    description: "Exquisite hand-beaded creations from the world's finest ateliers. Each piece tells a story of unparalleled craftsmanship.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1440&q=80",
    cta: "Shop Evening Wear",
    href: "/shop?category=luxury-dresses",
  },
  {
    title: "The Art of Luxury",
    subtitle: "New Arrivals From Maison Luxe",
    description: "Hand-selected pieces that define modern sophistication. Limited quantities available.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1440&q=80",
    cta: "Discover Now",
    href: "/new-arrivals",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const loaded = useLoaderReady();
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(goNext, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goNext]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    },
    [goNext, goPrev]
  );

  const slide = slides[current];

  return (
    <div
      className="relative h-[70vh] min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden bg-dark"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Hero carousel"
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

      <div className="relative h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: loaded ? 40 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, delay: loaded ? 0.15 : 0 }}
            className="max-w-xl"
          >
            <motion.p
              initial={{ opacity: 0, y: loaded ? 20 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: loaded ? 0.3 : 0 }}
              className="text-gold-light text-sm sm:text-base font-medium tracking-[0.2em] uppercase mb-3"
            >
              {slide.subtitle}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: loaded ? 30 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: loaded ? 0.45 : 0 }}
              className="font-heading text-4xl sm:text-5xl lg:text-7xl text-white font-bold leading-tight mb-4"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: loaded ? 20 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: loaded ? 0.6 : 0 }}
              className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-lg"
            >
              {slide.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: loaded ? 20 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: loaded ? 0.75 : 0 }}
            >
              <Link
                href={slide.href}
                className="inline-flex items-center justify-center h-12 px-8 text-base rounded-lg gold-gradient text-white shadow-sm hover:shadow-lg hover:opacity-90 transition-all duration-300 font-medium"
              >
                {slide.cta}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <motion.button
        onClick={goPrev}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: loaded ? 0.9 : 0 }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </motion.button>
      <motion.button
        onClick={goNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: loaded ? 0.9 : 0 }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all text-white"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </motion.button>

      {/* Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: loaded ? 1.0 : 0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "w-8 bg-gold" : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </motion.div>
    </div>
  );
}
