import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingContact } from "@/components/ui/FloatingContact";

export const metadata = {
  title: "Pricing",
  description: "Three plans from ฿2,000 upfront. See a free demo of your site before you choose.",
};

export default function PricingPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <Pricing headingAs="h1" className="pt-32 pb-20 md:pt-40 md:pb-28" />
      <FinalCTA />
      <Footer />
      <FloatingContact />
    </main>
  );
}
