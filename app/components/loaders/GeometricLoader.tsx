"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

export default function GeometricLoader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-[#3D2B1F]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Rotating outer shapes */}
        {[1, 2, 3].map((shape) => (
          <motion.div
            key={shape}
            className="absolute border border-[#D97706]/40"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 4 - shape * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: 100 + shape * 40,
              height: 100 + shape * 40,
            }}
          />
        ))}

        {/* Rotating squares */}
        {[1, 2].map((square) => (
          <motion.div
            key={`square-${square}`}
            className="absolute border-2 border-[#D97706]/30"
            animate={{
              rotate: square % 2 === 0 ? 360 : -360,
            }}
            transition={{
              duration: 5 + square,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: 80 + square * 60,
              height: 80 + square * 60,
              transform: `rotate(${square * 45}deg)`,
            }}
          />
        ))}

        {/* Central animated content */}
        <motion.div
          className="absolute flex flex-col items-center gap-4 z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Pulsing circle background */}
          <motion.div
            className="absolute w-24 h-24 border border-[#D97706]/20 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Logo */}
          <h1 className="text-white text-5xl md:text-7xl font-serif italic relative z-10">
            AD.RS
          </h1>

          {/* Moving dots in circle */}
          <div className="absolute w-16 h-16">
            {[0, 1, 2, 3].map((dot) => (
              <motion.div
                key={dot}
                className="absolute w-1.5 h-1.5 bg-[#D97706] rounded-full"
                animate={{
                  x: Math.cos((dot / 4) * Math.PI * 2) * 30,
                  y: Math.sin((dot / 4) * Math.PI * 2) * 30,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom text */}
      <motion.p
        className="absolute bottom-20 text-white/40 text-xs tracking-widest uppercase"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        Design & Architecture
      </motion.p>
    </motion.div>
  );
}
