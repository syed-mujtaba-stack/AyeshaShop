"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="py-14 lg:py-16 bg-dark overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8 max-w-lg mx-auto">
          <span className="flex-1 h-px bg-white/10" />
          <span className="w-6 h-px bg-gold/60" />
          <span className="flex-1 h-px bg-white/10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto text-center"
        >
          <p className="text-gold-light text-[11px] font-semibold tracking-[0.25em] uppercase mb-3">
            Stay Connected
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl text-white mb-3">
            Be the First to Know
          </h2>
          <p className="text-white/30 text-xs sm:text-sm mb-6 max-w-sm mx-auto leading-relaxed">
            Subscribe for exclusive previews of new collections and private sale access.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-gold/50 h-11 rounded-xl text-sm"
              />
            </div>
            <Button variant="gold" size="default" className="shrink-0 rounded-xl px-5">
              Subscribe <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </motion.div>

        <div className="flex items-center gap-4 mt-8 max-w-lg mx-auto">
          <span className="flex-1 h-px bg-white/10" />
          <span className="w-6 h-px bg-gold/60" />
          <span className="flex-1 h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
}
