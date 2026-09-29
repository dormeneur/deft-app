import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { CONTENT } from "@/data/content";

// Real shipped work only — replaces the unconfirmed testimonial marquee.
const IDS = ["vhelp", "jms"];

export function RecentWork() {
  const projects = CONTENT.en.portfolio.projects.filter((p) => IDS.includes(p.id));

  return (
    <Section id="work">
      <Container>
        <h2 className="section-headline mb-4">More work we&apos;ve shipped</h2>
        <p className="text-[17px] text-brand-muted max-w-[560px] mb-14">
          A campus app used by over a thousand students a day, and a full ERP for a Bangkok jeweller.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {projects.map((p) => {
            const card = (
              <>
                {p.visualType === "image" ? (
                  <Image
                    src={p.visualData}
                    alt={`${p.name} website`}
                    width={1440}
                    height={900}
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="h-auto w-full rounded-xl mb-5"
                  />
                ) : (
                  <ul className="mb-5 flex flex-wrap gap-2 rounded-xl bg-brand-surface-2 p-5">
                    {p.stats.map((st) => (
                      <li key={st} className="rounded-full border border-brand-border px-3 py-1 text-[14px] text-white">{st}</li>
                    ))}
                  </ul>
                )}
                <h3 className="text-[21px] font-bold text-white mb-1">{p.name}</h3>
                <p className="text-[14px] text-[#999] mb-3">{p.category}</p>
                <p className="text-[15px] text-brand-muted leading-relaxed">{p.desc}</p>
              </>
            );
            const cls = "block rounded-2xl border border-brand-border bg-brand-surface p-3 pb-6 [&>h3]:px-3 [&>p]:px-3 transition-colors duration-300";
            return p.href ? (
              <Link key={p.id} href={p.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:border-brand-teal/60`}>
                {card}
              </Link>
            ) : (
              <div key={p.id} className={cls}>{card}</div>
            );
          })}
        </div>

        <Link href="/work" className="text-[15px] font-semibold text-brand-teal underline underline-offset-4 hover:text-white transition-colors">
          See all case studies
        </Link>
      </Container>
    </Section>
  );
}
