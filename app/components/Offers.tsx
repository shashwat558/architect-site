"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const offers = [
  {
    title: "Limited-time offers",
    description:
      "We carry out turnkey decoration and interior architecture projects throughout India for your professional events, pop-ups, stands or showrooms.",
    link: "/offers/limited-time",
  },
  {
    title: "Long-term offers",
    description:
      "We carry out turnkey interior design and architecture projects throughout India for your residences, coworking offices, commercial premises, restaurant, cafe, bar or hotel.",
    link: "/offers/long-term",
  },
];

export default function Offers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 px-6 md:px-12 lg:px-20 bg-transparent">
      <div className="w-full">
        {/* Section Header */}
        <motion.h2 
          className="text-sm font-medium text-[#3D2B1F] tracking-wide uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Our Offers
        </motion.h2>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              className="bg-[#EDE5D8] rounded-lg p-8 md:p-10 space-y-6 cursor-pointer"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
            >
              <motion.h3 
                className="text-3xl md:text-4xl font-serif text-[#C4956A] italic"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                {offer.title}
              </motion.h3>
              <motion.div 
                className="w-full h-px bg-[#D4C9BB]"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                style={{ originX: 0 }}
              />
              <p className="text-[#6B5B4F] text-sm leading-relaxed">
                {offer.description}
              </p>
              <Link
                href={offer.link}
                className="text-[#D97706] text-sm font-medium flex items-center gap-2 hover:underline group"
              >
                View all offers
                <motion.svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  whileHover={{ x: 5, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </motion.svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
