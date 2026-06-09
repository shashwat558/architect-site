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

          {/* Studio Team preview — full team on /about */}
          <section
            className="w-full py-24 px-6 md:px-12 lg:px-20 overflow-hidden cv-auto"
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

          <Testimonials data={testimonialsSectionData} />
          <Suspense fallback={<div className="h-24" />}>
            <ProjectCTA data={projectCTAData} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
