"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import MenuOverlay from "./MenuOverlay";
import Magnetic from "../ui/Magnetic";
import { primaryNav } from "../../config/navigation";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    if (latest > previous && latest > 150) {
        setHidden(true);
    } else {
        setHidden(false);
    }
    
    setScrolled(latest > 50);
  });

  return (
    <>
    <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 md:px-12 lg:px-20 transition-all duration-300 min-h-20 flex items-center ${
        scrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="w-full flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <Magnetic>
             <div className="relative w-32 h-10">
               <Image 
                 src="/logo.png" 
                 alt="AD.RS Design Studio" 
                 fill 
                 className="object-contain object-left" 
                 priority
                 sizes="128px"
               />
             </div>
          </Magnetic>
        </Link>

        {/* Desktop Navigation (Centered) */}
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {primaryNav.map((link) => (
            <Magnetic key={link.name}>
              <Link
                href={link.href}
                className="text-[13px] font-semibold tracking-widest uppercase text-[#3D2B1F] hover:text-[#D97706] transition-colors relative pb-1 group/link"
              >
                {link.name}
                {/* Underline Hover Effect */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D97706] origin-right scale-x-0 transition-transform duration-300 ease-out group-hover/link:scale-x-100 group-hover/link:origin-left" />
              </Link>
            </Magnetic>
          ))}
        </nav>

        <nav className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden md:block">
            <Magnetic>
              <motion.div>
                <Link
                  href="/contact"
                  className="bg-[#D97706] hover:bg-[#B45309] text-white px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
                >
                  CONTACT
                  <motion.svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    whileHover={{ x: 2, y: -2 }}
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </motion.svg>
                </Link>
              </motion.div>
            </Magnetic>
          </div>
          
          <Magnetic>
          <motion.button
            onClick={() => setIsMenuOpen(true)}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="border border-[#3D2B1F] text-[#3D2B1F] px-4 sm:px-5 py-3 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#3D2B1F] hover:text-white transition-colors min-h-11"
          >
            <span className="flex gap-0.5" aria-hidden="true">
              <span className="w-1.5 h-1.5 bg-current rounded-full" />
              <span className="w-1.5 h-1.5 bg-current rounded-full" />
            </span>
            <span className="hidden sm:inline">MENU</span>
          </motion.button>
          </Magnetic>
        </nav>
      </div>
    </motion.header>
    </>
  );
}
