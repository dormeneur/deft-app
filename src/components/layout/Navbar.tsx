"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t, lang, setLang, isEn } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-brand-border py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="font-heading font-semibold text-2xl tracking-tight text-brand-teal hover:opacity-80 transition-opacity"
        >
          Deft
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {t.nav.links.map((link, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(t.nav.ids[idx])}
              className="px-3 py-2 text-[14px] font-medium text-brand-muted hover:text-brand-teal transition-colors rounded-md hover:bg-brand-teal/5"
            >
              {link}
            </button>
          ))}
          
          <div className="w-[1px] h-5 bg-brand-border mx-3" />
          
          <button
            onClick={() => setLang(isEn ? "th" : "en")}
            className="px-3 py-2 text-[14px] font-medium text-brand-text hover:bg-brand-border/50 transition-colors rounded-md flex items-center gap-2"
          >
            <span className="text-[16px]">{isEn ? "🇹🇭" : "🇬🇧"}</span>
            {isEn ? "ภาษาไทย" : "English"}
          </button>
          
          <Button
            onClick={() => scrollTo("contact")}
            className="ml-2 bg-brand-teal text-white hover:bg-brand-teal-dark font-medium shadow-none h-10 px-6 rounded-lg"
          >
            {t.nav.cta}
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-brand-text"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-dark/20 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-white z-50 shadow-2xl flex flex-col lg:hidden border-l border-brand-border"
            >
              <div className="p-6 flex justify-between items-center border-b border-brand-border">
                <span className="font-heading font-semibold text-2xl text-brand-teal">Deft</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-brand-muted hover:text-brand-text">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex flex-col p-6 gap-2 overflow-y-auto">
                {t.nav.links.map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollTo(t.nav.ids[idx])}
                    className="text-left px-4 py-3 text-[16px] font-medium text-brand-text hover:bg-brand-teal/5 hover:text-brand-teal rounded-lg transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>

              <div className="mt-auto p-6 border-t border-brand-border flex flex-col gap-4">
                <button
                  onClick={() => setLang(isEn ? "th" : "en")}
                  className="w-full text-left px-4 py-3 text-[16px] font-medium text-brand-text border border-brand-border rounded-lg flex items-center justify-between"
                >
                  <span>{isEn ? "Switch to Thai" : "Switch to English"}</span>
                  <span className="text-xl">{isEn ? "🇹🇭" : "🇬🇧"}</span>
                </button>
                <Button
                  onClick={() => scrollTo("contact")}
                  className="w-full bg-brand-teal text-white hover:bg-brand-teal-dark font-medium shadow-none h-12 text-base rounded-lg"
                >
                  {t.nav.cta}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
