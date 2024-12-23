'use client';
import Blurb from "./components/Blurb";
import Hero from "./components/Hero";
import React from "react";
import Footer from "./components/Footer";

import Projects from "./components/Projects";
import Work from "./components/Work";
import Blog from "./components/Blog";
import { motion } from "framer-motion";

export default function Home() {

  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);


  return (
    <div className="h-screen w-screen bg-white">
      <motion.div
        className="h-10 w-10 z-50 shadow-lg bg-gradient-to-br rounded-full from-[#2b3719] to-[#EAFBFC]   pointer-events-none"
        style={{

          // Center the circle on the cursor
        }}
        animate={{
          x: mouse.x - 16,
          y: mouse.y - 16,
        }}

      ></motion.div>
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
