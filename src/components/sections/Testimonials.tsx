"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const CARD_WIDTH_FRACTION = 0.88; // slightly wider — quotes need breathing room
const AUTO_SCROLL_INTERVAL = 3400;

export function Testimonials() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const isPausedRef = useRef(false);
  const itemCount = t.testi.items.length;

  const scrollToIndex = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * CARD_WIDTH_FRACTION;
    const gap = 12; // gap-3
    el.scrollTo({ left: idx * (cardWidth + gap), behavior: "smooth" });
    setActiveIdx(idx);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isPausedRef.current) return;
      setActiveIdx((prev) => {
        const next = (prev + 1) % itemCount;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(timer);
  }, [itemCount, scrollToIndex]);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * CARD_WIDTH_FRACTION;
    const idx = Math.round(el.scrollLeft / (cardWidth + 12));
    setActiveIdx(idx);
  }, []);

  return (
    <Section id="testimonials" bg="white">
      <Container>
        <div className="text-center mb-12 md:mb-24">
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

        {/* ── DESKTOP: 3-col grid ── */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
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
                setTimeout(() => { isPausedRef.current = false; }, 2000);
              }}
              className="flex gap-3 overflow-x-auto scroll-smooth scroll-px-4 px-4 -mx-4 pb-2 snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {t.testi.items.map((item, idx) => (
                <div
                  key={idx}
                  className="snap-start shrink-0 bg-brand-bg rounded-2xl p-6 border border-brand-border/60 flex flex-col"
                  style={{ width: `${CARD_WIDTH_FRACTION * 100}%` }}
                >
                  <Quote className="w-8 h-8 text-brand-gold/40 mb-4" />
                  <p className="text-[15px] text-brand-text leading-relaxed font-medium mb-6 flex-1">
                    "{item.q}"
                  </p>
                  <div className="flex items-center gap-3 border-t border-brand-border pt-5">
                    <div className="w-9 h-9 rounded-full bg-brand-teal-faint flex items-center justify-center text-brand-teal font-bold font-sans text-sm shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[14px] font-bold font-sans text-brand-text">{item.name}</div>
                      <div className="text-[12px] text-brand-muted mt-0.5">{item.biz}</div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Trailing spacer */}
              <div className="shrink-0 w-4" aria-hidden />
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-1.5 mt-4" role="tablist" aria-label="Testimonial cards">
              {t.testi.items.map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={idx === activeIdx}
                  aria-label={`Go to review ${idx + 1}`}
                  onClick={() => {
                    isPausedRef.current = true;
                    scrollToIndex(idx);
                    setTimeout(() => { isPausedRef.current = false; }, 2000);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIdx
                      ? "w-5 bg-brand-gold"
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
