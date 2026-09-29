"use client";

import Image from "next/image";
import { useBooking } from "@/components/providers/BookingProvider";
import { track } from "@/lib/tracking";
import Link from "next/link";

export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="hero" className="bg-black pt-16">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
        <div className="grid items-center gap-10 pt-16 pb-10 md:pt-24 md:pb-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14">

          <div>
            <h1 className="display-headline mb-5 max-w-[860px] text-balance lg:!text-[3.2rem]">
              We help Bangkok businesses get more customers online
            </h1>

            <p className="text-[22px] md:text-[26px] text-brand-teal font-bold leading-tight max-w-[560px] mb-3">
              Demo first. Pay only if you love it.
            </p>

            <p className="text-[16px] md:text-[17px] text-[#999] max-w-[560px] leading-relaxed mb-8">
              We build a working demo of your website and show it to you before you pay anything.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
              <button
                onClick={() => { track.ctaClick("hero_book_demo", "hero"); openBooking("hero"); }}
                className="btn-wipe inline-flex items-center justify-center bg-brand-teal text-black font-bold text-[15px] h-12 px-8 rounded-full glow-teal"
              >
                Book a free 30-min call
              </button>
              <Link
                href="/work"
                className="btn-wipe btn-wipe-light inline-flex items-center justify-center bg-[#1A1A1A] text-white font-semibold text-[15px] h-12 px-8 rounded-full"
              >
                View Case Studies
              </Link>
            </div>

            <p className="text-[14px] text-[#999]">
              Free 30-minute call. No commitment.
            </p>
          </div>

          {/* Real client work above the fold — prove before asking */}
          <Link
            href="https://emporiumtailors.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Emporium Tailors website, built by Deft"
            className="group block rounded-2xl border border-brand-border bg-brand-surface p-2 transition-colors duration-300 hover:border-brand-teal/60"
          >
            <Image
              src="/portfolio/emporiumtailors-1200.jpg"
              alt="Emporium Tailors homepage on desktop"
              width={1200}
              height={582}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-auto w-full rounded-xl"
            />
            <span className="flex items-center justify-between px-3 pb-2 pt-3 text-[14px]">
              <span className="font-semibold text-white">Emporium Tailors · Sukhumvit</span>
              <span className="text-[#999] transition-colors group-hover:text-brand-teal">Live site ↗</span>
            </span>
          </Link>

        </div>
      </div>
    </section>
  );
}
