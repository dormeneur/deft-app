"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Container } from "@/components/ui/layout-wrappers";
import { track } from "@/lib/tracking";
import { useBooking } from "@/components/providers/BookingProvider";

const CAL_NAMESPACE = "project-discussion";
const CAL_LINK = "adityabharti/project-discussion";

export function FinalCTA() {
    const { openBooking } = useBooking();

    useEffect(() => {
        (async () => {
            try {
                const cal = await getCalApi({ namespace: CAL_NAMESPACE });
                cal("ui", { hideEventTypeDetails: false, layout: "month_view", theme: "dark" } as any);
                cal("on", { action: "bookingSuccessful", callback: () => track.bookingComplete("final_cta") });
            } catch { /* silently ignore if Cal.com fails to load */ }
        })();
    }, []);

    return (
        <section id="book" className="bg-black border-t border-[#1f1f1f]">
            <Container className="py-20 md:py-28">

                {/* CTA copy — pure black bg, no inner card */}
                <div className="text-center mb-10">
                    <h2 className="display-headline mb-4">
                        Ready to stop leaving money on the table?
                    </h2>
                    <p className="text-[17px] text-[#888] max-w-[500px] mx-auto mb-8">
                        Let&apos;s see how we can fix the issues holding you back from driving more revenue today.
                    </p>
                    <button
                        onClick={() => { track.ctaClick("final_cta_book", "final_cta"); openBooking("final_cta"); }}
                        className="btn-wipe inline-flex items-center justify-center bg-brand-teal text-black font-bold text-[16px] h-12 px-10 rounded-full glow-teal"
                    >
                        Book an Intro Call
                    </button>
                </div>

                {/* Cal.com inline — every "book a call" button on the page scrolls here */}
                <div id="book-calendar" className="scroll-mt-24">
                    <Cal
                        namespace={CAL_NAMESPACE}
                        calLink={CAL_LINK}
                        style={{ width: "100%", minHeight: "600px", overflow: "scroll" }}
                        config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "dark" }}
                    />
                </div>

            </Container>
        </section>
    );
}
