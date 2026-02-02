import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
    // Optimize image delivery
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Compress static assets and enable SWR
  swcMinify: true,
  // Optimize font loading
  optimizeFonts: true,
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["motion", "@react-three/fiber", "@react-three/drei"],
  },
  // Add security headers and enable compression
  compress: true,
};

export default nextConfig;
