import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingContact } from "@/components/ui/FloatingContact";

export const metadata = {
  title: "Contact",
  description: "Send Deft a message, book an intro call, or reach us on LINE or WhatsApp.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <Contact className="pt-32 pb-20 md:pt-40 md:pb-28" />
      <FinalCTA />
      <Footer />
      <FloatingContact />
    </main>
  );
}
