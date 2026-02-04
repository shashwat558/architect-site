"use client";

import { motion, useScroll, useTransform, useInView, MotionValue, useSpring, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TestimonialSection from "../../components/TestimonialSection";
import ProjectReviewForm from "../../components/ProjectReviewForm";
import { BeforeAfterSlider } from "../../components/ui/BeforeAfterSlider";

// --- Mock Data ---
const projectData = {
  title: "Modern Residence",
  subtitle: "A Brutalist Sanctuary",
  slug: "modern-residence",
  heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  meta: [
    { label: "Location", value: "Bhopal, India" },
    { label: "Client", value: "Private Family" },
    { label: "Year", value: "2024" },
    { label: "Area", value: "4,500 sq.ft" },
    { label: "Scope", value: "Architecture & Interior" }
  ],
  brief: "The client desired a home that felt like a quiet retreat from the city's chaos. They requested openness without sacrificing privacy, and a material palette that would age gracefully. The site was narrow and hemmed in by taller structures.",
  approach: "Our strategy was subtractive. We carved courtyards and light wells from a solid volume to bring light deep into the floor plate. By inverting the focus, we created a private oasis that turns its back on the noise outside.",
  gallery: [
     { src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80", width: "col-span-12 md:col-span-8", aspectRatio: "aspect-[16/10]", type: "photo" },
     { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", width: "col-span-12 md:col-span-4", aspectRatio: "aspect-[3/4]", type: "photo" },
     { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80", width: "col-span-12 md:col-span-4", aspectRatio: "aspect-[3/4]", type: "photo" },
     { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80", width: "col-span-12 md:col-span-8", aspectRatio: "aspect-[16/10]", type: "photo" },
  ],
  processGallery: [
      { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80", width: "col-span-12 md:col-span-6", aspectRatio: "aspect-[4/3]", type: "sketch", label: "Initial Massing Study" },
      { src: "https://images.unsplash.com/photo-1628151016027-2c97dc53696e?w=800&q=80", width: "col-span-12 md:col-span-6", aspectRatio: "aspect-[4/3]", type: "sketch", label: "Circulation Diagram" },
      { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80", width: "col-span-12", aspectRatio: "aspect-[21/9]", type: "sketch", label: "Sectional Perspective" },
      { src: "https://images.unsplash.com/photo-1621252179027-94459d27d3ee?w=800&q=80", width: "col-span-12 md:col-span-4", aspectRatio: "aspect-[3/4]", type: "sketch", label: "Light Study" },
      { src: "https://images.unsplash.com/photo-1563853153547-2c7760812739?w=800&q=80", width: "col-span-12 md:col-span-8", aspectRatio: "aspect-[16/10]", type: "sketch", label: "Facade Detail Sketch" },
  ],
  nextProject: {
      name: "Green Living",
      slug: "green-living",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80"
  },
  materials: [
      { name: "Travertine", origin: "Italy", texture: "https://images.unsplash.com/photo-1596253406211-1c19b35b62b1?w=400&q=80" },
      { name: "Teak Wood", origin: "Burma", texture: "https://images.unsplash.com/photo-1549405452-19830588691b?w=400&q=80" },
      { name: "Brushed Brass", origin: "Local", texture: "https://images.unsplash.com/photo-1616423664074-907f813a0dbb?w=400&q=80" },
      { name: "Rough Concrete", origin: "In-situ", texture: "https://images.unsplash.com/photo-1517646331032-9e85639f0b5d?w=400&q=80" }
  ],
  testimonial: {
      text: "Living here feels like inhabiting a piece of art that breathes. AD.RS transformed a difficult site into a sanctuary.",
      author: "Rahul & Meera Sharma",
      role: "Homeowners"
  },
  team: [
      { role: "Principal Architect", name: "Elena Rodriguez" },
      { role: "Interior Lead", name: "Sophia Williams" },
      { role: "Structure", name: "BuildTech Consultants" },
      { role: "Lighting", name: "Lumina Studio" }
  ]
};

// --- Components ---

const ParallaxImage = ({ src, alt, className, aspectRatio = "aspect-[16/9]" }: { src: string, alt: string, className?: string, aspectRatio?: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    // Parallax effect: Image moves slower than container
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${aspectRatio} ${className}`}>
             <motion.div style={{ y, scale }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                 <Image src={src} alt={alt} fill className="object-cover" />
             </motion.div>
        </div>
    );
}

const RevealText = ({ children, className = "" }: { children: string, className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    
    return (
        <span ref={ref} className={`block overflow-hidden ${className}`}>
            <motion.span
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom ease for premium feel
                className="block"
            >
                {children}
            </motion.span>
        </span>
    );
}

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
    )
}

const TransformationSection = () => {
    return (
        <section className="py-20 md:py-32 border-t border-[#3D2B1F]/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                 <div className="lg:col-span-4 lg:col-start-1">
                     <div className="sticky top-32 space-y-8">
                         <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] mb-4">Transformation</h3>
                            <h2 className="font-serif text-3xl md:text-5xl text-[#3D2B1F] mb-6">From Ruins to Sanctuary</h2>
                         </div>
                         <p className="text-[#6B5B4F] text-lg leading-relaxed">
                             See how we stripped back the layers to reveal the potential underneath. The before-state was cluttered and dark; the after-state is a celebration of volume and light.
                         </p>
                         <div className="hidden lg:block p-6 bg-[#EDE5D8]/50 rounded-xl border border-[#D97706]/10">
                            <p className="text-sm italic font-serif text-[#3D2B1F]/80">
                                &quot;The most sustainable building is the one that already exists.&quot;
                            </p>
                         </div>
                     </div>
                 </div>

                 <div className="lg:col-span-8">
                     <div className="space-y-12">
                         <div className="space-y-4">
                            <h4 className="text-sm font-medium uppercase tracking-widest text-[#3D2B1F]">Main Living Area</h4>
                            <BeforeAfterSlider 
                                beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=80"
                                afterImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80"
                                aspectRatio="aspect-[4/3] md:aspect-[16/9]"
                            />
                         </div>

                         <div className="space-y-4">
                            <h4 className="text-sm font-medium uppercase tracking-widest text-[#3D2B1F]">The Courtyard</h4>
                            <BeforeAfterSlider 
                                beforeImage="https://images.unsplash.com/photo-1599809275372-b40c7e92947a?w=1200&q=80"
                                afterImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                                aspectRatio="aspect-[4/3] md:aspect-[16/9]"
                            />
                         </div>
                     </div>
                 </div>
            </div>
        </section>
    )
}

const MaterialBoard = ({ materials }: { materials: typeof projectData.materials }) => {
    return (
        <section className="py-20 md:py-32 border-t border-[#3D2B1F]/10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] mb-12">Material Palette</h3>
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
                       <div className="aspect-square relative overflow-hidden rounded-sm mb-4 bg-[#EDE5D8]">
                           <Image 
                                src={mat.texture} 
                                alt={mat.name} 
                                fill 
                                className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0" 
                           />
                       </div>
                       <p className="font-serif text-lg text-[#3D2B1F]">{mat.name}</p>
                       <span className="text-xs text-[#9B8B7A] uppercase tracking-widest">{mat.origin}</span>
                   </motion.div>
                ))}
            </div>
        </section>
    );
}

const ProjectCredits = ({ team }: { team: typeof projectData.team }) => {
    return (
        <section className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[#3D2B1F]/10">
            <div className="md:col-span-1">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706]">Project Team</h3>
            </div>
            <div className="md:col-span-1 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                {team.map((member, i) => (
                    <div key={i}>
                        <span className="text-[10px] uppercase tracking-widest text-[#9B8B7A] block mb-1">{member.role}</span>
                        <span className="text-sm font-medium text-[#3D2B1F]">{member.name}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

const ToggleSwitch = ({ isOn, onToggle }: { isOn: boolean, onToggle: () => void }) => {
    return (
        <div className="flex items-center gap-4 cursor-pointer group" onClick={onToggle}>
            <span className={`text-xs uppercase tracking-widest font-medium transition-colors duration-300 ${!isOn ? 'text-[#3D2B1F]' : 'text-[#9B8B7A]'}`}>
                Final Result
            </span>
            <div className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-300 ${isOn ? 'bg-[#3D2B1F]' : 'bg-[#D9D1C1]'}`}>
                <motion.div 
                    layout
                    className="w-4 h-4 bg-white rounded-full shadow-md"
                    animate={{ x: isOn ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
            </div>
            <span className={`text-xs uppercase tracking-widest font-medium transition-colors duration-300 ${isOn ? 'text-[#D97706]' : 'text-[#9B8B7A]'}`}>
                Design Thinking
            </span>
        </div>
    )
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectData; // Mock data
  const [showProcess, setShowProcess] = useState(false);
  
  // Hero Parallax
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="bg-[#FAF6F1] min-h-screen text-[#3D2B1F] selection:bg-[#D97706] selection:text-white" ref={containerRef}>
      <Header />

      <section className="relative min-h-[110vh] flex flex-col justify-between pt-32 pb-12 overflow-hidden">
          <div className="absolute top-0 right-0 p-4 md:p-12 opacity-30">
              <span className="text-[10vw] md:text-[8vw] leading-none font-serif text-[#ECE5D9] select-none">
                  2024
              </span>
          </div>

          <div className="px-6 md:px-12 lg:px-20 max-w-[1920px] mx-auto w-full z-10 relative mt-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-8 mb-4">
                    <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#D97706] font-medium">Residential</span>
                    <span className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#9B8B7A]">{project.subtitle}</span>
                </div>
                
                <h1 className="font-serif text-[12vw] leading-[0.85] text-[#3D2B1F] tracking-tighter mix-blend-multiply">
                    Modern
                </h1>
                <h1 className="font-serif text-[12vw] leading-[0.85] text-[#3D2B1F] tracking-tighter mix-blend-multiply ml-[10vw]">
                    Residence
                </h1>
              </motion.div>
          </div>

          <motion.div 
            style={{ y: yHero, opacity: opacityHero }}
            className="absolute bottom-0 right-0 w-[90%] md:w-[70%] h-[60vh] md:h-[80vh] z-0"
          >
               <div className="relative w-full h-full overflow-hidden grayscale-[20%]">
                    <Image 
                        src={project.heroImage} 
                        alt="Hero" 
                        fill 
                        priority 
                        className="object-cover"
                    />
               </div>
          </motion.div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-20 bg-[#FAF6F1] relative z-20">
         <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-[#3D2B1F]/20 pt-8">
             {project.meta.map((item, i) => (
                 <div key={i} className="flex flex-col gap-2">
                     <span className="text-[10px] uppercase tracking-widest text-[#9B8B7A]">{item.label}</span>
                     <span className="text-sm md:text-base font-medium">{item.value}</span>
                 </div>
             ))}
         </div>
      </section>

      <main className="px-6 md:px-12 lg:px-20 max-w-[1920px] mx-auto pb-32">
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 py-20 md:py-32">
             <div className="md:col-span-4 lg:col-span-3">
                 <div className="sticky top-32">
                     <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] mb-4">The Narrative</h2>
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
                 <div className="grid grid-cols-2 gap-8">
                     <div>
                         <h3 className="uppercase text-xs tracking-widest font-bold mb-4">Challenge</h3>
                         <p className="text-sm text-[#6B5B4F] leading-relaxed">Narrow site constraints and limited natural light access from neighboring structures.</p>
                     </div>
                     <div>
                         <h3 className="uppercase text-xs tracking-widest font-bold mb-4">Solution</h3>
                         <p className="text-sm text-[#6B5B4F] leading-relaxed">Inward-looking courtyard typology focusing on vertical light penetration.</p>
                     </div>
                 </div>
             </div>
        </section>

        <TransformationSection />

        <MaterialBoard materials={project.materials} />

        <ParallaxImage src={project.heroImage} alt="Detail" aspectRatio="aspect-[21/9]" className="mb-32 grayscale-[10%]" />

        <section className="space-y-12">
            <div className="flex justify-end px-4">
                <ToggleSwitch isOn={showProcess} onToggle={() => setShowProcess(!showProcess)} />
            </div>

            <div className="min-h-[800px] relative">
               <AnimatePresence mode="wait">
                 {showProcess ? (
                    <motion.div 
                        key="process"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end"
                    >
                        {project.processGallery.map((img, i) => (
                            <div key={`process-${i}`} className={`${img.width} relative group`}>
                                <div className="border border-[#3D2B1F]/10 p-4 bg-white shadow-sm rotate-1 md:rotate-0 transition-transform md:group-hover:rotate-1">
                                    <ParallaxImage src={img.src} alt={img.label} aspectRatio={img.aspectRatio} className="filter sepia-[0.3] contrast-[0.9]" />
                                    <div className="flex justify-between items-end mt-4">
                                        <span className="block text-[10px] uppercase tracking-widest text-[#D97706] font-bold">Concept 0{i + 1}</span>
                                        <span className="font-serif text-sm italic text-[#3D2B1F]">{img.label}</span>
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
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end"
                    >
                        {project.gallery.map((img, i) => (
                            <div key={`final-${i}`} className={`${img.width} relative`}>
                                <ParallaxImage src={img.src} alt="Gallery Image" aspectRatio={img.aspectRatio} />
                                <span className="block mt-4 text-[10px] uppercase tracking-widest text-[#9B8B7A]">0{i + 1} — View</span>
                            </div>
                        ))}
                    </motion.div>
                 )}
               </AnimatePresence>
            </div>
        </section>

                <TestimonialSection
                    data={{
                        ...project.testimonial,
                        eyebrow: "Client Story",
                        title: "A home that feels timeless",
                    }}
                />

                <ProjectReviewForm projectTitle={project.title} />

        <ProjectCredits team={project.team} />

        <section className="mt-40 md:mt-60 border-t border-[#3D2B1F]">
             <Link href={`/projects/${project.nextProject.slug}`} className="group block relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32">
                 <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                     <Image 
                        src={project.nextProject.image} 
                        alt="Next" 
                        fill 
                        className="object-cover opacity-20 blur-sm scale-110 group-hover:scale-100 transition-transform duration-1000" 
                     />
                 </div>

                 <div className="relative z-10 flex flex-col items-center justify-center">
                     <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706] mb-6 block">Next Project</span>
                     <h2 className="font-serif text-6xl md:text-9xl text-[#3D2B1F] group-hover:translate-x-4 transition-transform duration-500">
                         {project.nextProject.name}
                     </h2>
                     <div className="mt-8 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                         <span className="text-sm uppercase tracking-widest">View Case Study</span>
                         <span className="text-xl">→</span>
                     </div>
                 </div>
             </Link>
        </section>

      </main>
      <Footer />
    </div>
  );
}