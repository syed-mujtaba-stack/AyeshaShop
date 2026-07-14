"use client";

import { motion, type Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up:    { x: 0,   y: 50 },
  down:  { x: 0,   y: -50 },
  left:  { x: 50,  y: 0 },
  right: { x: -50, y: 0 },
  none:  { x: 0,   y: 0 },
};

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  viewportMargin = "-50px",
}: ScrollRevealProps) {
  const offset = offsets[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
