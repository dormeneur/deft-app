import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { VideoDemo } from "@/components/sections/VideoDemo";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { Portfolio } from "@/components/sections/Portfolio";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FloatingContact } from "@/components/ui/FloatingContact";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <Hero />
      <VideoDemo />
      <Services />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
      <FloatingContact />
    </main>
  );
}
