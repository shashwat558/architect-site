"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

export default function GradientWaveLoader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-[#3D2B1F]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-60">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(45deg, transparent, rgba(217, 119, 6, 0.2), transparent)`,
            backgroundSize: "300% 300%",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Wave pattern */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3, 4].map((wave) => (
          <motion.svg
            key={wave}
            className="absolute w-96 h-96"
            viewBox="0 0 100 100"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              delay: wave * 0.3,
              repeat: Infinity,
            }}
          >
            <circle
              cx="50"
              cy="50"
              r={40 - wave * 5}
              fill="none"
              stroke="#D97706"
              strokeWidth="0.5"
            />
          </motion.svg>
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center flex flex-col items-center gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-white text-7xl md:text-9xl font-serif italic"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
        >
          AD.RS
        </motion.h1>

        {/* Animated underline */}
        <motion.div
          className="h-0.5 bg-gradient-to-r from-transparent via-[#D97706] to-transparent"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Animated text */}
        <motion.p
          className="text-white/50 text-sm tracking-[0.2em] uppercase"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        >
          Crafting Spaces
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
