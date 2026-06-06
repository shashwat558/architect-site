/**
 * HeroCanvas — R3F canvas using a perspective camera
 *
 * Uses perspective camera (fov=60) instead of orthographic —
 * broader hardware support and avoids clip-space quirks.
 *
 * On WebGL context loss (low-end GPU / browser sandbox): gracefully
 * falls back to the static CSS photo fallback via onCreated error catch.
 */

"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import HeroMesh from "./HeroMesh";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const isHoveringRef = useRef(false);
  const [webglFailed, setWebglFailed] = useState(false);

  // Quick pre-flight check — does the browser even support WebGL?
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setWebglFailed(true);
    } catch {
      setWebglFailed(true);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    mouseRef.current = { x, y };
  }, []);

  const handleMouseEnter = useCallback(() => { isHoveringRef.current = true; }, []);
  const handleMouseLeave = useCallback(() => { isHoveringRef.current = false; }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const el = containerRef.current;
    if (!el || e.touches.length === 0) return;
    const rect = el.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) / rect.width;
    const y = 1.0 - (touch.clientY - rect.top) / rect.height;
    mouseRef.current = { x, y };
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => { 
    isHoveringRef.current = true; 
    handleTouchMove(e);
  }, [handleTouchMove]);

  const handleTouchEnd = useCallback(() => { 
    isHoveringRef.current = false; 
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd);
    el.addEventListener("touchcancel", handleTouchEnd);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleTouchMove, handleTouchStart, handleTouchEnd]);

  // Static fallback if WebGL not supported
  if (webglFailed) {
    return (
      <div className="absolute inset-0 w-full h-full">
        <Image src="/contructed.jpg" alt="Architectural render" fill className="object-cover" priority quality={85} />
        <div className="absolute inset-0 bg-black/25" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 1] }}
        dpr={[1, 1.75]}
        frameloop="always"
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          // Handle context loss gracefully
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            setWebglFailed(true);
          });
        }}
        style={{ width: "100%", height: "100%", outline: "none" }}
      >
        <HeroMesh
          mouseRef={mouseRef}
          smoothMouseRef={smoothMouseRef}
          isHoveringRef={isHoveringRef}
        />
      </Canvas>
    </div>
  );
}
