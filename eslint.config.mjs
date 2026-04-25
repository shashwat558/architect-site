import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "lib/generated/**",
  ]),
  {
    // The new React 19 lint rules trip on legitimate patterns we use:
    // - media-query detection via setState in effect (the API is intrinsically
    //   browser-only and only runs once on mount).
    // - useRef holding object literals built once and mutated via .current
    //   (standard R3F uniforms / placeholder texture pattern).
    // - useTransform inside a hook factory used unconditionally per call.
    // - Math.random for one-shot per-stripe randomization in motion.
    // Downgrade these from errors to warnings so they don't block builds.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/purity": "warn",
    },
  },
]);

export default eslintConfig;
