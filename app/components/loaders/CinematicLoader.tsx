"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";


export default function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [complete, setComplete] = useState(false);
  
  useEffect(() => {
    // Total duration approx 3.5s
    const timer = setTimeout(() => {
        setComplete(true);
        setTimeout(onComplete, 800);
    }, 3800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Animation Constants
  const DURATION = 1.2;
  const STAGGER = 0.1;

  const letterVariants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
      y: "0%",
      transition: { 
        delay: 0.5 + (i * STAGGER), 
        duration: DURATION, 
        ease: [0.22, 1, 0.36, 1] as const // Custom Quint Ease
      }
    })
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: 1,
      transition: { delay: 0.2, duration: 1.5, ease: "circOut" as const }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0d0d] overflow-hidden"
      exit={{ 
        opacity: 0,
        transition: { duration: 1.0, ease: "easeInOut" } 
      }}
    >
        {/* BG Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none"
             style={{ backgroundImage: `radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)` }} 
        />
        
        <div className="relative z-10 flex flex-col items-center justify-center">
            
            {/* MAIN TITLE: ADRS (Masked Reveal) */}
            <div className="relative overflow-hidden px-4 py-2">
                <div className="flex space-x-2 md:space-x-4">
                     {/* A */}
                     <div className="overflow-hidden">
                        <motion.h1 
                           className="text-6xl md:text-9xl font-bold text-[#F5F3EE]"
                           style={{ fontFamily: 'var(--font-playfair), serif' }}
                           custom={0} variants={letterVariants} initial="hidden" animate="visible"
                        >A</motion.h1>
                     </div>
                     {/* D */}
                     <div className="overflow-hidden">
                        <motion.h1 
                           className="text-6xl md:text-9xl font-bold text-[#F5F3EE]"
                           style={{ fontFamily: 'var(--font-playfair), serif' }}
                           custom={1} variants={letterVariants} initial="hidden" animate="visible"
                        >D</motion.h1>
                     </div>
                     {/* R */}
                     <div className="overflow-hidden">
                        <motion.h1 
                           className="text-6xl md:text-9xl font-bold text-[#F5F3EE]"
                           style={{ fontFamily: 'var(--font-playfair), serif' }}
                           custom={2} variants={letterVariants} initial="hidden" animate="visible"
                        >R</motion.h1>
                     </div>
                     {/* S */}
                     <div className="overflow-hidden">
                        <motion.h1 
                           className="text-6xl md:text-9xl font-bold text-[#F5F3EE]"
                           style={{ fontFamily: 'var(--font-playfair), serif' }}
                           custom={3} variants={letterVariants} initial="hidden" animate="visible"
                        >S</motion.h1>
                     </div>
                </div>
            </div>

            {/* SEPARATOR LINE */}
            <motion.div 
               className="w-[120px] md:w-[240px] h-[1px] bg-[#D4AF37] my-6"
               variants={lineVariants} initial="hidden" animate="visible"
            />

            {/* SUBTITLE: DESIGN STUDIO */}
            <div className="overflow-hidden">
                <motion.div
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
                   className="flex items-center space-x-3"
                >
                    <span className="text-xs md:text-sm tracking-[0.4em] text-[#888888] font-light uppercase">
                        Design Studio
                    </span>
                </motion.div>
            </div>

            {/* COORDINATE DECORATION (Technical feel) */}
            <motion.div 
                className="absolute right-[-40px] top-[-20px] md:right-[-60px]"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
            >
                <div className="flex flex-col items-end space-y-1">
                    <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
                    <span className="text-[8px] text-[#444] font-mono">23.25°N</span>
                </div>
            </motion.div>

        </div>
    </motion.div>
  );
}
