import type { Metadata } from "next";
import HomeClient from "./home-client";
import { client } from "../sanity/lib/client";
import { featuredProjectsQuery, teamMembersQuery } from "../sanity/lib/queries";
import {
  heroData,
  offersSectionData,
  pillarsSectionData,
  projectCTAData,
  projectsSectionData,
  teamSectionData,
  testimonialsSectionData,
} from "./data/content";
import type { ProjectsSectionData, TeamSectionData } from "./data/types";

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

// ── Sanity types ───────────────────────────────────────────────────────────────

type SanityProject = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  heroImage: string;
  meta?: { label: string; value: string }[];
};

type SanityTeamMember = {
  _id: string;
  name: string;
  role: string;
  slug: string;
  image: string;
  displayOrder?: number;
};

// ── Data mappers ───────────────────────────────────────────────────────────────

function toProjectCard(p: SanityProject, i: number) {
  return {
    id: i + 1,
    title: p.title,
    category: p.category ?? "Architecture",
    year: p.meta?.find((m) => m.label === "Year")?.value ?? "",
    image: p.heroImage ?? "",
    link: `/projects/${p.slug}`,
  };
}

function toTeamMember(m: SanityTeamMember, i: number) {
  return {
    id: i + 1,
    name: m.name,
    title: m.role,
    image: m.image ?? "",
    bio: "",
    gallery: [],
    socials: [],
  };
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function Home() {
  // Fetch featured projects and team members from Sanity in parallel
  const [sanityProjects, sanityTeam] = await Promise.all([
    client.fetch<SanityProject[]>(featuredProjectsQuery, {}, { next: { revalidate: 60 } }),
    client.fetch<SanityTeamMember[]>(teamMembersQuery, {}, { next: { revalidate: 60 } }),
  ]);

  // Build projectsSectionData — fall back to static if Sanity is empty
  const liveProjectsSection: ProjectsSectionData =
    sanityProjects.length > 0
      ? {
          ...projectsSectionData,
          projects: sanityProjects.map(toProjectCard),
        }
      : projectsSectionData;

  // Build teamSectionData — fall back to static if Sanity is empty
  const liveTeamSection: TeamSectionData =
    sanityTeam.length > 0
      ? {
          ...teamSectionData,
          members: sanityTeam.map(toTeamMember),
        }
      : teamSectionData;

  return (
    <HomeClient
      heroData={heroData}
      projectsSectionData={liveProjectsSection}
      pillarsSectionData={pillarsSectionData}
      offersSectionData={offersSectionData}
      testimonialsSectionData={testimonialsSectionData}
      projectCTAData={projectCTAData}
      teamSectionData={liveTeamSection}
    />
  );
}
