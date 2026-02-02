import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCTA from "../components/ProjectCTA";
import ProjectsContent from "../components/ProjectsContent";

export const metadata: Metadata = {
  title: "Design Projects Portfolio | AD.RS Design Studio",
  description: "Explore our portfolio of residential, commercial, and sustainable interior design projects. See our latest work in architecture and space design.",
  keywords: ["design projects", "portfolio", "interior design", "architecture", "residential design", "commercial design"],
  openGraph: {
    title: "Our Design Projects",
    description: "View our award-winning interior design and architectural projects",
    url: "https://adrs-design.com/projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen relative">
      <Header />
      
      <main className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-[1920px] mx-auto">
        <ProjectsContent />

        <div className="mt-32">
          <ProjectCTA />
        </div>
      </main>

      <Footer />
    </div>
  );
}
