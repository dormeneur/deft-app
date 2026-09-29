import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Portfolio } from "@/components/sections/Portfolio";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingContact } from "@/components/ui/FloatingContact";

export const metadata = {
  title: "Our Work",
  description: "See how Deft transforms Thai businesses with premium web design. Featured case studies and demo videos.",
};

export default function WorkPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <Portfolio className="pt-32 pb-20 md:pt-40 md:pb-28" />
      <FinalCTA />
      <Footer />
      <FloatingContact />
    </main>
  );
}
