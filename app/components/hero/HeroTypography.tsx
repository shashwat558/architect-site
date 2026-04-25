/**
 * HeroTypography — Animated text overlay on top of the WebGL canvas
 *
 * Motion design:
 * - Words stagger in from below (architectural reveal)
 * - Highlighted line uses a clip-path "wipe" for premium feel
 * - Scroll causes subtle parallax divergence between title and description
 * - The entire overlay uses pointer-events:none so mouse events
 *   pass through to the WebGL canvas uninterrupted
 */
"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import { useRef } from "react";
import type { HeroData } from "../../data/types";

interface HeroTypographyProps {
  data: HeroData;
}

// Stagger each word into view from slightly below
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 28, skewX: "2deg" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewX: "0deg",
    transition: {
      duration: 0.75,
      delay: 0.9 + i * 0.09,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const lineReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.1, delay: 1.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function HeroTypography({ data }: HeroTypographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers — title drifts slower than description
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const headlineWords = data.headline.split(" ");
  const highlightedWords = data.highlighted.split(" ");

  return (
    <div
      ref={containerRef}
      className="relative z-10 flex flex-col justify-end h-full w-full pb-16 md:pb-20 px-6 md:px-14 lg:px-20 pointer-events-none select-none"
    >
      {/* Main headline */}
      <motion.div style={{ y: yTitle, opacity }}>
        <h1
          className="font-serif leading-[1.05] tracking-tight mb-4"
          style={{
            fontSize: "clamp(1.9rem, 8vw, 6.5rem)",
          }}
        >
          {/* Primary line */}
          <span className="flex flex-wrap gap-x-[0.22em]">
            {headlineWords.map((word, i) => (
              <motion.span
                key={`h-${i}`}
                className="inline-block text-white"
                style={{ textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}
                variants={wordVariants}
                custom={i}
                initial="hidden"
                animate="visible"
              >
                {word}
              </motion.span>
            ))}
          </span>

          {/* Highlighted italic line with clip-path reveal */}
          <motion.span
            className="flex flex-wrap gap-x-[0.22em] italic font-light"
            style={{ color: "rgba(196,149,106,0.95)" }}
            variants={lineReveal}
            initial="hidden"
            animate="visible"
          >
            {highlightedWords.map((word, i) => (
              <span key={`hl-${i}`} className="inline-block">
                {word}
              </span>
            ))}
          </motion.span>
        </h1>
      </motion.div>
    </div>
  );
}
