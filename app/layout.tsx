import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "./context/CursorContext";
import CustomCursor from "./components/ui/CustomCursor";
import SmoothScroll from "./components/ui/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Avoid font swap flash
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap", // Avoid font swap flash
});

export const metadata: Metadata = {
  title: "AD.RS Design Studio | Architecture & Interior Design",
  description: "AD.RS Design Studio - Expert architectural design and interior design services in Bhopal. Creating beautiful, functional spaces for homes, offices, showrooms, and more.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  // Preconnect to external resources
  other: {
    "preconnect": "https://fonts.googleapis.com",
    "preload": "https://fonts.gstatic.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to image CDN */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        {/* DNS prefetch for image service */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased relative min-h-screen`}
      >
        <CursorProvider>
          <SmoothScroll>
            <CustomCursor />
            {/* Amber Glow Background */}
            <div
            className="fixed inset-0 -z-10"
            style={{
                backgroundImage: `radial-gradient(125% 125% at 50% 10%, #fff 40%, #f59e0b 100%)`,
                backgroundSize: "100% 100%",
            }}
            />
            {children}
          </SmoothScroll>
        </CursorProvider>
      </body>
    </html>
  );
}
