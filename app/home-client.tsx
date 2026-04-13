"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { getActiveLoader } from "./components/loaders/loaderConfig";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Testimonials from "./components/AnimatedTestimonialsSection";
import { AuroraBackground } from "./components/ui/AuroraBackground";
import ConstructImage from "./components/ui/ConstructImage";
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


export default function HomeClient() {
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

      <div className={loading ? "opacity-0 invisible" : "opacity-100 visible transition-opacity duration-700"}>
        <Header />
        <main>

          <Hero data={heroData} />




          <Projects data={projectsSectionData} />
          <Pillars data={pillarsSectionData} />
          <Offers data={offersSectionData} />

          <section className="w-full bg-[#FAF6F1] py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex flex-col items-center mb-16 text-center">
                <span className="text-[#D97706] uppercase tracking-widest text-sm font-semibold mb-4 vibrate-text">The Studio</span>
                <h2 className="font-serif text-5xl md:text-6xl text-[#3D2B1F]">Meet the Visionaries</h2>
              </div>
              <div className="w-full h-[50vh] md:h-[70vh] rounded-2xl">
                <ConstructImage
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&fit=crop&q=80"
                  cols={12}
                  rows={8}
                  className="w-full h-full"
                />
              </div>
            </div>
          </section>

          <Testimonials data={testimonialsSectionData} />
          <ProjectCTA data={projectCTAData} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
