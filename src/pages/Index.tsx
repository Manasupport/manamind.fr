
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhyManamind } from "@/components/WhyManamind";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { ConsultationSection } from "@/components/ConsultationSection";
import { StickyNav } from "@/components/StickyNav";
import { FAQ } from "@/components/FAQ";

const Index = () => {
  return (
    <div className="min-h-screen">
      <StickyNav />
      <Hero />
      <About />
      <WhyManamind />
      <Pricing />
      <ConsultationSection />
      <FAQ />
      <Contact />
    </div>
  );
};

export default Index;
