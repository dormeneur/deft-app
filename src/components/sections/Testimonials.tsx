"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <Section id="testimonials" bg="white">
      <Container>
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-medium text-brand-text mb-4"
          >
            {t.testi.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-brand-muted max-w-[500px] mx-auto"
          >
            {t.testi.sub}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.testi.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="bg-brand-bg rounded-2xl p-8 md:p-10 border border-brand-border/60 hover:shadow-xl hover:shadow-brand-teal/5 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col"
            >
              <Quote className="w-10 h-10 text-brand-gold/30 mb-6 group-hover:text-brand-gold/60 transition-colors" />
              
              <p className="text-[16px] text-brand-text leading-relaxed font-medium mb-10 flex-1">
                "{item.q}"
              </p>

              <div className="flex items-center gap-4 border-t border-brand-border pt-6">
                <div className="w-10 h-10 rounded-full bg-brand-teal-faint flex items-center justify-center text-brand-teal font-bold font-sans">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="text-[15px] font-bold font-sans text-brand-text">{item.name}</div>
                  <div className="text-[13px] text-brand-muted mt-0.5">{item.biz}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
