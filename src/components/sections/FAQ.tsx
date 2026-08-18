"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/layout-wrappers";

const FAQS = [
    { q: "Do I need to pay anything upfront to see my demo?", a: "No. We build a working homepage demo for your business completely free. You only pay if you love it and want to launch." },
    { q: "How long does the full website take?", a: "Once you approve the demo, the full site goes live within 7 days. We move fast because we ask the right questions upfront." },
    { q: "What kind of businesses do you work with?", a: "Restaurants, salons, tailors, repair shops, clinics — any Bangkok business that needs more customers online. We also build ERP systems, business dashboards, and custom software for growing companies." },
    { q: "What is included in monthly support?", a: "Content updates, security patches, performance monitoring, and priority response. Your website stays fast, secure, and up to date every month." },
    { q: "Can I switch plans later?", a: "Yes. Upgrade anytime. We credit what you've already paid toward the higher tier." },
    { q: "Do you build bilingual EN/TH websites?", a: "Yes. Bilingual is our default. Emporium Tailors is a live example." },
    { q: "What if I already have a website?", a: "We can redesign it or build fresh — your choice. Either way, you see the result before you pay a baht." },
    { q: "Do you build ERP or management software?", a: "Yes. Beyond websites, we build custom dashboards, inventory systems, booking platforms, and internal tools using modern web technology." },
];

export function FAQ() {
    const [open, setOpen] = useState<number | null>(0); // first item open by default

    return (
        <Section id="faq">
            <Container>
                <h2 className="section-headline mb-14">Questions?<br />We got answers.</h2>

                <div className="divide-y divide-brand-border">
                    {FAQS.map((item, idx) => (
                        <div key={idx}>
                            <button
                                onClick={() => setOpen(open === idx ? null : idx)}
                                className="w-full flex items-center justify-between gap-8 py-6 text-left"
                                aria-expanded={open === idx}
                            >
                                <span className={`text-[16px] md:text-[18px] font-bold transition-colors ${open === idx ? "text-brand-text" : "text-brand-text"}`}>
                                    {item.q}
                                </span>
                                {/* Plus/minus using CSS — no icon import needed */}
                                <span className="shrink-0 w-6 h-6 flex items-center justify-center text-brand-muted text-2xl leading-none font-light">
                                    {open === idx ? "−" : "+"}
                                </span>
                            </button>

                            {/* ponytail: grid trick for smooth height transition — no JS height measurement */}
                            <div
                                className="grid overflow-hidden transition-all duration-300 ease-in-out"
                                style={{ gridTemplateRows: open === idx ? "1fr" : "0fr" }}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-[15px] md:text-[16px] text-brand-muted leading-relaxed pb-6 max-w-[720px]">
                                        {item.a}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
