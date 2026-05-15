"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/layout-wrappers";
import Link from "next/link";

export function Footer() {
  const { t, isEn } = useLanguage();

  return (
    <footer className="bg-brand-dark text-white/60 py-16 border-t border-white/10">
      <Container className="flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Brand */}
        <div className="flex flex-col max-w-xs">
          <Link href="/" className="font-heading font-semibold text-3xl text-white tracking-tight mb-3 hover:opacity-80 transition-opacity">
            Deft
          </Link>
          <p className="text-[15px] leading-relaxed">{t.footer.tagline}</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-1">
              {isEn ? "Pages" : "หน้า"}
            </div>
            <Link href="/" className="text-[14px] hover:text-white transition-colors">
              {isEn ? "Home" : "หน้าแรก"}
            </Link>
            <Link href="/pricing" className="text-[14px] hover:text-white transition-colors">
              {isEn ? "Pricing" : "ราคา"}
            </Link>
            <Link href="/work" className="text-[14px] hover:text-white transition-colors">
              {isEn ? "Work" : "ผลงาน"}
            </Link>
            <Link href="/contact" className="text-[14px] hover:text-white transition-colors">
              {isEn ? "Contact" : "ติดต่อ"}
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-bold text-white/30 uppercase tracking-[0.15em] mb-1">
              {isEn ? "Resources" : "เพิ่มเติม"}
            </div>
            <Link href="/insights" className="text-[14px] hover:text-white transition-colors">
              {isEn ? "Insights" : "บทความ"}
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:text-right gap-2">
          <div className="text-[14px] text-white/40">{t.footer.rights}</div>
          <div className="text-[14px] text-white/40 flex items-center md:justify-end gap-1.5">
            {t.footer.by}
          </div>
        </div>
      </Container>
    </footer>
  );
}
