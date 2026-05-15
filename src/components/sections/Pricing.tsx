"use client";

import React, { useEffect, Suspense } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PRICING } from "@/data/pricing";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

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

export function Pricing({ className }: { className?: string }) {
  const { lang } = useLanguage();
  const labels = PRICING[lang];

  return (
    <Section id="pricing" bg="muted" className={className}>
      <Suspense fallback={null}>
        <PaymentSuccessToast />
      </Suspense>
      <Container>
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-medium text-brand-text mb-4"
          >
            {labels.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-brand-muted max-w-[600px] mx-auto"
          >
            {labels.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {PRICING.plans.map((plan, idx) => {
            const p = plan[lang];
            const isFeatured = plan.featured;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className={cn(
                  "relative flex flex-col h-full rounded-3xl p-8 md:p-10 border transition-all duration-300",
                  isFeatured
                    ? "bg-brand-teal text-white border-transparent shadow-2xl shadow-brand-teal/20 md:scale-105 z-10"
                    : "bg-white text-brand-text border-brand-border/80 hover:border-brand-teal/30 hover:shadow-xl"
                )}
              >
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-white text-[13px] font-bold tracking-wide py-1.5 px-4 rounded-full flex items-center gap-1.5 shadow-lg shadow-brand-gold/20">
                    <span>★</span> {labels.popularBadge}
                  </div>
                )}

                <h3 className="text-2xl font-bold font-sans mb-1">{p.name}</h3>
                <p className={cn("text-[14px] mb-8", isFeatured ? "text-white/70" : "text-brand-muted")}>
                  {p.tagline}
                </p>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl md:text-[44px] font-bold font-sans tracking-tight leading-none">
                    {p.upfront}
                  </span>
                  <span className={cn("text-[14px] font-medium", isFeatured ? "text-white/60" : "text-brand-muted")}>
                    {labels.upfrontLabel}
                  </span>
                </div>
                <div className={cn("text-[16px] font-medium mb-6", isFeatured ? "text-white/80" : "text-brand-text")}>
                  {p.monthly}{" "}
                  <span className={cn("text-[14px]", isFeatured ? "text-white/60" : "text-brand-muted")}>
                    {labels.monthLabel}
                  </span>
                </div>

                <p className={cn("text-[15px] leading-relaxed pb-8 border-b", isFeatured ? "text-white/80 border-white/15" : "text-brand-muted border-brand-border")}>
                  {p.description}
                </p>

                <ul className="py-8 space-y-4">
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check className={cn("w-5 h-5 shrink-0 mt-0.5", isFeatured ? "text-brand-gold-faint" : "text-brand-teal")} />
                      <span className={cn("text-[15px]", isFeatured ? "text-white/95" : "text-brand-text")}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.stripeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center shrink-0 w-full mt-auto h-14 text-base font-semibold rounded-xl transition-all outline-none focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50",
                    isFeatured
                      ? "bg-brand-gold hover:bg-brand-gold/90 text-white focus-visible:ring-brand-gold/50"
                      : "bg-brand-teal hover:bg-brand-teal-dark text-white focus-visible:ring-brand-teal/50"
                  )}
                >
                  {p.cta}
                </a>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
