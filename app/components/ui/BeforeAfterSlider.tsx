/* eslint-disable @typescript-eslint/no-explicit-any */
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
  
  // Handle mouse move to drag the slider
  const handleMouseMove = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      if (!isResizing || !sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      
      // Calculate position relative to the container
      let newPos = ((clientX - rect.left) / rect.width) * 100;
      
      // Clamp between 0 and 100
      newPos = Math.max(0, Math.min(100, newPos));
      setSliderPosition(newPos);
    },
    [isResizing]
  );

  // Handle touch events for mobile
  const handleTouchMove = useCallback(
    (e: React.TouchEvent | TouchEvent) => {
      if (!isResizing || !sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = e.touches[0].clientX;
      let newPos = ((clientX - rect.left) / rect.width) * 100;
      newPos = Math.max(0, Math.min(100, newPos));
      setSliderPosition(newPos);
    },
    [isResizing]
  );

  // Attach global event listeners when resizing
  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove as any);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove as any);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp, handleTouchMove]);

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
    >
      {/* AFTER Image (Background) - Fully visible initially */}
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

      {/* BEFORE Image (Foreground) - Clipped using clip-path for correct overlay */}
       <div 
        className="absolute inset-0 h-full"
        style={{ 
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
        }}
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
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black"
          >
            <path d="M15 18l-6-6 6-6" />
            <path d="M21 12H9" />
            {/* Keeping it simple with arrows */}
            <path d="M10 18l6-6-6-6" style={{display: 'none'}} /> 
          </svg>
           <div className="flex gap-0.5">
             <div className="w-0.5 h-3 bg-black/30 rounded-full" />
             <div className="w-0.5 h-3 bg-black/30 rounded-full" />
           </div>
        </div>
      </div>
    </div>
  );
};
