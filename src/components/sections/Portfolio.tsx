"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/components/providers/BookingProvider";
import { trackEvent } from "@/lib/tracking";
import Image from "next/image";

export function Portfolio({ className }: { className?: string }) {
  const { t } = useLanguage();
  const { openBooking } = useBooking();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const projects = t.portfolio.projects;
  const numProjects = projects.length;

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = numProjects - 1;
      if (nextIndex >= numProjects) nextIndex = 0;
      return nextIndex;
    });
  }, [numProjects]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate, isHovered]);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  const currentProject = projects[currentIndex];

  return (
    <Section id="portfolio" bg="muted" className={className}>
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

        <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <div className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 z-20">
            <button 
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full bg-white shadow-xl shadow-brand-teal/5 border border-brand-border flex items-center justify-center text-brand-text hover:bg-brand-teal hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 z-20">
            <button 
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full bg-white shadow-xl shadow-brand-teal/5 border border-brand-border flex items-center justify-center text-brand-text hover:bg-brand-teal hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-3xl h-[800px] md:h-[750px] lg:h-[500px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 bg-white border border-brand-border/80 shadow-xl shadow-brand-teal/5 flex flex-col lg:flex-row w-full h-full"
              >
                {/* Image / Graphic Side */}
                <div className="lg:w-[55%] bg-brand-dark p-6 md:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden min-h-[280px] lg:min-h-full">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
                  
                  {currentProject.visualType === "next" ? (
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 rounded-full bg-brand-teal/20 text-brand-gold flex items-center justify-center mb-6">
                        <Sparkles className="w-10 h-10" />
                      </div>
                      <h3 className="text-3xl font-heading font-medium text-white mb-2">{currentProject.visualData}</h3>
                    </div>
                  ) : currentProject.visualType === "image" ? (
                    <div className="relative z-10 w-full aspect-video bg-brand-dark rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
                       <Image 
                         src={currentProject.visualData}
                         alt={currentProject.name}
                         fill
                         priority
                         sizes="(max-width: 1024px) 100vw, 55vw"
                         className="object-cover object-top hover:scale-105 transition-transform duration-700"
                       />
                    </div>
                  ) : (
                    <div className="relative z-10 w-full aspect-video bg-white/5 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-sm group">
                       <div className="absolute top-0 left-0 right-0 h-12 bg-white/10 border-b border-white/5 flex items-center px-4 gap-2">
                         <div className="w-3 h-3 rounded-full bg-white/20" />
                         <div className="w-3 h-3 rounded-full bg-white/20" />
                         <div className="w-3 h-3 rounded-full bg-white/20" />
                       </div>
                       <div className="w-24 h-24 rounded-full border border-brand-gold/30 flex items-center justify-center opacity-50 group-hover:scale-110 transition-transform duration-500">
                          <div className="text-brand-gold text-2xl font-heading">{currentProject.visualData}</div>
                       </div>
                    </div>
                  )}
                </div>

                {/* Content Side */}
                <div className="lg:w-[45%] p-8 md:p-10 lg:p-12 flex flex-col justify-center flex-1">
                  <div className="inline-flex items-center gap-2 bg-brand-teal-faint text-brand-teal-dark px-3 py-1 rounded-full text-[12px] font-bold mb-6 self-start tracking-wide uppercase">
                    {currentProject.category}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-heading font-medium text-brand-text mb-4 line-clamp-1">
                    {currentProject.name}
                  </h3>
                  
                  <p className="text-[16px] text-brand-muted leading-relaxed mb-8 line-clamp-3">
                    {currentProject.desc}
                  </p>

                  <ul className="space-y-4 mb-10">
                    {currentProject.stats.map((stat: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0" />
                        <span className="text-[15px] font-medium text-brand-text">{stat}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => {
                      if (currentProject.visualType === "next") {
                        trackEvent('cta_click', { button: 'portfolio_next_book' });
                        openBooking();
                      } else if (currentProject.href) {
                        window.open(currentProject.href, "_blank");
                      } else {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="bg-brand-dark hover:bg-brand-text text-white font-medium h-12 px-6 rounded-xl w-fit flex items-center gap-2 group mt-auto"
                  >
                    {currentProject.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-brand-teal w-8" : "bg-brand-border hover:bg-brand-muted"}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
