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
const REPEL_RADIUS = 150;
const REPEL_STRENGTH = 40;

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

function useMouseRepel(containerRef: React.RefObject<HTMLDivElement | null>) {
  const mousePos = useRef({ x: -9999, y: -9999 });
  const repelables = useRef<Map<Element, { el: HTMLElement; baseX: number; baseY: number }>>(new Map());
  const rafId = useRef<number>(0);

  const register = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    repelables.current.set(el, {
      el,
      baseX: rect.left + rect.width / 2,
      baseY: rect.top + rect.height / 2,
    });
    return () => { repelables.current.delete(el); };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent | Touch) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => onMove(e);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) onMove(e.touches[0]);
    };
    const onLeave = () => { mousePos.current = { x: -9999, y: -9999 }; };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("touchend", onLeave);

    const tick = () => {
      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      repelables.current.forEach(({ el }) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = cx - mx;
        const dy = cy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 1) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          const px = (dx / dist) * force;
          const py = (dy / dist) * force;
          el.style.transform = `translate(${px}px, ${py}px)`;
          el.style.transition = "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        } else {
          el.style.transform = "translate(0px, 0px)";
          el.style.transition = "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        }
      });
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("touchend", onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [containerRef]);

  return register;
}

interface PremiumLoaderProps {
  onComplete: () => void;
  ready: boolean;
}

export function PremiumLoader({ onComplete, ready }: PremiumLoaderProps) {
  const reduced = useReduced();
  const radius = useRadius();
  const containerRef = useRef<HTMLDivElement>(null);
  const registerRepel = useMouseRepel(containerRef);
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
      ref={containerRef}
      role="status"
      aria-label="Loading Ayesha Fashion"
      aria-live="polite"
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at center, #ffffff 0%, #fafaf9 55%, #f5f4f0 100%)`,
      }}
    >
      {/* Animated flowing gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(201,162,39,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 80% 70%, rgba(201,162,39,0.05) 0%, transparent 70%),
            radial-gradient(ellipse 70% 50% at 50% 50%, rgba(218,165,32,0.04) 0%, transparent 60%)
          `,
        }}
        animate={{
          background: [
            `radial-gradient(ellipse 80% 60% at 20% 30%, rgba(201,162,39,0.07) 0%, transparent 70%),
             radial-gradient(ellipse 60% 80% at 80% 70%, rgba(201,162,39,0.04) 0%, transparent 70%),
             radial-gradient(ellipse 70% 50% at 50% 50%, rgba(218,165,32,0.05) 0%, transparent 60%)`,
            `radial-gradient(ellipse 80% 60% at 75% 25%, rgba(201,162,39,0.05) 0%, transparent 70%),
             radial-gradient(ellipse 60% 80% at 25% 75%, rgba(201,162,39,0.07) 0%, transparent 70%),
             radial-gradient(ellipse 70% 50% at 60% 40%, rgba(218,165,32,0.04) 0%, transparent 60%)`,
            `radial-gradient(ellipse 80% 60% at 20% 30%, rgba(201,162,39,0.07) 0%, transparent 70%),
             radial-gradient(ellipse 60% 80% at 80% 70%, rgba(201,162,39,0.04) 0%, transparent 70%),
             radial-gradient(ellipse 70% 50% at 50% 50%, rgba(218,165,32,0.05) 0%, transparent 60%)`,
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Large floating gold orbs */}
      {[
        { x: "15%", y: "20%", size: 180, dur: 7, delay: 0 },
        { x: "75%", y: "65%", size: 220, dur: 9, delay: 1 },
        { x: "50%", y: "80%", size: 160, dur: 8, delay: 2 },
        { x: "85%", y: "15%", size: 140, dur: 6, delay: 0.5 },
        { x: "30%", y: "70%", size: 200, dur: 10, delay: 1.5 },
      ].map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, rgba(201,162,39,0.08) 0%, rgba(201,162,39,0.0) 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 30 * (i % 2 === 0 ? 1 : -1), -20 * (i % 2 === 0 ? 1 : -1), 0],
            y: [0, -25 * (i % 3 === 0 ? 1 : -1), 20 * (i % 3 === 0 ? 1 : -1), 0],
            scale: [1, 1.15, 0.9, 1],
            opacity: [0.6, 1, 0.7, 0.6],
          }}
          transition={{
            duration: orb.dur,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating gold particles — bigger & visible */}
      {Array.from({ length: 24 }).map((_, i) => {
        const size = 3 + (i % 5) * 1.5;
        const left = (i * 13 + 7) % 100;
        const delay = (i * 0.5) % 6;
        const dur = 5 + (i % 4) * 2;
        return (
          <div key={`particle-${i}`} ref={registerRepel} className="absolute" style={{ left: `${left}%`, bottom: "-3%" }}>
            <motion.div
              className="rounded-full"
              style={{
                width: size,
                height: size,
                background: GOLD,
                boxShadow: `0 0 ${size * 2}px rgba(201,162,39,0.3)`,
              }}
              animate={{
                y: [0, -(radius * 2 + 300)],
                x: [0, (i % 2 === 0 ? 1 : -1) * (20 + (i % 4) * 12)],
                opacity: [0, 0.9, 1, 0.7, 0],
                scale: [0.5, 1, 1.1, 0.8, 0.3],
              }}
              transition={{
                duration: dur,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        );
      })}

      {/* Expanding pulse rings — more visible */}
      {[0, 1.5, 3, 4.5].map((delay, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            border: `1.5px solid rgba(201,162,39,0.15)`,
            width: 60,
            height: 60,
          }}
          animate={{
            width: [60, radius * 2 + 120],
            height: [60, radius * 2 + 120],
            opacity: [0.5, 0],
            borderWidth: [1.5, 0.3],
          }}
          transition={{
            duration: 3.5,
            delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Diagonal shimmer sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 30%, rgba(201,162,39,0.06) 50%, transparent 70%)`,
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Slow rotating gold accent */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          border: `1px solid rgba(201,162,39,0.04)`,
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
        animate={{
          rotate: [0, 360],
          borderRadius: [
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "70% 30% 30% 70% / 70% 70% 30% 30%",
            "30% 70% 70% 30% / 30% 30% 70% 70%",
          ],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Twinkling sparkle stars */}
      {Array.from({ length: 20 }).map((_, i) => {
        const size = 2 + (i % 3) * 1.5;
        const top = (i * 19 + 3) % 100;
        const left = (i * 13 + 11) % 100;
        const dur = 2 + (i % 4) * 0.8;
        const delay = (i * 0.6) % 4;
        return (
          <div key={`sparkle-${i}`} ref={registerRepel} className="absolute pointer-events-none" style={{ top: `${top}%`, left: `${left}%` }}>
            <motion.div
              style={{
                width: size,
                height: size,
              }}
              animate={{
                opacity: [0, 1, 0.2, 0.9, 0],
                scale: [0.3, 1.2, 0.6, 1, 0.3],
              }}
              transition={{
                duration: dur,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: GOLD,
                  borderRadius: "50%",
                  boxShadow: `0 0 ${size * 3}px rgba(201,162,39,0.5), 0 0 ${size * 6}px rgba(201,162,39,0.2)`,
                }}
              />
            </motion.div>
          </div>
        );
      })}

      {/* Floating diamond shapes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const size = 6 + (i % 3) * 4;
        const left = (i * 23 + 8) % 90;
        const dur = 8 + (i % 3) * 3;
        const delay = i * 1.2;
        return (
          <div key={`diamond-${i}`} ref={registerRepel} className="absolute pointer-events-none" style={{ left: `${left}%`, bottom: "-8%" }}>
            <motion.div
              style={{
                width: size,
                height: size,
                background: `linear-gradient(135deg, rgba(201,162,39,0.15), rgba(218,165,32,0.05))`,
                border: `0.5px solid rgba(201,162,39,0.12)`,
                transform: "rotate(45deg)",
              }}
              animate={{
                y: [0, -(radius * 2 + 350)],
                x: [0, (i % 2 === 0 ? 1 : -1) * (25 + (i % 3) * 15)],
                rotate: [45, 405],
                opacity: [0, 0.7, 0.9, 0.5, 0],
                scale: [0.5, 1, 0.8, 1.1, 0.3],
              }}
              transition={{
                duration: dur,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        );
      })}

      {/* Drifting horizontal silk lines */}
      {Array.from({ length: 5 }).map((_, i) => {
        const top = 15 + i * 18;
        const dur = 10 + i * 2;
        return (
          <motion.div
            key={`silk-${i}`}
            className="absolute pointer-events-none"
            style={{
              top: `${top}%`,
              left: "-20%",
              width: "140%",
              height: "1px",
              background: `linear-gradient(90deg, transparent 0%, rgba(201,162,39,${0.03 + i * 0.008}) 30%, rgba(201,162,39,${0.05 + i * 0.008}) 50%, rgba(201,162,39,${0.03 + i * 0.008}) 70%, transparent 100%)`,
            }}
            animate={{
              x: ["-10%", "10%", "-10%"],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: dur,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Pulsing vignette border */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 120px 40px rgba(201,162,39,0.04)",
        }}
        animate={{
          boxShadow: [
            "inset 0 0 120px 40px rgba(201,162,39,0.03)",
            "inset 0 0 160px 60px rgba(201,162,39,0.06)",
            "inset 0 0 120px 40px rgba(201,162,39,0.03)",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Corner accent arcs */}
      {[
        { pos: "top-0 left-0", rotate: 0 },
        { pos: "top-0 right-0", rotate: 90 },
        { pos: "bottom-0 right-0", rotate: 180 },
        { pos: "bottom-0 left-0", rotate: 270 },
      ].map((corner, i) => (
        <motion.div
          key={`corner-${i}`}
          className={`absolute ${corner.pos} pointer-events-none`}
          style={{
            width: 200,
            height: 200,
            border: "1px solid rgba(201,162,39,0.05)",
            borderBottom: "none",
            borderRight: "none",
            borderRadius: "0",
            transformOrigin: "top left",
            transform: `rotate(${corner.rotate}deg)`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [0.9, 1.05, 0.9],
          }}
          transition={{
            duration: 4,
            delay: i * 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gold ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: isActive("orbiting") || isActive("logophase") ? 1 : 0.4,
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(201,162,39,0.15) 0%, transparent 50%)`,
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Ayesha Fashion"
                style={{ height: "80px", width: "auto" }}
              />
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
