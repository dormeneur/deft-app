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
      toast.success("Payment received! We'll be in touch within 24 hours. 🎉");
      window.history.replaceState({}, "", "/pricing");
    }
  }, [searchParams]);
  return null;
}

// ponytail: 3 simple dark cards, ONE centered CTA at bottom — exactly Unio's layout
export function Pricing({ className }: { className?: string }) {
  const { lang } = useLanguage();
  const { openBooking } = useBooking();

  const handleCTA = () => {
    track.ctaClick("pricing_book_demo", "pricing");
    openBooking("pricing");
  };

  return (
    <Section id="pricing" className={className}>
      <Suspense fallback={null}><PaymentSuccessToast /></Suspense>
      <Container>

        <h2 className="section-headline mb-4">Plans</h2>
        <p className="text-[16px] text-[#999] max-w-[560px] mb-14">
          The demo is free. If you approve it, the upfront fee is due before we build the full site.
        </p>

        {/* 3 cards — transparent body, darker header, outline border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {PRICING.plans.map((plan) => {
            const p = plan[lang];
            return (
              <div
                key={plan.id}
                className="border border-[#222] rounded-2xl overflow-hidden flex flex-col"
              >
                {/* Header — darker block, matches Unio */}
                <div className="bg-[#141414] px-6 pt-6 pb-5">
                  <h3 className="text-[17px] font-bold text-white mb-1.5">
                    {p.name}
                    {plan.id === "starter" && (
                      <span className="ml-2 align-middle rounded-full bg-brand-teal-faint px-2 py-0.5 text-[12px] font-semibold text-brand-teal">Most owners start here</span>
                    )}
                  </h3>
                  <p className="text-[14px] text-[#999] leading-relaxed">{p.tagline}</p>
                </div>

                {/* Body — transparent (bg-black), just the outline of the card */}
                <div className="bg-black px-6 pt-5 pb-6 flex-1 flex flex-col">
                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-0.5">
                    <span className="text-[24px] font-black text-white leading-none">{p.upfront}</span>
                    <span className="text-[14px] text-[#999]">upfront</span>
                  </div>
                  <p className="text-[14px] text-[#999] mb-5">{p.monthly} / month</p>

                  {/* Features */}
                  <ul className="space-y-2.5 flex-1">
                    {p.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                        <span className="text-[14px] text-[#b0b0b0]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleCTA}
                    className="btn-wipe btn-wipe-teal mt-6 inline-flex h-11 items-center justify-center rounded-full border border-[#333] bg-[#111] px-6 text-[14px] font-semibold text-white"
                  >
                    Book a call about this plan
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ONE centered CTA — Unio's exact pattern */}
        <div className="text-center pt-2 pb-2">
          <p className="text-[15px] text-brand-muted mb-6">
            Let&apos;s see how we can fix the issues holding your business back from more customers.
          </p>
          <button
            onClick={handleCTA}
            className="btn-wipe inline-flex items-center justify-center bg-brand-teal text-black h-12 px-9 rounded-full font-bold text-[15px] glow-teal"
          >
            Book a free 30-min call
          </button>
        </div>
      </Container>
    </Section>
  );
}
