"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import type { HeroData } from "../../data/types";

interface PoeticHeroProps {
  data: HeroData;
}

// ─── Animation Variants ──────────────────────────────────────────────────────

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 32, skewY: "2deg" },
  visible: {
    opacity: 1,
    y: 0,
    skewY: "0deg",
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const imageReveal = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] as const },
  },
});


// ─── Particle type ───────────────────────────────────────────────────────────

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function PoeticHero({ data }: PoeticHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 20 + 20,
        delay: Math.random() * -20,
      }))
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - left) / width,
      y: (e.clientY - top) / height,
    });
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers
  const yBranch = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yImagesSlow = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yImagesFast = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yImagesFloat = useTransform(scrollYProgress, [0, 1], [30, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Images with fallbacks
  const img1 = data.images[0] ?? {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    alt: "Architectural Interior",
  };
  const img2 = data.images[1] ?? {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    alt: "Minimalist Space",
  };
  const img3 = data.images[2] ?? {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    alt: "Architectural Details",
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] lg:min-h-screen overflow-hidden flex items-center justify-center px-6 py-20 md:py-28 md:px-14 lg:px-20 select-none"
    >

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-[background] duration-700"
        style={{
          background: `
            radial-gradient(circle at ${40 + mouse.x * 20}% ${30 + mouse.y * 20}%,
              rgba(245,158,11,0.08) 0%, rgba(254,243,199,0.03) 50%, transparent 100%),
            radial-gradient(circle at 80% 20%, rgba(217,119,6,0.05) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Floating Dust Particles ── */}
      {mounted && (
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-amber-400/30 blur-[0.5px]"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
              animate={{ y: ["0vh", "-100vh"], x: ["0vw", `${Math.sin(p.id) * 5}vw`], opacity: [0, 0.8, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
            />
          ))}
        </div>
      )}

      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-10 origin-top-left"
        style={{ y: yBranch }}
        animate={{ x: [-6, 6, -6], rotate: [-1.2, 1.2, -1.2], scale: [1.02, 1.04, 1.02] }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      >
        {/* The image itself carries the opacity — NOT the parent wrapper */}
        <Image
          src="/branches.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 pointer-events-none z-10 origin-top-left object-cover"
          style={{ opacity: 0.21 }}

        />
      </motion.div>

      {/* ── Main Grid ── */}
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-20">

        {/* ── Left: Typography ── */}
        <motion.div
          style={{ y: yText }}
          className="lg:col-span-6 flex flex-col justify-center text-left"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={slideUp} className="flex items-center gap-2 mb-6">
            <span className="w-8 h-px bg-amber-600/60" />
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-amber-600 font-semibold">
              AD.RS DESIGN STUDIO
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-serif leading-[1.1] tracking-tight mb-8 text-[#3D2B1F]">
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={slideUp}
                className="inline-block text-[2.8rem] sm:text-[4rem] md:text-[4.8rem] lg:text-[5.5rem] font-light"
              >
                {data.headline}
              </motion.span>
            </span>
            <span className="block overflow-hidden italic font-light pt-1">
              <motion.span
                variants={slideUp}
                className="inline-block text-[2.6rem] sm:text-[3.8rem] md:text-[4.5rem] lg:text-[5.2rem] text-[#C27D38]"
              >
                {data.highlighted}
              </motion.span>
            </span>
          </h1>

          {/* Description */}
          <div className="overflow-hidden max-w-lg">
            <motion.p
              variants={slideUp}
              className="text-[#6B5A4E] text-base md:text-lg lg:text-xl font-light leading-relaxed font-sans"
            >
              {data.description}
            </motion.p>
          </div>

          {/* Contact details */}

        </motion.div>

        {/* ── Right: Image Collage ── */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end items-center relative h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[75vh] w-full min-h-[450px]">

          {/* Glow behind images */}
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-amber-100/50 rounded-full blur-[80px] pointer-events-none -z-10"
          />

          {/* Image 1 — main tall arched frame */}
          <motion.div
            style={{ y: yImagesSlow }}
            variants={imageReveal(0.8)}
            initial="hidden"
            animate="visible"
            className="relative w-[60%] sm:w-[50%] lg:w-[60%] aspect-[3/4.2] rounded-t-[14rem] rounded-b-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(61,43,31,0.18)] border border-white/40 z-20 group"
          >
            <div className="absolute inset-0 bg-[#3D2B1F]/5 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-200/10 to-transparent group-hover:translate-x-full transition-transform duration-1000 z-20 pointer-events-none" />
            <Image
              src={img1.src}
              alt={img1.alt}
              fill
              priority
              sizes="(max-width: 640px) 250px, 450px"
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              quality={85}
            />
          </motion.div>

          {/* Image 2 — bottom-left horizontal */}
          <motion.div
            style={{ y: yImagesFast }}
            variants={imageReveal(1.1)}
            initial="hidden"
            animate="visible"
            className="absolute left-0 sm:left-[10%] lg:-left-12 bottom-6 w-[45%] sm:w-[38%] lg:w-[45%] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(61,43,31,0.22)] border border-white/50 z-30 group"
          >
            <div className="absolute inset-0 bg-[#3D2B1F]/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <Image
              src={img2.src}
              alt={img2.alt}
              fill
              sizes="(max-width: 640px) 180px, 320px"
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              quality={80}
            />
          </motion.div>

          {/* Image 3 — top-right circle */}
          <motion.div
            style={{ y: yImagesFloat }}
            variants={imageReveal(1.4)}
            initial="hidden"
            animate="visible"
            className="absolute right-0 sm:right-[5%] lg:-right-6 top-12 w-24 sm:w-32 lg:w-36 aspect-square rounded-full overflow-hidden shadow-[0_12px_30px_rgba(61,43,31,0.15)] border border-white/60 z-30 group"
          >
            <div className="absolute inset-0 bg-[#3D2B1F]/5 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <Image
              src={img3.src}
              alt={img3.alt}
              fill
              sizes="(max-width: 640px) 100px, 150px"
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              quality={80}
            />
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.0 }}
      >
        <span className="font-sans text-[10px] tracking-[0.25em] text-[#8C7A6B]/80 font-medium uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C27D38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}