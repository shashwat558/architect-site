import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { client } from "../../sanity/lib/client";
import { teamMembersQuery } from "../../sanity/lib/queries";
import { teamSectionData, pillarsSectionData, projectCTAData } from "../data/content";
import type { TeamSectionData } from "../data/types";

const baseUrl = "https://adrs-design.com";

export const metadata: Metadata = {
  title: "About Ad.Rs Design Studio | Architects in Bhopal Since 2017",
  description:
    "Ad.Rs Design Studio is a trusted architecture firm in Bhopal since 2017. We design residential and commercial interiors near Berkheda, New Minal Residency.",
  keywords: [
    "architecture firm in Bhopal",
    "experienced interior designers",
    "architects in Bhopal",
    "interior designers in Bhopal",
    "best architecture firm near Berkheda",
    "residential interior design Bhopal",
    "commercial interior designers Bhopal",
    "Ad.Rs Design Studio",
  ],
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "About Ad.Rs Design Studio | Architects in Bhopal Since 2017",
    description:
      "Meet Ad.Rs Design Studio, a Bhopal-based architecture and interior design firm established in 2017 with a focus on residential and commercial projects.",
    url: `${baseUrl}/about`,
    siteName: "Ad.Rs Design Studio",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://adrs-design.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Ad.Rs Design Studio in Bhopal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ad.Rs Design Studio | Architects in Bhopal Since 2017",
    description:
      "Trusted architects and interior designers in Bhopal since 2017. Residential, commercial, and modular kitchen design near Berkheda.",
    images: ["https://adrs-design.com/twitter-image.png"],
  },
};

type SanityTeamMember = {
  _id: string;
  name: string;
  role: string;
  image: string;
  displayOrder?: number;
};

export default async function AboutPage() {
  const sanityTeam = await client.fetch<SanityTeamMember[]>(
    teamMembersQuery,
    {},
    { next: { revalidate: 60 } }
  );

  // Map Sanity team members → TeamMember shape expected by TeamSection
  const liveTeamSection: TeamSectionData =
    sanityTeam.length > 0
      ? {
          ...teamSectionData,
          members: sanityTeam.map((m, i) => ({
            id: i + 1,
            name: m.name,
            title: m.role,
            image: m.image ?? "",
            bio: "",
            gallery: [],
            socials: [],
          })),
        }
      : teamSectionData;

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Ad.Rs Design Studio",
    url: `${baseUrl}/about`,
    about: {
      "@type": "Organization",
      name: "Ad.Rs Design Studio",
      foundingDate: "2017",
      areaServed: "Bhopal",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />
      <AboutClient
        teamSectionData={liveTeamSection}
        pillarsSectionData={pillarsSectionData}
        projectCTAData={projectCTAData}
      />
    </>
  );
}
