"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { useCursor } from "@/app/context/CursorContext";

export default function CustomCursor() {
  const { cursorVariant, setCursorVariant } = useCursor();
  const pathname = usePathname();
  const [isEnabled, setIsEnabled] = useState(false);
  const rafRef = useRef<number>(0);
  const pendingX = useRef(0);
  const pendingY = useRef(0);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkSupport = () => {
      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const hoverCapable = window.matchMedia("(hover: hover)").matches;
      // Disable on any device that ALSO has a coarse pointer (touch tablets like iPad, Surface).
      const hasTouch = window.matchMedia("(any-pointer: coarse)").matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsEnabled(finePointer && hoverCapable && !hasTouch && !reducedMotion);
    };

    checkSupport();
    const fineMQ = window.matchMedia("(pointer: fine)");
    const hoverMQ = window.matchMedia("(hover: hover)");
    fineMQ.addEventListener?.("change", checkSupport);
    hoverMQ.addEventListener?.("change", checkSupport);
    return () => {
      fineMQ.removeEventListener?.("change", checkSupport);
      hoverMQ.removeEventListener?.("change", checkSupport);
    };
  }, []);

  useEffect(() => {
    setCursorVariant("default");
  }, [pathname, setCursorVariant]);

  const scheduleCursorUpdate = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      mouseX.set(pendingX.current);
      mouseY.set(pendingY.current);
      rafRef.current = 0;
    });
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!isEnabled) {
      document.documentElement.classList.remove("custom-cursor-active");
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      pendingX.current = e.clientX;
      pendingY.current = e.clientY;
      scheduleCursorUpdate();
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    // Activates the CSS rules in globals.css that hide the native cursor on
    // most chrome — interactive elements still keep their browser-native
    // cursor for accessibility (text caret in inputs, pointer on links).
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.classList.remove("custom-cursor-active");
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isEnabled, scheduleCursorUpdate]);

  const variants = {
    default: {
      height: 12,
      width: 12,
      backgroundColor: "#D97706",
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
      mixBlendMode: "difference" as const,
    },
    text: {
      height: 60,
      width: 60,
      backgroundColor: "#D97706",
      x: "-50%",
      y: "-50%",
      mixBlendMode: "difference" as const,
    },
  };

  if (!isEnabled) return null;

  return (
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
  );
}
