"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Container } from "@/components/ui/layout-wrappers";

// The ad, shown as a framed 16:9 player right under the hero. It plays only
// while on screen, never under reduced motion, and has a real pause control
// (an autoplaying loop longer than 5s needs one). If the file never loads the
// frame still reads as intentional: the poster frame shows, and behind it the
// wordmark on the surface colour, so there is no black hole and no layout jump.
export function Film() {
  const ref = useRef<HTMLVideoElement>(null);
  const heldByUser = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !heldByUser.current && !calm.matches) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { heldByUser.current = false; v.play().catch(() => {}); }
    else { heldByUser.current = true; v.pause(); }
  };

  return (
    <section id="film" aria-label="Deft in 45 seconds" className="bg-black pb-14 md:pb-16">
      <Container>
        <div className="relative isolate aspect-video overflow-hidden rounded-lg border border-brand-border bg-brand-surface">
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 flex items-center justify-center font-heading text-[clamp(3rem,10vw,7rem)] font-semibold tracking-tight text-white/10"
          >
            Deft<span className="text-brand-teal/40">.</span>
          </span>

          <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.webp"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label="A 45-second film: questions about a business turn into live websites, software, AI features and automations."
          >
            <source src="/hero-720.mp4" type="video/mp4" media="(max-width: 767px)" />
            <source src="/hero-1080.mp4" type="video/mp4" />
          </video>

          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause film" : "Play film"}
            className="absolute left-4 bottom-4 md:left-6 md:bottom-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-brand-teal hover:text-black focus-visible:outline-2 focus-visible:outline-brand-teal"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4 translate-x-px" />}
          </button>
        </div>

        <p className="mt-4 text-[15px] text-brand-subtle">
          Deft in 45 seconds: a question, an answer, and the site it becomes.
        </p>
      </Container>
    </section>
  );
}
