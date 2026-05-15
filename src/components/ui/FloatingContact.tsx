"use client";

import React from "react";
import { MessageCircle, Phone } from "lucide-react";

export function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Line App Button */}
      <a
        href="https://line.me/ti/p/~aditya_bharti"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#00B900] text-white rounded-full flex items-center justify-center shadow-xl shadow-[#00B900]/20 hover:scale-110 hover:shadow-2xl transition-all duration-300"
        aria-label="Contact on LINE"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
      
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/66638232303"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/20 hover:scale-110 hover:shadow-2xl transition-all duration-300"
        aria-label="Contact on WhatsApp"
      >
        <Phone className="w-7 h-7" />
      </a>
    </div>
  );
}
