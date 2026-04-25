"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt?: string;
  className?: string;
  aspectRatio?: string;
}

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  alt = "Before and after comparison",
  className,
  aspectRatio = "aspect-[16/9]",
}: BeforeAfterSliderProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100

  const handleMouseDown = useCallback(() => setIsResizing(true), []);
  const handleMouseUp = useCallback(() => setIsResizing(false), []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      let newPos = ((e.clientX - rect.left) / rect.width) * 100;
      newPos = Math.max(0, Math.min(100, newPos));
      setSliderPosition(newPos);
    },
    [isResizing]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isResizing || !sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = e.touches[0].clientX;
      let newPos = ((clientX - rect.left) / rect.width) * 100;
      newPos = Math.max(0, Math.min(100, newPos));
      setSliderPosition(newPos);
    },
    [isResizing]
  );

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp, handleTouchMove]);

  // Keyboard support
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((p) => Math.min(100, p + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPosition(100);
    }
  }, []);

  return (
    <div
      ref={sliderRef}
      className={cn(
        "relative w-full overflow-hidden select-none group cursor-ew-resize rounded-2xl",
        aspectRatio,
        className
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      style={{ touchAction: "none" }}
    >
      {/* AFTER Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt={`After: ${alt}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
          After
        </div>
      </div>

      {/* BEFORE Image (Foreground) — clipped */}
      <div
        className="absolute inset-0 h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`Before: ${alt}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
          Before
        </div>
      </div>

      {/* Slider Handle */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Before / after image comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        onKeyDown={handleKeyDown}
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#D97706]/50"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
          <div className="flex items-center gap-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
