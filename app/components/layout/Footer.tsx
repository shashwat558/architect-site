"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
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
          className="text-[#3D2B1F] text-sm hover:text-[#D97706] transition-all duration-200 inline-block hover:translate-x-1"
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="bg-transparent border-t border-[#E5DDD0] py-12 px-6 md:px-12 lg:px-20">
      <motion.div 
        className="w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
          {/* Logo & Company Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-center w-20 h-20">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="25" r="14" fill="#9CAF7E" />
                <circle cx="22" cy="50" r="14" fill="#9CAF7E" />
                <circle cx="58" cy="50" r="14" fill="#9CAF7E" />
                <circle cx="40" cy="40" r="10" fill="#FAF6F1" />
              </svg>
            </div>
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
          </div>

          {/* Pages */}
          <div className="space-y-4">
            <h4 className="text-[#9B8B7A] text-xs uppercase tracking-wide vibrate-text">Pages</h4>
            <LinkList items={footerPages} />
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <h4 className="text-[#9B8B7A] text-xs uppercase tracking-wide vibrate-text">Achievements</h4>
            <LinkList items={footerProjects} />
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-[#9B8B7A] text-xs uppercase tracking-wide vibrate-text">Resources</h4>
            <LinkList items={resourceLinks} />
          </div>

          {/* Contact Large */}
          <div className="lg:col-span-2 space-y-6">
            <Magnetic>
            <div className="inline-block">
            <Link
              href="/contact"
              className="flex items-center gap-3 text-[#D97706] text-4xl md:text-5xl font-light group"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
              <span className="hover:underline transition-transform duration-300 group-hover:translate-x-2">
                CONTACT
              </span>
            </Link>
            </div>
            </Magnetic>

          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-8 border-t border-[#E5DDD0] flex flex-col md:flex-row justify-between gap-4">
          {/* Networks */}
          <div className="flex items-center gap-6">
            <h4 className="text-[#9B8B7A] text-xs uppercase tracking-wide vibrate-text">
              Networks
            </h4>
            <div className="flex gap-4">
              {socialNetworks.map((network) => (
                <Link
                  key={network.name}
                  href={network.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3D2B1F] text-sm hover:text-[#D97706] hover:-translate-y-0.5 transition-all duration-200"
                >
                  {network.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="flex items-center gap-6">
            <h4 className="text-[#9B8B7A] text-xs uppercase tracking-wide">
              Legal Notices
            </h4>
            <div className="flex gap-4">
              {legalLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[#9B8B7A] text-sm hover:text-[#D97706] hover:-translate-y-0.5 transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
