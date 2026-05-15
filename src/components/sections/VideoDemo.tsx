"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function VideoDemo({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <Section id="demo" bg="white" className={cn("py-24", className)}>
      <Container className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-heading font-medium text-brand-text mb-4">{t.video.title}</h2>
          <p className="text-[17px] text-brand-muted max-w-[600px] mx-auto mb-12 leading-relaxed">
            {t.video.sub}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full max-w-[860px] aspect-video bg-[#0E1918] rounded-2xl overflow-hidden relative shadow-2xl border border-brand-border/50 group cursor-pointer flex flex-col items-center justify-center"
        >
          {/* Abstract elegant placeholder inside video */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-teal-dark/40 to-transparent pointer-events-none" />
          
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-brand-teal/80 transition-all duration-300 z-10 backdrop-blur-sm">
            <Play className="w-8 h-8 text-white ml-2 opacity-90" />
          </div>
          
          <div className="text-white/40 text-[14px] italic font-medium z-10 font-sans tracking-wide">
            {t.video.placeholder}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
