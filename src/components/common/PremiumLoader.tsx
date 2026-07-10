"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { GiDress } from "react-icons/gi";
import { PiHandbagSimple } from "react-icons/pi";
import { GiHighHeel, GiNecklace, GiPerfumeBottle } from "react-icons/gi";
import { LuSparkles } from "react-icons/lu";
import type { IconType } from "react-icons";

const ORBIT_ICONS: IconType[] = [
  PiHandbagSimple,
  GiHighHeel,
  GiNecklace,
  GiPerfumeBottle,
  LuSparkles,
];

const GOLD = "#C9A227";
const EASE_PREMIUM = [0.25, 0.1, 0.25, 1] as const;

const RADIUS = { sm: 68, lg: 90 };

function useReduced() {
  return useReducedMotion() ?? false;
}

function useRadius() {
  const [r, setR] = useState(RADIUS.lg);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const handler = () => setR(mq.matches ? RADIUS.sm : RADIUS.lg);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return r;
}

interface PremiumLoaderProps {
  onComplete: () => void;
}

export function PremiumLoader({ onComplete }: PremiumLoaderProps) {
  const reduced = useReduced();
  const radius = useRadius();
  const [phase, setPhase] = useState<
    "dress" | "reveal" | "orbit" | "merge" | "logo" | "exit" | "done"
  >("dress");

  useEffect(() => {
    if (reduced) {
      const t = [
        setTimeout(() => setPhase("logo"), 300),
        setTimeout(() => setPhase("exit"), 1000),
      ];
      return () => t.forEach(clearTimeout);
    }

    const t = [
      setTimeout(() => setPhase("reveal"), 600),
      setTimeout(() => setPhase("orbit"), 2400),
      setTimeout(() => setPhase("merge"), 5200),
      setTimeout(() => setPhase("logo"), 6000),
      setTimeout(() => setPhase("exit"), 7400),
    ];
    return () => t.forEach(clearTimeout);
  }, [reduced]);

  useEffect(() => {
    if (phase === "exit") {
      const t = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 900);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  const positions = useMemo(
    () =>
      ORBIT_ICONS.map((_, i) => {
        const a = (i / ORBIT_ICONS.length) * 2 * Math.PI - Math.PI / 2;
        return { x: Math.cos(a) * radius, y: Math.sin(a) * radius };
      }),
    [radius]
  );

  if (phase === "done") return null;

  return (
    <motion.div
      role="status"
      aria-label="Loading Ayesha Fashion"
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ willChange: "opacity" }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: radius * 2 + 60, height: radius * 2 + 60 }}
      >
        {/* Center dress icon */}
        <motion.div
          className="absolute flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={
            phase === "reveal" || phase === "orbit"
              ? { opacity: 0.12, scale: 0.65 }
              : phase === "merge" || phase === "logo" || phase === "exit"
                ? { opacity: 0, scale: 0 }
                : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          style={{ willChange: "transform, opacity" }}
        >
          <GiDress
            style={{
              fontSize: 30,
              color: GOLD,
              filter: "drop-shadow(0 0 14px rgba(201,162,39,0.3))",
            }}
          />
        </motion.div>

        {/* Orbit ring */}
        <AnimatePresence>
          {(phase === "reveal" || phase === "orbit" || phase === "merge") && (
            <motion.div
              className="absolute"
              style={{ width: radius * 2, height: radius * 2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="w-full h-full"
                animate={
                  phase === "orbit" && !reduced ? { rotate: 360 } : { rotate: 0 }
                }
                transition={
                  phase === "orbit"
                    ? { rotate: { duration: 16, repeat: Infinity, ease: "linear" } }
                    : { duration: 0.3 }
                }
                style={{ willChange: "transform" }}
              >
                {ORBIT_ICONS.map((Icon, i) => {
                  const p = positions[i];
                  return (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={
                        phase === "merge"
                          ? { opacity: 0, scale: 0.2, x: 0, y: 0 }
                          : { opacity: 1, scale: 1, x: p.x, y: p.y }
                      }
                      transition={
                        phase === "merge"
                          ? {
                              duration: 0.55,
                              delay: (ORBIT_ICONS.length - 1 - i) * 0.06,
                              ease: [0.4, 0, 1, 1],
                            }
                          : {
                              duration: 0.65,
                              delay: i * 0.16,
                              type: "spring",
                              stiffness: 70,
                              damping: 12,
                            }
                      }
                      style={{ willChange: "transform, opacity" }}
                    >
                      <motion.div
                        animate={
                          phase === "orbit" && !reduced
                            ? { rotate: -360 }
                            : { rotate: 0 }
                        }
                        transition={
                          phase === "orbit"
                            ? { rotate: { duration: 16, repeat: Infinity, ease: "linear" } }
                            : { duration: 0.3 }
                        }
                        className="flex items-center justify-center"
                        style={{ width: 44, height: 44 }}
                      >
                        <Icon
                          style={{
                            fontSize: 22,
                            color: GOLD,
                            filter: "drop-shadow(0 1px 4px rgba(201,162,39,0.2))",
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logo + tagline */}
        <AnimatePresence>
          {(phase === "logo" || phase === "exit") && (
            <motion.div
              key="logo"
              className="absolute flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.92, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            >
              <span
                className="font-heading text-4xl sm:text-5xl text-dark"
                style={{ letterSpacing: "0.18em" }}
              >
                AYESHA
              </span>
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: EASE_PREMIUM }}
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-medium-gray"
              >
                Curating Luxury for Modern Women
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
