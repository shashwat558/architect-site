"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function MinimalLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-[#3D2B1F]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center justify-center gap-12">
        {/* Logo */}
        <motion.h1
          className="text-white text-6xl md:text-8xl font-serif italic"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          AD.RS
        </motion.h1>

        {/* Progress Container */}
        <div className="w-64 md:w-80">
          {/* Progress Bar */}
          <motion.div
            className="relative h-1 bg-white/20 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ width: { duration: 0.2 } }}
            />
          </motion.div>

          {/* Percentage Text */}
          <motion.p
            className="text-center text-white/60 text-sm mt-6 font-mono tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </div>

        {/* Loading Text */}
        <motion.p
          className="text-white/40 text-sm tracking-widest uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading
        </motion.p>
      </div>
    </motion.div>
  );
}
