import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Pricing } from "@/components/sections/Pricing";
import { Contact } from "@/components/sections/Contact";
import { FloatingContact } from "@/components/ui/FloatingContact";

export const metadata = {
  title: "Pricing",
  description: "Simple, honest pricing for premium web design in Bangkok.",
};

export default function PricingPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <Pricing className="pt-32" />
      <Contact />
      <Footer />
      <FloatingContact />
    </main>
  );
}
