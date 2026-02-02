"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function GlitchLoader({ onComplete }: { onComplete: () => void }) {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 600);

    const timer = setTimeout(onComplete, 3000);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const glitchVariants = {
    normal: { x: 0, opacity: 1 },
    glitch: {
      x: [0, -2, 2, -2, 0],
      opacity: [1, 0.8, 1, 0.8, 1],
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-[#3D2B1F]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D97706" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-12 z-10">
        {/* Glitched text */}
        <div className="relative h-24 flex items-center justify-center overflow-hidden">
          {/* Red layer */}
          <motion.div
            className="absolute text-7xl md:text-9xl font-serif italic text-red-600/40"
            variants={glitchVariants}
            animate={glitchActive ? "glitch" : "normal"}
            transition={{ duration: 0.15 }}
            style={{ textShadow: "-2px 0 #00ff00" }}
          >
            AD.RS
          </motion.div>

          {/* Blue layer */}
          <motion.div
            className="absolute text-7xl md:text-9xl font-serif italic text-blue-600/40"
            variants={glitchVariants}
            animate={glitchActive ? "glitch" : "normal"}
            transition={{ duration: 0.15, delay: 0.05 }}
            style={{ textShadow: "2px 0 #ff00ff" }}
          >
            AD.RS
          </motion.div>

          {/* White main text */}
          <motion.h1
            className="text-7xl md:text-9xl font-serif italic text-white relative z-10"
            animate={{
              textShadow: glitchActive
                ? "3px 3px 0 #ff00ff, -3px -3px 0 #00ff00"
                : "0 0 0 transparent",
            }}
            transition={{ duration: 0.1 }}
          >
            AD.RS
          </motion.h1>
        </div>

        {/* Animated line */}
        <motion.div
          className="h-px w-32 bg-gradient-to-r from-transparent via-[#D97706] to-transparent"
          animate={{
            scaleX: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        />

        {/* Scanlines effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.1),
              rgba(0, 0, 0, 0.1) 1px,
              transparent 1px,
              transparent 2px
            )`,
            backgroundSize: "100% 4px",
          }}
          animate={{
            backgroundPosition: ["0 0", "0 2px"],
          }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
          }}
        />

        {/* Loading text with flicker */}
        <motion.p
          className="text-white/50 text-xs tracking-[0.3em] uppercase font-mono"
          animate={{
            opacity: [0.3, 1, 0.3],
            textShadow: glitchActive ? ["0 0 10px #D97706", "0 0 20px #D97706"] : "none",
          }}
          transition={{
            opacity: { duration: 2, repeat: Infinity },
            textShadow: { duration: 0.15 },
          }}
        >
          &gt; Loading...
        </motion.p>
      </div>
    </motion.div>
  );
}
