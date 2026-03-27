"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { HeroData } from "../data/dummyData";

export type HeroProps = {
  data: HeroData;
};

export default function Hero({ data }: HeroProps) {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const singleSetWidth = carouselRef.current.scrollWidth / 2;
      setCarouselWidth(singleSetWidth);
    }
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);

  const duplicatedImages = [...data.images, ...data.images];

  return (
    <section className="pt-32 pb-8 bg-transparent overflow-hidden" aria-label="Hero section featuring AD.RS design services">
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <motion.h1
            style={{ y: y1 }}
            className="text-4xl md:text-6xl lg:text-[4.5rem] text-[#3D2B1F] leading-[1.1] max-w-4xl tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {data.headline.split(" ").map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.33, 1, 0.68, 1], // Custom ease for smoother feel
                }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <span className="italic font-light text-[#C4956A]">
              {data.highlighted.split(" ").map((word, index) => (
                <motion.span
                  key={index + 10}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.1,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          <motion.p
            style={{ y: y2 }}
            className="text-[#6B5B4F] text-base md:text-lg leading-relaxed max-w-2xl lg:pt-6 font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          >
            {data.description}
          </motion.p>
        </div>

      </div>

      {/* Infinite Carousel - Full Width */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={carouselRef}
          className="flex gap-4"
          animate={{
            x: carouselWidth ? [0, -carouselWidth] : 0,
          }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
        >
          {duplicatedImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative min-w-75 md:min-w-95 h-87.5 md:h-120 rounded-lg overflow-hidden shrink-0"
              whileHover={{ scale: 1.02, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                sizes="(max-width: 768px) 75vw, (max-width: 1024px) 95vw, 600px"
                loading={index < 3 ? "eager" : "lazy"}
                quality={75}
              />
              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
