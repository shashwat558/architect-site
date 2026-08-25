"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { getActiveLoader } from "./components/loaders/loaderConfig";
import PoeticHero from "./components/hero/PoeticHero";
import { Testimonials } from "./components/sections";
import ConstructImage from "./components/ui/ConstructImage";
import type {
  HeroData,
  OffersSectionData,
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
const Offers = dynamic(() => import("./components/sections/Offers"), {
  loading: () => <div className="h-24" />,
});
const ProjectCTA = dynamic(() => import("./components/sections/ProjectCTA"), {
  loading: () => <div className="h-24" />,
});

const ActiveLoader = getActiveLoader();

type HomeClientProps = {
  heroData: HeroData;
  projectsSectionData: ProjectsSectionData;
  pillarsSectionData: PillarsSectionData;
  offersSectionData: OffersSectionData;
  testimonialsSectionData: TestimonialsSectionData;
  projectCTAData: ProjectCTAData;
};

export default function HomeClient({
  heroData,
  projectsSectionData,
  pillarsSectionData,
  offersSectionData,
  testimonialsSectionData,
  projectCTAData,
}: HomeClientProps) {
  const [loading, setLoading] = useState(true);

  // Prevent body scroll while the intro loader is visible
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
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
        <main>
          <div className="relative w-full overflow-hidden">
            <PoeticHero data={heroData} />
          </div>

          <Suspense fallback={<div className="h-24" />}>
            <Projects data={projectsSectionData} />
          </Suspense>
          <div className="cv-auto">
            <Suspense fallback={<div className="h-24" />}>
              <Pillars data={pillarsSectionData} />
            </Suspense>
          </div>
          <div className="cv-auto">
            <Suspense fallback={<div className="h-24" />}>
              <Offers data={offersSectionData} />
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
