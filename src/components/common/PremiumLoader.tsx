"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
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
const GOLD_GLOW = "rgba(201,162,39,0.12)";
const EASE_PREMIUM = [0.22, 0.61, 0.36, 1] as const;
const EASE_MERGE = [0.45, 0, 0.15, 1] as const;
const MIN_DISPLAY_MS = 2000;

interface IconVariance {
  speed: number;
  floatAmp: number;
  floatFreq: number;
  depthScale: [number, number];
  depthOpacity: [number, number];
}

const ICON_VARIANCE: IconVariance[] = [
  { speed: 15, floatAmp: 2.5, floatFreq: 2.8, depthScale: [0.95, 1.05], depthOpacity: [0.85, 1] },
  { speed: 18, floatAmp: 3.0, floatFreq: 2.2, depthScale: [0.92, 1.08], depthOpacity: [0.8, 1] },
  { speed: 14, floatAmp: 2.0, floatFreq: 3.1, depthScale: [0.96, 1.04], depthOpacity: [0.88, 1] },
  { speed: 17, floatAmp: 2.8, floatFreq: 2.5, depthScale: [0.93, 1.07], depthOpacity: [0.82, 1] },
  { speed: 16, floatAmp: 2.2, floatFreq: 2.9, depthScale: [0.94, 1.06], depthOpacity: [0.86, 1] },
];

function useReduced() {
  return useReducedMotion() ?? false;
}

function useRadius() {
  const [r, setR] = useState(90);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const handler = () => setR(mq.matches ? 68 : 90);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return r;
}

interface PremiumLoaderProps {
  onComplete: () => void;
  ready: boolean;
}

export function PremiumLoader({ onComplete, ready }: PremiumLoaderProps) {
  const reduced = useReduced();
  const radius = useRadius();
  const startTime = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [phase, setPhase] = useState<
    "dress" | "reveal" | "orbit" | "merge" | "logo" | "tagline" | "done"
  >("dress");

  const clearTimeouts = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const schedule = useCallback(
    (next: typeof phase, delay: number) => {
      const id = setTimeout(() => setPhase(next), delay);
      timers.current.push(id);
    },
    []
  );

  // Clean up all timers on unmount
  useEffect(() => () => clearTimeouts(), [clearTimeouts]);

  useEffect(() => {
    startTime.current = performance.now();
  }, []);

  // Phase 1: dress → reveal → orbit
  useEffect(() => {
    if (reduced) {
      schedule("logo", 300);
      schedule("tagline", 600);
      schedule("done", 1000);
      return;
    }
    schedule("reveal", 500);
    schedule("orbit", 2200);
  }, [reduced, schedule]);

  // Phase 2: orbit → merge → logo → tagline → done (only fires once)
  useEffect(() => {
    if (phase === "orbit" && ready && !reduced) {
      const elapsed = performance.now() - startTime.current;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
      schedule("merge", remaining);
      schedule("logo", remaining + 700);
      schedule("tagline", remaining + 1100);
      schedule("done", remaining + 2400);
    }
  }, [phase, ready, reduced, schedule]);

  // Signal completion
  useEffect(() => {
    if (phase === "done") {
      onComplete();
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

  const isActive = (p: string) => {
    if (p === "dress") return phase === "dress";
    if (p === "orbiting") return ["reveal", "orbit"].includes(phase);
    if (p === "logophase") return ["merge", "logo", "tagline"].includes(phase);
    return false;
  };

  return (
    <div
      role="status"
      aria-label="Loading Ayesha Fashion"
      aria-live="polite"
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: `radial-gradient(ellipse at center, #ffffff 0%, #fafaf9 55%, #f5f4f0 100%)`,
      }}
    >
      {/* Subtle gold ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${GOLD_GLOW} 0%, transparent 50%)`,
          opacity: isActive("orbiting") || isActive("logophase") ? 1 : 0.3,
          transition: "opacity 1.2s ease",
        }}
      />

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
              : ["merge", "logo", "tagline"].includes(phase)
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
          {["reveal", "orbit", "merge"].includes(phase) && (
            <motion.div
              className="absolute"
              style={{ width: radius * 2, height: radius * 2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {ORBIT_ICONS.map((Icon, i) => {
                const p = positions[i];
                const v = ICON_VARIANCE[i];
                const isOrbiting = phase === "orbit" && !reduced;

                return (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      phase === "merge"
                        ? { opacity: 0, scale: 0.15, x: 0, y: 0 }
                        : { opacity: 1, scale: 1, x: p.x, y: p.y }
                    }
                    transition={
                      phase === "merge"
                        ? {
                            duration: 0.65,
                            delay: (ORBIT_ICONS.length - 1 - i) * 0.07,
                            ease: EASE_MERGE,
                          }
                        : {
                            duration: 0.75,
                            delay: i * 0.16,
                            type: "spring",
                            stiffness: 65,
                            damping: 13,
                          }
                    }
                    style={{ willChange: "transform, opacity" }}
                  >
                    {/* Orbit wrapper: handles circular rotation around center */}
                    <motion.div
                      animate={
                        isOrbiting
                          ? { rotate: -360 }
                          : { rotate: 0 }
                      }
                      transition={
                        isOrbiting
                          ? { rotate: { duration: v.speed, repeat: Infinity, ease: "linear" } }
                          : { duration: 0.4 }
                      }
                      style={{
                        transformOrigin: `${-p.x}px ${-p.y}px`,
                        willChange: "transform",
                      }}
                    >
                      {/* Float wrapper: subtle vertical bobbing */}
                      <motion.div
                        animate={
                          isOrbiting
                            ? {
                                y: [0, -v.floatAmp, 0, v.floatAmp * 0.6, 0],
                                scale: v.depthScale,
                                opacity: v.depthOpacity,
                              }
                            : { y: 0, scale: 1, opacity: 1 }
                        }
                        transition={
                          isOrbiting
                            ? {
                                y: { duration: v.floatFreq, repeat: Infinity, ease: "easeInOut" },
                                scale: { duration: v.floatFreq * 1.2, repeat: Infinity, ease: "easeInOut" },
                                opacity: { duration: v.floatFreq * 1.4, repeat: Infinity, ease: "easeInOut" },
                              }
                            : { duration: 0.4 }
                        }
                        className="flex items-center justify-center"
                        style={{ width: 44, height: 44 }}
                      >
                        <Icon
                          style={{
                            fontSize: 22,
                            color: GOLD,
                            filter: `drop-shadow(0 ${isOrbiting ? "2" : "1"}px ${isOrbiting ? "6" : "4"}px rgba(201,162,39,${isOrbiting ? 0.3 : 0.2}))`,
                            transition: "filter 0.6s ease",
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logo + tagline */}
        <AnimatePresence>
          {["logo", "tagline"].includes(phase) && (
            <motion.div
              key="logo"
              className="absolute flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -4 }}
              transition={{ duration: 0.65, ease: EASE_PREMIUM }}
            >
              <span
                className="font-heading text-4xl sm:text-5xl text-dark"
                style={{ letterSpacing: "0.18em" }}
              >
                AYESHA
              </span>
              <AnimatePresence>
                {["tagline"].includes(phase) && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                    className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-medium-gray"
                  >
                    Curating Luxury for Modern Women
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
