"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DEMO_VIDEO_SRC = "/demo.mp4";

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
          className="w-full max-w-[860px] aspect-video bg-[#0E1918] rounded-2xl overflow-hidden relative shadow-2xl border border-brand-border/50"
        >
          <video
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
          >
            <source src={DEMO_VIDEO_SRC} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </Container>
    </Section>
  );
}
