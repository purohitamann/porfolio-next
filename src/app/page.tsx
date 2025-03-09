'use client';
import Blurb from "./components/Blurb";
import Hero from "./components/Hero";
import React, { useEffect } from "react";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import Work from "./components/Work";
import Blog from "./components/Blog";

export default function Home() {
  // Handle hash navigation when page loads
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      
      if (element) {
        // Wait a bit for the page to fully render before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-white overflow-y-auto">
      <div id="about" className="h-screen">
        <Hero />
        <Blurb />
      </div>
      <div id="blog">
        <Blog />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="work">
        <Work />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}
