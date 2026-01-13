"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Pillars from "./components/Pillars";
import Offers from "./components/Offers";
import ProjectCTA from "./components/ProjectCTA";
import Footer from "./components/Footer";
import IntroLoader from "./components/IntroLoader";

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
        {loading && <IntroLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      <Header />
      <main>
        <Hero />
        <Projects />
        <Pillars />
        <Offers />
        <ProjectCTA />
      </main>
      <Footer />
    </div>
  );
}
