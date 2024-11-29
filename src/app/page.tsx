import { Separator } from "@/components/ui/separator";
import Blurb from "./components/Blurb";
import Hero from "./components/Hero";
import SectionWrapper from "./components/SectionWrapper";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <div className="h-screen w-screen bg-white ">
      {/* https://www.framer.com/marketplace/templates/olio/ */}
      {/* https://www.framer.com/marketplace/templates/clientele/ */}
      {/* https://www.framer.com/marketplace/templates/jane/ */}
      {/* https://www.framer.com/marketplace/templates/cohesion/ */}
      {/* https://floating-ui.com/docs/offset */}

      <Hero />
      <Blurb />
      {/* <SectionWrapper title="Projects" >
        <div className="h-3/4 w-screen flex flex-col justify-center items-center text-black font-sans font-medium">
        </div>
      </SectionWrapper>
      <SectionWrapper title="Work" >
        <div className="h-3/4 w-screen flex flex-col justify-center items-center text-black font-sans font-medium">
        </div>
      </SectionWrapper>
      <SectionWrapper title="Blog" >
        <div className="h-3/4 w-screen flex flex-col justify-center items-center text-black font-sans font-medium">
        </div>
      </SectionWrapper> */}
      <div>
        <Footer />
      </div>



    </div>
  );
}
