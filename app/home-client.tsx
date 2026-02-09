"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { getActiveLoader } from "./components/loaders/loaderConfig";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { AuroraBackground } from "./components/ui/AuroraBackground";
import {
  heroData,
  offersSectionData,
  pillarsSectionData,
  projectCTAData,
  projectsSectionData,
  testimonialsSectionData,
} from "./data/dummyData";

const ActiveLoader = getActiveLoader();

const Projects = dynamic(() => import("./components/Projects"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});
const Pillars = dynamic(() => import("./components/Pillars"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});
const Offers = dynamic(() => import("./components/Offers"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});
const ProjectCTA = dynamic(() => import("./components/ProjectCTA"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});
const Testimonials = dynamic(() => import("./components/Testimonials"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});

export default function HomeClient() {
  const [loading, setLoading] = useState(true);
  const [heroContent, setHeroContent] = useState(heroData);
  const [projectsContent, setProjectsContent] = useState(projectsSectionData);
  const [testimonialsContent, setTestimonialsContent] = useState(
    testimonialsSectionData
  );

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  useEffect(() => {
    const loadHomeImages = async () => {
      try {
        const res = await fetch("/api/home-images");
        if (!res.ok) {
          return;
        }
        const data = await res.json();

        if (Array.isArray(data.heroImages) && data.heroImages.length > 0) {
          setHeroContent({
            ...heroData,
            images: data.heroImages.map((src: string, index: number) => ({
              src,
              alt: `AD.RS Design image ${index + 1}`,
            })),
          });
        }

        if (Array.isArray(data.projectImages) && data.projectImages.length > 0) {
          setProjectsContent({
            ...projectsSectionData,
            projects: projectsSectionData.projects.map((project, index) => ({
              ...project,
              image: data.projectImages[index] || project.image,
            })),
          });
        }

        if (
          Array.isArray(data.testimonialImages) &&
          data.testimonialImages.length > 0
        ) {
          setTestimonialsContent({
            ...testimonialsSectionData,
            testimonials: testimonialsSectionData.testimonials.map(
              (testimonial, index) => ({
                ...testimonial,
                image: data.testimonialImages[index] || testimonial.image,
              })
            ),
          });
        }
      } catch (error) {
        console.error("Failed to load home images", error);
      }
    };

    loadHomeImages();
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative">
      <AnimatePresence mode="wait">
        {loading && <ActiveLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Header />
      <main>
        <AuroraBackground className="justify-start h-auto min-h-screen">
          <Hero data={heroContent} />
        </AuroraBackground>
        <Projects data={projectsContent} />
        <Pillars data={pillarsSectionData} />
        <Offers data={offersSectionData} />
        <Testimonials data={testimonialsContent} />
        <ProjectCTA data={projectCTAData} />
      </main>
      <Footer />
    </div>
  );
}
