"use client";

import { useEffect, Suspense } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Check } from "lucide-react";
import { PRICING } from "@/data/pricing";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useBooking } from "@/components/providers/BookingProvider";
import { track } from "@/lib/tracking";

function PaymentSuccessToast() {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("status") === "success") {
      toast.success("Payment received. We'll be in touch within 24 hours.");
      window.history.replaceState({}, "", "/pricing");
    }
  }, [searchParams]);
  return null;
}

// Three plans side by side on one ruled row, and a single CTA underneath —
// the decision is "talk to us", not "pick a tier and check out".
export function Pricing({ className, headingAs: Heading = "h2" }: { className?: string; headingAs?: "h1" | "h2" }) {
  const { lang } = useLanguage();
  const { openBooking } = useBooking();
  const labels = PRICING[lang];

  const handleCTA = () => {
    track.ctaClick("pricing_book_demo", "pricing");
    openBooking("pricing");
  };

  return (
    <Section id="pricing" variant={Heading === "h1" ? "base" : "divide"} className={className}>
      <Suspense fallback={null}><PaymentSuccessToast /></Suspense>
      <Container>

        <Heading className={Heading === "h1" ? "display-headline" : "section-headline"}>Pricing</Heading>
        <p className="mt-4 text-[17px] text-brand-muted max-w-[34rem] leading-relaxed">{labels.subtitle}</p>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 border-t border-brand-border">
          {PRICING.plans.map((plan) => {
            const p = plan[lang];
            return (
              <div
                key={plan.id}
                className="py-9 md:py-10 md:px-8 md:first:pl-0 md:last:pr-0 border-b border-brand-border md:border-b-0 md:border-l md:first:border-l-0"
              >
                <h3 className="font-heading text-[22px] font-semibold text-white tracking-tight">{p.name}</h3>
                <p className="mt-2 text-[15px] text-brand-muted leading-relaxed md:min-h-[3rem]">{p.tagline}</p>

                <p className="mt-7 flex items-baseline gap-2">
                  <span className="font-heading text-[44px] font-semibold text-white leading-none tracking-tight tabular-nums">
                    {p.upfront}
                  </span>
                  <span className="text-[14px] text-brand-subtle">{labels.upfrontLabel}</span>
                </p>
                <p className="mt-2 text-[15px] text-brand-muted tabular-nums">
                  then {p.monthly} {labels.monthLabel}
                </p>

                <ul className="mt-8 space-y-3">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-[15px] text-brand-muted">
                      <Check className="w-4 h-4 text-brand-teal shrink-0 mt-[3px]" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="md:border-t border-brand-border pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-[17px] text-white max-w-[34rem]">{labels.bookDemoLabel}</p>
          <button onClick={handleCTA} className="btn-wipe btn-primary shrink-0 self-start">
            Book an intro call
          </button>
        </div>
      </Container>
    </Section>
  );
}
