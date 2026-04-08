/**
 * Loader Configuration
 * Only imports the active loader to keep bundle size minimal.
 */

import React from "react";
import dynamic from "next/dynamic";

export type LoaderType = "minimal" | "animated-logo" | "gradient-wave" | "geometric" | "glitch" | "blueprint" | "cinematic";

/**
 * CHANGE THIS TO SWITCH LOADERS
 * Options: "minimal" | "animated-logo" | "gradient-wave" | "geometric" | "glitch" | "blueprint" | "cinematic"
 */
export const ACTIVE_LOADER: LoaderType = "cinematic";

// Only dynamically import the active loader — others are never bundled
const loaderImportMap: Record<LoaderType, () => Promise<{ default: React.ComponentType<{ onComplete: () => void }> }>> = {
  minimal: () => import("./MinimalLoader"),
  "animated-logo": () => import("./AnimatedLogoLoader"),
  "gradient-wave": () => import("./GradientWaveLoader"),
  geometric: () => import("./GeometricLoader"),
  glitch: () => import("./GlitchLoader"),
  blueprint: () => import("./BlueprintLoader"),
  cinematic: () => import("./CinematicLoader"),
};

// Get the active loader component via next/dynamic (code-split)
export const getActiveLoader = () => {
  return dynamic(loaderImportMap[ACTIVE_LOADER], {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0d0d]">
        {/* Simple static placeholder that matches the loader's background */}
      </div>
    ),
  });
};

// Loader descriptions
export const loaderDescriptions = {
  minimal:
    "Clean progress bar with percentage counter. Perfect for minimal design.",
  "animated-logo":
    "Animated logo with particle effects and pulsing glow. Modern and elegant.",
  "gradient-wave":
    "Smooth animated gradient waves with text. Fluid and sophisticated.",
  geometric:
    "Rotating geometric shapes with orbital elements. Dynamic and technical.",
  glitch:
    "Retro glitch effect with scanlines. Edgy and contemporary.",
  blueprint:
    "Blueprint drafting animation with construction lines. Architectural and precise.",
  cinematic:
    "Cinematic reveal with masked letter animation. Bold and dramatic.",
};
