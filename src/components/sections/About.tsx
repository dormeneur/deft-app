"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { GraduationCap, MapPin, Zap, Store } from "lucide-react";
import { motion } from "framer-motion";

export function About({ className }: { className?: string }) {
  const { t } = useLanguage();

  const detailsIcons = [
    <GraduationCap key="1" className="w-5 h-5 text-brand-teal" />,
    <MapPin key="2" className="w-5 h-5 text-brand-teal" />,
    <Zap key="3" className="w-5 h-5 text-brand-teal" />,
    <Store key="4" className="w-5 h-5 text-brand-teal" />
  ];

  return (
    <Section id="about" bg="white" className={className}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Story Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-brand-text mb-8">
              {t.about.title}
            </h2>
            <div className="space-y-6 text-[16px] text-brand-muted leading-relaxed mb-10">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {t.about.tags.map((tag, idx) => (
                <div key={idx} className="bg-brand-teal-faint text-brand-teal-dark px-4 py-2 rounded-full text-[13px] font-bold tracking-wide">
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Founder Card Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-brand-bg rounded-3xl p-8 md:p-12 border border-brand-border/80 shadow-2xl shadow-brand-border/30 relative"
          >
            <div className="w-16 h-16 rounded-full bg-brand-teal text-white flex items-center justify-center text-2xl font-bold font-heading mb-6 shadow-lg shadow-brand-teal/20">
              {t.about.founder.charAt(0)}
            </div>
            
            <h3 className="text-2xl font-bold font-sans text-brand-text mb-1">
              {t.about.founder}
            </h3>
            <div className="text-[14px] text-brand-teal font-bold mb-8 uppercase tracking-wide">
              {t.about.founderRole}
            </div>

            <ul className="space-y-5">
              {t.about.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-0.5 bg-white p-2 rounded-lg shadow-sm border border-brand-border/50">
                    {detailsIcons[idx]}
                  </div>
                  <span className="text-[15px] text-brand-text leading-relaxed mt-1">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
