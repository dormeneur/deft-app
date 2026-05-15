import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VideoDemo } from "@/components/sections/VideoDemo";
import { Testimonials } from "@/components/sections/Testimonials";
import { Portfolio } from "@/components/sections/Portfolio";
import { FloatingContact } from "@/components/ui/FloatingContact";

export const metadata = {
  title: "Our Work",
  description: "See how Deft transforms Thai businesses with premium web design. Featured case studies and demo videos.",
};

export default function WorkPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Navbar />
      <Portfolio />
      <VideoDemo className="pt-32" />
      <Testimonials />
      <Footer />
      <FloatingContact />
    </main>
  );
}
