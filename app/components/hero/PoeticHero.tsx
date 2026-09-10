"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { HeroData } from "../../data/types";
import RetroCarousel from "./RetroCarousel";
import localFont from "next/font/local";

interface PoeticHeroProps {
  data: HeroData;
  // When false (intro loader visible), entrance animations stay parked so they
  // don't burn main-thread frames underneath the loader and collide with the
  // first scroll. Parent flips this to true the moment loading finishes.
  active?: boolean;
  // Pauses the retro carousel marquee while the loader covers the screen.
  carouselPaused?: boolean;
}

const archia = localFont({
  src: '../../../public/fonts/archia/Archia-Regular.otf',
  variable: "--font-archia",
});

// ─── Animation Variants ──────────────────────────────────────────────────────

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const slideUp = {
  // NOTE: transform + opacity only — no `filter: blur()` here. Animating blur
  // forces a repaint of the whole hero on every frame and was a major source
  // of first-scroll jank while the entrance played.
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
  },
};



export default function PoeticHero({ data, active = true, carouselPaused = false }: PoeticHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);





  return (
    <section
      ref={containerRef}
      className={`${archia.className} relative w-full h-[100svh] min-h-[600px] overflow-hidden flex flex-col justify-center select-none`}
    >
      {/* ── Background Image (Raw & Crystal Clear, No Zoom) ── */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/her-image-2.webp"
          alt="Architectural scenic landscape"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
          quality={75}
        />
      </div>



      {/* ── Main Centered Content ── */}
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 lg:px-20 mt-20 z-20 flex justify-center gap-10">

        <motion.div

          className="max-w-4xl flex flex-col items-center text-center"
          variants={staggerContainer}
          initial="hidden"
          animate={active ? "visible" : "hidden"}
        >

          {/* Headline using Playfair Serif font */}
          <h1 className="font-serif leading-[1.05] tracking-tight text-[#2E2017] drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
            <span className="block pb-1">
              <motion.span
                variants={slideUp}
                className="inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold"
              >
                {data.headline}
              </motion.span>
            </span>
            <span className="block italic font-semibold pt-1">
              <motion.span
                variants={slideUp}
                className="inline-block text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#D97706] "
              >
                {data.highlighted}
              </motion.span>
            </span>
          </h1>


        </motion.div>
      </div>

      {/* ── Retro Photo Carousel ── */}
      <div className="w-full max-w-4xl mx-auto mb-8 z-20">
        <RetroCarousel paused={carouselPaused} />
      </div>

    </section>
  );
}