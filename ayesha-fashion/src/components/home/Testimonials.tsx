"use client";

import { motion, type Variants } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export function TestimonialsSection() {
  const featured = testimonials.slice(0, 3);

  return (
    <section className="py-14 lg:py-16 bg-off-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
            Client Voices
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-dark">
            What They Say
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-5"
        >
          {featured.map((t) => (
            <motion.div
              key={t.id}
              variants={cardVariants}
              className="bg-white rounded-2xl p-6 lg:p-7 border border-light-gray/50 hover:border-gold/20 hover:shadow-lg transition-all duration-500 group"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < t.rating ? "text-gold fill-gold" : "text-light-gray"
                    )}
                  />
                ))}
              </div>
              <blockquote className="text-sm text-dark/70 leading-relaxed mb-5 line-clamp-4">
                &ldquo;{t.comment}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-light-gray/50">
                <div
                  className="w-9 h-9 rounded-full bg-cover bg-center ring-2 ring-gold/10 shrink-0"
                  style={{ backgroundImage: `url(${t.avatar})` }}
                />
                <div>
                  <p className="text-xs font-semibold text-dark">{t.name}</p>
                  <p className="text-[10px] text-medium-gray">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: single testimonial */}
        <div className="md:hidden">
          {featured.slice(0, 1).map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-light-gray/50"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < t.rating ? "text-gold fill-gold" : "text-light-gray"
                    )}
                  />
                ))}
              </div>
              <blockquote className="text-sm text-dark/70 leading-relaxed mb-5">
                &ldquo;{t.comment}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-light-gray/50">
                <div
                  className="w-9 h-9 rounded-full bg-cover bg-center ring-2 ring-gold/10 shrink-0"
                  style={{ backgroundImage: `url(${t.avatar})` }}
                />
                <div>
                  <p className="text-xs font-semibold text-dark">{t.name}</p>
                  <p className="text-[10px] text-medium-gray">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
