"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { HeroData } from "../../data/types";
import localFont from "next/font/local";

interface PoeticHeroProps {
  data: HeroData;
  // When false (intro loader visible), entrance animations stay parked so they
  // don't burn main-thread frames underneath the loader and collide with the
  // first scroll. Parent flips this to true the moment loading finishes.
  active?: boolean;
  // Pauses the retro carousel marquee while the loader covers the screen.
  carouselPaused?: boolean;
  // Optimized Sanity background URL. Falls back to the self-hosted file so
  // the hero still renders if Sanity is unreachable.
  bgUrl?: string;
  // Live carousel slides. Falls back to the static local set.
  slides?: { src: string; caption: string }[];
}

const archia = localFont({
  src: '../../../public/fonts/archia/Archia-Regular.otf',
  variable: "--font-archia",
});

const cabinetGrotesk = localFont({
  src: [
    {
      path: '../../../public/fonts/cabinet-grotesk/CabinetGrotesk-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/cabinet-grotesk/CabinetGrotesk-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/cabinet-grotesk/CabinetGrotesk-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: "--font-cabinet-grotesk",
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



export default function PoeticHero({ data, active = true, bgUrl }: PoeticHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);





  return (
    <section
      ref={containerRef}
      className={`${archia.className} relative w-full h-[85svh] min-h-[500px] md:h-[100svh] md:min-h-[600px] overflow-hidden flex flex-col justify-start select-text`}
    >
      {/* ── Background Image (Raw & Crystal Clear, No Zoom) ── */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgUrl || "/hero-image-3.png"}
          alt="Architectural scenic landscape"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[62%_center] md:object-center"
          quality={75}
        />
      </div>




      {/* ── Top-left headline ── */}
      <div className="max-w-[1400px] w-full mx-auto px-6 sm:px-12 lg:px-20 pt-28 md:pt-52 z-20 flex justify-start gap-10">

        <motion.div

          className="max-w-3xl flex flex-col items-start text-left"
          variants={staggerContainer}
          initial="hidden"
          animate={active ? "visible" : "hidden"}
        >

          {/* Headline in Cabinet Grotesk */}
          <h1 className={`${cabinetGrotesk.className} leading-[1.05] tracking-tight text-[#2E2017] drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]`}>
            <span className="block pb-1">
              <motion.span
                variants={slideUp}
                className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
              >
                {data.headline}
              </motion.span>
            </span>
            <span className="block italic font-semibold pt-1">
              <motion.span
                variants={slideUp}
                className="inline-block text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#D97706] "
              >
                {data.highlighted}
              </motion.span>
            </span>
          </h1>

          {/* CTAs */}
          <motion.div variants={slideUp} className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link
              href="/projects"
              className="inline-flex w-full items-center justify-center px-8 py-3.5 rounded-[40px] bg-[#3D2B1F] text-[#FAF6F1] text-sm font-bold tracking-wide border border-[#3D2B1F] shadow-[0_8px_20px_rgba(61,43,31,0.25)] transition-all duration-300 hover:bg-[#D97706] hover:border-[#D97706] hover:-translate-y-[2px] hover:shadow-[0_16px_32px_rgba(217,119,6,0.3)] active:translate-y-0 active:scale-[0.98] sm:w-auto"
            >
              View Our Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center px-8 py-3.5 rounded-[40px] bg-transparent text-[#3D2B1F] text-sm font-bold tracking-wide border-[1.5px] border-[#3D2B1F] transition-all duration-300 hover:bg-[#3D2B1F] hover:text-[#FAF6F1] hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.98] sm:w-auto"
            >
              Get in Touch
            </Link>
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
}
