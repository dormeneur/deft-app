"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";

// The three steps are a real sequence, so they are numbered and read left to
// right along one rule — no cards, no icons standing in for content.
export function HowItWorks({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <Section id="how" variant="divide" className={className}>
      <Container>
        <h2 className="section-headline">{t.how.title}</h2>
        <p className="mt-4 text-[17px] text-brand-muted max-w-[32rem]">{t.how.sub}</p>

        <ol className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
          {t.how.steps.map((step) => (
            <li
              key={step.n}
              className="border-t border-brand-border pt-6 md:pr-10 md:first:border-brand-teal"
            >
              <span className="font-heading text-[15px] font-semibold text-brand-teal tabular-nums">
                {step.n}
              </span>
              <h3 className="mt-4 font-heading text-[22px] font-semibold text-white leading-tight tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-[16px] text-brand-muted leading-relaxed max-w-[26rem]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
