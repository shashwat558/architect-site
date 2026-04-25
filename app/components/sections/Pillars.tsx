"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import type { PillarItem, PillarsSectionData } from "../../data/types";

export type PillarsProps = {
  data: PillarsSectionData;
};

const PillarCard = ({ pillar, index }: { pillar: PillarItem; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col h-full group pb-8 md:pb-0"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
    >
      {/* Animated Divider (Left side) */}
      <motion.div 
        className="absolute left-0 top-0 bottom-0 w-px bg-[#3D2B1F]/20 hidden md:block"
        initial={{ height: 0 }}
        animate={isInView ? { height: "100%" } : { height: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
      />
      
      {/* For mobile, horizontal divider at top */}
      <motion.div 
        className="absolute left-0 top-0 right-0 h-px bg-[#3D2B1F]/20 md:hidden block"
        initial={{ width: 0 }}
        animate={isInView ? { width: "100%" } : { width: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <div className="px-0 md:px-8 lg:px-12 pt-8 md:pt-0">
         {/* Large Index Number */}
        <motion.span 
          className="block text-6xl md:text-8xl text-[#E5DDD0] font-serif font-light opacity-50 mb-0 md:-ml-4 group-hover:text-[#D97706]/20 transition-colors duration-500"
        >
          {pillar.id}
        </motion.span>

        {/* Title */}
        <motion.h3 
          className="text-3xl font-serif text-[#3D2B1F] mb-6 relative inline-block vibrate-text"
        >
          {pillar.title}
          <span className="block h-px bg-[#3D2B1F] w-0 group-hover:w-full transition-all duration-500 mt-2" />
        </motion.h3>

        {/* Content Area */}
        <div className="space-y-6 text-[#6B5B4F] text-sm leading-relaxed min-h-30">
           {pillar.description && (
            <p className="font-light text-base">{pillar.description}</p>
          )}

          {pillar.points && (
             <ul className="space-y-6">
                {pillar.points.map((point, i) => (
                    <li key={i} className="flex flex-col gap-1">
                        {point.highlight && <span className="font-medium text-[#3D2B1F]">{point.highlight}</span>}
                        <span className="font-light">{point.text}</span>
                    </li>
                ))}
            </ul>
          )}

          {pillar.outro && (
            <p className="italic text-[#C4956A] border-l-2 border-[#C4956A] pl-4 py-1">
                {pillar.outro}
            </p>
          )}
        </div>

        {/* Action Link */}
        <div className="mt-8 pt-4">
            <Link
                href={pillar.link}
                className="inline-flex items-center gap-2 text-[#3D2B1F] text-xs font-bold tracking-widest uppercase hover:text-[#D97706] transition-colors group/link"
            >
                Read More
                <motion.span 
                    className="inline-block"
                    whileHover={{ x: 5 }}
                >
                    →
                </motion.span>
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function Pillars({ data }: PillarsProps) {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-transparent relative overflow-hidden">
      
      {/* Background decorative big text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03]">
        <h2 className="text-[20vw] leading-[0.8] font-serif text-[#3D2B1F] whitespace-nowrap -ml-[5vw]">
          {data.backgroundText}
        </h2>
      </div>

      <div className="w-full relative z-10">
        <div className="flex flex-col mb-20 md:mb-32">
             <motion.span 
                ref={headerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4 vibrate-text"
             >
                {data.eyebrow}
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#3D2B1F] vibrate-text"
            >
                {data.title} <span className="italic text-[#C4956A]">{data.subtitle}</span>
            </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {data.pillars.map((pillar, index) => (
            <PillarCard key={pillar.id} pillar={pillar} index={index} />
          ))}
          
          {/* Closing Divider for Desktop */}
           <motion.div 
            className="absolute right-0 top-0 bottom-0 w-px bg-[#3D2B1F]/20 hidden md:block"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
