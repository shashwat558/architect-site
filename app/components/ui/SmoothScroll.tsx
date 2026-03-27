"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Disable smooth scroll on heavy pages or mobile
    const disableOnRoute = pathname === "/process";
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || disableOnRoute || isMobile) {
      return;
    }

    // Lazy-load Lenis to keep it out of the critical path
    let destroyed = false;
    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;

      const lenis = new Lenis({
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      let frameId: number;
      function raf(time: number) {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      }

      frameId = requestAnimationFrame(raf);

      // Store cleanup
      const cleanup = () => {
        destroyed = true;
        cancelAnimationFrame(frameId);
        lenis.destroy();
      };

      // Attach cleanup to the outer scope
      (window as unknown as Record<string, () => void>).__lenisCleanup = cleanup;
    });

    return () => {
      destroyed = true;
      const cleanup = (window as unknown as Record<string, (() => void) | undefined>).__lenisCleanup;
      if (cleanup) {
        cleanup();
        delete (window as unknown as Record<string, (() => void) | undefined>).__lenisCleanup;
      }
    };
  }, [pathname]);

  return <>{children}</>;
}