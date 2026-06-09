import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Silence the "multiple lockfiles" Turbopack warning — explicitly set root
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Skip TypeScript type-checking during `next build` — saves ~30-40s.
  // Types are checked by the editor/CI pipeline instead.
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
    ],

    // Serve AVIF for modern browsers (30-50% smaller than WebP), WebP fallback
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
  },

  experimental: {
    // Tree-shake these large packages to only import what's used
    optimizePackageImports: [
      "motion",
      "motion/react",
      "@react-three/fiber",
      "@react-three/drei",
      "lenis",
      "three",
      "@tabler/icons-react",
      "@sanity/image-url",
      "sanity",
    ],
    // Enable React Server Component streaming for better TTFB
    ppr: false,
  },

  compress: true,

  // Performance headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Preconnect to Sanity CDN for faster image loading
          {
            key: "Link",
            value: "<https://cdn.sanity.io>; rel=preconnect; crossorigin, <https://images.unsplash.com>; rel=preconnect; crossorigin",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/(.*)\.(js|css|woff|woff2|ttf|eot|ico|svg|png|jpg|jpeg|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
