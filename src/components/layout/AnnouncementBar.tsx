"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

const announcements = [
  "Complimentary shipping on all orders above PKR 5,000",
  "Spring 2026 Collection — Now Available",
  "Loyalty Program: Earn points on every purchase",
];

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isVisible, next]);

  if (!isVisible) return null;

  return (
    <div className="relative bg-dark text-white text-center text-xs sm:text-sm py-2.5 px-4 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center tracking-wide"
        >
          {announcements[currentIndex]}
        </motion.p>
      </AnimatePresence>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Close announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-1.5">
        {announcements.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === currentIndex ? "bg-gold" : "bg-white/30"
            }`}
            aria-label={`Show announcement ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
