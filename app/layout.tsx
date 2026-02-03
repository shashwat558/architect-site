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
  title: "AD.RS Design Studio | Architecture & Interior Design in Bhopal",
  description: "AD.RS Design Studio - Premier architectural design and interior design services in Bhopal. Sustainable, innovative spaces for residences, offices, commercial venues, and hospitality. Expert design consultants.",
  keywords: [
    "interior design",
    "architecture",
    "design studio",
    "interior designer",
    "architectural design",
    "home design",
    "office design",
    "commercial design",
    "sustainable design",
    "design consulting",
    "Bhopal",
    "India",
    "eco-friendly design",
    "space planning",
    "interior architect"
  ],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  authors: [{ name: "AD.RS Design Studio" }],
  creator: "AD.RS Design Studio",
  publisher: "AD.RS Design Studio",
  category: "Design & Architecture",
  applicationName: "AD.RS Design Studio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    url: "https://adrs-design.com",
    title: "AD.RS Design Studio | Architecture & Interior Design in Bhopal",
    description: "Premier architectural design and interior design services in Bhopal. Sustainable, innovative spaces for residences, offices, and commercial venues.",
    siteName: "AD.RS Design Studio",
    images: [
      {
        url: "https://adrs-design.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "AD.RS Design Studio - Architecture & Interior Design",
        type: "image/png",
      },
      {
        url: "https://adrs-design.com/og-image-square.png",
        width: 800,
        height: 800,
        alt: "AD.RS Design Studio",
        type: "image/png",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "AD.RS Design Studio | Architecture & Interior Design",
    description: "Premier architectural and interior design services in Bhopal. Sustainable, innovative spaces for residences, offices, and commercial venues.",
    images: ["https://adrs-design.com/twitter-image.png"],
    creator: "@adrsdesign",
  },
  other: {
    "preconnect": "https://fonts.googleapis.com",
    "preload": "https://fonts.gstatic.com",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#3D2B1F",
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
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="canonical" href="https://adrs-design.com" />
        <link rel="alternate" href="https://adrs-design.com" hrefLang="en-IN" />
        <link rel="alternate" href="https://adrs-design.com" hrefLang="en" />
        
        {/* JSON-LD Schema Markup - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://adrs-design.com",
              "name": "AD.RS Design Studio",
              "url": "https://adrs-design.com",
              "image": "https://adrs-design.com/logo.png",
              "description": "Premier architectural design and interior design services in Bhopal",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bhopal",
                "addressRegion": "MP",
                "addressCountry": "IN"
              },
              "areaServed": ["Bhopal", "Central India"],
              "serviceType": ["Interior Design", "Architectural Design", "Space Planning"],
              "priceRange": "$$"
            }),
          }}
        />
        
        {/* JSON-LD Schema - BreadcrumbList (will be updated per page) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://adrs-design.com"
                }
              ]
            }),
          }}
        />
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
