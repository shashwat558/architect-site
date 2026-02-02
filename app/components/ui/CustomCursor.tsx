"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useCursor } from "@/app/context/CursorContext";

export default function CustomCursor() {
  const { cursorVariant, setCursorVariant } = useCursor();
  const pathname = usePathname();
  const [isEnabled, setIsEnabled] = useState(false);
  
  // Mouse position state
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring animation for cursor movement
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkSupport = () => {
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const hoverCapable = window.matchMedia("(hover: hover)").matches;
      setIsEnabled(finePointer && hoverCapable);
    };

    checkSupport();
    window.addEventListener("resize", checkSupport);

    return () => {
      window.removeEventListener("resize", checkSupport);
    };
  }, []);

  useEffect(() => {
    // Reset variant on route change to avoid sticky state
    setCursorVariant("default");
  }, [pathname, setCursorVariant]);

  useEffect(() => {
    if (!isEnabled) {
      document.body.style.cursor = "auto";
      const style = document.getElementById("cursor-style");
      if (style) style.remove();
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Hide default cursor
    document.body.style.cursor = "none";
    
    // Also add style to anchor tags to keep 'none'
    const addNoCursor = () => {
        const style = document.createElement('style');
        style.innerHTML = `* { cursor: none !important; }`;
        style.id = 'cursor-style';
        document.head.appendChild(style);
    };
    addNoCursor();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = "auto";
      const style = document.getElementById('cursor-style');
      if(style) style.remove();
    };
  }, [isEnabled, mouseX, mouseY]);

  // Variants for cursor animation
  const variants = {
    default: {
      height: 12,
      width: 12,
      backgroundColor: "#D97706", // Amber
      x: "-50%",
      y: "-50%",
      mixBlendMode: "normal" as const,
    },
    project: {
      height: 150,
      width: 150,
      backgroundColor: "#ffffff",
      x: "-50%",
      y: "-50%",
      mixBlendMode: "difference" as const, // This creates the negative filter effect
    },
    text: {
        height: 60,
        width: 60,
        backgroundColor: "#D97706",
        x: "-50%",
        y: "-50%",
        mixBlendMode: "difference" as const,
    }
  };

  if (!isEnabled) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center overflow-hidden"
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {cursorVariant === "project" && (
            <span className="text-black text-xs font-bold uppercase tracking-widest opacity-0 animate-in fade-in duration-300">
                View
            </span>
        )}
      </motion.div>
      
      {/* Small dot follower for better precision in default mode */}
      <motion.div
         className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-white mix-blend-difference"
         style={{
            translateX: mouseX,
            translateY: mouseY,
            x: "-50%",
            y: "-50%",
            width: 8,
            height: 8,
         }}
      />
    </>
  );
}
