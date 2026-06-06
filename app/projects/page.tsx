import type { Metadata } from "next";

import ProjectCTA from "../components/sections/ProjectCTA";
import ProjectsContent from "../components/sections/ProjectsContent";
import { projectCTAData } from "../data/content";
import { client } from "../../sanity/lib/client";
import { projectsListQuery } from "../../sanity/lib/queries";
import type { ProjectsContentData } from "../data/types";

const baseUrl = "https://adrs-design.com";

export const metadata: Metadata = {
  title: "Architecture Projects in Bhopal | Ad.Rs Portfolio",
  description:
    "Explore architecture projects in Bhopal and our interior design portfolio. Discover residential and commercial work by Ad.Rs Design Studio near Berkheda.",
  keywords: [
    "architecture projects in Bhopal",
    "interior design portfolio Bhopal",
    "architects in Bhopal",
    "interior designers in Bhopal",
    "best architecture firm near Berkheda",
    "residential interior design Bhopal",
    "commercial interior designers Bhopal",
    "Ad.Rs Design Studio",
  ],
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
  openGraph: {
    title: "Architecture Projects in Bhopal | Ad.Rs Portfolio",
    description:
      "Browse architecture projects in Bhopal and an interior design portfolio featuring residential and commercial work by Ad.Rs Design Studio.",
    url: `${baseUrl}/projects`,
    type: "website",
    siteName: "Ad.Rs Design Studio",
    locale: "en_IN",
    images: [
      {
        url: "https://adrs-design.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Architecture and Interior Design Portfolio in Bhopal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Architecture Projects in Bhopal | Ad.Rs Portfolio",
    description:
      "Discover architecture projects in Bhopal and a curated interior design portfolio by Ad.Rs Design Studio.",
    images: ["https://adrs-design.com/twitter-image.png"],
  },
};

// Sanity project shape (raw from GROQ)
type SanityProject = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  category: string;
  status: string;
  isFeatured: boolean;
  heroImage: string;
  meta?: { label: string; value: string }[];
};

/** Map Sanity project → ProjectCard shape the components expect */
function toProjectCard(p: SanityProject, index: number) {
  return {
    id: index + 1,
    title: p.title,
    category: p.category ?? "Architecture",
    year: p.meta?.find((m) => m.label === "Year")?.value ?? "",
    image: p.heroImage,
    link: `/projects/${p.slug}`,
    location: p.meta?.find((m) => m.label === "Location")?.value,
  };
}

export default async function ProjectsPage() {
  // Fetch live data from Sanity (cached by Next.js fetch by default)
  const sanityProjects: SanityProject[] = await client.fetch(
    projectsListQuery,
    {},
    { next: { revalidate: 60 } }  // ISR: revalidate every 60 seconds
  );

  // Derive unique categories from the live dataset
  const uniqueCategories = Array.from(
    new Set(sanityProjects.map((p) => p.category).filter(Boolean))
  );

  const projectCards = sanityProjects.map(toProjectCard);

  const projectsContentData: ProjectsContentData = {
    heading: "Our Work",
    categories: ["All", ...uniqueCategories],
    projects: projectCards,
    emptyMessage: "No projects in this category yet.",
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Architecture Projects in Bhopal",
    url: `${baseUrl}/projects`,
    about: ["architecture", "interior design", "portfolio"],
    hasPart: projectCards.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      url: `${baseUrl}${project.link}`,
      about: project.category,
      locationCreated: project.location || "Bhopal, India",
      image: project.image,
      author: {
        "@type": "Organization",
        name: "Ad.Rs Design Studio",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
      />
      <main className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-[1920px] mx-auto">
        <ProjectsContent data={projectsContentData} />

        <div className="mt-32">
          <ProjectCTA data={projectCTAData} />
        </div>
      </main>
    </>
  );
}
