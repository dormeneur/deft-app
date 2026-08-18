import { cn } from "@/lib/utils";
import React from "react";

// ─────────────────────────────────────────────────────────────
// Section
// All sections share the same dark background (#0A0A0A).
// Visual rhythm comes from subtle border-top separators, not
// alternating background colours.
// ─────────────────────────────────────────────────────────────

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  children: React.ReactNode;
  /**
   * "base"    → pure black  #0A0A0A  (default, used for most sections)
   * "surface" → #141414     (slightly elevated — for cards embedded in page)
   * "divide"  → base + a 1px top border separator
   * "flush"   → no padding, no overflow-hidden (for full-bleed sections)
   */
  variant?: "base" | "surface" | "divide" | "flush";

  // Legacy compat — old bg prop mapped to variant
  bg?: "white" | "muted" | "dark" | "teal";
}

export function Section({
  id,
  className,
  children,
  variant,
  bg,
  ...props
}: SectionProps) {
  // Map legacy bg prop to variant for backward compatibility
  const resolvedVariant = variant ?? (bg ? "divide" : "base");

  const variantClasses = {
    base: "bg-brand-bg",
    surface: "bg-brand-surface",
    divide: "bg-brand-bg border-t border-brand-border",
    flush: "bg-brand-bg",
  };

  const isFlush = resolvedVariant === "flush";

  // ponytail: tailwind-merge can't drop `md:py-28` when a caller passes a
  // plain `pt-32`, so the default used to survive at md+ and stack on top of
  // the override — that was the mystery gap between sections. If the caller
  // sets any vertical padding, they own all of it.
  const hasOwnPadding = /(^|\s)(p|py|pt|pb)-/.test(className ?? "");

  return (
    <section
      id={id}
      className={cn(
        !isFlush && !hasOwnPadding && "py-20 md:py-28",
        "relative overflow-hidden",
        variantClasses[resolvedVariant],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Container
// ─────────────────────────────────────────────────────────────

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  /**
   * "default" → max-w-[1100px]  standard sections
   * "wide"    → max-w-[1300px]  full-bleed layouts
   * "narrow"  → max-w-[780px]   reading / article
   */
  size?: "default" | "wide" | "narrow";
}

export function Container({
  className,
  children,
  size = "default",
  ...props
}: ContainerProps) {
  const sizeClasses = {
    default: "max-w-[1280px]",
    wide: "max-w-[1400px]",
    narrow: "max-w-[780px]",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-10",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
