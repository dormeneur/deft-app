import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FloatingContact } from "@/components/ui/FloatingContact";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Deft for a free consultation. Book a call, send us a message, or reach out directly via WhatsApp or LINE.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <Contact className="pt-32 pb-20 md:pt-40 md:pb-28" />
      <About />
      <FinalCTA />
      <Footer />
      <FloatingContact />
    </main>
  );
}
