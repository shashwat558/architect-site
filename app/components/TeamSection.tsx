"use client";

import {
  AnimatePresence,
  motion,
  type Variants,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { MouseEvent, useRef, useState, useEffect } from "react";
import type { TeamMember, TeamSectionData } from "../data/dummyData";
import ConstructImage from "./ui/ConstructImage";

export type TeamSectionProps = {
  data: TeamSectionData;
};


// --- Modal Component ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  },
  exit: { opacity: 0, y: 20 }
};

// 3D Tilt Component for Modal Blocks
const TiltBlock = ({ children, className, variants }: { children: React.ReactNode; className?: string; variants?: Variants }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const TeamMemberModal = ({ member, onClose }: { member: TeamMember; onClose: () => void }) => {
  // Triple the gallery to ensure smooth infinite loop even with few images
  const marqueeImages = [...member.gallery, ...member.gallery, ...member.gallery];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Blur Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#3D2B1F]/90 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-7xl h-[85vh] grid grid-cols-1 md:grid-cols-12 gap-6 p-4 md:p-8 pointer-events-none perspective-2000"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Staggered */}
        <motion.div
          variants={itemVariants}
          className="absolute top-2 right-2 md:top-0 md:right-0 z-[60] pointer-events-auto"
        >
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-[#FAF6F1] shadow-lg flex items-center justify-center text-[#3D2B1F] hover:bg-[#D97706] hover:text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </motion.div>

        {/* Left Column: Main Person Image (Spans 5 cols) */}
        <TiltBlock
          variants={itemVariants}
          className="md:col-span-5 rounded-3xl overflow-hidden h-[40vh] md:h-full shadow-2xl bg-[#2a1d15] pointer-events-auto group"
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a1d15]/60 to-transparent" />

          {/* Subtle glare effect */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
        </TiltBlock>

        {/* Right Column Grid (Spans 7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-6 h-full pointer-events-auto">

          {/* Top Right: Header & Bio Block */}
          <TiltBlock
            variants={itemVariants}
            className="flex-grow rounded-3xl bg-[#FAF6F1] p-8 md:p-10 shadow-xl overflow-hidden flex flex-col relative"
          >
            <div className="flex-shrink-0 mb-6 transform translate-z-10">
              <p className="text-[#D97706] text-sm uppercase tracking-widest font-bold mb-2">{member.title}</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#3D2B1F] leading-[1.1] vibrate-text">{member.name}</h2>
              <div className="w-20 h-px bg-[#3D2B1F]/20 mt-6" />
            </div>

            <div className="flex-grow overflow-y-auto custom-scrollbar pr-4 relative z-10" data-lenis-prevent="true">
              <p className="text-[#6B5B4F] leading-relaxed font-light text-lg md:text-xl">
                {member.bio}
              </p>

              <div className="mt-12 pt-6 border-t border-[#E5DDD0]">
                <p className="text-[#9B8B7A] text-xs uppercase tracking-wide mb-4">Connect</p>
                <div className="flex gap-4 flex-wrap">
                  {member.socials.map(social => (
                    <a key={social.name} href={social.url} className="px-6 py-3 border border-[#3D2B1F]/20 rounded-full text-[#3D2B1F] text-sm hover:bg-[#3D2B1F] hover:text-[#FAF6F1] transition-colors hover:scale-105 transform">
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </TiltBlock>

          {/* Bottom Right: Big Carousel Block */}
          <TiltBlock
            variants={itemVariants}
            className="h-64 rounded-3xl overflow-hidden relative flex flex-col justify-center"
          >
            {/* Marquee */}
            <div className="relative w-full overflow-hidden transform translate-z-10">
              <motion.div
                className="flex gap-6 items-center px-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 25
                }}
                style={{ width: "max-content" }}
              >
                {marqueeImages.map((img, i) => (
                  <div key={i} className="relative w-72 h-44 flex-shrink-0 rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src={img}
                      fill
                      className="object-cover"
                      alt="Gallery image"
                      sizes="300px"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </TiltBlock>

        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Sub-components ---

const SocialIcon = ({ name }: { name: string }) => {
  const iconMap: { [key: string]: string } = {
    LinkedIn: "LI",
    Instagram: "IG",
    Email: "EM",
    Behance: "BE",
    Twitter: "TW",
    GitHub: "GH",
  };

  return (
    <div className="w-10 h-10 rounded-full border border-[#FAF6F1]/20 bg-[#FAF6F1]/10 backdrop-blur-sm flex items-center justify-center text-[#FAF6F1] text-xs font-semibold hover:bg-[#D97706] hover:border-[#D97706] hover:text-white transition-all duration-300">
      {iconMap[name] || name.substring(0, 2).toUpperCase()}
    </div>
  );
};

const TeamMemberCard = ({
  member,
  index,
  onClick,
}: {
  member: TeamMember;
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position logic for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse coordinates to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Spotlight effect gradient
  const spotlightX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className="relative group w-full aspect-[3/4] perspective-1000 cursor-pointer"
    >
      {/* Card Content */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden bg-[#2a1d15] shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_20px_50px_rgba(217,119,6,0.15)]"
        style={{ transform: "translateZ(0px)" }}
      >
        {/* Background Image with slight parallax scaling */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            scale: 1.1,
            x: useTransform(mouseXSpring, [-0.5, 0.5], ["3%", "-3%"]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], ["3%", "-3%"])
          }}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-all duration-700 group-hover:saturate-100 saturate-0 opacity-90 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>

        {/* Cinematic Gradient Overlay (Always visible but shifts on hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3D2B1F] via-[#3D2B1F]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Spotlight Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-soft-light"
          style={{
            background: useMotionTemplate`radial-gradient(400px circle at ${spotlightX} ${spotlightY}, rgba(255,255,255,0.2), transparent 80%)`,
          }}
        />

        {/* Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useMotionTemplate`radial-gradient(800px circle at ${spotlightX} ${spotlightY}, rgba(255,255,255,0.15), transparent 80%)`,
            maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />


        {/* Text Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500" style={{ transform: "translateZ(50px)" }}>

          {/* Socials - Reveal on Hover */}
          <div className="absolute top-8 right-8 flex flex-col gap-3 translate-y-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
            {member.socials.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noreferrer">
                <SocialIcon name={social.name} />
              </a>
            ))}
          </div>

          {/* Name & Title */}
          <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="font-serif text-3xl text-[#FAF6F1] leading-tight mb-2 vibrate-text">
              <span className="block overflow-hidden">
                <span className="block translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1)">
                  {member.name.split(" ")[0]}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-75 cubic-bezier(0.22, 1, 0.36, 1)">
                  {member.name.split(" ").slice(1).join(" ")}
                </span>
              </span>
            </h3>
            <p className="font-sans text-[#D97706] text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
              {member.title}
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// --- Main Section ---

export default function TeamSection({ data }: TeamSectionProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <AnimatePresence>
        {selectedMember && (
          <TeamMemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>

      <section className="w-full bg-[#FAF6F1] py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">

          {/* Header Content */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="h-[1px] w-12 bg-[#D97706]"></span>
                <span className="text-[#D97706] uppercase tracking-widest text-sm font-semibold vibrate-text">{data.eyebrow}</span>
              </div>
              <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl text-[#3D2B1F] leading-[0.9] vibrate-text">
                {data.title} <br /> <span className="italic opacity-80">{data.subtitle}</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-[#3D2B1F]/70 text-lg md:text-xl max-w-md text-right leading-relaxed font-light"
            >
              {data.description}
            </motion.p>
          </div>

          {/* Constructing Team Image Overlay */}
          <div className="w-full mb-32 h-[50vh] md:h-[70vh] rounded-2xl">
            <ConstructImage
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&fit=crop&q=80"
              cols={12}
              rows={8}
              className="w-full h-full"
            />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {data.members.map((member, index) => (
              <div key={member.id} className={`${index % 2 === 1 ? "md:mt-20" : ""}`}>
                <TeamMemberCard
                  member={member}
                  index={index}
                  onClick={() => setSelectedMember(member)}
                />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
