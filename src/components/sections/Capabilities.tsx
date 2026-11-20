import { CONTENT } from "@/data/content";
import { Container, Section } from "@/components/ui/layout-wrappers";

// Everything beyond websites, as ruled rows in two columns — same rule-and-
// number language as HowItWorks, no cards or icons.
export function Capabilities({ className }: { className?: string }) {
  const { title, sub, items } = CONTENT.en.capabilities;

  return (
    <Section id="capabilities" variant="divide" className={className}>
      <Container>
        <h2 className="section-headline max-w-[20ch]">{title}</h2>
        <p className="mt-4 text-[17px] text-brand-muted max-w-[36rem] leading-relaxed">{sub}</p>

        <ul className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
          {items.map((item, i) => (
            <li key={item.title} className="flex gap-6 border-t border-brand-border py-7">
              <span className="font-heading text-[15px] font-semibold text-brand-teal tabular-nums pt-1 w-6 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-heading text-[22px] font-semibold text-white leading-tight tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[16px] text-brand-muted leading-relaxed max-w-[30rem]">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
