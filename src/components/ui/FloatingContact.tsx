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
      className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-[#06C755] text-white flex items-center justify-center shadow-lg shadow-black/50 transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
    >
      <LineIcon className="w-6 h-6" />
    </a>
  );
}
