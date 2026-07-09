"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[current];

  return (
    <div className="relative h-[70vh] min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden bg-dark">
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <p className="text-gold-light text-sm sm:text-base font-medium tracking-[0.2em] uppercase mb-3">
              {slide.subtitle}
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl text-white font-bold leading-tight mb-4">
              {slide.title}
            </h1>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
              {slide.description}
            </p>
            <Link
              href={slide.href}
              className="inline-flex items-center justify-center h-12 px-8 text-base rounded-lg gold-gradient text-white shadow-sm hover:shadow-lg hover:opacity-90 transition-all duration-300 font-medium"
            >
              {slide.cta}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all text-white"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
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
      </div>
    </div>
  );
}
