"use client";

import React, { useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingContact() {
  const [hovered, setHovered] = useState<string | null>(null);

  const buttonVariants = {
    rest: { width: 56, borderRadius: "9999px" },
    hover: { width: 180, borderRadius: "9999px" }
  };

  const textVariants = {
    rest: { opacity: 0, width: 0, marginLeft: 0 },
    hover: { opacity: 1, width: "auto", marginLeft: 10 }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Line App Button */}
      <motion.a
        href="https://line.me/ti/p/~aditya_bharti"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered('line')}
        onMouseLeave={() => setHovered(null)}
        variants={buttonVariants}
        initial="rest"
        animate={hovered === 'line' ? 'hover' : 'rest'}
        className="h-14 bg-[#00B900] text-white flex items-center justify-center shadow-xl shadow-[#00B900]/20 hover:shadow-2xl transition-shadow relative overflow-hidden"
        aria-label="Contact on LINE"
      >
        <div className="flex items-center justify-center h-full px-4 w-full">
          <MessageCircle className="w-6 h-6 shrink-0" />
          <motion.span
            variants={textVariants}
            className="font-semibold text-[15px] whitespace-nowrap overflow-hidden"
          >
            LINE
          </motion.span>
        </div>
      </motion.a>
      
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/66638232303"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered('whatsapp')}
        onMouseLeave={() => setHovered(null)}
        variants={buttonVariants}
        initial="rest"
        animate={hovered === 'whatsapp' ? 'hover' : 'rest'}
        className="h-14 bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/20 hover:shadow-2xl transition-shadow relative overflow-hidden z-10"
        aria-label="Contact on WhatsApp"
      >
        <div className="flex items-center justify-center h-full px-4 w-full">
          <Phone className="w-6 h-6 shrink-0" />
          <motion.span
            variants={textVariants}
            className="font-semibold text-[15px] whitespace-nowrap overflow-hidden"
          >
            WhatsApp
          </motion.span>
        </div>
      </motion.a>
    </div>
  );
}
