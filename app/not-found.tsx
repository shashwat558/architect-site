"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#FAF6F1] text-[#3D2B1F] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#EDE5D8_0%,transparent_50%)] opacity-50" />
      
      {/* Abstract architectural rings */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full border border-[#D97706]/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="absolute w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full border border-[#D97706]/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />

      <div className="z-10 flex flex-col items-center text-center space-y-8 px-4">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[12rem] leading-none text-[#D97706] opacity-20 select-none"
        >
          404
        </motion.h1>
        
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 max-w-lg -mt-10 md:-mt-16"
        >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif">Structure Not Found</h2>
            <p className="text-[#6B5B4F] text-base sm:text-lg font-light leading-relaxed">
            The space you are looking for has not been built yet, or perhaps it has been demolished.
            </p>
        </motion.div>

        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
        >
            <Link 
            href="/"
            className="group relative inline-flex items-center gap-2 px-8 py-3 bg-[#3D2B1F] text-[#FAF6F1] rounded-full overflow-hidden transition-all hover:bg-[#D97706] min-h-12"
            >
            <span className="relative z-10 font-medium">Return Home</span>
            <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M6.66669 4L10.6667 8L6.66669 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </Link>
        </motion.div>
      </div>

      {/* Footer copyright for grounding */}
      <div className="absolute bottom-8 text-sm text-[#6B5B4F]/50 font-light">
        © 2026 ADRS Architecture
      </div>
    </div>
  );
}
