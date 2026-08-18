"use client";

import { CalendarCheck } from "lucide-react";
import { Container, Section } from "@/components/ui/layout-wrappers";
import { useBooking } from "@/components/providers/BookingProvider";
import { track, type BookingSource } from "@/lib/tracking";

interface MidPageCTAProps {
    headline: string;
    sub: string;
    ctaLabel: string;
    source: BookingSource;
}

export function MidPageCTA({ headline, sub, ctaLabel, source }: MidPageCTAProps) {
    const { openBooking } = useBooking();

    const handleClick = () => {
        track.ctaClick(ctaLabel, source);
        openBooking(source);
    };

    return (
        <section className="bg-brand-surface border-y border-brand-border py-16">
            <Container>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                    <div>
                        <h2 className="text-[28px] md:text-[34px] font-heading font-medium text-brand-text mb-2">
                            {headline}
                        </h2>
                        <p className="text-[16px] text-brand-muted max-w-[440px]">{sub}</p>
                    </div>

                    <button
                        onClick={handleClick}
                        className="btn-wipe inline-flex items-center justify-center gap-2 bg-brand-teal text-black font-bold text-[15px] h-13 px-8 rounded-xl shrink-0 glow-teal py-3.5"
                    >
                        <CalendarCheck className="w-5 h-5 shrink-0" />
                        {ctaLabel}
                    </button>
                </div>
            </Container>
        </section>
    );
}
