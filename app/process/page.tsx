"use client";

import { useRef } from "react";
import { motion, useScroll, useInView, useSpring } from "motion/react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { cn } from "@/lib/utils";

const processSteps = [
  {
    id: 1,
    title: "The Conversation",
    subtitle: "Discovery & Connection",
    description: "Every great space begins with a conversation. We sit down with you—over coffee or a call—to understand not just the requirements, but the feeling you want to evoke. We talk about your lifestyle, your budget, and your wildest dreams.",
    inputs: ["Your Wishlist", "Site Plans", "Inspiration Images"],
    deliverables: ["Project Feasibility", "Design Brief", "Initial Mood Direction"],
  },
  {
    id: 2,
    title: "The Spark",
    subtitle: "Concept Design",
    description: "This is where ideas take shape. We translate our conversation into visual concepts. We explore massing, light, and flow. It’s rough, it’s artistic, and it’s collaborative. We find the soul of the project.",
    inputs: ["Feedback on Sketches", "Review of Layout Options"],
    deliverables: ["Concept Sketches", "Floor Plan Options", "3D Massing Models"],
  },
  {
    id: 3,
    title: "The Refinement",
    subtitle: "Design Development",
    description: "We sharpen the pencil. The concept evolves into a rigorous design. We select materials, define precise dimensions, and ensure the structure works. The blurry dream becomes a sharp reality.",
    inputs: ["Approval on Finishes", "Fixture Selection"],
    deliverables: ["Photorealistic Renders", "Material Palette", "Detailed Elevations"],
  },
  {
    id: 4,
    title: "The Blueprint",
    subtitle: "Technical Documentation",
    description: "The instruction manual for your building. We produce the technical drawings that contractors speak. Every socket, every join, every pipe is accounted for to ensure the build goes smoothly.",
    inputs: ["Patience (it’s technical!)"],
    deliverables: ["Good for Construction (GFC) Drawings", "Electrical & Plumbing Plans", "Bill of Quantities"],
  },
  {
    id: 5,
    title: "The Realization",
    subtitle: "Construction & Handover",
    description: "We don't just hand over drawings; we watch the build. We visit the site, solve on-the-ground problems, and ensure the quality matches the vision. Finally, we hand you the keys.",
    inputs: ["Site Visits", " Milestone Approvals"],
    deliverables: ["Site Supervision", "Quality Checks", "The Final Built Space"],
  },
];

const StepCard = ({ step, index }: { step: typeof processSteps[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={cn(
        "relative flex flex-col md:flex-row items-center gap-12 md:gap-24 py-24",
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Center Checkpoint Marker for Desktop */}
      <div className="hidden md:flex absolute left-1/2 top-24 -translate-x-1/2 flex-col items-center justify-center z-10">
        <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-12 h-12 rounded-full bg-[#FAF6F1] border-4 border-[#3D2B1F] flex items-center justify-center text-[#3D2B1F] font-bold font-serif text-lg shadow-[0_0_20px_rgba(217,119,6,0.3)] z-10"
        >
            {step.id}
        </motion.div>
      </div>

      {/* Narrative Section */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn("md:w-1/2 space-y-6 text-center", isEven ? "md:text-right" : "md:text-left")}
      >
        <div className="space-y-2">
           <motion.span 
              initial={{ opacity: 0 }} 
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[#D97706] text-xs font-bold tracking-[0.2em] uppercase"
            >
              Phase 0{step.id}
           </motion.span>
           <h3 className="text-4xl md:text-6xl font-serif text-[#3D2B1F]">{step.title}</h3>
           <p className="text-xl md:text-2xl text-[#D97706]/80 font-serif italic">{step.subtitle}</p>
        </div>
        <p className="text-lg text-[#6B5B4F] leading-relaxed max-w-lg mx-auto md:mx-0">
            {step.description}
        </p>
      </motion.div>

      {/* The Exchange Card */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.9, y: 30 }}
         animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
         transition={{ duration: 0.8, delay: 0.2 }}
         className="md:w-1/2 w-full"
      >
        <div className="relative group bg-white/40 backdrop-blur-md border border-[#D97706]/10 p-8 md:p-12 rounded-3xl shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(217,119,6,0.15)] transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#FAF6F1] to-[#D97706]/5 opacity-80" />
            
            {/* Hover Indicator */}
            <div className="absolute top-0 left-0 w-2 h-0 bg-[#D97706] group-hover:h-full transition-all duration-500 delay-100 ease-in-out" />
            
            <div className="relative grid grid-cols-1 gap-8 text-left">
                <div className="space-y-4">
                    <h4 className="font-serif text-lg text-[#3D2B1F] flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#3D2B1F] text-[#FAF6F1] flex items-center justify-center text-xs">You</span>
                        Bring to the table
                    </h4>
                    <ul className="space-y-3 pl-2 border-l border-[#3D2B1F]/10 ml-4">
                        {step.inputs.map((d, i) => (
                            <li key={i} className="text-[#6B5B4F] text-sm flex items-center gap-3 pl-4">
                                {d}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="h-px w-full bg-[#D97706]/20" />
                <div className="space-y-4">
                    <h4 className="font-serif text-lg text-[#D97706] flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#D97706] text-white flex items-center justify-center text-xs">We</span>
                        Deliver to you
                    </h4>
                    <ul className="space-y-3 pl-2 border-l border-[#D97706]/30 ml-4">
                        {step.deliverables.map((d, i) => (
                            <li key={i} className="text-[#3D2B1F] text-sm font-medium flex items-center gap-3 pl-4">
                                {d}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProcessPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#FAF6F1] min-h-screen text-[#3D2B1F]" ref={containerRef}>
      <Header />
      
      {/* Background Ambience - Full Hero Span */}
      <div className="absolute top-0 left-0 w-full h-[110vh] overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#D97706_0%,transparent_55%)] opacity-10" />
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#FAF6F1] to-transparent" />
      </div>

      <main className="relative z-10 pt-32 pb-20 px-4 md:px-12 max-w-7xl mx-auto overflow-hidden">
        
        {/* Connection Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-[400px] bottom-[200px] w-0.5 bg-[#D97706]/10 -translate-x-1/2 z-0">
             <motion.div 
                style={{ scaleY, transformOrigin: "top" }} 
                className="w-full h-full bg-[#D97706]"
             />
        </div>
     
        {/* Hero */}
        <div className="relative py-24 md:py-40 text-center max-w-4xl mx-auto z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,#D97706_0%,transparent_50%)] opacity-5 blur-3xl pointer-events-none"
            />
            
            <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-7xl md:text-9xl font-serif text-[#3D2B1F] leading-[0.9] tracking-tight"
            >
                How We <br/>
                <span className="italic text-[#D97706] bg-clip-text">Build Dreams</span>
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-8 text-xl md:text-2xl text-[#6B5B4F] font-light max-w-2xl mx-auto leading-relaxed"
            >
                Architecture is messy. We make it <span className="text-[#3D2B1F] font-medium border-b border-[#D97706]">seamless</span>.
                <br/>Here is our blueprint for clarity, from first coffee to final key turn.
            </motion.p>
            
        </div>

        {/* Steps Container */}
        <div className="relative z-10 space-y-0 pb-32">
             {processSteps.map((step, index) => (
                    <StepCard key={step.id} step={step} index={index} />
             ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-8 py-32 relative z-10">
            <motion.div 
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl mx-auto bg-[#3D2B1F] text-[#FAF6F1] rounded-3xl p-12 md:p-20 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D97706] rounded-full blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2"/>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D97706] rounded-full blur-[100px] opacity-20 -translate-x-1/2 translate-y-1/2"/>

                <h2 className="text-4xl md:text-6xl font-serif mb-6 relative z-10">Ready to begin?</h2>
                <p className="text-[#FAF6F1]/70 text-lg md:text-xl font-light mb-10 max-w-lg mx-auto relative z-10">
                    Your space is waiting to be found. Step 1 is just a conversation.
                </p>
                <Link href="/contact" className="relative z-10 inline-flex items-center gap-3 px-10 py-5 bg-[#D97706] text-white rounded-full text-lg font-medium transition-all hover:bg-white hover:text-[#D97706] hover:scale-105 shadow-xl group">
                    <span>Book Consultation</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M4.16669 10H15.8334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 4.16669L15.8333 10L10 15.8334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Link>
            </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
