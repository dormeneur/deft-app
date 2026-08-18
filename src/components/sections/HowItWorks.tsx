"use client";

import { MessageSquare, MonitorPlay, Rocket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";

// ponytail: the horizontal accordion hid the copy behind a hover and read
// as sideways text at rest — process steps want to be legible immediately.
const STEP_ICONS = [MessageSquare, MonitorPlay, Rocket];

export function HowItWorks({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <Section id="how" className={className}>
      <Container>

        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#555] mb-6">
          Process
        </div>

        <h2 className="section-headline mb-4 max-w-[500px]">{t.how.title}</h2>
        <p className="text-[17px] text-brand-muted max-w-[520px] mb-14">{t.how.sub}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.how.steps.map((step, idx) => {
            const Icon = STEP_ICONS[idx];
            return (
              <div
                key={step.n}
                className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-surface p-7 pt-8 transition-all duration-300 hover:border-brand-teal/50 hover:-translate-y-1"
              >
                {/* Oversized ghost number, bleeding off the corner */}
                <span
                  aria-hidden="true"
                  className="absolute -top-4 -right-2 text-[110px] font-black leading-none text-white/[0.03] group-hover:text-brand-teal/10 transition-colors duration-300 select-none"
                >
                  {step.n}
                </span>

                <span className="relative w-11 h-11 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal mb-6 group-hover:bg-brand-teal group-hover:text-black transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </span>

                <h3 className="relative text-[19px] md:text-[21px] font-bold text-white leading-tight mb-3">
                  {step.title}
                </h3>
                <p className="relative text-[15px] text-brand-muted leading-relaxed">
                  {step.body}
                </p>

                {/* Progress rail — fills on hover */}
                <span aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] w-full bg-white/[0.04]">
                  <span className="block h-full w-0 bg-brand-teal transition-[width] duration-500 ease-out group-hover:w-full" />
                </span>
              </div>
            );
          })}
        </div>

      </Container>
    </Section>
  );
}
