import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { SocialLinks } from "@/components/ui/SocialLinks";

// Home page uses the default (h2, links on to /about); /about passes
// headingAs="h1" and gets the socials instead of a link to itself.
export function FounderSnippet({ className, headingAs: Heading = "h2" }: { className?: string; headingAs?: "h1" | "h2" }) {
    const isPage = Heading === "h1";

    return (
        <Section id="founder" variant={isPage ? "base" : "divide"} className={className}>
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">

                    <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-lg border border-brand-border">
                        <Image
                            src="/pfp.webp"
                            alt="Aditya Bharti, founder of Deft"
                            fill
                            priority={isPage}
                            sizes="320px"
                            className="object-cover"
                        />
                    </div>

                    <div className="max-w-[40rem]">
                        <Heading className={isPage ? "display-headline" : "section-headline"}>
                            {isPage ? "Aditya Bharti" : "You talk to the person writing the code."}
                        </Heading>
                        <p className="mt-4 text-[15px] text-brand-teal">
                            {isPage ? "Founder & developer, Bangkok" : "Aditya Bharti, founder & developer"}
                        </p>

                        <p className="mt-7 text-[17px] text-brand-muted leading-relaxed">
                            Thai national, raised in India, studying Computer Science at VIT
                            Chennai. That is why Deft builds for Bangkok businesses in both
                            English and Thai without either feeling like a translation.
                        </p>
                        <p className="mt-4 text-[17px] text-brand-muted leading-relaxed">
                            Sole engineer on a full{" "}
                            <span className="text-white">ERP and CRM for a Bangkok jewellery
                            company</span>, and before that a QA and AI engineer at a Bangkok
                            software studio. Also built{" "}
                            <span className="text-white">V Help</span>, a campus app used by
                            1,260+ students daily. Deft started with Emporium Tailors on
                            Sukhumvit Road.
                        </p>

                        <div className="mt-7">
                            {isPage ? (
                                <SocialLinks />
                            ) : (
                                <Link href="/about" className="group/more inline-flex items-center gap-2 py-2 text-[15px] font-medium text-white hover:text-brand-teal transition-colors">
                                    More about Deft
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/more:translate-x-1" />
                                </Link>
                            )}
                        </div>
                    </div>

                </div>
            </Container>
        </Section>
    );
}
