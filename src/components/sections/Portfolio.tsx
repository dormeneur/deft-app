import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { cn } from "@/lib/utils";
import { CONTENT } from "@/data/content";

type Project = (typeof CONTENT.en.portfolio.projects)[number];

const PROJECTS = CONTENT.en.portfolio.projects as Project[];

// Projects without a public URL (private client systems) lead to the calendar
const linkProps = (project: Project) =>
  project.href
    ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: "/contact#book-calendar" };

function Visual({ project, sizes, priority }: { project: Project; sizes: string; priority?: boolean }) {
  const [first, second] = project.images;

  // Second screenshot sits on top and fades in on hover (or keyboard focus)
  // of the surrounding `group`. Touch devices never hover, so they keep the first.
  return (
    <>
      <Image
        src={first}
        alt={`Screenshot of ${project.name}`}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-top"
      />
      <Image
        src={second}
        alt=""
        fill
        sizes={sizes}
        className="object-cover object-top opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
      />
    </>
  );
}

function Tile({ project, className, sizes, priority }: { project: Project; className?: string; sizes: string; priority?: boolean }) {
  return (
    <Link {...linkProps(project)} className={cn("group flex flex-col", className)}>
      <div className="relative flex-1 min-h-0 aspect-[2/1] lg:aspect-auto overflow-hidden rounded-lg border border-brand-border bg-brand-surface">
        <Visual project={project} sizes={sizes} priority={priority} />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4 gap-y-0.5 pt-3">
        <span className="text-[15px] font-semibold text-white shrink-0">{project.name}</span>
        <span className="text-[13px] text-brand-subtle sm:text-right truncate">{project.category}</span>
      </div>
    </Link>
  );
}

// Home page: three real projects, one large and two stacked beside it.
export function WorkShowcase() {
  const [lead, ...rest] = ["vhelp", "emporium-tailors", "jms"].map(
    (id) => PROJECTS.find((p) => p.id === id)!
  );

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5 gap-y-8">
        <Link {...linkProps(lead)} className="group lg:col-span-2 flex flex-col">
          <div className="relative aspect-[2/1] overflow-hidden rounded-lg border border-brand-border bg-brand-surface">
            <Visual project={lead} sizes="(max-width: 1024px) 100vw, 820px" priority />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4 gap-y-0.5 pt-3">
            <span className="text-[15px] font-semibold text-white shrink-0">{lead.name}</span>
            <span className="text-[13px] text-brand-subtle sm:text-right truncate">{lead.category}</span>
          </div>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-x-5 gap-y-8 lg:gap-y-5">
          {rest.map((project) => (
            <Tile key={project.id} project={project} sizes="(max-width: 640px) 100vw, 420px" />
          ))}
        </div>
      </div>

      <Link href="/work" className="group/all inline-flex items-center gap-2 mt-6 py-2 text-[15px] font-medium text-white hover:text-brand-teal transition-colors">
        All work
        <ArrowRight className="w-4 h-4 transition-transform group-hover/all:translate-x-1" />
      </Link>
    </div>
  );
}

// /work: every project, one per row, nothing hidden behind a carousel.
export function Portfolio({ className }: { className?: string }) {
  return (
    <Section id="portfolio" className={className}>
      <Container>
        <h1 className="display-headline mb-6">{CONTENT.en.portfolio.title}</h1>
        <p className="text-[17px] md:text-[19px] text-brand-muted max-w-[34rem] leading-relaxed">
          {CONTENT.en.portfolio.sub}
        </p>

        <ul className="mt-14 md:mt-20 border-t border-brand-border">
          {PROJECTS.map((project, i) => (
            <li
              key={project.id}
              className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-14 py-10 md:py-14 border-b border-brand-border lg:items-center"
            >
              <Link
                {...linkProps(project)}
                aria-label={`${project.name}: ${project.cta}`}
                className="group relative block aspect-[2/1] overflow-hidden rounded-lg border border-brand-border bg-brand-surface"
              >
                <Visual project={project} sizes="(max-width: 1024px) 100vw, 700px" priority={i === 0} />
              </Link>

              <div>
                <h2 className="font-heading text-[28px] md:text-[34px] font-semibold text-white leading-tight tracking-tight">
                  {project.name}
                </h2>
                <p className="mt-2 text-[14px] text-brand-teal">{project.category}</p>
                <p className="mt-5 text-[16px] text-brand-muted leading-relaxed max-w-[32rem]">
                  {project.desc}
                </p>
                <p className="mt-5 text-[14px] text-brand-subtle">{project.stats.join("  ·  ")}</p>

                <Link
                  {...linkProps(project)}
                  className="inline-flex items-center gap-1.5 mt-5 py-2 text-[15px] font-semibold text-white hover:text-brand-teal transition-colors"
                >
                  {project.cta}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
