"use client";

import { useBooking } from "@/components/providers/BookingProvider";
import { track } from "@/lib/tracking";
import Link from "next/link";

export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="hero" className="bg-black pt-16">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
        <div className="pt-16 pb-10 md:pt-24 md:pb-14">

          {/* Headline — both lines white, wide enough to break in 2 lines */}
          <h1 className="display-headline mb-5 max-w-[860px]">
            We help Bangkok businesses<br />
            get more customers online
          </h1>

          {/* Sub — one line on desktop, max-w wide enough to stay 2 lines */}
          <p className="text-[16px] md:text-[17px] text-[#999] max-w-[620px] leading-relaxed mb-8">
            We design and build websites, booking systems, and digital tools that drive
            sales and qualified leads — without a full in-house team.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
            <button
              onClick={() => { track.ctaClick("hero_book_demo", "hero"); openBooking("hero"); }}
              className="btn-wipe inline-flex items-center justify-center bg-brand-teal text-black font-bold text-[15px] h-12 px-8 rounded-full glow-teal"
            >
              Book an Intro Call
            </button>
            <Link
              href="/work"
              className="btn-wipe btn-wipe-light inline-flex items-center justify-center bg-[#1A1A1A] text-white font-semibold text-[15px] h-12 px-8 rounded-full"
            >
              View Case Studies
            </Link>
          </div>

          {/* Trust line */}
          <p className="text-[13px] text-[#555]">
            Trusted by Bangkok businesses · Emporium Tailors · 3× more booking inquiries after launch
          </p>
        </div>
      </div>
    </section>
  );
}
