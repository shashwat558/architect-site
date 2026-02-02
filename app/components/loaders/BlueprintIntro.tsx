"use client";

import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export const BlueprintIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing configuration
  const gridStart = 10; // Frame 10
  const gridEnd = 25; // Grid fades out
  const linesStart = 15; // Blueprint lines start drawing
  const linesEnd = 60; // Lines finish drawing
  const strokeFadeStart = 60; // Strokes start fading
  const strokeFadeEnd = 75; // Strokes completely fade
  const solidFadeStart = 65; // Solid letters start appearing
  const solidFadeEnd = 90; // Solid letters fully visible

  // Grid opacity
  const gridOpacity = interpolate(
    frame,
    [gridStart, gridStart + 10, gridEnd, gridEnd + 10],
    [0, 0.15, 0.15, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Blueprint line drawing progress (0 to 1)
  const lineProgress = interpolate(frame, [linesStart, linesEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stroke fade out
  const strokeOpacity = interpolate(
    frame,
    [strokeFadeStart, strokeFadeEnd],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Solid letters fade in
  const solidOpacity = interpolate(
    frame,
    [solidFadeStart, solidFadeEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F5F3EE",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Grain texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "multiply",
        }}
      />

      {/* Baseline grid */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          opacity: gridOpacity,
        }}
        viewBox="0 0 1920 1080"
      >
        {/* Horizontal grid lines */}
        {Array.from({ length: 30 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 36}
            x2="1920"
            y2={i * 36}
            stroke="#4A90E2"
            strokeWidth="0.5"
            opacity="0.2"
          />
        ))}
        {/* Vertical grid lines */}
        {Array.from({ length: 54 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 36}
            y1="0"
            x2={i * 36}
            y2="1080"
            stroke="#4A90E2"
            strokeWidth="0.5"
            opacity="0.2"
          />
        ))}
        {/* Scale marks in corner */}
        <g opacity={gridOpacity > 0 ? 1 : 0}>
          <line x1="100" y1="980" x2="200" y2="980" stroke="#4A90E2" strokeWidth="1.5" />
          <line x1="100" y1="975" x2="100" y2="985" stroke="#4A90E2" strokeWidth="1.5" />
          <line x1="200" y1="975" x2="200" y2="985" stroke="#4A90E2" strokeWidth="1.5" />
          <text
            x="150"
            y="970"
            fontSize="12"
            fill="#4A90E2"
            textAnchor="middle"
            fontFamily="monospace"
          >
            100
          </text>
        </g>
      </svg>

      {/* Blueprint construction lines */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          opacity: strokeOpacity,
        }}
        viewBox="0 0 1920 1080"
      >
        <g transform="translate(960, 540)">
          {/* Letter A */}
          <BlueprintPath
            d="M-400,-120 L-400,120 M-400,-120 L-320,-120 M-360,-120 L-360,120"
            progress={lineProgress}
            color="#4A90E2"
          />
          {/* Letter D */}
          <BlueprintPath
            d="M-240,-120 L-240,120 M-240,-120 L-160,-120 Q-120,-120 -120,-60 Q-120,0 -120,60 Q-120,120 -160,120 L-240,120"
            progress={lineProgress}
            color="#4A90E2"
          />
          {/* Letter R */}
          <BlueprintPath
            d="M-40,-120 L-40,120 M-40,-120 L40,-120 Q80,-120 80,-80 Q80,-40 40,-40 L-40,-40 M40,-40 L80,120"
            progress={lineProgress}
            color="#4A90E2"
          />
          {/* Letter S */}
          <BlueprintPath
            d="M240,-120 L160,-120 Q120,-120 120,-80 Q120,-40 160,-40 L240,-40 Q280,-40 280,0 Q280,40 280,80 Q280,120 240,120 L160,120"
            progress={lineProgress}
            color="#4A90E2"
          />
        </g>
      </svg>

      {/* Solid letters */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: solidOpacity,
        }}
      >
        <div
          style={{
            fontSize: "180px",
            fontWeight: "300",
            letterSpacing: "0.1em",
            color: "#1a1a1a",
            fontFamily: "serif",
          }}
        >
          AD.RS
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Helper component for animated blueprint paths
const BlueprintPath: React.FC<{
  d: string;
  progress: number;
  color: string;
}> = ({ d, progress, color }) => {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="2000"
      strokeDashoffset={2000 - 2000 * progress}
      style={{
        filter: "drop-shadow(0 0 2px rgba(74, 144, 226, 0.3))",
      }}
    />
  );
};
