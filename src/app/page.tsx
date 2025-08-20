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
    <div className="min-h-screen">
      <Hero />
      
      <div className="max-w-6xl mx-auto px-6 md:px-8 space-y-24">
        <Blurb />
        
        <RecentHighlights />
        
        <section id="projects">
          <Projects />
        </section>
        
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
