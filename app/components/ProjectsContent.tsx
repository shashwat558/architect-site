"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCursor } from "../context/CursorContext";

const allProjects = [
  {
    id: 1,
    title: "Modern Residence",
    category: "Residential",
    year: "2024",
    location: "Bhopal, India",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    link: "/projects/modern-residence",
  },
  {
    id: 2,
    title: "Green Living Space",
    category: "Sustainable",
    year: "2023",
    location: "Indore, India",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    link: "/projects/green-living-space",
  },
  {
    id: 3,
    title: "Rustic Chalet",
    category: "Hospitality",
    year: "2024",
    location: "Manali, India",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    link: "/projects/rustic-chalet",
  },
  {
    id: 4,
    title: "Urban Loft",
    category: "Renovation",
    year: "2022",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
    link: "/projects/urban-loft",
  },
  {
    id: 5,
    title: "Corporate HQ",
    category: "Commercial",
    year: "2023",
    location: "Delhi, India",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    link: "/projects/corporate-hq",
  },
  {
    id: 6,
    title: "Lakeside Villa",
    category: "Residential",
    year: "2023",
    location: "Udaipur, India",
    image: "https://images.unsplash.com/photo-1600596542815-bfad4c1539a9?w=1200&q=80",
    link: "/projects/lakeside-villa",
  },
];

const categories = ["All", "Residential", "Commercial", "Hospitality", "Sustainable", "Renovation"];

export default function ProjectsContent() {
  const [filter, setFilter] = useState("All");
  const { setCursorVariant } = useCursor();

  const filteredProjects = filter === "All" 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <>
      <div className="mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--foreground)] mb-8 vibrate-text"
        >
          Selected Works
        </motion.h1>
        
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap gap-4 md:gap-8 border-b border-[#E5DDD0] pb-6"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-lg md:text-xl transition-colors duration-300 ${
                filter === cat ? "text-[var(--accent)] font-medium" : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-20">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={project.link} className="group block">
              <div 
                className="relative aspect-[16/10] overflow-hidden rounded-lg mb-6"
                onMouseEnter={() => setCursorVariant("view")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-3xl mb-2 group-hover:text-[var(--accent)] transition-colors vibrate-text">
                    {project.title}
                  </h3>
                  <p className="text-[var(--muted)]">{project.location}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 border border-[var(--muted)]/30 rounded-full text-sm text-[var(--muted)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">
                    {project.category}
                  </span>
                  <p className="text-sm text-[var(--muted)] mt-2">{project.year}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="py-32 text-center text-[var(--muted)]">
          <p className="font-serif text-2xl">No projects found in this category.</p>
        </div>
      )}
    </>
  );
}
