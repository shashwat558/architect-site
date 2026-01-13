"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const introImages = [
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
];

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Cycle through images
    const interval = setInterval(() => {
        setIndex((prev) => {
            if (prev === introImages.length - 1) {
                return prev;
            }
            return prev + 1;
        });
    }, 500); // Change image every 500ms

    // End loader after all images shown + slight delay
    const timeout = setTimeout(() => {
      onComplete();
    }, (introImages.length * 500) + 800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-[#3D2B1F]"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
            <motion.div
                key={index}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {/* Image centered */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <Image 
                        src={introImages[index]} 
                        alt="Intro" 
                        fill 
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
            </motion.div>
        </AnimatePresence>

        {/* Center Text/Logo Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <motion.h1 
                className="text-white text-6xl md:text-8xl font-serif italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                AD.RS
            </motion.h1>
            <motion.div 
                className="mt-4 h-1 bg-white"
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
        </div>
      </div>
    </motion.div>
  );
}
