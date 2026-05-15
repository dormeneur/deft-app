import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bg?: "white" | "muted" | "dark" | "teal";
}

export function Section({ id, className, children, bg = "white", ...props }: SectionProps) {
  const bgClasses = {
    white: "bg-white",
    muted: "bg-background",
    dark: "bg-brand-dark text-white/90",
    teal: "bg-brand-teal text-white",
  };

  return (
    <section
      id={id}
      className={cn("py-20 md:py-28 relative overflow-hidden", bgClasses[bg], className)}
      {...props}
    >
      {children}
    </section>
  );
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1100px] px-6 md:px-10", className)}
      {...props}
    >
      {children}
    </div>
  );
}
