"use client";

import { LineIcon } from "@/components/ui/BrandIcons";

// ponytail: one channel only — the navbar and every section already carry a
// "book a call" CTA, so the floating stack was three ways to do the same thing.
export function FloatingContact() {
  return (
    <a
      href="https://line.me/ti/p/~aditya_bharti"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on LINE"
      title="LINE · aditya_bharti"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#06C755] text-white flex items-center justify-center shadow-xl shadow-[#06C755]/30 transition-transform duration-300 hover:scale-110 active:scale-100"
    >
      <LineIcon className="w-7 h-7" />
    </a>
  );
}
