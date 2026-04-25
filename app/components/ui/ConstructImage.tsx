"use client";

import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ConstructImageProps {
  src: string;
  className?: string;
  stripes?: number;
  direction?: "horizontal" | "vertical";
}

interface StripeProps {
  progress: MotionValue<number>;
  index: number;
  total: number;
  src: string;
  direction: "horizontal" | "vertical";
}

const Stripe = React.memo(({ progress, index, total, src, direction }: StripeProps) => {
  // Sequential timing: Each stripe starts after the previous one
  // We want the whole sequence to finish slightly before the scroll hits the center
  const segmentDuration = 0.4;
  const stagger = 0.6 / total;
  const start = index * stagger;
  const end = start + segmentDuration;

  const isHorizontal = direction === "horizontal";

  // Animation values for the "unfolding" feel
  const opacity = useTransform(progress, [start, end], [0, 1]);

  // 3D fold-in effect — call hooks unconditionally; the unused axis stays at 0.
  const rotateXValue = useTransform(progress, [start, end], [-90, 0]);
  const rotateYValue = useTransform(progress, [start, end], [-90, 0]);
  const rotateX = isHorizontal ? rotateXValue : 0;
  const rotateY = isHorizontal ? 0 : rotateYValue;

  // Depth and scale
  const translateZ = useTransform(progress, [start, end], [-200, 0]);
  const scale = useTransform(progress, [start, end], [0.95, 1]);
  
  // Lighting simulation: darken the stripe as it's folded away
  const brightness = useTransform(progress, [start, end], [0.4, 1]);
  const filter = useTransform(brightness, (v) => `brightness(${v})`);

  // Positioning and Background calculation
  const style: React.CSSProperties = {
    position: "absolute",
    backgroundImage: `url(${src})`,
    backgroundSize: isHorizontal ? `100% ${total * 100}%` : `${total * 100}% 100%`,
    backgroundRepeat: "no-repeat",
    willChange: "transform, opacity, filter",
    backfaceVisibility: "hidden",
  };

  if (isHorizontal) {
    style.left = 0;
    style.right = 0;
    style.top = `${(index / total) * 100}%`;
    style.height = `${100 / total + 0.1}%`; // +0.1% to prevent sub-pixel gaps
    style.backgroundPosition = `0% ${(index / (total - 1)) * 100}%`;
    style.transformOrigin = "top center";
    
    if (index === 0) {
      style.borderTopLeftRadius = "1.5rem";
      style.borderTopRightRadius = "1.5rem";
    }
    if (index === total - 1) {
      style.borderBottomLeftRadius = "1.5rem";
      style.borderBottomRightRadius = "1.5rem";
    }
  } else {
    style.top = 0;
    style.bottom = 0;
    style.left = `${(index / total) * 100}%`;
    style.width = `${100 / total + 0.1}%`; // +0.1% to prevent sub-pixel gaps
    style.backgroundPosition = `${(index / (total - 1)) * 100}% 0%`;
    style.transformOrigin = "center left";

    if (index === 0) {
      style.borderTopLeftRadius = "1.5rem";
      style.borderBottomLeftRadius = "1.5rem";
    }
    if (index === total - 1) {
      style.borderTopRightRadius = "1.5rem";
      style.borderBottomRightRadius = "1.5rem";
    }
  }

  return (
    <motion.div
      style={{
        ...style,
        opacity,
        rotateX,
        rotateY,
        z: translateZ,
        scale,
        filter,
      }}
      className="shadow-2xl"
    />
  );
});

Stripe.displayName = "Stripe";

export default function ConstructImage({
  src,
  className,
  stripes = 12,
  direction = "horizontal"
}: ConstructImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Offset tracking so the animation feels responsive to the scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "center 40%"],
  });

  const stripeArray = useMemo(() => Array.from({ length: stripes }), [stripes]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-visible", className)}
      style={{ 
        perspective: 2000, 
        transformStyle: "preserve-3d",
      }}
    >
      {stripeArray.map((_, i) => (
        <Stripe
          key={i}
          index={i}
          total={stripes}
          progress={scrollYProgress}
          src={src}
          direction={direction}
        />
      ))}
    </div>
  );
}
