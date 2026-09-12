"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { getActiveLoader } from "./components/loaders/loaderConfig";
import PoeticHero from "./components/hero/PoeticHero";
import { Testimonials } from "./components/sections";
import type {
  HeroData,
  PillarsSectionData,
  ProjectCTAData,
  ProjectsSectionData,
  TestimonialsSectionData,
} from "./data/types";

// Lazy-load heavy below-fold sections — ssr:true so they produce server HTML
// (avoids CLS from blank placeholders popping in)
const Projects = dynamic(() => import("./components/sections/Projects"), {
  loading: () => <div className="h-24" />,
});
const Pillars = dynamic(() => import("./components/sections/Pillars"), {
  loading: () => <div className="h-24" />,
});
const ProjectCTA = dynamic(() => import("./components/sections/ProjectCTA"), {
  loading: () => <div className="h-24" />,
});

const ActiveLoader = getActiveLoader();

type HomeClientProps = {
  heroData: HeroData;
  /** Optimized Sanity hero background URL (optional — falls back to static). */
  heroBgUrl?: string;
  /** Live hero carousel slides (optional — falls back to static local set). */
  heroSlides?: { src: string; caption: string }[];
  projectsSectionData: ProjectsSectionData;
  pillarsSectionData: PillarsSectionData;
  testimonialsSectionData: TestimonialsSectionData;
  projectCTAData: ProjectCTAData;
};

export default function HomeClient({
  heroData,
  heroBgUrl,
  heroSlides,
  projectsSectionData,
  pillarsSectionData,
  testimonialsSectionData,
  projectCTAData,
}: HomeClientProps) {
  const [loading, setLoading] = useState(true);

  // Prevent body scroll while the intro loader is visible, and tell the
  // Lenis smooth-scroller (mounted in the root layout) to stop/start with it.
  // Without this, wheel input queues up inside Lenis during the intro and
  // releases as a jump the moment the loader lifts — felt as first-scroll lag.
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
    window.dispatchEvent(
      new CustomEvent(loading ? "lenis:stop" : "lenis:start")
    );
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  // If this page unmounts mid-intro (navigation), make sure Lenis is running.
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent("lenis:start"));
    };
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative">
      <AnimatePresence mode="wait">
        {loading && <ActiveLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div
        className={
          loading
            ? "opacity-0 invisible"
            : "opacity-100 visible transition-opacity duration-500"
        }
      >
        <main>
          <div className="relative w-full overflow-hidden">
            <PoeticHero data={heroData} active={!loading} carouselPaused={loading} bgUrl={heroBgUrl} slides={heroSlides} />
          </div>

          <Suspense fallback={<div className="h-24" />}>
            <Projects data={projectsSectionData} />
          </Suspense>
          <div className="cv-auto">
            <Suspense fallback={<div className="h-24" />}>
              <Pillars data={pillarsSectionData} />
            </Suspense>
          </div>
          <Testimonials data={testimonialsSectionData} />
          <Suspense fallback={<div className="h-24" />}>
            <ProjectCTA data={projectCTAData} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
