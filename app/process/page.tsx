"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useInView, useSpring, useTransform, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const processSteps = [
  {
    id: 1,
    phase: "01",
    duration: "2–3 Weeks",
    title: "The Conversation",
    subtitle: "Discovery, Connection & Visioning",
    description:
      "Every masterpiece begins with a dialogue. We sit down with you—over fresh coffee or a detailed video call—to understand not just your space requirements, but the lifestyle, emotions, and atmosphere you desire. We analyze site constraints, sun paths, and local breezes to establish a strong foundational narrative.",
    inputs: ["Design Wishlist & Functional Requirements", "Site Topography & Boundary Plans", "Visual Inspirations & Mood Direction"],
    deliverables: ["Site Feasibility Analysis", "Co-Created Design Brief", "Atmospheric Mood & Spatial Direction"],
    blueprintSvg: (
      <svg className="w-full h-full stroke-[#3D2B1F]/30 fill-none" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="60" strokeDasharray="4,4" className="stroke-[#D97706]/40 animate-[spin_40s_linear_infinite]" />
        <circle cx="100" cy="100" r="40" />
        <path d="M40,100 H160 M100,40 V160" strokeDasharray="2,2" />
        <circle cx="65" cy="80" r="12" className="fill-[#FAF6F1]/90 stroke-[#3D2B1F]" />
        <circle cx="135" cy="120" r="12" className="fill-[#FAF6F1]/90 stroke-[#D97706]" />
        <path d="M77,85 Q100,100 123,115" strokeDasharray="3,3" className="stroke-[#D97706]" />
        <text x="65" y="84" className="text-[6px] font-mono fill-[#3D2B1F] text-center" textAnchor="middle">SITE</text>
        <text x="135" y="124" className="text-[6px] font-mono fill-[#D97706] text-center" textAnchor="middle">USER</text>
        <text x="105" y="52" className="text-[5px] font-mono fill-[#9B8B7A]">R=60.00</text>
        <text x="15" y="190" className="text-[5px] font-mono fill-[#9B8B7A]">DISCOVERY & CONTEXT / PH-01</text>
      </svg>
    ),
  },
  {
    id: 2,
    phase: "02",
    duration: "3–4 Weeks",
    title: "The Spark",
    subtitle: "Conceptual Spatial Design",
    description:
      "This is where ideas take physical form. We translate our findings into initial conceptual layout sketches. We explore spatial volumes, functional zoning, natural light access, and indoor-outdoor relationships. It is a highly collaborative phase of sketching, sculpting, and structural brainstorming.",
    inputs: ["Feedback on Initial Zoning Directions", "Material Preferences & Functional Priorities"],
    deliverables: ["Conceptual Spatial Sketches", "Multiple Floor Plan Layout Options", "3D Massing & Volume Studies"],
    blueprintSvg: (
      <svg className="w-full h-full stroke-[#3D2B1F]/30 fill-none" viewBox="0 0 200 200">
        <rect x="30" y="30" width="140" height="140" strokeDasharray="3,3" />
        <path d="M30,30 L170,170 M170,30 L30,170" strokeDasharray="5,5" className="stroke-[#9B8B7A]/30" />
        <rect x="50" y="50" width="100" height="100" className="stroke-[#3D2B1F] fill-[#3D2B1F]/5" strokeWidth="1.5" />
        <rect x="80" y="80" width="70" height="70" className="stroke-[#D97706] fill-[#FAF6F1]" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="10" className="fill-[#FAF6F1] stroke-[#3D2B1F]" />
        <path d="M20,100 H180" strokeWidth="1" />
        <path d="M175,97 L180,100 L175,103" className="fill-[#3D2B1F]" />
        <path d="M100,20 V180" strokeWidth="1" />
        <path d="M97,175 L100,180 L103,175" className="fill-[#3D2B1F]" />
        <text x="15" y="190" className="text-[5px] font-mono fill-[#9B8B7A]">MASSING STUDIES & CIRCULATION / PH-02</text>
      </svg>
    ),
  },
  {
    id: 3,
    phase: "03",
    duration: "4–6 Weeks",
    title: "The Refinement",
    subtitle: "Design Development & Materiality",
    description:
      "We sharpen the pencil. The chosen concept is refined into a precise, detailed architectural and interior scheme. We select the tactile materiality—wood, stone, custom metals, and textiles. We create realistic lighting layouts and simulate photorealistic views to ensure every corner matches our high design standards.",
    inputs: ["Zoning Plan Sign-off", "Specific Fixture & Appliance Selection"],
    deliverables: ["High-Fidelity Photorealistic Renderings", "Detailed Material Boards & Finishes Palette", "Complete Spatial Elevation Drawings"],
    blueprintSvg: (
      <svg className="w-full h-full stroke-[#3D2B1F]/30 fill-none" viewBox="0 0 200 200">
        <path d="M100,30 L170,70 L170,140 L100,180 L30,140 L30,70 Z" className="stroke-[#3D2B1F]" strokeWidth="1.5" />
        <path d="M100,30 L100,180 M30,70 L100,110 L170,70 M30,140 L100,110" className="stroke-[#3D2B1F]" />
        <path d="M50,90 L50,130 L100,158 L100,118 Z" className="fill-[#D97706]/10 stroke-[#D97706]" strokeWidth="1.2" />
        <path d="M25,65 L25,145 M20,70 L30,70 M20,140 L30,140" strokeWidth="0.8" className="stroke-[#9B8B7A]" />
        <text x="12" y="110" className="text-[5px] font-mono fill-[#9B8B7A] rotate-90 origin-center">H = 12.50m</text>
        <text x="15" y="190" className="text-[5px] font-mono fill-[#9B8B7A]">MATERIAL SCHEMATICS & 3D SCALE / PH-03</text>
      </svg>
    ),
  },
  {
    id: 4,
    phase: "04",
    duration: "3–4 Weeks",
    title: "The Blueprint",
    subtitle: "Technical Documentation & Detailing",
    description:
      "The master instruction guide for construction. We compile a detailed construction package containing architectural, electrical, plumbing, HVAC, and joinery details. These drawings eliminate guesswork, ensuring local contractors can execute the design flawlessly down to the millimeter.",
    inputs: ["Final Design Approval", "Structural Engineer Specifications"],
    deliverables: ["Good For Construction (GFC) Drawing Set", "Detailed Carpentry, Door & Window Schedules", "Comprehensive Bill of Quantities (BOQ)"],
    blueprintSvg: (
      <svg className="w-full h-full stroke-[#3D2B1F]/30 fill-none" viewBox="0 0 200 200">
        <rect x="10" y="10" width="180" height="180" strokeWidth="0.8" />
        <rect x="14" y="14" width="172" height="172" strokeWidth="0.5" strokeDasharray="6,2" />
        <path d="M15,50 H185 M15,100 H185 M15,150 H185" className="stroke-[#9B8B7A]/20" />
        <path d="M50,15 V185 M100,15 V185 M150,15 V185" className="stroke-[#9B8B7A]/20" />
        <rect x="45" y="95" width="10" height="10" className="fill-[#3D2B1F]" />
        <rect x="95" y="95" width="10" height="10" className="fill-[#3D2B1F]" />
        <rect x="145" y="95" width="10" height="10" className="fill-[#3D2B1F]" />
        <path d="M45,100 H155" strokeWidth="2" />
        <path d="M50,120 H100" className="stroke-[#D97706]" strokeWidth="0.8" />
        <path d="M50,117 L50,123 M100,117 L100,123" className="stroke-[#D97706]" strokeWidth="0.8" />
        <text x="75" y="115" className="text-[5px] font-mono fill-[#D97706]" textAnchor="middle">5000 mm</text>
        <text x="15" y="190" className="text-[5px] font-mono fill-[#9B8B7A]">TECHNICAL GFC DETAILED SPEC / PH-04</text>
      </svg>
    ),
  },
  {
    id: 5,
    phase: "05",
    duration: "Ongoing",
    title: "The Realization",
    subtitle: "Supervision, Craft & Handover",
    description:
      "We step out of the studio and onto the job site. We partner with the execution team, conduct critical milestone quality audits, resolve on-site geometric challenges, and coordinate with artisans. We ensure materials, alignment, and finishes meet the initial design intent. Finally, we hand you the keys to your new home.",
    inputs: ["On-site Sign-offs", "Selection of Loose Furniture & Accessories"],
    deliverables: ["Regular Construction Progress Reports", "Artisanal Execution Quality Control", "Complete Built Space Handover"],
    blueprintSvg: (
      <svg className="w-full h-full stroke-[#3D2B1F]/30 fill-none" viewBox="0 0 200 200">
        <path d="M30,150 H170 M45,150 V80 L100,40 L155,80 V150" className="stroke-[#3D2B1F]" strokeWidth="1.5" />
        <rect x="65" y="100" width="25" height="50" />
        <rect x="110" y="100" width="30" height="30" />
        <circle cx="77" cy="125" r="1.5" className="fill-[#3D2B1F]" />
        <path d="M100,40 V150" strokeDasharray="3,3" className="stroke-[#9B8B7A]/50" />
        <path d="M15,150 H185" strokeWidth="0.5" />
        <circle cx="150" cy="55" r="10" strokeDasharray="2,2" className="stroke-[#D97706]" />
        <text x="15" y="190" className="text-[5px] font-mono fill-[#9B8B7A]">COMPLETED FACADE ELEVATION / PH-05</text>
      </svg>
    ),
  },
];

// Interactive scroll element for the right side
const RightScrollTrigger = ({
  step,
  setActiveStep,
}: {
  step: typeof processSteps[0];
  setActiveStep: (id: number) => void;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, {
    once: false,
    margin: "-35% 0px -45% 0px", // Trigger when center of element reaches center of screen
  });

  useEffect(() => {
    if (isInView) {
      setActiveStep(step.id);
    }
  }, [isInView, step.id, setActiveStep]);

  return (
    <div
      ref={elementRef}
      id={`step-${step.id}`}
      className="min-h-[75vh] lg:min-h-screen flex items-center py-16 scroll-mt-24"
    >
      <div className="w-full relative bg-white border border-[#3D2B1F]/10 p-6 sm:p-12 rounded-3xl shadow-[0_4px_30px_rgba(61,43,31,0.02)] hover:shadow-[0_20px_50px_rgba(217,119,6,0.06)] hover:border-[#D97706]/20 transition-all duration-500 overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#3D2B1F]/20 via-[#D97706] to-[#3D2B1F]/20" />
        <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-[#D97706]/5 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

        {/* Mobile-only header details */}
        <div className="lg:hidden space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D97706] bg-[#D97706]/5 px-2 py-0.5 rounded border border-[#D97706]/10">
              Phase {step.phase}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#9B8B7A]">
              {step.duration}
            </span>
          </div>
          <h3 className="text-3xl font-serif text-[#3D2B1F] tracking-tight">{step.title}</h3>
          <p className="text-sm text-[#D97706] font-serif italic">{step.subtitle}</p>
          <p className="text-sm text-[#6B5B4F] leading-relaxed pt-2">{step.description}</p>
          <div className="relative aspect-[16/10] w-full rounded-xl border border-[#3D2B1F]/10 bg-[#FAF6F1] overflow-hidden my-4">
            <div className="absolute inset-4 z-0 flex items-center justify-center">
              {step.blueprintSvg}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Card Title for identification in scroll */}
          <div className="hidden lg:block pb-2 border-b border-[#3D2B1F]/5">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97706]">
              Phase {step.phase} — {step.title}
            </span>
          </div>

          {/* Input list block */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#3D2B1F] flex items-center justify-center text-[#FAF6F1] font-mono text-xs shadow-sm">
                A
              </div>
              <div>
                <h4 className="font-serif text-base text-[#3D2B1F] font-bold">Client Inputs</h4>
                <p className="text-[9px] font-mono text-[#9B8B7A] uppercase tracking-wider">What you bring to the design desk</p>
              </div>
            </div>
            <ul className="space-y-3 pl-1.5 ml-4 border-l border-[#3D2B1F]/10">
              {step.inputs.map((input, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#6B5B4F] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]/60 mt-2 shrink-0" />
                  <span>{input}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Separator gridline */}
          <div className="relative py-2">
            <div className="h-[1px] w-full bg-[#3D2B1F]/5" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[9px] font-mono text-[#9B8B7A]/60 uppercase tracking-[0.2em]">
              Exchange details
            </div>
          </div>

          {/* Output deliverables block */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D97706] flex items-center justify-center text-white font-mono text-xs shadow-sm shadow-[#D97706]/20">
                B
              </div>
              <div>
                <h4 className="font-serif text-base text-[#D97706] font-bold">Deliverables</h4>
                <p className="text-[9px] font-mono text-[#9B8B7A] uppercase tracking-wider">What we deliver back to you</p>
              </div>
            </div>
            <ul className="space-y-3 pl-1.5 ml-4 border-l border-[#D97706]/20">
              {step.deliverables.map((deliv, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#3D2B1F] font-medium leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3D2B1F] mt-2 shrink-0" />
                  <span>{deliv}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProcessPage() {
  const [activeStep, setActiveStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 900], [0, 150]);
  const scaleBg = useTransform(scrollY, [0, 900], [1, 1.08]);

  const rulerProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Get active step details
  const activeStepData = processSteps.find((s) => s.id === activeStep) || processSteps[0];

  return (
    <div className="bg-[#FAF6F1] min-h-screen text-[#3D2B1F] selection:bg-[#D97706] selection:text-white" ref={containerRef}>
      
      {/* ── Editorial Blueprint Hero ── */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 overflow-hidden border-b border-[#3D2B1F]/10">
        <div className="absolute inset-0 z-0">
          {/* Architecture Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] z-20 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #3D2B1F 1px, transparent 1px),
                linear-gradient(to bottom, #3D2B1F 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Blueprint Parallax BG Image */}
          <motion.div
            style={{ y: yBg, scale: scaleBg }}
            className="absolute inset-0 w-full h-[120%] z-0 grayscale sepia mix-blend-multiply"
          >
            <Image
              src="/process.jpeg"
              alt="Architectural workspace"
              fill
              priority
              quality={90}
              className="object-cover object-center"
            />
          </motion.div>
          {/* Premium translucent paper overlay */}
          <div className="absolute inset-0 bg-[#FAF6F1]/90 backdrop-blur-[1.5px] z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF6F1]/20 to-[#FAF6F1] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#FAF6F1_85%)] z-10" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-5xl mx-auto text-center z-30 pt-24 pb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#D97706]/20 bg-[#D97706]/5 text-xs font-mono uppercase tracking-[0.2em] text-[#D97706] mb-8"
          >
            <span>Our Studio Methodology</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[100px] font-serif text-[#3D2B1F] leading-[0.95] tracking-tight"
          >
            Sculpting Space, <br />
            <span className="italic text-[#D97706]">Step by Step</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-lg sm:text-xl md:text-2xl text-[#6B5B4F] font-light max-w-3xl mx-auto leading-relaxed"
          >
            Architectural projects demand absolute clarity. We guide you transparently through an editorial sequence, converting dreams into physical concrete structures.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex justify-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#9B8B7A]"
          >
            <span>DISCOVER</span>
            <span className="text-[#D97706]">•</span>
            <span>DEVELOP</span>
            <span className="text-[#D97706]">•</span>
            <span>DOCUMENT</span>
            <span className="text-[#D97706]">•</span>
            <span>DELIVER</span>
          </motion.div>
        </div>
      </section>

      {/* ── Main Split-Scroll Section ── */}
      <main className="relative z-10 px-4 md:px-12 lg:px-20 max-w-7xl mx-auto">
        
        {/* The split scroll layout */}
        <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left Column: STICKY panel on Desktop */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-24 lg:h-[85vh] flex flex-col justify-center py-8 z-20">
            {/* Dynamic Watermark Indicator */}
            <div className="absolute top-10 left-0 pointer-events-none select-none text-[15vw] lg:text-[10vw] font-serif font-bold text-[#D97706]/3 opacity-[0.04] transition-all duration-700">
              PHASE {activeStepData.phase}
            </div>

            {/* Smooth transition container */}
            <div className="hidden lg:block relative min-h-[60vh] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D97706] bg-[#D97706]/5 px-3 py-1 rounded-sm border border-[#D97706]/10">
                      Phase {activeStepData.phase}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-[#9B8B7A]">
                      Duration: {activeStepData.duration}
                    </span>
                  </div>

                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#3D2B1F] tracking-tight leading-tight">
                    {activeStepData.title}
                  </h2>
                  
                  <p className="text-lg text-[#D97706] font-serif italic font-light">
                    {activeStepData.subtitle}
                  </p>

                  <p className="text-base text-[#6B5B4F] leading-relaxed font-light">
                    {activeStepData.description}
                  </p>

                  {/* Drafting Blueprint Illustration Container */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl border border-[#3D2B1F]/10 bg-[#FAF6F1] shadow-[inset_0_4px_20px_rgba(61,43,31,0.02)] overflow-hidden group/blueprint mt-6">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(250,246,241,0.8)_100%)] z-10 pointer-events-none" />
                    <div
                      className="absolute inset-0 opacity-[0.02] pointer-events-none"
                      style={{
                        backgroundImage: "linear-gradient(#3d2b1f 1px, transparent 1px), linear-gradient(90deg, #3d2b1f 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="absolute inset-6 z-0 flex items-center justify-center transition-transform duration-700 group-hover/blueprint:scale-105">
                      {activeStepData.blueprintSvg}
                    </div>
                    <div className="absolute top-4 left-4 font-mono text-[9px] text-[#9B8B7A]/60 uppercase tracking-widest">
                      DET.REF_ {activeStepData.phase}/2026
                    </div>
                    <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#9B8B7A]/60">
                      SCALE: NTS
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Interactive bottom timeline ruler */}
              <div className="pt-8 flex items-center gap-4 border-t border-[#3D2B1F]/5">
                <div className="flex items-center gap-2">
                  {processSteps.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        const el = document.getElementById(`step-${s.id}`);
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        activeStep === s.id ? "w-8 bg-[#D97706]" : "w-2 bg-[#3D2B1F]/10 hover:bg-[#3D2B1F]/30"
                      )}
                      title={`Go to Phase ${s.phase}`}
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] text-[#9B8B7A] uppercase tracking-widest">
                  Phase 0{activeStep} of 05
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Scrollable Exchange Cards */}
          <div className="w-full lg:w-[50%] lg:ml-auto">
            {processSteps.map((step) => (
              <RightScrollTrigger
                key={step.id}
                step={step}
                setActiveStep={setActiveStep}
              />
            ))}
          </div>

        </div>

        {/* ── Bottom CTA ── */}
        <div className="py-24 md:py-36">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[#3D2B1F] text-[#FAF6F1] rounded-[32px] p-8 sm:p-16 md:p-24 shadow-2xl overflow-hidden"
          >
            {/* Elegant glowing background circles */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D97706] rounded-full blur-[160px] opacity-15 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#D97706] rounded-full blur-[140px] opacity-10 -translate-x-1/3 translate-y-1/3" />
            
            {/* Technical grid backdrop */}
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(#FAF6F1 1px, transparent 1px), linear-gradient(90deg, #FAF6F1 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#D97706]">
                Initiate Consultation
              </span>
              
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-none tracking-tight">
                Ready to translate <br />
                <span className="italic text-[#D97706]">your vision?</span>
              </h2>
              
              <p className="text-[#FAF6F1]/70 text-base sm:text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed">
                Step one is simple: we talk. Share your ideas, site details, and requirements. We will sketch the direction.
              </p>
              
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-[#D97706] text-white rounded-full text-base sm:text-lg font-medium transition-all hover:bg-white hover:text-[#3D2B1F] hover:scale-105 shadow-xl group min-h-12"
                >
                  <span>Begin the Journey</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    <path
                      d="M4.16669 10H15.8334"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 4.16669L15.8333 10L10 15.8334"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
