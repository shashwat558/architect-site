"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCursor } from "../../context/CursorContext";
import type { ProjectsContentData } from "../../data/types";

export type ProjectsContentProps = {
  data: ProjectsContentData;
};

export default function ProjectsContent({ data }: ProjectsContentProps) {
  const [filter, setFilter] = useState(data.categories[0] ?? "All");
  const { setCursorVariant } = useCursor();

  const filteredProjects = filter === "All" 
    ? data.projects 
    : data.projects.filter(p => p.category === filter);

  return (
    <>
      <div className="mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--foreground)] mb-8 vibrate-text"
        >
          {data.heading}
        </motion.h1>
        
        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap gap-4 md:gap-8 border-b border-[#E5DDD0] pb-6"
        >
          {data.categories.map((cat) => (
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
          <p className="font-serif text-2xl">{data.emptyMessage}</p>
        </div>
      )}
    </>
  );
}
