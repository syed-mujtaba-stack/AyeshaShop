"use client";

import { motion } from "framer-motion";

const brands = [
  "Maison Luxe", "Bella Couture", "Artisan Leather Co.",
  "Éclat Jewels", "Opulence Atelier", "Luminous Skin",
  "Parfums d'Élégance", "Luxe Footwear",
];

export function BrandSlider() {
  const doubled = [...brands, ...brands];

  return (
    <section className="py-12 lg:py-14 bg-white overflow-hidden">
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: { duration: 50, repeat: Infinity, ease: "linear" },
            }}
            className="flex gap-14 lg:gap-20 shrink-0 items-center"
          >
            {doubled.map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="flex items-center gap-14 lg:gap-20 shrink-0"
              >
                <span className="font-heading text-base lg:text-lg text-dark/15 hover:text-dark/40 transition-colors duration-500 cursor-default tracking-[0.15em] whitespace-nowrap">
                  {brand}
                </span>
                <span className="w-[3px] h-[3px] rounded-full bg-gold/30 shrink-0" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
