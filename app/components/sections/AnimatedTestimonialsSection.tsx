"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import type { TestimonialsSectionData } from "../../data/types";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

type Props = {
  data: TestimonialsSectionData;
};

export default function AnimatedTestimonialsSection({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const formattedTestimonials = data.testimonials.map((t) => ({
    quote: t.text,
    name: t.author,
    designation: t.role,
    src: t.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
  }));

  return (
    <section 
      ref={ref}
      className="py-24 md:py-32 bg-[#FAF6F1] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4 block">
            {data.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#3D2B1F] leading-tight">
            {data.title} <br />
            <span className="italic opacity-60">{data.subtitle}</span>
          </h2>
        </motion.div>

        <AnimatedTestimonials testimonials={formattedTestimonials} autoplay={true} />
      </div>
    </section>
  );
}
