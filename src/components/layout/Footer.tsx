"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Copy, Check } from "lucide-react";
import { Container } from "@/components/ui/layout-wrappers";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { NAV_LINKS } from "@/components/layout/Navbar";

const EMAIL = "work.adityabharti@gmail.com";

export function Footer() {
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
    <footer className="bg-black border-t border-brand-border">
      <Container className="pt-16 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12">

          <div>
            <p className="font-heading text-[22px] font-semibold text-white leading-snug tracking-tight max-w-[340px]">
              A small Bangkok studio that builds websites and business software.
            </p>
            <SocialLinks className="mt-7" />
          </div>

          <nav aria-label="Footer">
            <ul className="-my-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="inline-block py-2 text-[15px] text-brand-muted hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-[15px] text-brand-muted leading-relaxed">
            <button
              type="button"
              onClick={copyEmail}
              aria-label={`Copy email address ${EMAIL}`}
              className="group flex items-center gap-2 py-2 -mt-2 text-white break-all text-left"
            >
              <span className="link-rule">{EMAIL}</span>
              {copied
                ? <Check className="w-4 h-4 text-brand-teal shrink-0" />
                : <Copy className="w-4 h-4 text-brand-subtle group-hover:text-brand-teal transition-colors shrink-0" />}
            </button>
            <a href="tel:+66638232303" className="inline-block py-2 hover:text-white transition-colors">+66 63 823 2303</a>
            <p className="mt-1">Bangkok, Thailand</p>
          </div>
        </div>
      </Container>

      <div className="border-t border-brand-border overflow-hidden">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 pt-6 flex flex-col-reverse sm:flex-row sm:items-end sm:justify-between gap-6 leading-none">
          <p
            className="font-heading font-bold text-[#141414] select-none pointer-events-none"
            style={{ fontSize: "clamp(6rem, 24vw, 19rem)", letterSpacing: "-0.04em", lineHeight: "0.8" }}
            aria-hidden="true"
          >
            Deft
          </p>
          <span className="text-[13px] text-brand-subtle sm:pb-5 shrink-0 sm:text-right">
            © 2026 Deft · Design by Aditya Bharti
          </span>
        </div>
      </div>
    </footer>
  );
}
