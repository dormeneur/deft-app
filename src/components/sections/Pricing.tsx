"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Pricing() {
  const { t } = useLanguage();

  return (
    <Section id="pricing" bg="muted">
      <Container>
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-medium text-brand-text mb-4"
          >
            {t.pricing.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-brand-muted max-w-[600px] mx-auto"
          >
            {t.pricing.sub}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {t.pricing.plans.map((plan, idx) => {
            const isFeatured = plan.featured;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className={cn(
                  "relative rounded-3xl p-8 md:p-10 border transition-all duration-300",
                  isFeatured 
                    ? "bg-brand-teal text-white border-transparent shadow-2xl shadow-brand-teal/20 md:-translate-y-4" 
                    : "bg-white text-brand-text border-brand-border/80 hover:border-brand-teal/30 hover:shadow-xl"
                )}
              >
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gold text-white text-[13px] font-bold tracking-wide py-1.5 px-4 rounded-full flex items-center gap-1.5 shadow-lg shadow-brand-gold/20">
                    <span>★</span> {t.pricing.popular}
                  </div>
                )}
                
                <h3 className="text-2xl font-bold font-sans mb-1">{plan.name}</h3>
                <p className={cn("text-[14px] mb-8", isFeatured ? "text-white/70" : "text-brand-muted")}>
                  {plan.tagline}
                </p>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl md:text-[44px] font-bold font-sans tracking-tight leading-none">{plan.up}</span>
                  <span className={cn("text-[14px] font-medium", isFeatured ? "text-white/60" : "text-brand-muted")}>
                    {t.pricing.upfront}
                  </span>
                </div>
                <div className={cn("text-[16px] font-medium mb-6", isFeatured ? "text-white/80" : "text-brand-text")}>
                  {plan.mo} <span className={cn("text-[14px]", isFeatured ? "text-white/60" : "text-brand-muted")}>{t.pricing.month}</span>
                </div>

                <p className={cn("text-[15px] leading-relaxed pb-8 border-b", isFeatured ? "text-white/80 border-white/15" : "text-brand-muted border-brand-border")}>
                  {plan.desc}
                </p>

                <ul className="py-8 space-y-4">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <Check className={cn("w-5 h-5 shrink-0 mt-0.5", isFeatured ? "text-brand-gold-faint" : "text-brand-teal")} />
                      <span className={cn("text-[15px]", isFeatured ? "text-white/95" : "text-brand-text")}>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className={cn(
                    "w-full h-14 text-base font-semibold rounded-xl transition-all shadow-none",
                    isFeatured 
                      ? "bg-brand-gold hover:bg-brand-gold/90 text-white" 
                      : "bg-brand-teal hover:bg-brand-teal-dark text-white"
                  )}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
