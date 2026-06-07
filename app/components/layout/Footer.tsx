"use client";

import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Magnetic from "../ui/Magnetic";
import {
  footerPages,
  footerProjects,
  resourceLinks,
  socialNetworks,
  legalLinks,
} from "../../config/navigation";

// Simple link list — uses CSS transitions instead of individual motion.li elements
const LinkList = ({ items }: { items: { name: string; href: string }[] }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item.name}>
        <Link
          href={item.href}
          className="text-[#3D2B1F] text-sm hover:text-[#D97706] transition-all duration-200 inline-block hover:translate-x-1 font-bold"
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Parallax scroll effect for background image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // Live IST Clock (India Standard Time)
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Date().toLocaleTimeString("en-US", options));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-4 md:px-8 pb-4 md:pb-8 pt-8 bg-transparent">
      <footer
        ref={ref}
        className="relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] border border-[#E5DDD0] pt-20 pb-8 px-6 sm:px-12 md:px-16 lg:px-20 min-h-[650px] flex flex-col justify-between"
      >
        {/* Background Color & Image Layers */}
        <div className="absolute inset-0 bg-[#FAF6F1] -z-20" />
        <div className="absolute inset-0 -z-10 select-none pointer-events-none overflow-hidden">
          <motion.div style={{ y: bgY }} className="absolute inset-0 h-[120%] w-full -top-[10%]">
            <Image
              src="/footer.jpeg"
              alt="AD.RS Design Studio Background"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 90vw"
              priority
              className="object-cover opacity-90 transition-transform duration-700"
            />
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-6 relative z-10">
          {/* Logo & Company Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center w-16 h-16">
              <svg width="64" height="64" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="25" r="14" fill="#9CAF7E" />
                <circle cx="22" cy="50" r="14" fill="#9CAF7E" />
                <circle cx="58" cy="50" r="14" fill="#9CAF7E" />
                <circle cx="40" cy="40" r="10" fill="#FAF6F1" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-[#3D2B1F] font-serif text-lg font-bold tracking-wider">AD.RS DESIGN</p>
              <p className="text-[#3D2B1F]/60 text-[10px] tracking-widest font-mono font-bold uppercase">ESTD. 2025</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#3D2B1F] text-sm pt-2">
              <div className="space-y-1">
                <p className="font-serif italic text-base font-bold">Bhopal, India</p>
                <p className="text-[#3D2B1F]/60 text-xs font-mono font-semibold">({time || "00:00:00"} IST)</p>
              </div>
              <div className="space-y-1">
                <p className="hover:text-[#D97706] transition-colors font-bold">
                  <a href="mailto:contact@adrs.design">contact@adrs.design</a>
                </p>
                <p className="hover:text-[#D97706] transition-colors font-bold">
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </p>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div className="space-y-4">
            <h4 className="text-[#3D2B1F] text-xs uppercase tracking-widest font-bold border-b border-[#3D2B1F]/20 pb-2">
              Pages
            </h4>
            <LinkList items={footerPages} />
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <h4 className="text-[#3D2B1F] text-xs uppercase tracking-widest font-bold border-b border-[#3D2B1F]/20 pb-2">
              Achievements
            </h4>
            <LinkList items={footerProjects} />
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-[#3D2B1F] text-xs uppercase tracking-widest font-bold border-b border-[#3D2B1F]/20 pb-2">
              Resources
            </h4>
            <LinkList items={resourceLinks} />
          </div>

          {/* CTA / Start a Project */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <h4 className="text-[#3D2B1F] text-xs uppercase tracking-widest font-bold border-b border-[#3D2B1F]/20 pb-2">
                Start a Project
              </h4>
              <p className="text-[#3D2B1F]/90 text-xs font-semibold leading-relaxed">
                Interested in working with us? Let's build something extraordinary.
              </p>
            </div>
            <div className="pt-2">
              <Magnetic>
                <div className="inline-block">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#3D2B1F] text-[#FAF6F1] text-xs font-bold hover:bg-[#D97706] transition-all duration-300 shadow-md hover:shadow-lg group"
                  >
                    <span>Say Hello</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </Link>
                </div>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-8 mt-12">
          {/* Networks & Legal row */}
          <div className="pt-6 border-t border-[#3D2B1F]/20 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
            {/* Networks */}
            <div className="flex items-center gap-4">
              <span className="text-[#3D2B1F]/70 text-xs uppercase tracking-widest font-mono font-bold">Networks</span>
              <div className="flex gap-4">
                {socialNetworks.map((network) => (
                  <Link
                    key={network.name}
                    href={network.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3D2B1F] text-sm hover:text-[#D97706] transition-colors duration-200 font-bold"
                  >
                    {network.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="flex items-center gap-4">
              <span className="text-[#3D2B1F]/70 text-xs uppercase tracking-widest font-mono font-bold">Legal</span>
              <div className="flex gap-4">
                {legalLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[#3D2B1F] text-sm hover:text-[#D97706] transition-colors duration-200 font-bold"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Huge ADRS Text Signature */}
          <div className="relative overflow-hidden w-full select-none pt-4">
            <motion.div
              initial={{ y: "85%", opacity: 0 }}
              animate={isInView ? { y: "0%", opacity: 1 } : { y: "85%", opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center items-end"
            >
              <h2
                className="font-serif text-[18vw] md:text-[22vw] font-black tracking-tight uppercase leading-[0.7] text-center w-full select-none text-transparent bg-clip-text bg-gradient-to-b from-[#3D2B1F] via-[#3D2B1F]/65 to-transparent translate-y-[12%] pb-2"
              >
                ADRS
              </h2>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
