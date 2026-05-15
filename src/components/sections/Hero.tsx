"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useBooking } from "@/components/providers/BookingProvider";

export function Hero() {
  const { t, isEn } = useLanguage();
  const { openBooking } = useBooking();

  return (
    <Section id="hero" bg="muted" className="pt-32 pb-20 md:pt-48 md:pb-32 flex items-center text-center">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-brand-teal-faint/60 opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-brand-teal-faint/80 opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-brand-teal/20 opacity-50" />
      </div>

      <Container className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 bg-brand-teal-faint text-brand-teal-dark px-4 py-1.5 rounded-full text-[13px] font-semibold mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal inline-block" />
          {t.hero.badge}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="w-10 h-1 bg-brand-gold rounded-full mb-6"
        />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-[80px] font-heading font-medium tracking-tight text-brand-text leading-[1.1] mb-2"
        >
          {t.hero.line1}
          <br />
          <span className="text-brand-teal font-semibold">{t.hero.line2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-[17px] md:text-[19px] text-brand-muted max-w-[600px] mt-6 mb-10 leading-relaxed"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <Button
            onClick={openBooking}
            className="bg-brand-teal hover:bg-brand-teal-dark text-white font-medium h-14 px-8 text-base rounded-xl shadow-lg shadow-brand-teal/20 transition-all hover:-translate-y-0.5"
          >
            {t.hero.cta1}
          </Button>
          <Button
            onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
            variant="outline"
            className="border-2 border-brand-teal text-brand-teal hover:bg-brand-teal/5 font-medium h-14 px-8 text-base rounded-xl transition-all hover:-translate-y-0.5 bg-transparent"
          >
            {t.hero.cta2}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex justify-center gap-8 md:gap-16 flex-wrap"
        >
          {t.hero.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-3xl md:text-[34px] font-bold text-brand-teal font-sans mb-1">{stat.val}</div>
              <div className="text-[14px] text-brand-muted font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
