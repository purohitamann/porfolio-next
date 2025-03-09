'use client';
import Blurb from "./components/Blurb";
import Hero from "./components/Hero";
import React from "react";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import Work from "./components/Work";
import Blog from "./components/Blog";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-white">
      <Hero />
      <Blurb />
      <Blog />
      <Projects />
      <Work />
      <div>
        <Footer />
      </div>
    </div>
  );
}
