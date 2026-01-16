"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface ImageItem {
  id: number;
  src: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

const projectImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&q=80",
  "https://images.unsplash.com/photo-1600573472591-ee6981cf81f0?w=400&q=80",
  "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
];

export default function CursorImageTrail({ children, className }: { children?: React.ReactNode, className?: string }) {
  const [items, setItems] = useState<ImageItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageIndex = useRef(0);
  const lastTime = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime.current < 80) return; // throttle
      lastTime.current = now;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const image = projectImages[imageIndex.current];
      imageIndex.current = (imageIndex.current + 1) % projectImages.length;

      const newItem: ImageItem = {
        id: idRef.current++,
        src: image,
        x,
        y,
        rotate: Math.random() * 30 - 15,
        scale: 0.8 + Math.random() * 0.4,
      };

      setItems((prev) => [...prev.slice(-20), newItem]);

      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== newItem.id));
      }, 1000);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden cursor-crosshair ${className}`}>
      <div className="absolute inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {items.map((item) => (
            <motion.img
              key={item.id}
              src={item.src}
              initial={{
                opacity: 0,
                scale: item.scale,
                rotate: item.rotate,
                x: item.x - 56,
                y: item.y - 40,
              }}
              animate={{
                opacity: 0.8,
                y: item.y - 60,
              }}
              exit={{
                opacity: 0,
                scale: item.scale * 0.8,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              style={{
                left: item.x - 56,
                position: "absolute",
                top: 0
              }}
              className="w-28 h-20 object-cover rounded-lg shadow-lg"
            />
          ))}
        </AnimatePresence>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
