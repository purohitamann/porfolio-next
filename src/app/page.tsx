
import Blurb from "./components/Blurb";
import Hero from "./components/Hero";

import Footer from "./components/Footer";

import Projects from "./components/Projects";
import Work from "./components/Work";
import Blog from "./components/Blog";
import HoverFrame from "./components/HoverFrame";
export default function Home() {
  return (
    <div className="h-screen w-screen bg-white ">
      {/* https://www.framer.com/marketplace/templates/olio/
      {/* https://www.framer.com/marketplace/templates/clientele/ */}
      {/* https://www.framer.com/marketplace/templates/jane/ */}
      {/* https://www.framer.com/marketplace/templates/cohesion/ */}
      {/* https://floating-ui.com/docs/offset */}

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
