import type { Metadata } from "next";
import HomeClient from "./home-client";

const baseUrl = "https://adrs-design.com";

export const metadata: Metadata = {
  title: "Architects & Interior Designers in Bhopal | Ad.Rs Studio",
  description:
    "Ad.Rs Design Studio is a Bhopal-based architecture and interior design firm since 2017. We deliver residential, commercial, modular kitchens, and landscape design near Berkheda.",
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
    "Ad.Rs Design Studio",
    "Bhopal",
  ],
  alternates: {
    canonical: `${baseUrl}/`,
  },
  openGraph: {
    title: "Architects & Interior Designers in Bhopal | Ad.Rs Studio",
    description:
      "Local architects and interior designers in Bhopal since 2017. Residential, commercial, modular kitchens, and landscape design near Berkheda, New Minal Residency.",
    url: `${baseUrl}/`,
    siteName: "Ad.Rs Design Studio",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://adrs-design.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ad.Rs Design Studio - Architects & Interior Designers in Bhopal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architects & Interior Designers in Bhopal | Ad.Rs Studio",
    description:
      "Bhopal-based architecture and interior design studio since 2017. Residential, commercial, modular kitchens, and landscape projects near Berkheda.",
    images: ["https://adrs-design.com/twitter-image.png"],
  },
};

export default function Home() {
  return <HomeClient />;
}
