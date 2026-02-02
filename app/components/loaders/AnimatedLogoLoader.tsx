"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

export default function AnimatedLogoLoader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    angle: (i / 20) * Math.PI * 2,
    delay: i * 0.1,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-gradient-to-br from-[#3D2B1F] to-[#2a1f15]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {[1, 2, 3].map((circle, i) => (
          <motion.div
            key={circle}
            className="absolute border border-[#D97706]/20 rounded-full"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{
              scale: [0.5, 2, 2.5],
              opacity: [0.8, 0.3, 0],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.3,
              repeat: Infinity,
            }}
            style={{
              width: 100 + i * 50,
              height: 100 + i * 50,
            }}
          />
        ))}
      </div>

      {/* Orbiting particles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-[#D97706] rounded-full"
            animate={{
              x: Math.cos(particle.angle) * 120,
              y: Math.sin(particle.angle) * 120,
            }}
            transition={{
              duration: 3,
              delay: particle.delay,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Central content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-white text-7xl md:text-9xl font-serif italic">
          AD.RS
        </h1>

        {/* Pulse glow */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 20px rgba(217, 119, 6, 0.3)",
              "0 0 60px rgba(217, 119, 6, 0.5)",
              "0 0 20px rgba(217, 119, 6, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
          }}
        />

        {/* Loading dots */}
        <div className="flex gap-2 justify-center mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[#D97706] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
