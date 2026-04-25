"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { getActiveLoader } from "./components/loaders/loaderConfig";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/hero/Hero";
import AnimatedTestimonialsSection from "./components/sections/AnimatedTestimonialsSection";
import ConstructImage from "./components/ui/ConstructImage";
import {
  heroData,
  offersSectionData,
  pillarsSectionData,
  projectCTAData,
  projectsSectionData,
  testimonialsSectionData,
} from "./data/content";

// Lazy-load heavy below-fold sections to keep the initial bundle lean
const Projects = dynamic(() => import("./components/sections/Projects"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});
const Pillars = dynamic(() => import("./components/sections/Pillars"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});
const Offers = dynamic(() => import("./components/sections/Offers"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});
const ProjectCTA = dynamic(() => import("./components/sections/ProjectCTA"), {
  ssr: false,
  loading: () => <div className="h-24" />,
});

const ActiveLoader = getActiveLoader();

export default function HomeClient() {
  const [loading, setLoading] = useState(true);

  // Prevent body scroll while the intro loader is visible
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading]);

  return (
    <div className="min-h-screen bg-transparent relative">
      <AnimatePresence mode="wait">
        {loading && <ActiveLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div
        className={
          loading
            ? "opacity-0 invisible"
            : "opacity-100 visible transition-opacity duration-700"
        }
      >
        <Header />

        <main>
          <Hero data={heroData} />

          <Projects data={projectsSectionData} />
          <Pillars data={pillarsSectionData} />
          <Offers data={offersSectionData} />

          {/* Studio Team preview — full team on /about */}
          <section
            className="w-full bg-[#FAF6F1] py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
            aria-label="Meet the studio team"
          >
            <div className="max-w-[1400px] mx-auto">
              <div className="flex flex-col items-center mb-16 text-center">
                <span className="text-[#D97706] uppercase tracking-widest text-sm font-semibold mb-4 vibrate-text">
                  The Studio
                </span>
                <h2 className="font-serif text-5xl md:text-6xl text-[#3D2B1F]">
                  Meet the Visionaries
                </h2>
              </div>
              <div className="w-full h-[50vh] md:h-[70vh] rounded-2xl">
                <ConstructImage
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&fit=crop&q=80"
                  stripes={12}
                  className="w-full h-full"
                />
              </div>
            </div>
          </section>

          <AnimatedTestimonialsSection data={testimonialsSectionData} />
          <ProjectCTA data={projectCTAData} />
        </main>

        <Footer />
      </div>
    </div>
  );
}
