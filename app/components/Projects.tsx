"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useCursor } from "../context/CursorContext";

const projects = [
  {
    id: 1,
    title: "Modern Residence",
    category: "Residential",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    link: "/projects/modern-residence",
  },
  {
    id: 2,
    title: "Green Living Space",
    category: "Sustainable",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    link: "/projects/green-living-space",
  },
  {
    id: 3,
    title: "Rustic Chalet",
    category: "Hospitality",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    link: "/projects/rustic-chalet",
  },
  {
    id: 4,
    title: "Urban Loft",
    category: "Renovation",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
    link: "/projects/urban-loft",
  },
];

export default function Projects() {
  const { setCursorVariant } = useCursor();
  const ref = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section ref={ref} className="py-24 bg-transparent overflow-hidden">
      <div className="w-full px-6 md:px-12 lg:px-20 mb-16">
        {/* Section Header */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-end gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div>
             <span className="text-[#D97706] text-xs font-bold tracking-widest uppercase mb-4 block">Selected Works</span>
             <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-[#3D2B1F] leading-tight">
                Crafting Spaces <br/>
                <span className="italic opacity-60">with Soul.</span>
             </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[#9B8B7A] text-sm uppercase tracking-wider hidden md:block">Drag to explore</span>
            <div className="w-12 h-px bg-[#3D2B1F] hidden md:block" />
            <Link
                href="/projects"
                className="group flex items-center gap-2 text-[#3D2B1F] border border-[#3D2B1F] px-6 py-3 rounded-full hover:bg-[#3D2B1F] hover:text-[#FAF6F1] transition-all duration-300"
            >
                <span className="text-sm font-medium uppercase tracking-wider">All Projects</span>
            </Link>
          </div>
        </motion.div>

      </div>

      {/* Draggable Projects Slider */}
      <motion.div 
        ref={carouselRef} 
        className="cursor-grab active:cursor-grabbing pl-6 md:pl-12 lg:pl-20"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            className="flex gap-8 md:gap-12 w-fit pr-20"
        >
            {projects.map((project, index) => (
            <motion.div
                key={project.id}
                className="relative group min-w-[85vw] md:min-w-125 lg:min-w-150"
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
            >
                <Link
                href={project.link}
                className="block"
                >
                    {/* Image Container */}
                    <div 
                        className="relative h-112.5 md:h-150 lg:h-175 overflow-hidden rounded-sm"
                        onMouseEnter={() => setCursorVariant("project")}
                        onMouseLeave={() => setCursorVariant("default")}
                    >
                         {/* Card Number */}
                         <div className="absolute top-4 left-4 z-20 mix-blend-difference text-white/80 font-mono text-sm tracking-widest backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                            0{index + 1} / 04
                         </div>

                        <motion.div
                            className="absolute inset-0 w-full h-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            />
                            {/* Dark gradient overlay on hover */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                        </motion.div>
                    </div>
                
                    {/* Info Below Image */}
                    <div className="mt-6 flex justify-between items-start border-t border-[#3D2B1F]/10 pt-4">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-serif text-[#3D2B1F] group-hover:italic transition-all duration-300">{project.title}</h3>
                            <p className="text-[#9B8B7A] text-sm mt-1">{project.category}</p>
                        </div>
                         <span className="text-[#3D2B1F] font-mono text-sm opacity-60">{project.year}</span>
                    </div>
                </Link>
            </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
