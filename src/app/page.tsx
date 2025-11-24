'use client';
import Hero from "./components/Hero";
import React, { useEffect } from "react";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import Work from "./components/Work";
import OpenSourceContribution from "./work/OpenSourceContribution";
import Blog from "./components/Blog";
import HackathonWins from "./components/HackathonWins";
import Blurb from "./components/Blurb";
import RecentHighlights from "./components/RecentHighlights";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Minimal animated background in black and grey tones */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(34,34,34,0.12) 60%, transparent 100%)',
          }}
          initial={{ scale: 1, x: 0, y: 0, opacity: 0.7 }}
          animate={{ scale: 1.08, x: 20, y: 10, opacity: 0.8 }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 80% 70%, rgba(75,85,99,0.10) 60%, transparent 100%)',
          }}
          initial={{ scale: 1, x: 0, y: 0, opacity: 0.5 }}
          animate={{ scale: 1.04, x: -15, y: -10, opacity: 0.6 }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(17,24,39,0.08) 40%, transparent 100%)',
          }}
          initial={{ scale: 1, x: 0, y: 0, opacity: 0.3 }}
          animate={{ scale: 1.1, x: 10, y: 15, opacity: 0.35 }}
          transition={{ duration: 22, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      </div>
      

      {/* About and Blurb sections restored */}
      <section id="about" className="w-full">
        <Hero />
      </section>
      <section id="blurb" className="w-full">
        <Blurb />
      </section>

      <section id="projects" className="w-full">
        <Projects />
      </section>

      <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-24">
        <div className="space-y-16">
          <Blog />
          <HackathonWins />
        </div>

        <section id="work">
          <Work />
          <OpenSourceContribution />
        </section>
      </div>

      <Footer />
    </div>
  );
}
