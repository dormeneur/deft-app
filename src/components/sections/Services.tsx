"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Utensils, Scissors, Shirt, Store, ShoppingCart, Database } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ReactNode> = {
  Utensils: <Utensils className="w-6 h-6" />,
  Scissors: <Scissors className="w-6 h-6" />,
  Shirt: <Shirt className="w-6 h-6" />,
  Store: <Store className="w-6 h-6" />,
  ShoppingCart: <ShoppingCart className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
};

/** Card width as a fraction of the container (leaves a peek of the next card) */
const CARD_WIDTH_FRACTION = 0.82;
const AUTO_SCROLL_INTERVAL = 2800; // ms between auto-advances

export function Services({ className }: { className?: string }) {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const isPausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const itemCount = t.services.items.length;

  // Scroll to a specific card index
  const scrollToIndex = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * CARD_WIDTH_FRACTION;
    const gap = 12; // gap-3 = 12px
    el.scrollTo({ left: idx * (cardWidth + gap), behavior: "smooth" });
    setActiveIdx(idx);
  }, []);

  // Auto-advance
  useEffect(() => {
    const start = () => {
      timerRef.current = setInterval(() => {
        if (isPausedRef.current) return;
        setActiveIdx((prev) => {
          const next = (prev + 1) % itemCount;
          scrollToIndex(next);
          return next;
        });
      }, AUTO_SCROLL_INTERVAL);
    };
    start();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [itemCount, scrollToIndex]);

  // Sync active dot when user manually scrolls
  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * CARD_WIDTH_FRACTION;
    const gap = 12;
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIdx(idx);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Section id="services" bg="muted" className={className}>
      <Container>
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-medium text-brand-text mb-4"
          >
            {t.services.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[17px] text-brand-muted max-w-[500px] mx-auto"
          >
            {t.services.sub}
          </motion.p>
        </div>

        {/* ── DESKTOP: regular grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {t.services.items.map((srv, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 border border-brand-border/80 hover:border-brand-teal/30 hover:shadow-xl hover:shadow-brand-teal/5 transition-all duration-300 group cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-brand-teal-faint text-brand-teal flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-teal group-hover:text-white transition-all duration-300">
                {iconMap[srv.icon]}
              </div>
              <h3 className="text-xl font-bold font-sans text-brand-text mb-3">{srv.title}</h3>
              <p className="text-[15px] text-brand-muted leading-relaxed">{srv.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── MOBILE: horizontal scroll carousel ── */}
        <div className="md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {/* Track */}
            <div
              ref={scrollRef}
              onScroll={onScroll}
              onPointerDown={() => { isPausedRef.current = true; }}
              onPointerUp={() => {
                // Resume auto-scroll after a short rest
                setTimeout(() => { isPausedRef.current = false; }, 1800);
              }}
              // px-4 gives edge padding; scroll-px-4 aligns snap to that same offset
              className="flex gap-3 overflow-x-auto scroll-smooth scroll-px-4 px-4 -mx-4 pb-2 snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {t.services.items.map((srv, idx) => (
                <div
                  key={idx}
                  // Each card takes ~82% of viewport width so the next peeks through
                  className="snap-start shrink-0 bg-white rounded-2xl p-6 border border-brand-border/80 cursor-default"
                  style={{ width: `${CARD_WIDTH_FRACTION * 100}%` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-teal-faint text-brand-teal flex items-center justify-center mb-4">
                    {iconMap[srv.icon]}
                  </div>
                  <h3 className="text-lg font-bold font-sans text-brand-text mb-2">{srv.title}</h3>
                  <p className="text-[14px] text-brand-muted leading-relaxed">{srv.desc}</p>
                </div>
              ))}
              {/* Trailing spacer so the last card can fully snap into view */}
              <div className="shrink-0 w-4" aria-hidden />
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-1.5 mt-4" role="tablist" aria-label="Service cards">
              {t.services.items.map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={idx === activeIdx}
                  aria-label={`Go to card ${idx + 1}`}
                  onClick={() => {
                    isPausedRef.current = true;
                    scrollToIndex(idx);
                    setTimeout(() => { isPausedRef.current = false; }, 1800);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIdx
                      ? "w-5 bg-brand-teal"
                      : "w-1.5 bg-brand-border"
                    }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
