"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { MouseEvent, useRef } from "react";

// --- Types ---

interface Social {
  name: string;
  url: string;
}

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
  socials: Social[];
}

// --- Data ---

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Elena Rodriguez",
    title: "Principal Architect",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop",
    socials: [
      { name: "LinkedIn", url: "#" },
      { name: "Instagram", url: "#" },
      { name: "Email", url: "#" },
    ],
  },
  {
    id: 2,
    name: "Marcus Chen",
    title: "Lead Designer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1000&fit=crop",
    socials: [
      { name: "LinkedIn", url: "#" },
      { name: "Behance", url: "#" },
      { name: "Email", url: "#" },
    ],
  },
  {
    id: 3,
    name: "Sophia Williams",
    title: "Interior Specialist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop",
    socials: [
      { name: "LinkedIn", url: "#" },
      { name: "Instagram", url: "#" },
      { name: "Email", url: "#" },
    ],
  },
  {
    id: 4,
    name: "Daniel Foster",
    title: "Project Manager",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=1000&fit=crop",
    socials: [
      { name: "LinkedIn", url: "#" },
      { name: "Email", url: "#" },
    ],
  },
  {
    id: 5,
    name: "Amara Okonkwo",
    title: "Sustainability Lead",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&h=1000&fit=crop",
    socials: [
      { name: "LinkedIn", url: "#" },
      { name: "Twitter", url: "#" },
      { name: "Email", url: "#" },
    ],
  },
  {
    id: 6,
    name: "Luca Moretti",
    title: "Technical Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop",
    socials: [
      { name: "LinkedIn", url: "#" },
      { name: "GitHub", url: "#" },
      { name: "Email", url: "#" },
    ],
  },
];

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
}: {
  member: TeamMember;
  index: number;
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
      className="relative group w-full aspect-[3/4] perspective-1000"
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
               <h3 className="font-serif text-3xl text-[#FAF6F1] leading-tight mb-2">
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

export default function TeamSection() {
  return (
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
                    <span className="text-[#D97706] uppercase tracking-widest text-sm font-semibold">Our People</span>
                </div>
                <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl text-[#3D2B1F] leading-[0.9]">
                    Meet the <br/> <span className="italic opacity-80">Visionaries.</span>
                </h2>
            </motion.div>

            <motion.p 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
               className="text-[#3D2B1F]/70 text-lg md:text-xl max-w-md text-right leading-relaxed font-light"
            >
                We are a constellation of thinkers and makers, united by a passion for spaces that resonate with the human spirit.
            </motion.p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {teamMembers.map((member, index) => (
             <div key={member.id} className={`${index % 2 === 1 ? "md:mt-20" : ""}`}>
                <TeamMemberCard member={member} index={index} />
             </div>
          ))}
        </div>

      </div>
    </section>
  );
}
