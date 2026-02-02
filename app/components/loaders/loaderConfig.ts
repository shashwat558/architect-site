/**
 * Loader Configuration
 * Choose your preferred intro loader here
 */

// Import all loaders
import MinimalLoader from "./MinimalLoader";
import AnimatedLogoLoader from "./AnimatedLogoLoader";
import GradientWaveLoader from "./GradientWaveLoader";
import GeometricLoader from "./GeometricLoader";
import GlitchLoader from "./GlitchLoader";

export type LoaderType = "minimal" | "animated-logo" | "gradient-wave" | "geometric" | "glitch";

// Map loader names to components
export const loaderComponents = {
  minimal: MinimalLoader,
  "animated-logo": AnimatedLogoLoader,
  "gradient-wave": GradientWaveLoader,
  geometric: GeometricLoader,
  glitch: GlitchLoader,
};

/**
 * CHANGE THIS TO SWITCH LOADERS
 * Options: "minimal" | "animated-logo" | "gradient-wave" | "geometric" | "glitch"
 */
export const ACTIVE_LOADER: LoaderType = "animated-logo";

// Get the active loader component
export const getActiveLoader = () => {
  return loaderComponents[ACTIVE_LOADER];
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
};
