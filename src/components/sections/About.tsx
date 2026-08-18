import { Container, Section } from "@/components/ui/layout-wrappers";

// The studio, not the founder — FounderSnippet on the home page covers the
// person, so this stays about what Deft actually is and how it works.
export function About({ className }: { className?: string }) {
  return (
    <Section id="about" className={className}>
      <Container>
        <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#555] mb-10">
          About Deft
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <h2 className="section-headline max-w-[460px]">
            A small studio that ships, not an agency that bills.
          </h2>

          <div className="space-y-5 text-[17px] text-brand-muted leading-relaxed">
            <p>
              Deft builds websites, booking systems and internal tools for
              businesses in Bangkok. No account managers, no discovery retainer —
              you talk to the person writing the code.
            </p>
            <p>
              We build a working demo of your site before you pay anything. If it
              isn&apos;t right, you walk away owing nothing. If it is, the full
              site goes live within a week and we keep it updated month to month.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
