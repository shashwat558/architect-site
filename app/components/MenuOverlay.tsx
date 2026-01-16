"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainLinks = [
  { name: "Welcome", href: "/" },
  { name: "Work", href: "/projects" },
  { name: "Offers", href: "/offers" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Resources", href: "/resources" },
];

const achievementLinks = [
  { name: "Pirate Apartment", href: "/projects/pirate-apartment" },
  { name: "Medical Practice", href: "/projects/medical-practice" },
  { name: "Chalet Les Arcs", href: "/projects/chalet-les-arcs" },
  { name: "Memphis Apartment", href: "/projects/memphis-apartment" },
];

const resourceLinks = [
  { name: "Items", href: "/resources/items" },
  { name: "Videos", href: "/resources/videos" },
  { name: "White papers", href: "/resources/white-papers" },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
            {/* Backdrop */}
            <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />
            
            {/* Modal Container */}
            <motion.div 
              className="fixed z-70 flex flex-col overflow-hidden rounded-xl shadow-2xl bg-[#FAF6F1] origin-top-right
                top-2 right-2 bottom-2 left-2 
                md:top-4 md:right-4 md:bottom-4 md:left-auto md:w-[85vw] lg:w-[75vw] xl:w-300"
              initial={{ scale: 0.8, opacity: 0, y: -20, x: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0, x: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Elegant easeOutQuint-ish curve
            >
              {/* Top Bar */}
              <div className="h-14 bg-[#3D2B1F] flex items-center justify-between px-6 text-[#FAF6F1]">
                {/* Icon (Five Dots Cross) */}
                <div className="relative w-5 h-5 flex items-center justify-center">
                    <div className="absolute w-1 h-1 bg-[#FAF6F1] rounded-full"></div>
                    <div className="absolute w-1 h-1 bg-[#FAF6F1] rounded-full -translate-y-2"></div>
                    <div className="absolute w-1 h-1 bg-[#FAF6F1] rounded-full translate-y-2"></div>
                    <div className="absolute w-1 h-1 bg-[#FAF6F1] rounded-full -translate-x-2"></div>
                    <div className="absolute w-1 h-1 bg-[#FAF6F1] rounded-full translate-x-2"></div>
                </div>

                <button 
                    onClick={onClose}
                    className="text-xs font-semibold tracking-widest hover:opacity-70 transition-opacity uppercase"
                >
                    Close
                </button>
              </div>

              {/* Main Content */}
              <div className="flex-1 bg-[#FAF6F1] p-6 md:p-10 lg:p-14 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 h-full">
                    
                    {/* Left Column - Main Nav */}
                    <div className="md:col-span-5 flex flex-col justify-center space-y-1">
                        {mainLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                onClick={onClose}
                                className="relative block group"
                            >
                                <span className={`text-4xl md:text-5xl lg:text-[5.5rem] leading-[1.1] font-serif transition-colors duration-300 ${
                                    link.name === "Welcome" ? "text-[#3D2B1F]" : "text-[#D6CCC2] group-hover:text-[#3D2B1F]"
                                }`}>
                                    {link.name}
                                </span>
                                
                                {/* Black Circle Overlay Effect on Hover */}
                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black rounded-full mix-blend-multiply opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300 blur-xl scale-75 group-hover:scale-100" />
                                
                                {/* Hard Black Circle for 'Achievements' style hover indicator */}
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#3D2B1F] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* Middle Column - Sub Links */}
                    <div className="md:col-span-3 flex flex-col justify-between pt-4">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-[#9B8B7A] text-xs uppercase tracking-widest mb-6">Achievements</h3>
                                <ul className="space-y-4">
                                    {achievementLinks.map((link) => (
                                        <li key={link.name}>
                                            <Link 
                                                href={link.href}
                                                onClick={onClose}
                                                className="text-[#9B8B7A] hover:text-[#3D2B1F] text-lg transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 space-y-2">
                            <Link href="#" className="block text-[#3D2B1F] text-lg hover:underline">Instagram</Link>
                            <Link href="#" className="block text-[#3D2B1F] text-lg hover:underline">LinkedIn</Link>
                        </div>
                    </div>

                    {/* Right Column - Resources & Latest */}
                    <div className="md:col-span-4 flex flex-col justify-between pt-4">
                         <div className="space-y-8">
                            <div>
                                <h3 className="text-[#9B8B7A] text-xs uppercase tracking-widest mb-6">Resources</h3>
                                <ul className="space-y-4">
                                    {resourceLinks.map((link) => (
                                        <li key={link.name}>
                                            <Link 
                                                href={link.href}
                                                onClick={onClose}
                                                className="text-[#9B8B7A] hover:text-[#3D2B1F] text-lg transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-8">
                                <h3 className="text-[#9B8B7A] text-xs uppercase tracking-widest mb-6">Latest Releases</h3>
                                <div className="space-y-4">
                                    {/* Card 1 */}
                                    <div className="bg-[#EDE5D8] p-4 rounded-lg hover:bg-[#E5DDD0] transition-colors cursor-pointer group">
                                        <span className="text-[#D97706] text-[10px] font-bold uppercase tracking-wider block mb-2">White Paper</span>
                                        <h4 className="text-[#3D2B1F] leading-tight font-serif group-hover:underline">
                                            Knowledge or window rehydrate...
                                        </h4>
                                    </div>
                                    {/* Card 2 */}
                                    <div className="bg-[#EDE5D8] p-4 rounded-lg hover:bg-[#E5DDD0] transition-colors cursor-pointer group">
                                         <span className="text-[#D97706] text-[10px] font-bold uppercase tracking-wider block mb-2">Video</span>
                                        <h4 className="text-[#3D2B1F] leading-tight font-serif group-hover:underline">
                                            Without product...
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
              </div>
            </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
