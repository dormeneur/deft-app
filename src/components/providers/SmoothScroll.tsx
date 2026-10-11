"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import "lenis/dist/lenis.css";

// Wheel smoothing for the whole site. `lerp` is the feel knob: lower = longer,
// floatier glide; higher = snappier (1 = native). 0.09 matches app.vhelpcc.com.
// Touch scrolling stays native, and so does everything under reduced motion.
const LERP = 0.09;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: LERP }}>
      {children}
    </ReactLenis>
  );
}
