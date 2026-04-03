"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { HeroData } from "../data/dummyData";

export type HeroProps = {
  data: HeroData;
};

export default function Hero({ data }: HeroProps) {
  const { scrollY } = useScroll();
  // Parallax offsets for a deeply layered 3D feel
  const yText = useTransform(scrollY, [0, 1000], [0, 150]);
  const yPillar = useTransform(scrollY, [0, 1000], [0, -150]);
  const yCanvas = useTransform(scrollY, [0, 1000], [0, -50]);
  const yAccent = useTransform(scrollY, [0, 1000], [0, -250]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-transparent" aria-label="Hero section featuring AD.RS design services">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#E5DDD0]/20 pointer-events-none" />

      {/* --- SCATTERED ARCHITECTURAL IMAGES --- */}

      {/* 1. The Pillar (Tall & Narrow, far right) */}
      <motion.div
        style={{ y: yPillar }}
        className="absolute right-[4%] md:right-[8%] top-[15%] md:top-[10%] w-[25%] md:w-[18%] lg:w-[15%] h-[60%] md:h-[75%] z-20 shadow-2xl overflow-hidden"
        initial={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        animate={{ opacity: 1, clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <motion.div className="w-full h-full relative" whileHover={{ scale: 1.05 }} transition={{ duration: 1.2, ease: "easeOut" }}>
          <Image src={data.images[0].src} alt={data.images[0].alt} fill className="object-cover" sizes="20vw" priority />
          <div className="absolute inset-0 bg-[#3D2B1F]/10 mix-blend-overlay" />
        </motion.div>
      </motion.div>

      {/* 2. The Canvas (Large wide, lower left offset) */}
      <motion.div
        style={{ y: yCanvas }}
        className="absolute left-[4%] md:left-[12%] bottom-[15%] md:bottom-[10%] w-[65%] md:w-[45%] lg:w-[40%] aspect-[4/3] md:aspect-[16/10] z-10 shadow-[0_20px_50px_-15px_rgba(61,43,31,0.3)] overflow-hidden"
        initial={{ opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
        animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        <motion.div className="w-full h-full relative" whileHover={{ scale: 1.05 }} transition={{ duration: 1.2, ease: "easeOut" }}>
          <Image src={data.images[1].src} alt={data.images[1].alt} fill className="object-cover" sizes="(max-width: 768px) 70vw, 50vw" priority />
          <div className="absolute inset-0 bg-[#D97706]/5 mix-blend-overlay" />
        </motion.div>
      </motion.div>

      {/* 3. The Accent (Small square, top mid-left) */}
      <motion.div
        style={{ y: yAccent }}
        className="absolute left-[35%] md:left-[30%] top-[12%] md:top-[20%] w-[25%] md:w-[15%] lg:w-[12%] aspect-square z-30 shadow-xl overflow-hidden hidden sm:block"
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
      >
        <motion.div className="w-full h-full relative" whileHover={{ scale: 1.05 }} transition={{ duration: 1.2, ease: "easeOut" }}>
          <Image src={data.images[2].src} alt={data.images[2].alt} fill className="object-cover" sizes="20vw" priority />
        </motion.div>
      </motion.div>

      {/* --- TYPOGRAPHY (Overlaying everything) --- */}
      <div className="absolute inset-0 z-40 px-6 md:px-12 lg:px-20 max-w-[1920px] mx-auto pointer-events-none flex flex-col justify-center">

        <motion.div
          style={{ y: yText }}
          className="w-full flex flex-col mt-[-10vh] md:mt-[-5vh]"
        >
          {/* Top Word */}
          <motion.div
            className="self-start md:ml-[5vw]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <h1 className="font-serif text-[18vw] md:text-[10vw] text-[#3D2B1F] leading-[0.85] tracking-tighter [text-shadow:0_0_40px_rgba(250,246,241,0.9),0_0_15px_rgba(250,246,241,1)]">
              {data.headline.split(' ')[0]}{' '}
              <span className="text-[#C4956A] italic font-light ml-[1vw]">
                {data.headline.split(' ').slice(1).join(' ')}
              </span>
            </h1>
          </motion.div>

          {/* Bottom Word */}
          <motion.div
            className="self-end md:mr-[8vw] mt-[2vh] md:mt-[2vh]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <h1 className="font-serif text-[15vw] md:text-[9vw] text-[#3D2B1F] leading-[0.85] tracking-tighter italic font-light [text-shadow:0_0_40px_rgba(250,246,241,0.9),0_0_15px_rgba(250,246,241,1)]">
              {data.highlighted}
            </h1>
          </motion.div>
        </motion.div>

        {/* Minimal Description + Scroller Indicator */}
    
      </div>

    </section>
  );
}
