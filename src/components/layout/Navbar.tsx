"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { track } from "@/lib/tracking";
import { useBooking } from "@/components/providers/BookingProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Pricing", href: "/pricing" },
  { label: "Insights", href: "/insights" },
];

export function Navbar() {
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  // Escape closes the dropdown for keyboard users
  useEffect(() => {
    if (!menuOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [menuOpen]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  const handleBooking = () => {
    track.ctaClick("navbar_book_demo", "navbar");
    openBooking("navbar");
  };

  const mobileMenu = (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] lg:hidden"
          />
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 bg-black z-[101] flex flex-col lg:hidden border-b border-[#1f1f1f]"
          >
            <div className="px-6 py-5 flex justify-between items-center">
              <Link href="/" onClick={() => setMobileOpen(false)}
                className="text-xl font-black text-white tracking-tight">
                Deft<span className="text-brand-teal">.</span>
              </Link>
              <button onClick={() => setMobileOpen(false)}
                className="text-[13px] font-bold tracking-[0.12em] uppercase text-[#666]">
                CLOSE
              </button>
            </div>

            <div className="px-6 pt-6 pb-12 flex flex-col gap-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#444] mb-4">
                MENU
              </p>
              {NAV_LINKS.map(({ label, href }) => (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                  className="text-[32px] font-black text-white hover:text-brand-teal transition-colors leading-tight">
                  {label}
                </Link>
              ))}

              <button
                onClick={() => { setMobileOpen(false); handleBooking(); }}
                className="btn-wipe mt-8 bg-brand-teal text-black font-black text-[18px] h-14 rounded-full glow-teal"
              >
                Book an Intro Call
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled || mobileOpen
        ? "bg-black/60 backdrop-blur-xl border-b border-white/[0.06]"
        : "bg-transparent border-b border-transparent"
    )}>
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 h-16 flex lg:grid lg:grid-cols-3 items-center justify-between">

        {/* Left — logo */}
        <Link href="/" className="text-xl font-black text-white hover:text-brand-teal transition-colors tracking-tight">
          Deft<span className="text-brand-teal">.</span>
        </Link>

        {/* Center — MENU dropdown */}
        <div
          className="hidden lg:flex items-center justify-center relative"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.1em] text-[#666] hover:text-white transition-colors py-2"
          >
            MENU
            <ChevronDown
              className={cn("w-3.5 h-3.5 transition-transform duration-300", menuOpen && "rotate-180")}
            />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 origin-top rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-2 shadow-2xl shadow-black/60"
              >
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.2 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "group flex items-center justify-between rounded-xl px-4 py-2.5 text-[14px] font-bold transition-colors",
                        pathname === href
                          ? "bg-brand-teal/10 text-brand-teal"
                          : "text-[#999] hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {label}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right — CTA + mobile MENU */}
        <div className="flex items-center justify-end gap-4">
          <button
            onClick={handleBooking}
            className="btn-wipe hidden lg:flex items-center justify-center bg-brand-teal text-black font-bold text-[14px] px-5 py-2.5 rounded-full glow-teal"
          >
            Book an Intro Call
          </button>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="lg:hidden w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:border-brand-teal hover:text-brand-teal transition-colors"
          >
            <Menu className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {mounted ? createPortal(mobileMenu, document.body) : null}
    </nav>
  );
}
