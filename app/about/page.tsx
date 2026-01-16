"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCTA from "../components/ProjectCTA";
import Pillars from "../components/Pillars";

export default function About() {
  return (
    <div className="min-h-screen relative">
      <Header />
      
      <main className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-[1920px] mx-auto">
        {/* Hero Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--foreground)] mb-12 relative leading-tight">
              Crafting Spaces <br/>
              <span className="italic text-[var(--muted)]">with Soul & Purpose.</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
               <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                 {/* Placeholder for About Hero Image */}
                 <div className="bg-[#E5DDD0] w-full h-full absolute inset-0 flex items-center justify-center text-[var(--muted)]">
                    <span className="font-serif italic text-xl">Studio Atmosphere</span>
                 </div>
               </div>
               
               <div className="space-y-8">
                 <p className="text-xl md:text-2xl font-light leading-relaxed text-[var(--foreground)]">
                   AD.RS Design Studio was born from a desire to reconnect architecture with human emotion. We believe that spaces should not just be inhabited, but felt.
                 </p>
                 <p className="text-[var(--muted)] leading-relaxed">
                    Founded in Bhopal, our studio operates at the intersection of art, architecture, and interior design. 
                    We approach every project as a unique narrative, weaving together context, culture, and client aspirations 
                    to create environments that stand the test of time while remaining deeply personal.
                 </p>
                 <div className="pt-4">
                    <div className="flex gap-12">
                        <div>
                            <h3 className="font-serif text-4xl text-[var(--accent)] mb-2">15+</h3>
                            <p className="text-sm uppercase tracking-widest text-[var(--muted)]">Years Experience</p>
                        </div>
                        <div>
                            <h3 className="font-serif text-4xl text-[var(--accent)] mb-2">100+</h3>
                            <p className="text-sm uppercase tracking-widest text-[var(--muted)]">Projects Completed</p>
                        </div>
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </section>

        {/* Philosophy / Values Reused */}
        <div className="mb-24">
            <h2 className="font-serif text-4xl md:text-5xl mb-12 text-center">Our Philosophy</h2>
            <Pillars />
        </div>

        {/* Team Section */}
        <section className="mb-24">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl">The Visionaries</h2>
                    <p className="text-[var(--muted)] md:max-w-md mt-4 md:mt-0 text-right">
                        A collective of architects, designers, and thinkers dedicated to excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="group">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-6 bg-[#E5DDD0]">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                            <h3 className="font-serif text-2xl mb-1 group-hover:text-[var(--accent)] transition-colors">Member Name</h3>
                            <p className="text-[var(--muted)] text-sm uppercase tracking-wide">Principal Architect</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>

        <ProjectCTA />
      </main>

      <Footer />
    </div>
  );
}
