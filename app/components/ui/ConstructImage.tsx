"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ConstructImageProps {
  src: string;
  className?: string;
  cols?: number;
  rows?: number;
}

interface PieceProps {
  progress: MotionValue<number>;
  col: number;
  row: number;
  cols: number;
  rows: number;
  src: string;
}

const Piece = ({ progress, col, row, cols, rows, src }: PieceProps) => {
  // Randomize the start and end scroll progress points for this piece
  // This creates the staggered falling/constructing effect
  const start = useMemo(() => Math.random() * 0.5, []);
  const end = useMemo(() => start + 0.3 + Math.random() * 0.2, [start]);

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.1, 1]);

  // Random fly-in starting positions (spread widely)
  const flyX = useMemo(() => (Math.random() - 0.5) * 400, []);
  const flyY = useMemo(() => (Math.random() - 0.5) * 400 - 200, []);
  const flyZ = useMemo(() => Math.random() * 400 + 200, []);
  const startRotateX = useMemo(() => (Math.random() - 0.5) * 180, []);
  const startRotateY = useMemo(() => (Math.random() - 0.5) * 180, []);
  const startRotateZ = useMemo(() => (Math.random() - 0.5) * 90, []);

  const x = useTransform(progress, [start, end], [flyX, 0]);
  const y = useTransform(progress, [start, end], [flyY, 0]);
  const z = useTransform(progress, [start, end], [flyZ, 0]);

  const rotateX = useTransform(progress, [start, end], [startRotateX, 0]);
  const rotateY = useTransform(progress, [start, end], [startRotateY, 0]);
  const rotateZ = useTransform(progress, [start, end], [startRotateZ, 0]);

  // CSS positioning for the grid
  const left = `${(col / cols) * 100}%`;
  const top = `${(row / rows) * 100}%`;
  const width = `${100 / cols}%`;
  const height = `${100 / rows}%`;

  // Calculate the correct background position for this specific slice of the image
  const bgX = cols > 1 ? (col / (cols - 1)) * 100 : 0;
  const bgY = rows > 1 ? (row / (rows - 1)) * 100 : 0;

  // Determine border radii for the corner pieces so the full image has rounded corners
  const borderTopLeftRadius = row === 0 && col === 0 ? "1.5rem" : 0;
  const borderTopRightRadius = row === 0 && col === cols - 1 ? "1.5rem" : 0;
  const borderBottomLeftRadius = row === rows - 1 && col === 0 ? "1.5rem" : 0;
  const borderBottomRightRadius = row === rows - 1 && col === cols - 1 ? "1.5rem" : 0;

  return (
    <motion.div
      className="absolute bg-no-repeat will-change-transform shadow-sm"
      style={{
        left,
        top,
        width,
        height,
        opacity,
        scale,
        x,
        y,
        z,
        rotateX,
        rotateY,
        rotateZ,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        backgroundImage: `url(${src})`,
        backgroundSize: `${cols * 100}% ${rows * 100}%`,
        backgroundPosition: `${bgX}% ${bgY}%`,
      }}
    />
  );
};

export default function ConstructImage({
  src,
  className,
  cols = 8,
  rows = 8
}: ConstructImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of this component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center center"], // Starts when top of image hits 90% of screen, finishes when centered
  });

  const pieces = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      pieces.push({ r, c });
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-visible drop-shadow-2xl", className)}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
    >
      {/* Render all the tiny moving pieces */}
      {pieces.map((p, i) => (
        <Piece
          key={`${p.r}-${p.c}-${i}`}
          progress={scrollYProgress}
          col={p.c}
          row={p.r}
          cols={cols}
          rows={rows}
          src={src}
        />
      ))}

      {/* Optional: Add a very faint backing or glow if desired, though leaving it null keeps it perfectly clean */}
    </div>
  );
}
