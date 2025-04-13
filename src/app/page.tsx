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
    <>
      <div className="fixed inset-0 " />
      <div className="noise-overlay" />
      <div className="min-h-screen w-screen overflow-y-auto relative">
        <div id="about" className="min-h-screen">
          <Hero />
        </div>
        <div>
          <Blurb />
        </div>
        <div id="projects" className="py-20">
          <Projects />
        </div>
        <div>
          <Blog />
          <HackathonWins />
        </div>
        <div id="work" className="py-20">
          <Work />
          <OpenSourceContribution  />
        </div>
        <div id="contact">
          <Footer />
        </div>
      </div>
    </>
  );
}
