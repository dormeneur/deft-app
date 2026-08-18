"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { useBooking } from "@/components/providers/BookingProvider";
import { track } from "@/lib/tracking";
import { ArrowRight } from "lucide-react";

export function Services({ className }: { className?: string }) {
  const { t } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <Section id="services" className={className}>
      <Container>

        <h2 className="section-headline mb-14">Services</h2>

        {/* Unio-style: service name left (bold), outcome right (muted), separator between */}
        <div className="divide-y divide-brand-border">
          {t.services.items.map((srv, idx) => (
            <div key={idx} className="group grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
              <h3 className="text-[22px] md:text-[26px] font-bold text-brand-text group-hover:text-brand-teal transition-colors">
                {srv.title}
              </h3>
              <div className="md:pl-8">
                <p className="text-[15px] text-brand-muted leading-relaxed">{srv.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-brand-border">
          <button
            onClick={() => { track.ctaClick("services_book_demo", "unknown"); openBooking("unknown"); }}
            className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-text text-[15px] font-bold transition-colors group"
          >
            Book an intro call to discuss your project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </Container>
    </Section>
  );
}
