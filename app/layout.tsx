import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "./context/CursorContext";
import CustomCursor from "./components/ui/CustomCursor";
import SmoothScroll from "./components/ui/SmoothScroll";
import { client } from "../sanity/lib/client";
import { siteSettingsQuery } from "../sanity/lib/queries";
import { sanityImg, type SanityImageObject } from "../sanity/lib/sanityImage";

import LayoutWrapper from "./components/layout/LayoutWrapper";


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3D2B1F",
  colorScheme: "light",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Avoid font swap flash
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://adrs-design.com"),
  title: "Ad.Rs Design Studio | Architecture & Interior Design in Bhopal",
  description: "Ad.Rs Design Studio in Bhopal offers architecture, interior design, residential and commercial projects, modular kitchens, and landscape design since 2017.",
  keywords: [
    "architects in Bhopal",
    "interior designers in Bhopal",
    "best architecture firm near Berkheda",
    "residential interior design Bhopal",
    "commercial interior designers Bhopal",
    "architecture",
    "interior design",
    "modular kitchens",
    "landscape design",
    "Bhopal",
    "Ad.Rs Design Studio",
  ],
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  authors: [{ name: "AD.RS Design Studio" }],
  creator: "Ad.Rs Design Studio",
  publisher: "Ad.Rs Design Studio",
  category: "Design & Architecture",
  applicationName: "Ad.Rs Design Studio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    url: "https://adrs-design.com",
    title: "Ad.Rs Design Studio | Architecture & Interior Design in Bhopal",
    description: "Architecture and interior design services in Bhopal since 2017. Residential, commercial, modular kitchens, and landscape design near Berkheda.",
    siteName: "Ad.Rs Design Studio",
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
    title: "Ad.Rs Design Studio | Architecture & Interior Design",
    description: "Architecture and interior design services in Bhopal since 2017. Residential, commercial, modular kitchens, and landscape design.",
    images: ["https://adrs-design.com/twitter-image.png"],
    creator: "@adrsdesign",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global brand imagery from Sanity (logo + footer backdrop). Never allowed
  // to break the layout: any fetch failure falls back to self-hosted files.
  let logoUrl: string | null = null;
  let footerBgUrl: string | null = null;
  try {
    const settings = await client.fetch<{
      logo?: SanityImageObject | null;
      footerBackground?: SanityImageObject | null;
    } | null>(siteSettingsQuery, {}, { next: { revalidate: 300 } });
    logoUrl = sanityImg(settings?.logo, 512) || null;
    footerBgUrl = sanityImg(settings?.footerBackground, 1600) || null;
  } catch {
    // Statics in Header/Footer cover this case.
  }
  return (
    <>
      <html lang="en">
      <head>
        {/* JSON-LD Schema Markup - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://adrs-design.com/#localbusiness",
                  name: "Ad.Rs Design Studio",
                  url: "https://adrs-design.com",
                  image: "https://adrs-design.com/logo.png",
                  description: "Architecture and interior design services in Bhopal since 2017.",
                  foundingDate: "2017",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Berkheda, New Minal Residency, Ayodhya Bypass Road",
                    addressLocality: "Bhopal",
                    addressRegion: "MP",
                    addressCountry: "IN",
                  },
                  areaServed: ["Bhopal"],
                  serviceType: [
                    "Architecture",
                    "Interior Design",
                    "Residential & Commercial Projects",
                    "Modular Kitchens",
                    "Landscape Design",
                  ],
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "5.0",
                    reviewCount: "32",
                  },
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://adrs-design.com/#professionalservice",
                  name: "Ad.Rs Design Studio",
                  url: "https://adrs-design.com",
                  areaServed: "Bhopal",
                  serviceType: [
                    "Architecture",
                    "Interior Design",
                    "Residential & Commercial Projects",
                    "Modular Kitchens",
                    "Landscape Design",
                  ],
                },
                {
                  "@type": "AggregateRating",
                  "@id": "https://adrs-design.com/#aggregateRating",
                  ratingValue: "5.0",
                  reviewCount: "32",
                  itemReviewed: {
                    "@id": "https://adrs-design.com/#localbusiness",
                  },
                },
              ],
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
            <LayoutWrapper siteImagery={{ logoUrl, footerBgUrl }}>
              {children}
            </LayoutWrapper>
          </SmoothScroll>

        </CursorProvider>
      </body>
    </html>
    </>
  );
}
