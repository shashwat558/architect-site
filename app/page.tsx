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

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-transparent relative">
      <AnimatePresence mode="wait">
        {loading && <ActiveLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      <Header />
      <main>
        <AuroraBackground className="justify-start h-auto min-h-screen">
          <Hero data={heroData} />
        </AuroraBackground>
        <Projects data={projectsSectionData} />
        <Pillars data={pillarsSectionData} />
        <Offers data={offersSectionData} />
        <Testimonials data={testimonialsSectionData} />
        <ProjectCTA data={projectCTAData} />
      </main>
      <Footer />
    </div>
  );
}
