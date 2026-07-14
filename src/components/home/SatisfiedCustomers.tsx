"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { Users, Star, Award, Truck } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString("en-PK")}{suffix}
    </span>
  );
}

const stats = [
  { icon: Users,   value: 15000, suffix: "+", label: "Happy Customers" },
  { icon: Star,    value: 4.9,    suffix: "/5", label: "Average Rating", decimals: true },
  { icon: Award,   value: 500,    suffix: "+", label: "Premium Products" },
  { icon: Truck,   value: 25000,  suffix: "+", label: "Orders Delivered" },
];

export function SatisfiedCustomers() {
  return (
    <section className="py-16 lg:py-20 bg-dark overflow-hidden relative">
      {/* Decorative gold lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-px h-[100px] bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-px h-[100px] bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <p className="text-gold text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">
            Our Pride
          </p>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
            Satisfied Customers
          </h2>
          {/* Gold decorative line */}
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-px bg-white/10" />
            <span className="w-2 h-2 rotate-45 border border-gold/60" />
            <span className="w-12 h-px bg-white/10" />
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} direction="up" delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 text-center hover:border-gold/30 hover:bg-white/[0.07] transition-all duration-500"
              >
                {/* Gold top accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-500" />

                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                  <stat.icon className="h-5 w-5 text-gold" />
                </div>

                <p className="font-heading text-3xl lg:text-4xl text-white mb-1">
                  {stat.decimals ? (
                    stat.value
                  ) : (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  )}
                  {!stat.decimals && <span className="text-gold">{stat.suffix}</span>}
                </p>
                <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
