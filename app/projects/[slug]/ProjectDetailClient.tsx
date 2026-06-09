"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import TestimonialSection from "../../components/sections/SimpleTestimonial";
import ProjectReviewForm from "../../components/sections/ProjectReviewForm";

import { BeforeAfterSlider } from "../../components/ui/BeforeAfterSlider";
import type { SanityProjectDetail } from "./page";

// ── Sub-components ─────────────────────────────────────────────────────────────

const ParallaxImage = ({
  src,
  alt,
  className,
  aspectRatio = "aspect-[16/9]",
}: {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  // Don't render if no image URL — avoids empty src browser warning
  if (!src) return null;

  return (
    <div ref={ref} className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      <motion.div style={{ y, scale }} className="absolute inset-[-10%] w-[120%] h-[120%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
};

const RevealText = ({ children, className = "" }: { children: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <span ref={ref} className={`block overflow-hidden ${className}`}>
      <motion.span
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
};

const SmoothLine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-[1px] bg-[#3D2B1F]/20 origin-left my-8 md:my-12"
    />
  );
};

const MaterialBoard = ({ materials }: { materials: SanityProjectDetail["materials"] }) => (
  <section className="py-20 md:py-32 border-t border-[#3D2B1F]/10">
    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] mb-12">
      Material Palette
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {materials.map((mat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          className="group"
        >
          <div className="aspect-square relative overflow-hidden rounded-sm mb-4 bg-[#EDE5D8] flex items-center justify-center">
            <span className="font-serif text-2xl text-[#3D2B1F]/30">{mat.name[0]}</span>
          </div>
          <p className="font-serif text-lg text-[#3D2B1F]">{mat.name}</p>
          <span className="text-xs text-[#9B8B7A] uppercase tracking-widest">{mat.origin}</span>
        </motion.div>
      ))}
    </div>
  </section>
);

const ProjectCredits = ({ team }: { team: SanityProjectDetail["team"] }) => (
  <section className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[#3D2B1F]/10">
    <div className="md:col-span-1">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706]">Project Team</h3>
    </div>
    <div className="md:col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
      {team.map((member, i) => (
        <div key={i}>
          <span className="text-[10px] uppercase tracking-widest text-[#9B8B7A] block mb-1">
            {member.role}
          </span>
          <span className="text-sm font-medium text-[#3D2B1F]">{member.name}</span>
        </div>
      ))}
    </div>
  </section>
);

const ToggleSwitch = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
  <div className="flex items-center gap-4 cursor-pointer group" onClick={onToggle}>
    <span
      className={`text-xs uppercase tracking-widest font-medium transition-colors duration-300 ${
        !isOn ? "text-[#3D2B1F]" : "text-[#9B8B7A]"
      }`}
    >
      Final Result
    </span>
    <div
      className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
        isOn ? "bg-[#3D2B1F]" : "bg-[#D9D1C1]"
      }`}
    >
      <motion.div
        layout
        className="w-4 h-4 bg-white rounded-full shadow-md"
        animate={{ x: isOn ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
    <span
      className={`text-xs uppercase tracking-widest font-medium transition-colors duration-300 ${
        isOn ? "text-[#D97706]" : "text-[#9B8B7A]"
      }`}
    >
      Design Thinking
    </span>
  </div>
);

// ── Main Client Component ──────────────────────────────────────────────────────

export default function ProjectDetailClient({ project }: { project: SanityProjectDetail }) {
  const [showProcess, setShowProcess] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const titleWords = project.title.split(" ");
  const firstLine = titleWords[0] ?? "";
  const secondLine = titleWords.slice(1).join(" ");

  const year = project.meta?.find((m) => m.label === "Year")?.value ?? "";

  // Next project: just link back to the listing if we don't have one
  const nextProjectSlug = "";
  const nextProjectName = "All Projects";
  const nextProjectHref = nextProjectSlug ? `/projects/${nextProjectSlug}` : "/projects";

  return (
    <div
      className="bg-[#FAF6F1] min-h-screen text-[#3D2B1F] selection:bg-[#D97706] selection:text-white"
      ref={containerRef}
    >
      {/* ── Hero ── */}
      <section className="relative min-h-[110vh] flex flex-col justify-between pt-32 pb-12 overflow-hidden">
        <div className="absolute top-0 right-0 p-4 md:p-12 opacity-30">
          <span className="text-6xl sm:text-7xl md:text-[8vw] leading-none font-serif text-[#ECE5D9] select-none">
            {year}
          </span>
        </div>

        <div className="px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1920px] mx-auto w-full z-10 relative mt-16 md:mt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-8 mb-4">
              <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#D97706] font-medium">
                {project.category}
              </span>
              {project.subtitle && (
                <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#9B8B7A]">
                  {project.subtitle}
                </span>
              )}
            </div>

            <h1 className="font-serif text-6xl sm:text-7xl md:text-[12vw] leading-[0.95] md:leading-[0.85] text-[#3D2B1F] tracking-tighter mix-blend-multiply break-words">
              {firstLine}
            </h1>
            {secondLine && (
              <h1 className="font-serif text-6xl sm:text-7xl md:text-[12vw] leading-[0.95] md:leading-[0.85] text-[#3D2B1F] tracking-tighter mix-blend-multiply ml-[6vw] md:ml-[10vw] break-words">
                {secondLine}
              </h1>
            )}
          </motion.div>
        </div>

        <motion.div
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute bottom-0 right-0 w-[90%] md:w-[70%] h-[60vh] md:h-[80vh] z-0"
        >
          <div className="relative w-full h-full overflow-hidden grayscale-[20%]">
          <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 70vw"
              quality={85}
              className="object-cover"
              style={{ viewTransitionName: `project-image-${project.slug}` } as React.CSSProperties}
            />
          </div>
        </motion.div>
      </section>

      {/* ── Meta Bar ── */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-20 bg-[#FAF6F1] relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 border-t border-[#3D2B1F]/20 pt-8">
          {project.meta?.map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest text-[#9B8B7A]">{item.label}</span>
              <span className="text-sm md:text-base font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1920px] mx-auto pb-20 sm:pb-32">
        {/* Brief & Approach */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-24 py-12 sm:py-20 md:py-32">
          <div className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-32">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] mb-4">
                The Narrative
              </h2>
              <p className="font-serif text-2xl md:text-3xl italic text-[#3D2B1F]/60">
                &quot;A dialogue between light and stone.&quot;
              </p>
            </div>
          </div>

          <div className="md:col-span-8 lg:start-6 lg:col-span-6 space-y-16">
            <div>
              <RevealText className="text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.2] mb-12">
                {project.brief}
              </RevealText>
              <p className="text-lg md:text-xl text-[#6B5B4F] leading-relaxed font-light">
                {project.approach}
              </p>
            </div>
            <SmoothLine />
            {(project.challenge || project.solution) && (
              <div className="grid grid-cols-2 gap-8">
                {project.challenge && (
                  <div>
                    <h3 className="uppercase text-xs tracking-widest font-bold mb-4">Challenge</h3>
                    <p className="text-sm text-[#6B5B4F] leading-relaxed">{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <h3 className="uppercase text-xs tracking-widest font-bold mb-4">Solution</h3>
                    <p className="text-sm text-[#6B5B4F] leading-relaxed">{project.solution}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Materials */}
        {project.materials?.length > 0 && <MaterialBoard materials={project.materials} />}

        {/* Full-width hero reprise */}
        <ParallaxImage
          src={project.heroImage}
          alt={project.title}
          aspectRatio="aspect-video sm:aspect-[21/9]"
          className="mb-20 sm:mb-32 grayscale-[10%]"
        />

        {/* Gallery / Process toggle */}
        {(project.gallery?.length > 0 || project.processGallery?.length > 0) && (
          <section className="space-y-12">
            <div className="flex justify-end px-4">
              <ToggleSwitch isOn={showProcess} onToggle={() => setShowProcess(!showProcess)} />
            </div>

            <div className="min-h-[400px] relative">
              <AnimatePresence mode="wait">
                {showProcess ? (
                  <motion.div
                    key="process"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 md:items-end"
                  >
                    {project.processGallery.map((img, i) => (
                      <div key={`process-${i}`} className={`${img.width ?? "col-span-12 md:col-span-6"} relative group`}>
                        <div className="border border-[#3D2B1F]/10 p-4 bg-white shadow-sm md:rotate-0 transition-transform md:group-hover:rotate-1">
                          <ParallaxImage
                            src={img.src}
                            alt={img.alt ?? `Process image ${i + 1}`}
                            aspectRatio={img.aspectRatio ?? "aspect-[4/3]"}
                            className="filter sepia-[0.3] contrast-[0.9]"
                          />
                          <div className="flex justify-between items-end mt-4">
                            <span className="block text-[10px] uppercase tracking-widest text-[#D97706] font-bold">
                              Concept 0{i + 1}
                            </span>
                            <span className="font-serif text-sm italic text-[#3D2B1F]">
                              {img.alt ?? `Study ${i + 1}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="final"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 md:items-end"
                  >
                    {project.gallery.map((img, i) => (
                      <div key={`final-${i}`} className={`${img.width ?? "col-span-12 md:col-span-6"} relative`}>
                        <ParallaxImage
                          src={img.src}
                          alt={img.alt ?? `Gallery image ${i + 1}`}
                          aspectRatio={img.aspectRatio ?? "aspect-[16/9]"}
                        />
                        <span className="block mt-4 text-[10px] uppercase tracking-widest text-[#9B8B7A]">
                          0{i + 1} — View
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* Testimonial */}
        {project.testimonial?.text && (
          <TestimonialSection
            data={{
              ...project.testimonial,
              eyebrow: "Client Story",
              title: "A home that feels timeless",
            }}
          />
        )}

        <ProjectReviewForm projectTitle={project.title} />

        {/* Team Credits */}
        {project.team?.length > 0 && <ProjectCredits team={project.team} />}

        {/* Next Project CTA */}
        <section className="mt-40 md:mt-60 border-t border-[#3D2B1F]">
          <Link
            href={nextProjectHref}
            className="group block relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32"
          >
            <div className="relative z-10 flex flex-col items-center justify-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] mb-6 block">
                {nextProjectSlug ? "Next Project" : "Back to Portfolio"}
              </span>
              <h2 className="font-serif text-5xl sm:text-6xl md:text-9xl text-[#3D2B1F] group-hover:translate-x-4 transition-transform duration-500 text-center break-words px-4">
                {nextProjectName}
              </h2>
              <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="text-sm uppercase tracking-widest">
                  {nextProjectSlug ? "View Case Study" : "View All"}
                </span>
                <span className="text-xl">→</span>
              </div>
            </div>
          </Link>
        </section>
      </main>
    </div>
  );
}
