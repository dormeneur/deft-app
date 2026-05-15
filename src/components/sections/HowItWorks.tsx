"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { motion } from "framer-motion";

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <Section id="how" bg="white">
      <Container>
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-medium text-brand-text mb-4"
          >
            {t.how.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-brand-muted max-w-[500px] mx-auto"
          >
            {t.how.sub}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Timeline Line Desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] bg-brand-border/80 -z-10" />

          {t.how.steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="flex flex-col relative group"
            >
              <div className="text-[80px] leading-none font-bold font-sans text-brand-teal-faint/60 group-hover:text-brand-teal/10 transition-colors mb-4 -ml-2 select-none">
                {step.n}
              </div>
              <h3 className="text-2xl font-bold font-sans text-brand-text mb-3">{step.title}</h3>
              <p className="text-[16px] text-brand-muted leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
