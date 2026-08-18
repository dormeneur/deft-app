import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FounderSnippet } from "@/components/sections/FounderSnippet";
import { About } from "@/components/sections/About";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingContact } from "@/components/ui/FloatingContact";

export const metadata = {
  title: "About",
  description: "Who's behind Deft, and what the studio actually does — a small Bangkok team that ships websites, not an agency that bills for meetings.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <FounderSnippet className="pt-32 pb-20 md:pt-40 md:pb-28" />
      <About />
      <FinalCTA />
      <Footer />
      <FloatingContact />
    </main>
  );
}
