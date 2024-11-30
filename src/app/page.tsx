
import Blurb from "./components/Blurb";
import Hero from "./components/Hero";
import SectionWrapper from "./components/SectionWrapper";
import Footer from "./components/Footer";
import ScreenWrapper from "./components/ScreenWrapper";
import Projects from "./components/Projects";
import Work from "./components/Work";
import Blog from "./components/Blog";
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

      <Projects />
      <Work />
      <Blog />

      <div>
        <Footer />
      </div>



    </div>
  );
}
