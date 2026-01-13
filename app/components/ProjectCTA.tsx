"use client";

import Link from "next/link";
import CursorImageTrail from "./ui/ImagePath";

export default function ProjectCTA() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-transparent">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          {/* Left Content */}
          <div className="space-y-6 max-w-lg">
            <h2 className="text-3xl md:text-5xl lg:text-7xl text-[#3D2B1F] leading-[1.1]">
              <span className="font-serif italic font-light block mb-2">Do you have a</span>
              <span className="font-serif">project in mind?</span>
            </h2>
            <p className="text-[#6B5B4F] text-base md:text-lg leading-relaxed font-light">
              At AD.RS DESIGN, each project is conceived as a unique experience,
              at the crossroads of interior architecture and ephemeral
              scenography.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border border-[#3D2B1F] hover:bg-[#3D2B2F] hover:text-[#FAF6F1] text-[#3D2B1F] px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300"
            >
              Get in touch
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

         
          <div className="relative w-full lg:w-1/2 h-100 lg:h-150 rounded-2xl bg-[#EDE5D8]/30 border border-[#3D2B1F]/10 flex items-center justify-center cursor-none overflow-hidden hover:bg-[#EDE5D8]/50 transition-colors duration-500">
            <CursorImageTrail />
            <p className="text-[#9B8B7A] text-sm tracking-widest uppercase pointer-events-none opacity-60">
              ( Explore )
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
