"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { useBooking } from "@/components/providers/BookingProvider";
import { track } from "@/lib/tracking";
import { ArrowRight, ChevronDown } from "lucide-react";

// ponytail: only mobile needs the collapse — desktop's 2-col grid is already
// short. A max-h + fade mask hides items 3+ instead of slicing the array, so
// the full list stays in the DOM (SEO, no layout jump) and only the visual
// height changes at md.
const COLLAPSED_MAX_H = "22rem";

export function Services({ className }: { className?: string }) {
  const { t } = useLanguage();
  const { openBooking } = useBooking();
  const [expanded, setExpanded] = useState(false);

  return (
    <Section id="services" className={className}>
      <Container>

        <h2 className="section-headline mb-14">Services</h2>

        {/* Unio-style: service name left (bold), outcome right (muted), separator between */}
        <div className="relative">
          <div
            className="divide-y divide-brand-border overflow-hidden md:!max-h-none transition-[max-height] duration-500 ease-in-out"
            style={{ maxHeight: expanded ? "2000px" : COLLAPSED_MAX_H }}
          >
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

          {/* Fade + "show all" — mobile only, hidden once expanded */}
          {!expanded && (
            <div className="md:hidden absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-bg via-brand-bg/90 to-transparent flex items-end justify-center pb-1">
              <button
                onClick={() => setExpanded(true)}
                className="inline-flex items-center gap-1.5 text-brand-teal text-[14px] font-bold"
              >
                Show all services
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
