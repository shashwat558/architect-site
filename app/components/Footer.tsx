"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Magnetic from "./ui/Magnetic";

const pages = [
  { name: "Welcome", href: "/" },
  { name: "Work", href: "/projects" },
  { name: "Process", href: "/process" },
  { name: "Offers", href: "/offers" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Resources", href: "/resources" },
];

const achievements = [
  { name: "Modern Residence", href: "/projects/modern-residence" },
  { name: "Green Office", href: "/projects/green-office" },
  { name: "Rustic Chalet", href: "/projects/rustic-chalet" },
  { name: "Urban Apartment", href: "/projects/urban-apartment" },
];

const resources = [
  { name: "Items", href: "/resources/items" },
  { name: "Videos", href: "/resources/videos" },
  { name: "White papers", href: "/resources/white-papers" },
];

const networks = [
  { name: "Instagram", href: "https://instagram.com" },
  { name: "LinkedIn", href: "https://linkedin.com" },
];

const legal = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Legal notice", href: "/legal" },
];

const latestReleases = [
  { type: "WHITE PAPER", title: "Knowledge or window rehydrate race great journey needed to see crystallize." },
  { type: "VIDEO", title: "Without product activities alarming functional." },
  { type: "ARTICLE", title: "Where up fured management crack optimal sorry can't reinvent." },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="bg-transparent border-t border-[#E5DDD0] py-12 px-6 md:px-12 lg:px-20">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
          {/* Logo & Company Info */}
          <motion.div 
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="flex items-center justify-center w-20 h-20"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.8 }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="25" r="14" fill="#9CAF7E" />
                <circle cx="22" cy="50" r="14" fill="#9CAF7E" />
                <circle cx="58" cy="50" r="14" fill="#9CAF7E" />
                <circle cx="40" cy="40" r="10" fill="#FAF6F1" />
              </svg>
            </motion.div>
            <div>
              <p className="text-[#3D2B1F] font-medium text-sm">AD.RS DESIGN</p>
              <p className="text-[#9B8B7A] text-xs">ESTD. 2025</p>
            </div>
            <div className="text-[#6B5B4F] text-sm space-y-1">
              <p>Bhopal, India</p>
              <p className="text-[#9B8B7A] text-xs">(03:39:51)</p>
            </div>
            <div className="text-[#6B5B4F] text-sm space-y-1">
              <p>contact@adrs.design</p>
              <p>+91 98765 43210</p>
            </div>
          </motion.div>

          {/* Pages */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-[#9B8B7A] text-xs uppercase tracking-wide vibrate-text">
              Pages
            </h4>
            <ul className="space-y-2">
              {pages.map((page, index) => (
                <motion.li 
                  key={page.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    href={page.href}
                    className="text-[#3D2B1F] text-sm hover:text-[#D97706] transition-colors inline-block hover:translate-x-1"
                  >
                    {page.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Achievements */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-[#9B8B7A] text-xs uppercase tracking-wide vibrate-text">
              Achievements
            </h4>
            <ul className="space-y-2">
              {achievements.map((item, index) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="text-[#3D2B1F] text-sm hover:text-[#D97706] transition-colors inline-block hover:translate-x-1"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-[#9B8B7A] text-xs uppercase tracking-wide vibrate-text">
              Resources
            </h4>
            <ul className="space-y-2">
              {resources.map((item, index) => (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="text-[#3D2B1F] text-sm hover:text-[#D97706] transition-colors inline-block hover:translate-x-1"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Large */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Magnetic>
            <div className="inline-block">
            <Link
              href="/contact"
              className="flex items-center gap-3 text-[#D97706] text-4xl md:text-5xl font-light group"
            >
              <motion.svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                whileHover={{ x: 5, y: -5, rotate: 45 }}
                transition={{ duration: 0.3 }}
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </motion.svg>
              <motion.span
                className="hover:underline"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                CONTACT
              </motion.span>
            </Link>
            </div>
            </Magnetic>

            {/* Latest Releases */}
            <div className="space-y-3">
              <h4 className="text-[#9B8B7A] text-xs uppercase tracking-wide vibrate-text">
                Latest Releases
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {latestReleases.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#EDE5D8] rounded p-3 cursor-pointer hover:bg-[#E5DDD0] transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <span className="text-[#D97706] text-xs font-medium">
                      {item.type}
                    </span>
                    <p className="text-[#3D2B1F] text-sm mt-1">{item.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <motion.div 
          className="mt-12 pt-8 border-t border-[#E5DDD0] flex flex-col md:flex-row justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Networks */}
          <div className="flex items-center gap-6">
            <h4 className="text-[#9B8B7A] text-xs uppercase tracking-wide vibrate-text">
              Networks
            </h4>
            <div className="flex gap-4">
              {networks.map((network) => (
                <motion.div key={network.name} whileHover={{ y: -2 }}>
                  <Link
                    href={network.href}
                    target="_blank"
                    className="text-[#3D2B1F] text-sm hover:text-[#D97706] transition-colors"
                  >
                    {network.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="flex items-center gap-6">
            <h4 className="text-[#9B8B7A] text-xs uppercase tracking-wide">
              Legal Notices
            </h4>
            <div className="flex gap-4">
              {legal.map((item) => (
                <motion.div key={item.name} whileHover={{ y: -2 }}>
                  <Link
                    href={item.href}
                    className="text-[#9B8B7A] text-sm hover:text-[#D97706] transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
