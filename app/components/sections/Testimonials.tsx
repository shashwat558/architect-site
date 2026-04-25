"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "motion/react";
import type { TestimonialsSectionData } from "../../data/types";

type TestimonialsProps = {
  data: TestimonialsSectionData;
};

export default function Testimonials({ data }: TestimonialsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % data.testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, data.testimonials.length]);

  const activeTestimonial = data.testimonials[activeIndex];

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 bg-gradient-to-br from-[#FAF6F1] via-[#EDE5D8] to-[#FAF6F1] overflow-hidden relative"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#D97706]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#3D2B1F]/5 rounded-full blur-3xl" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4 block">
            {data.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#3D2B1F] leading-tight">
            {data.title} <br />
            <span className="italic opacity-60">{data.subtitle}</span>
          </h2>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Image & Stats */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-[#D97706]/20 rounded-2xl -rotate-2" />
              <div className="absolute -inset-4 border-2 border-[#3D2B1F]/10 rounded-2xl rotate-2" />

              {/* Main Content Card */}
              <div className="relative bg-white rounded-xl shadow-2xl p-8 md:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Client Image */}
                    {activeTestimonial.image && (
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <div className="absolute inset-0 bg-[#D97706] rounded-full blur-xl opacity-20" />
                        <Image
                          src={activeTestimonial.image}
                          alt={activeTestimonial.author}
                          fill
                          className="object-cover rounded-full border-4 border-white shadow-lg"
                          sizes="128px"
                        />
                      </div>
                    )}

                    {/* Client Info */}
                    <div className="text-center mb-6">
                      <h3 className="font-bold text-xl text-[#3D2B1F] mb-1">
                        {activeTestimonial.author}
                      </h3>
                      <p className="text-sm text-[#9B8B7A] uppercase tracking-widest mb-2">
                        {activeTestimonial.role}
                      </p>
                      {activeTestimonial.project && (
                        <p className="text-xs text-[#6B5B4F] italic">
                          Project: {activeTestimonial.project}
                        </p>
                      )}
                    </div>

                    {/* Rating Stars */}
                    {activeTestimonial.rating && (
                      <div className="flex justify-center gap-1 mb-6">
                        {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                          <span key={i} className="text-[#D97706] text-xl">★</span>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#3D2B1F]/10">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#D97706] mb-1">50+</div>
                        <div className="text-[10px] uppercase tracking-widest text-[#9B8B7A]">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#D97706] mb-1">98%</div>
                        <div className="text-[10px] uppercase tracking-widest text-[#9B8B7A]">Satisfied</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#D97706] mb-1">15+</div>
                        <div className="text-[10px] uppercase tracking-widest text-[#9B8B7A]">Years</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right: Testimonial Text & Controls */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Quote Mark */}
              <span className="absolute -top-8 -left-4 text-[12vw] md:text-[8vw] lg:text-[6vw] leading-none text-[#D97706] opacity-10 font-serif pointer-events-none">

              </span>

              {/* Testimonial Text */}
              <div className="relative min-h-[300px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#3D2B1F] leading-relaxed mb-8">
                      {activeTestimonial.text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between gap-8 pt-8 border-t border-[#3D2B1F]/10">
                {/* Progress Bar */}
                <div className="flex-1">
                  <div className="flex gap-2">
                    {data.testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setActiveIndex(index);
                          setIsAutoPlaying(false);
                        }}
                        className="relative h-1 flex-1 bg-[#D9D1C1] rounded-full overflow-hidden"
                        aria-label={`View testimonial ${index + 1}`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-[#D97706]"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: index === activeIndex ? 1 : 0 }}
                          transition={{ duration: index === activeIndex && isAutoPlaying ? 6 : 0.3 }}
                          style={{ transformOrigin: "left" }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Arrow Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setActiveIndex((current) =>
                        current === 0 ? data.testimonials.length - 1 : current - 1
                      );
                      setIsAutoPlaying(false);
                    }}
                    className="w-12 h-12 rounded-full border-2 border-[#3D2B1F] flex items-center justify-center hover:bg-[#3D2B1F] hover:text-white transition-all duration-300 group"
                    aria-label="Previous testimonial"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">←</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveIndex((current) => (current + 1) % data.testimonials.length);
                      setIsAutoPlaying(false);
                    }}
                    className="w-12 h-12 rounded-full border-2 border-[#3D2B1F] flex items-center justify-center hover:bg-[#3D2B1F] hover:text-white transition-all duration-300 group"
                    aria-label="Next testimonial"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">→</span>
                  </button>
                </div>

                {/* Counter */}
                <div className="text-sm font-mono text-[#9B8B7A]">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(data.testimonials.length).padStart(2, '0')}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom: Testimonial Grid Preview */}
        <motion.div
          className="mt-20 md:mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`group relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${index === activeIndex
                  ? 'ring-4 ring-[#D97706] scale-105 shadow-xl'
                  : 'ring-2 ring-[#3D2B1F]/10 hover:ring-[#D97706]/50 hover:scale-105'
                  }`}
              >
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#D97706]/20 to-[#3D2B1F]/20 flex items-center justify-center">
                    <span className="text-2xl font-serif text-[#3D2B1F]">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                  <span className="text-white text-xs font-medium">{testimonial.author.split(' ')[0]}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
