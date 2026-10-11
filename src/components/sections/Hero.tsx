"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useBooking } from "@/components/providers/BookingProvider";
import { track } from "@/lib/tracking";
import { Container } from "@/components/ui/layout-wrappers";
import { WorkShowcase } from "@/components/sections/Portfolio";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

// The offer is the headline, and the work sits directly under it so real
// sites are on screen before the first scroll.
export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="hero" className="bg-black pt-16">
      <Container className="pt-10 pb-20 md:pt-14 md:pb-28">

        <h1 className="display-headline rise max-w-[15ch]" style={step(0)}>
          See your new website before you pay for it.
        </h1>

        {/* One reading column: headline, pitch, action. The CTA sits right
            under the sentence it answers instead of across the page from it. */}
        <p className="rise mt-7 md:mt-9 max-w-[36rem] text-[17px] md:text-[19px] text-brand-muted leading-relaxed text-pretty" style={step(1)}>
          Deft is a small Bangkok studio. We design and build a working demo
          of your site first. Like it, and it goes live within a week. If
          not, you owe nothing.
        </p>

        <div className="rise mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center gap-y-2" style={step(2)}>
          <button
            onClick={() => { track.ctaClick("hero_book_demo", "hero"); openBooking("hero"); }}
            className="btn-wipe btn-primary"
          >
            Book an intro call
          </button>

          {/* From sm up this is an outlined "nose" that cups the capsule's round
              end and closes in a blunt rounded front. Green is kept for the
              primary capsule; this one only floods green on hover. The path is
              drawn for a 130×56 box: the left edge is an arc concentric with
              the capsule end (radius 28 + 12 gap) with softened corners; the
              top and bottom run flat to x=50, then the front is a true
              half-ellipse (80 wide, full height), so the curve is even all the
              way round. On phones the buttons stack, so it falls back to a
              plain text link. */}
          <Link
            href="/pricing"
            className="group/pricing nose-nudge relative inline-flex items-center justify-center py-3 text-[16px] font-semibold text-white sm:text-brand-teal sm:justify-start sm:h-14 sm:w-[130px] sm:py-0 sm:pl-[24px] transition-colors duration-300 sm:hover:text-black"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 130 56"
              className="hidden sm:block absolute inset-0 h-full w-full overflow-visible"
            >
              {/* SVG strokes straddle the edge, which made the outlined shape
                  taller than the capsule. Clipping the path to itself keeps
                  only the inner half, so strokeWidth 6 shows as a 3px outline
                  and the silhouette stays exactly 56 high. */}
              <defs>
                <clipPath id="pricing-nose">
                  <path d="M5.41 6 Q0.57 0 9 0 H50 C94.2 0 130 12.5 130 28 C130 43.5 94.2 56 50 56 H9 Q0.57 56 5.41 50 A40 40 0 0 0 5.41 6 Z" />
                </clipPath>
              </defs>
              <path
                d="M5.41 6 Q0.57 0 9 0 H50 C94.2 0 130 12.5 130 28 C130 43.5 94.2 56 50 56 H9 Q0.57 56 5.41 50 A40 40 0 0 0 5.41 6 Z"
                strokeWidth="6"
                clipPath="url(#pricing-nose)"
                className="fill-transparent stroke-brand-teal transition-[fill] duration-300 ease-out group-hover/pricing:fill-brand-teal"
              />
            </svg>
            <span className="relative">See pricing</span>
          </Link>
        </div>

        <div className="rise mt-14 md:mt-16" style={step(3)}>
          <WorkShowcase />
        </div>
      </Container>
    </section>
  );
}
