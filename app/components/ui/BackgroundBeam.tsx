/* eslint-disable react-hooks/purity */
"use client";
import React, { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Reduced from 50 paths to 10 for massive performance improvement
const PATHS = [
  "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
  "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
  "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
  "M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755",
  "M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715",
  "M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675",
  "M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635",
  "M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595",
  "M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555",
  "M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515",
];

// Pre-compute the combined static background path
const STATIC_PATH = PATHS.join("");

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    const randomValues = useMemo(
      () =>
        PATHS.map(() => ({
          y2: 93 + Math.random() * 8,
          duration: Math.random() * 20 + 40,
          delay: Math.random() * 10,
        })),
      []
    );

    return (
      <div
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]",
          className,
        )}
      >
        <svg
          className="pointer-events-none absolute z-0 h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Static background paths — single combined path element */}
          <path
            d={STATIC_PATH}
            stroke="url(#paint0_radial_242_278)"
            strokeOpacity="0.08"
            strokeWidth="0.5"
          />

          {/* Animated paths — reduced from 50 to 10 with simpler styling */}
          {PATHS.map((path, index) => (
            <motion.path
              key={`path-` + index}
              d={path}
              stroke={`url(#linearGradient-${index})`}
              strokeOpacity="0.7"
              strokeWidth="0.9"
            />
          ))}
          
          <defs>
            {PATHS.map((_path, index) => (
              <motion.linearGradient
                id={`linearGradient-${index}`}
                key={`gradient-${index}`}
                initial={{
                  x1: "0%",
                  x2: "0%",
                  y1: "0%",
                  y2: "0%",
                }}
                animate={{
                  x1: ["0%", "100%"],
                  x2: ["0%", "95%"],
                  y1: ["0%", "100%"],
                  y2: ["0%", `${randomValues[index].y2}%`],
                }}
                transition={{
                  duration: randomValues[index].duration,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: randomValues[index].delay,
                }}
              >
                <stop stopColor="#FED7AA" stopOpacity="0" />
                <stop stopColor="#FDBA74" />
                <stop offset="30%" stopColor="#FB923C" />
                <stop offset="55%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
              </motion.linearGradient>
            ))}

            <radialGradient
              id="paint0_radial_242_278"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
            >
              <stop offset="0.0666667" stopColor="#FED7AA" />
              <stop offset="0.243243" stopColor="#FDBA74" />
              <stop offset="0.43594" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  },
);

BackgroundBeams.displayName = "BackgroundBeams";
