"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, ArrowUp } from "lucide-react";

export function QuickActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-24 right-4 md:right-6 z-50 flex flex-col gap-3">
      {/* Call */}
      <motion.a
        href="tel:+923376031141"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-green-500 shadow-lg shadow-green-500/30 flex items-center justify-center hover:shadow-green-500/50 transition-shadow"
        aria-label="Quick Call"
      >
        <Phone className="h-5 w-5 text-white" />
      </motion.a>

      {/* Email */}
      <motion.a
        href="mailto:ayeshabeautysaloon26@gmail.com"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-gold shadow-lg shadow-gold/30 flex items-center justify-center hover:shadow-gold/50 transition-shadow"
        aria-label="Quick Email"
      >
        <Mail className="h-5 w-5 text-white" />
      </motion.a>

      {/* Back to Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 rounded-full bg-dark shadow-lg flex items-center justify-center hover:bg-dark-gray transition-colors"
            aria-label="Back to Top"
          >
            <ArrowUp className="h-5 w-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
