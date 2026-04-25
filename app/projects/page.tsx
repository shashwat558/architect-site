import type { Metadata } from "next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProjectCTA from "../components/sections/ProjectCTA";
import ProjectsContent from "../components/sections/ProjectsContent";
import { projectCTAData, projectsContentData } from "../data/dummyData";

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

export default function ProjectsPage() {
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Architecture Projects in Bhopal",
    url: `${baseUrl}/projects`,
    about: ["architecture", "interior design", "portfolio"],
    hasPart: projectsContentData.projects.map((project) => ({
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
      <div className="min-h-screen relative">
        <Header />

        <main className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-[1920px] mx-auto">
          <ProjectsContent data={projectsContentData} />

          <div className="mt-32">
            <ProjectCTA data={projectCTAData} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
