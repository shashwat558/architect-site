/**
 * Hero — Root section component
 *
 * Layers (bottom to top):
 * 1. HeroCanvas (WebGL)  — full-bleed shader: photo + blueprint reveal + distortion
 * 2. Gradient overlay    — bottom fade to dark for text legibility
 * 3. HeroTypography      — animated text, labels, cues (pointer-events: none)
 * 4. Grain overlay CSS   — film-grain texture from globals.css body::before
 *
 * The carousel from the old hero is preserved below the full-screen section
 * so the page structure remains intact.
 *
 * Graceful degradation:
 * - On mobile / no-JS, the section shows the architectural photo via a CSS
 *   background-image fallback (see noscript style below).
 * - HeroCanvas is dynamically imported with ssr:false — it never blocks SSR.
 */
"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { HeroData } from "../../data/types";
import HeroTypography from "./HeroTypography";

// Lazy-load the heavy WebGL canvas (Three.js ~600kb gzipped)
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    // Fallback: static photo while WebGL loads
    <div className="absolute inset-0 w-full h-full">
      <Image
        src="/contructed.jpg"
        alt="Architectural design render"
        fill
        className="object-cover"
        priority
        quality={85}
      />
      {/* Initial desaturate to match shader output */}
      <div className="absolute inset-0 bg-[#3D2B1F]/30" />
    </div>
  ),
});

export type HeroProps = {
  data: HeroData;
};

export default function Hero({ data }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile to skip heavy WebGL — react to changes (rotation/resize)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse), (prefers-reduced-motion: reduce)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Carousel measurement
  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth / 2);
    }
  }, []);

  const { scrollY } = useScroll();
  const carouselY = useTransform(scrollY, [0, 600], [0, 60]);

  const duplicatedImages = [...data.images, ...data.images];

  return (
    <>
      {/*
       * ── Full-screen WebGL hero section ─────────────────────────────────────
       * Height: 100svh on mobile (safe viewport), 100vh on desktop
       */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ height: "100svh", minHeight: "480px" }}
        aria-label="Immersive architectural hero section"
      >
        {/* Layer 1: WebGL Canvas (or static fallback) */}
        {isMobile ? (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/contructed.jpg"
              alt="Architectural design render"
              fill
              className="object-cover"
              priority
              quality={85}
            />
            <div className="absolute inset-0 bg-[#1a1008]/40" />
          </div>
        ) : (
          <HeroCanvas />
        )}

        {/* Layer 2: Gradient overlay (bottom → transparent) for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(20,14,8,0.88) 0%, rgba(20,14,8,0.30) 40%, rgba(20,14,8,0.05) 70%, transparent 100%)",
          }}
        />

        {/* Layer 3: Thin top gradient so the header stands out */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(20,14,8,0.55) 0%, transparent 100%)",
          }}
        />

        {/* Layer 4: Typography overlay */}
        <HeroTypography data={data} />

        {/* Grain overlay — subtle texture layer on top of WebGL */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            mixBlendMode: "overlay",
          }}
        />

        {/* Scroll indicator — animates the arrow down at the bottom center */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none motion-reduce:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.0 }}
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.5"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/*
       * ── Carousel strip ──────────────────────────────────────────────────────
       * Preserved from original hero for project imagery showcase
       */}
      <section
        className="relative w-full overflow-hidden py-12 bg-[#FAF6F1]"
        aria-label="Project gallery carousel"
      >
        <motion.div style={{ y: carouselY }}>
          <motion.div
            ref={carouselRef}
            className="flex gap-4"
            animate={{ x: carouselWidth ? [0, -carouselWidth] : 0 }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
          >
            {duplicatedImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative min-w-[240px] sm:min-w-[300px] md:min-w-[380px] h-[280px] sm:h-[350px] md:h-[480px] rounded-lg overflow-hidden shrink-0"
                whileHover={{ scale: 1.02, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 380px"
                  loading={index < 3 ? "eager" : "lazy"}
                  quality={75}
                />
                <motion.div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
