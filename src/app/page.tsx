import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Film } from "@/components/sections/Film";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Capabilities } from "@/components/sections/Capabilities";
import { FounderSnippet } from "@/components/sections/FounderSnippet";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { WorkShowcase } from "@/components/sections/Portfolio";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { CONTENT } from "@/data/content";

export default function Home() {
  const work = CONTENT.en.portfolio;
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <Hero />
      <Film />
      <Section id="work" variant="divide">
        <Container>
          <h2 className="section-headline">{work.title}</h2>
          <p className="mt-4 mb-12 md:mb-16 text-[17px] text-brand-muted max-w-[34rem] leading-relaxed">{work.sub}</p>
          <WorkShowcase />
        </Container>
      </Section>
      <Services />
      <Capabilities />
      <HowItWorks />
      <Pricing />
      <FounderSnippet />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingContact />
    </main>
  );
}
