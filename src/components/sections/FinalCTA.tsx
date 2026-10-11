"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { Container } from "@/components/ui/layout-wrappers";
import { track } from "@/lib/tracking";

const CAL_NAMESPACE = "project-discussion";
const CAL_LINK = "adityabharti/project-discussion";

// Owns #book-calendar — every "book a call" button on the site scrolls here.
export function FinalCTA() {
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
        <section id="book" className="bg-black border-t border-brand-border">
            <Container className="py-20 md:py-28">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 lg:items-end mb-12">
                    <h2 className="display-headline max-w-[12ch]">Pick a time that suits you.</h2>
                    <p className="text-[17px] md:text-[19px] text-brand-muted leading-relaxed max-w-[32rem]">
                        An intro call with no commitment. Tell us what you need and
                        we&apos;ll tell you honestly whether we can help.
                    </p>
                </div>

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
