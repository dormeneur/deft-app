"use client";

import { Container } from "@/components/ui/layout-wrappers";
import { useBooking } from "@/components/providers/BookingProvider";
import { track } from "@/lib/tracking";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Copy, Check } from "lucide-react";
import { SocialLinks } from "@/components/ui/SocialLinks";

const EMAIL = "work.adityabharti@gmail.com";

export function Footer() {
  const { openBooking } = useBooking();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      toast.success("Email copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(`Copy failed — ${EMAIL}`);
    }
  };

  return (
    <footer className="bg-black border-t border-[#1f1f1f]">
      <Container className="pt-16 pb-10">

        {/* Contact left, urgency CTA right — nav lives in the navbar menu now */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">

          <div>
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy email address ${EMAIL}`}
              className="group flex items-center gap-2.5 mb-6"
            >
              <Mail className="w-[18px] h-[18px] text-brand-teal shrink-0" />
              <span className="text-[15px] font-medium text-white group-hover:text-brand-teal transition-colors">
                {EMAIL}
              </span>
              {copied
                ? <Check className="w-4 h-4 text-brand-teal shrink-0" />
                : <Copy className="w-4 h-4 text-[#555] group-hover:text-brand-teal transition-colors shrink-0" />}
            </button>

            <SocialLinks />
          </div>

          <div className="lg:text-right lg:max-w-[380px]">
            <p className="text-[26px] md:text-[30px] font-bold text-white leading-tight mb-4">
              Be quick!<br />The spots are almost gone
            </p>
            <button
              onClick={() => { track.ctaClick("footer_book_demo", "final_cta"); openBooking("final_cta"); }}
              className="text-[14px] font-semibold text-brand-teal hover:text-white underline underline-offset-4 transition-colors"
            >
              Book a Free Demo
            </button>
          </div>
        </div>
      </Container>

      {/* Bottom bar: border ties it to the block above; same horizontal
          padding as Container so the wordmark and copyright line up with the
          content above instead of floating at a different inset. */}
      <div className="border-t border-brand-border">
        <div className="flex items-end justify-between overflow-hidden leading-none px-6 md:px-10 pt-6">
          {/* Wordmark */}
          <p
            className="font-heading font-semibold text-[#111] select-none pointer-events-none shrink-0"
            style={{ fontSize: "clamp(6rem, 24vw, 20rem)", letterSpacing: "-0.03em", lineHeight: "0.85" }}
            aria-hidden="true"
          >
            Deft
          </p>

          {/* Copyright — muted so it reads as fine print, not a headline */}
          <span className="text-[13px] font-medium text-[#555] pb-4 shrink-0">
            ©2026 · Design by Aditya Bharti
          </span>
        </div>
      </div>
    </footer>
  );
}
