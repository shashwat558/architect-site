"use client";

import Image from "next/image";
import type { TestimonialsSectionData } from "../../data/types";

type TestimonialsProps = {
  data: TestimonialsSectionData;
};

export default function Testimonials({ data }: TestimonialsProps) {
  // Create rows to move in opposite directions
  // Row 1: Original order, duplicated for seamless loop
  const row1Items = [...data.testimonials, ...data.testimonials];

  // Row 2: Shifted order, duplicated for seamless loop
  const shifted = [
    ...data.testimonials.slice(3),
    ...data.testimonials.slice(0, 3),
  ];
  const row2Items = [...shifted, ...shifted];

  return (
    <section className="py-24 md:py-32 border-t border-b border-[#E5DDD0]/50 overflow-hidden relative cv-auto">

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center max-w-lg mx-auto">
          <span className="text-[#D97706] text-xs font-mono font-bold tracking-widest uppercase mb-3 block">
            {data.eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#3D2B1F] leading-tight font-light">
            {data.title}{" "}
            <span className="italic font-normal text-[#9CAF7E]">{data.subtitle}</span>
          </h2>
        </div>

        {/* Carousel Tracks */}
        <div className="hover-pause flex flex-col gap-8 w-full relative">
          {/* Row 1 (Left scrolling) */}
          <div className="flex overflow-hidden select-none w-full mask-gradient">
            <div className="marquee-track flex gap-6 animate-marquee-left">
              {row1Items.map((testimonial, idx) => (
                <div
                  key={`r1-${testimonial.id}-${idx}`}
                  className="w-[300px] md:w-[420px] flex-shrink-0 bg-white/40 hover:bg-white/80 border border-[#3D2B1F]/10 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(61,43,31,0.02)] hover:shadow-[0_12px_30px_rgba(61,43,31,0.05)] hover:scale-[1.01]"
                >
                  <div className="mb-6">
                    <span className="font-serif text-4xl text-[#9CAF7E]/40 mb-1 leading-none block">“</span>
                    <p className="font-serif text-sm md:text-base text-[#3D2B1F] leading-relaxed italic">
                      {testimonial.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-t border-[#3D2B1F]/5 pt-4">
                    {testimonial.image && (
                      <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 border border-[#3D2B1F]/10">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-serif text-xs md:text-sm font-bold text-[#3D2B1F]">
                        {testimonial.author}
                      </h4>
                      <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#9CAF7E] mt-0.5">
                        {testimonial.role} &bull; {testimonial.project}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 (Right scrolling) */}
          <div className="flex overflow-hidden select-none w-full mask-gradient">
            <div className="marquee-track flex gap-6 animate-marquee-right">
              {row2Items.map((testimonial, idx) => (
                <div
                  key={`r2-${testimonial.id}-${idx}`}
                  className="w-[300px] md:w-[420px] flex-shrink-0 bg-white/40 hover:bg-white/80 border border-[#3D2B1F]/10 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_20px_rgba(61,43,31,0.02)] hover:shadow-[0_12px_30px_rgba(61,43,31,0.05)] hover:scale-[1.01]"
                >
                  <div className="mb-6">
                    <span className="font-serif text-4xl text-[#9CAF7E]/40 mb-1 leading-none block">“</span>
                    <p className="font-serif text-sm md:text-base text-[#3D2B1F] leading-relaxed italic">
                      {testimonial.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-t border-[#3D2B1F]/5 pt-4">
                    {testimonial.image && (
                      <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 border border-[#3D2B1F]/10">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-serif text-xs md:text-sm font-bold text-[#3D2B1F]">
                        {testimonial.author}
                      </h4>
                      <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-[#9CAF7E] mt-0.5">
                        {testimonial.role} &bull; {testimonial.project}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
