"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { useBooking } from "@/components/providers/BookingProvider";
import { track } from "@/lib/tracking";
import { Container } from "@/components/ui/layout-wrappers";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

// Headline on the left, pitch and action on the right, sitting on the
// headline's baseline. The hero is kept short on purpose: the film (<Film />)
// is the visual and starts inside the first screen.
export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="hero" className="bg-black pt-16">
      <Container className="pt-12 pb-10 md:pt-16 md:pb-14">
        <h1 className="display-headline rise" style={step(0)}>
          See your new website <br className="hidden md:block" />before you pay for it.
        </h1>

        {/* Pitch left, action right, level with each other under the headline. */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-7 lg:items-center">
          <p className="rise lg:col-span-7 max-w-[36rem] text-[17px] md:text-[19px] text-brand-muted leading-relaxed text-pretty" style={step(1)}>
            Deft is a small Bangkok studio. We design and build a working
            demo of your site first. Like it, and it goes live within a
            week. If not, you owe nothing.
          </p>

          <div className="rise lg:col-span-5 lg:justify-self-end flex flex-col sm:flex-row sm:items-center gap-y-2" style={step(2)}>
            <button
              onClick={() => { track.ctaClick("hero_book_demo", "hero"); openBooking("hero"); }}
              className="btn-wipe btn-primary"
            >
              Book an intro call
            </button>

              {/* From sm up this is an outlined "nose" that cups the capsule's
                  round end and closes in a blunt rounded front. Green is kept
                  for the primary capsule; this one only floods green on
                  hover. The path is drawn for a 130×56 box: the left edge is
                  an arc concentric with the capsule end (radius 28 + 12 gap)
                  with softened corners; the top and bottom run flat to x=50,
                  then the front is a true half-ellipse. On phones the buttons
                  stack, so it falls back to a plain text link. */}
              <Link
                href="/pricing"
                className="group/pricing nose-nudge relative inline-flex items-center justify-center py-3 text-[16px] font-semibold text-white sm:text-brand-teal sm:justify-start sm:h-14 sm:w-[130px] sm:py-0 sm:pl-[24px] transition-colors duration-300 sm:hover:text-black"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 130 56"
                  className="hidden sm:block absolute inset-0 h-full w-full overflow-visible"
                >
                  {/* SVG strokes straddle the edge, which made the outlined
                      shape taller than the capsule. Clipping the path to
                      itself keeps only the inner half, so strokeWidth 6
                      shows as a 3px outline and the silhouette stays
                      exactly 56 high. */}
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
        </div>
      </Container>
    </section>
  );
}
