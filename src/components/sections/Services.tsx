"use client";

import type { MouseEvent } from "react";
import { Asterisk } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// A thick, fast ticker of everything Deft builds. The list is rendered twice
// so the -50% loop is seamless; the second copy is hidden from screen readers.

// Hover slows the band rather than stopping it. playbackRate keeps the track
// where it is — changing animation-duration in CSS would make it jump.
const setSpeed = (rate: number) => (e: MouseEvent<HTMLElement>) => {
  e.currentTarget.getAnimations({ subtree: true }).forEach((a) => { a.playbackRate = rate; });
};

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" aria-labelledby="services-title" onMouseEnter={setSpeed(0.3)}
      onMouseLeave={setSpeed(1)}
      className="bg-brand-bg border-t border-brand-border overflow-hidden py-6 md:py-9"
    >
      <h2 id="services-title" className="sr-only">{t.services.title}</h2>

      <div className="ticker">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {t.services.items.map((srv) => (
              <li
                key={srv.title}
                className="flex items-center whitespace-nowrap font-heading font-medium tracking-tight text-white text-[clamp(2rem,4.6vw,3.75rem)] leading-none"
              >
                {srv.title}
                <Asterisk aria-hidden="true" className="mx-5 md:mx-8 size-[0.7em] shrink-0 text-brand-teal" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
