import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function FounderSnippet() {
    return (
        <Section id="founder">
            <Container>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#555] mb-12">
                    Who&apos;s behind Deft
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-center">

                    {/* Story */}
                    <div>
                        <h2 className="section-headline mb-2">Aditya Bharti</h2>
                        <p className="text-[14px] font-semibold text-brand-teal mb-7">
                            Founder &amp; Developer · Bangkok
                        </p>

                        <p className="text-[17px] text-brand-muted leading-relaxed mb-4">
                            Thai national, raised in India, studying Computer Science at VIT
                            Chennai — which is exactly why Deft builds for Bangkok businesses in
                            both English and Thai, without either feeling like a translation.
                        </p>
                        <p className="text-[17px] text-brand-muted leading-relaxed mb-8">
                            Sole engineer on a full{" "}
                            <span className="text-brand-text">ERP and CRM for a Bangkok jewellery
                            company</span>, and before that a QA and AI engineer at a Bangkok
                            software studio. Also built{" "}
                            <span className="text-brand-text">V Help</span>, a campus app used by
                            1,250+ students daily. Deft started with Emporium Tailors on
                            Sukhumvit Road.
                        </p>

                        <div className="flex flex-wrap items-center gap-5">
                            <Link
                                href="/contact"
                                className="btn-wipe inline-flex items-center gap-2 bg-brand-teal text-black font-bold text-[14px] h-11 px-6 rounded-full glow-teal"
                            >
                                Get in touch
                            </Link>
                            <SocialLinks />
                        </div>
                    </div>

                    {/* Portrait */}
                    <div className="relative order-first lg:order-last max-w-[320px] lg:max-w-none">
                        <div className="absolute -inset-3 rounded-[28px] bg-brand-teal/10 blur-2xl" aria-hidden="true" />
                        <div className="relative aspect-square rounded-3xl overflow-hidden border border-brand-border">
                            <Image
                                src="/pfp.png"
                                alt="Aditya Bharti, founder of Deft"
                                fill
                                sizes="(max-width: 1024px) 320px, 360px"
                                className="object-cover"
                            />
                        </div>
                    </div>

                </div>
            </Container>
        </Section>
    );
}
