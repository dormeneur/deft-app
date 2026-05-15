"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function Portfolio() {
  const { t } = useLanguage();

  return (
    <Section id="portfolio" bg="muted">
      <Container>
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-medium text-brand-text mb-4"
          >
            {t.portfolio.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-brand-muted max-w-[500px] mx-auto"
          >
            {t.portfolio.sub}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl overflow-hidden border border-brand-border/80 shadow-xl shadow-brand-teal/5 flex flex-col lg:flex-row"
        >
          {/* Image Placeholder Side */}
          <div className="lg:w-1/2 bg-brand-dark p-8 md:p-12 flex flex-col justify-center relative overflow-hidden min-h-[300px] lg:min-h-0">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10 w-full aspect-[4/3] bg-white/5 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-sm group">
               {/* Abstract geometric representation of a tailor site */}
               <div className="absolute top-0 left-0 right-0 h-12 bg-white/10 border-b border-white/5 flex items-center px-4 gap-2">
                 <div className="w-3 h-3 rounded-full bg-white/20" />
                 <div className="w-3 h-3 rounded-full bg-white/20" />
                 <div className="w-3 h-3 rounded-full bg-white/20" />
               </div>
               <div className="w-24 h-24 rounded-full border border-brand-gold/30 flex items-center justify-center opacity-50 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-brand-gold text-2xl font-heading">ET</div>
               </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-brand-teal-faint text-brand-teal-dark px-3 py-1 rounded-full text-[12px] font-bold mb-6 self-start tracking-wide uppercase">
              Web Design & SEO
            </div>
            
            <h3 className="text-3xl md:text-4xl font-heading font-medium text-brand-text mb-4">
              {t.portfolio.project.name}
            </h3>
            
            <p className="text-[16px] text-brand-muted leading-relaxed mb-8">
              {t.portfolio.project.desc}
            </p>

            <ul className="space-y-4 mb-10">
              {t.portfolio.project.stats.map((stat, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-teal" />
                  <span className="text-[15px] font-medium text-brand-text">{stat}</span>
                </li>
              ))}
            </ul>

            <Button
              className="bg-brand-dark hover:bg-brand-text text-white font-medium h-12 px-6 rounded-xl w-fit flex items-center gap-2 group"
            >
              {t.portfolio.project.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
