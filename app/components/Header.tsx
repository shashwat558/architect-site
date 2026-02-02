"use client";

import Link from "next/link";
import Image from "next/image";
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
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
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

        {/* Navigation */}
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
