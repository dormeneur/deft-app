"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Container } from "@/components/ui/layout-wrappers";

export function Footer() {
  const { t, isEn } = useLanguage();

  return (
    <footer className="bg-brand-dark text-white/60 py-16 border-t border-white/10">
      <Container className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="flex flex-col max-w-sm">
          <div className="font-heading font-semibold text-3xl text-white tracking-tight mb-3">Deft</div>
          <p className="text-[15px] leading-relaxed mb-6">{t.footer.tagline}</p>
        </div>

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
