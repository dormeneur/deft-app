"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { track } from "@/lib/tracking";
import { useBooking } from "@/components/providers/BookingProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock scroll and let Escape close the sheet while it is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", fn);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", fn);
    };
  }, [mobileOpen]);

  const handleBooking = () => {
    track.ctaClick("navbar_book_demo", "navbar");
    openBooking("navbar");
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const mobileMenu = (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black lg:hidden"
        >
          <div className="h-16 px-6 flex justify-between items-center border-b border-brand-border">
            <Link href="/" onClick={() => setMobileOpen(false)}
              className="font-heading text-xl font-bold text-white tracking-tight">
              Deft<span className="text-brand-teal">.</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="w-11 h-11 -mr-2 flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 pt-6 pb-8 flex flex-col">
            {[{ label: "Home", href: "/" }, ...NAV_LINKS].map(({ label, href }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={pathname === href ? "page" : undefined}
                  className={cn(
                    "block py-3 font-heading text-[32px] font-semibold leading-tight tracking-tight border-b border-brand-border",
                    pathname === href ? "text-brand-teal" : "text-white"
                  )}
                >
                  {label}
                </Link>
              </motion.div>
            ))}

            <button
              onClick={() => { setMobileOpen(false); handleBooking(); }}
              className="btn-wipe btn-primary mt-auto w-full shrink-0"
            >
              Book an intro call
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <nav
      aria-label="Main"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b",
        scrolled ? "bg-black/85 backdrop-blur-md border-brand-border" : "bg-transparent border-transparent"
      )}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 h-16 flex items-center justify-between gap-8">

        <Link href="/" className="font-heading text-xl font-bold text-white tracking-tight">
          Deft<span className="text-brand-teal">.</span>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "link-rule text-[14px] font-medium",
                    isActive(href) ? "text-white" : "text-brand-muted hover:text-white"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <button onClick={handleBooking} className="btn-wipe btn-primary btn-sm hidden sm:inline-flex">
            Book a call
          </button>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="lg:hidden w-11 h-11 -mr-2 flex items-center justify-center text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {mounted ? createPortal(mobileMenu, document.body) : null}
    </nav>
  );
}
