"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { CONTENT } from "@/data/content";

type Project = (typeof CONTENT.en.portfolio.projects)[number];

const PROJECTS = CONTENT.en.portfolio.projects as Project[];
const AUTOPLAY_MS = 6000;

const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 420 : -420, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -420 : 420, opacity: 0 }),
};

function Visual({ project }: { project: Project }) {
  if (project.visualType === "image") {
    return (
      <Image
        src={project.visualData}
        alt={project.name}
        fill
        priority
        sizes="(max-width: 1280px) 100vw, 60vw"
        className="object-cover object-top"
      />
    );
  }

  const isNext = project.visualType === "next";
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
      {isNext && <Sparkles className="w-10 h-10 text-brand-teal mb-4" />}
      <span className={isNext ? "text-[20px] font-bold text-white" : "text-[56px] font-black tracking-tight text-white leading-none"}>
        {project.visualData}
      </span>
      {!isNext && (
        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#555] mt-4">
          Private client system
        </span>
      )}
    </div>
  );
}

export function Portfolio({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + PROJECTS.length) % PROJECTS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [go, paused]);

  const project = PROJECTS[index];
  const href = project.href ?? "#book-calendar";

  return (
    <Section id="portfolio" className={className}>
      <Container>
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#555] mb-6">
          Case Studies
        </div>
        <h2 className="section-headline mb-4 max-w-[620px]">{CONTENT.en.portfolio.title}</h2>
        <p className="text-[17px] text-brand-muted max-w-[560px] mb-12">{CONTENT.en.portfolio.sub}</p>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Screenshots are ~2:1 (a browser window), so the visual keeps that
              ratio at every width and is centred in the panel — the old
              full-height panel was ~1.6:1 and cropped a quarter off the sides. */}
          <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-brand-surface min-h-[560px] sm:min-h-[620px] xl:min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={project.id}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 260, damping: 30 }, opacity: { duration: 0.2 } }}
                className="flex flex-col xl:flex-row xl:items-center xl:absolute xl:inset-0"
              >
                {/* Visual — always 2:1, never stretched to fill */}
                <div className="relative w-full xl:w-[60%] aspect-[2/1] bg-[#0c0c0c] overflow-hidden shrink-0">
                  <Visual project={project} />
                </div>

                {/* Copy */}
                <div className="xl:w-[40%] p-8 md:p-10 flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-teal mb-3">
                    {project.category}
                  </span>

                  <h3 className="text-[26px] md:text-[30px] font-bold text-white leading-tight mb-4">
                    {project.name}
                  </h3>

                  <p className="text-[15px] text-brand-muted leading-relaxed mb-6">
                    {project.desc}
                  </p>

                  <ul className="flex flex-wrap gap-2 mb-8">
                    {project.stats.map((stat) => (
                      <li
                        key={stat}
                        className="text-[11px] font-semibold text-[#888] border border-brand-border rounded-full px-3 py-1.5"
                      >
                        {stat}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={href}
                    {...(project.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="btn-wipe inline-flex items-center gap-2 self-start bg-brand-teal text-black font-bold text-[14px] h-11 px-6 rounded-full glow-teal"
                  >
                    {project.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  aria-label={`Show ${p.name}`}
                  aria-current={i === index}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-brand-teal" : "w-2.5 bg-brand-border hover:bg-[#444]"}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous project"
                className="w-11 h-11 rounded-full border border-brand-border bg-brand-surface text-white flex items-center justify-center transition-colors hover:bg-brand-teal hover:text-black hover:border-brand-teal"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next project"
                className="w-11 h-11 rounded-full border border-brand-border bg-brand-surface text-white flex items-center justify-center transition-colors hover:bg-brand-teal hover:text-black hover:border-brand-teal"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
