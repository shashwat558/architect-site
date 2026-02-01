"use client";

import { motion } from "motion/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCTA from "../components/ProjectCTA";

export default function Contact() {
  return (
    <div className="min-h-screen relative">
      <Header />
      
      <main className="pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-[1920px] mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
        >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[var(--foreground)] mb-6 vibrate-text">
                Get in Touch
            </h1>
            <p className="text-xl text-[var(--muted)] max-w-2xl">
                We’d love to hear about your project. Whether you’re looking to build a new home, renovate an office, or just say hello.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-12"
            >
                <div className="space-y-8">
                    <div>
                        <h3 className="font-serif text-2xl mb-4 text-[var(--foreground)] vibrate-text">Visit Us</h3>
                        <address className="not-italic text-[var(--muted)] text-lg leading-relaxed">
                            AD.RS Design Studio<br/>
                            123 Arera Colony, E-7 Sector<br/>
                            Bhopal, Madhya Pradesh 462016<br/>
                            India
                        </address>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl mb-4 text-[var(--foreground)] vibrate-text">Contact</h3>
                        <p className="text-[var(--muted)] text-lg mb-2">
                           <a href="mailto:hello@adrs-studio.com" className="hover:text-[var(--accent)] transition-colors">hello@adrs-studio.com</a>
                        </p>
                        <p className="text-[var(--muted)] text-lg">
                           <a href="tel:+919876543210" className="hover:text-[var(--accent)] transition-colors">+91 987 654 3210</a>
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl mb-4 text-[var(--foreground)]">Follow</h3>
                        <ul className="text-[var(--muted)] text-lg space-y-2">
                            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Pinterest</a></li>
                        </ul>
                    </div>
                </div>

                <div className="p-8 bg-[#EDE5D8] rounded-lg">
                    <h4 className="font-serif text-xl mb-4">Careers</h4>
                    <p className="text-[var(--muted)] mb-4">
                        We are always looking for talented architects and designers. Send your portfolio to:
                    </p>
                    <a href="mailto:careers@adrs-studio.com" className="text-[var(--accent)] font-medium hover:underline">careers@adrs-studio.com</a>
                </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm uppercase tracking-wide text-[var(--muted)]">First Name</label>
                            <input 
                                type="text" 
                                id="firstName" 
                                className="w-full bg-transparent border-b border-[var(--muted)]/30 py-4 text-lg focus:outline-none focus:border-[var(--accent)] transition-colors"
                                placeholder="Jane"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm uppercase tracking-wide text-[var(--muted)]">Last Name</label>
                            <input 
                                type="text" 
                                id="lastName" 
                                className="w-full bg-transparent border-b border-[var(--muted)]/30 py-4 text-lg focus:outline-none focus:border-[var(--accent)] transition-colors"
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm uppercase tracking-wide text-[var(--muted)]">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full bg-transparent border-b border-[var(--muted)]/30 py-4 text-lg focus:outline-none focus:border-[var(--accent)] transition-colors"
                            placeholder="jane@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="scoupe" className="text-sm uppercase tracking-wide text-[var(--muted)]">Project Scope</label>
                         <select 
                            id="scope" 
                            className="w-full bg-transparent border-b border-[var(--muted)]/30 py-4 text-lg focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none"
                        >
                            <option>New Build</option>
                            <option>Renovation</option>
                            <option>Interior Design</option>
                            <option>Commercial</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm uppercase tracking-wide text-[var(--muted)]">Message</label>
                        <textarea 
                            id="message" 
                            rows={4} 
                            className="w-full bg-transparent border-b border-[var(--muted)]/30 py-4 text-lg focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                            placeholder="Tell us about your project..."
                        />
                    </div>

                    <div className="pt-8">
                        <button 
                            type="submit"
                            className="px-8 py-4 bg-[var(--foreground)] text-[#FAF6F1] rounded-full text-lg hover:bg-[var(--accent)] transition-colors duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
