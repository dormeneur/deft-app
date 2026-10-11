"use client";

import { Container, Section } from "@/components/ui/layout-wrappers";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
    { q: "Do I pay anything to see my demo?", a: "No. We build a working homepage demo for your business free of charge. You only pay if you like it and want to launch." },
    { q: "How long does the full website take?", a: "Once you approve the demo, the full site goes live within 7 days. We can move that fast because we ask the right questions up front." },
    { q: "What kind of businesses do you work with?", a: "Restaurants, salons, tailors, repair shops, clinics, and any Bangkok business that wants more customers online. For growing companies we also build ERP systems, dashboards, inventory and booking platforms, and other internal tools." },
    { q: "What is included in monthly support?", a: "Content updates, security patches, performance monitoring and priority response, so your site stays fast, secure and current." },
    { q: "Can I switch plans later?", a: "Yes. Upgrade whenever you like, and what you've already paid is credited toward the higher plan." },
    { q: "Do you build bilingual English and Thai websites?", a: "Yes, bilingual is our default. Emporium Tailors is a live example." },
    { q: "What if I already have a website?", a: "We can redesign it or start fresh, whichever suits you. Either way you see the result before you pay a baht." },
];

export function FAQ() {
    return (
        <Section id="faq" variant="divide">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
                    <h2 className="section-headline">Questions, answered.</h2>

                    <Accordion defaultValue={[0]} className="border-t border-brand-border">
                        {FAQS.map((item, idx) => (
                            <AccordionItem key={item.q} value={idx}>
                                <AccordionTrigger>{item.q}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-[16px] text-brand-muted leading-relaxed max-w-[40rem]">
                                        {item.a}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </Container>
        </Section>
    );
}
