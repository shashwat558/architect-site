"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useState } from "react";
import MenuOverlay from "./MenuOverlay";
import Magnetic from "./ui/Magnetic";

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
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 lg:px-20 transition-all duration-300 ${
        scrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Magnetic>
          <motion.div 
            className="flex items-center justify-center p-2"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="12" r="6" fill="#D97706" />
              <circle cx="10" cy="22" r="6" fill="#D97706" />
              <circle cx="26" cy="22" r="6" fill="#D97706" />
              <circle cx="18" cy="18" r="4" fill="#FAF6F1" />
            </svg>
          </motion.div>
          </Magnetic>
          <motion.span 
            className="text-[#3D2B1F] font-medium text-sm tracking-wide"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
            AD.RS DESIGN
          </motion.span>
        </Link>


        {/* Navigation */}
        <nav className="flex items-center gap-4">
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
          
          <Magnetic>
          <motion.button 
            onClick={() => setIsMenuOpen(true)}
            className="border border-[#3D2B1F] text-[#3D2B1F] px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#3D2B1F] hover:text-white transition-colors"
          >
            <span className="flex gap-0.5">
              <motion.span 
                className="w-1.5 h-1.5 bg-current rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
              <motion.span 
                className="w-1.5 h-1.5 bg-current rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, delay: 0.2 }}
              />
            </span>
            MENU
          </motion.button>
          </Magnetic>
        </nav>
      </div>
    </motion.header>
    </>
  );
}
