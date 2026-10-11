"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { track, type BookingSource } from "@/lib/tracking";

/**
 * Every "book a call" button on the site routes through here, and there is
 * deliberately no popup path.
 *
 * This used to init the Cal.com embed API on mount and fall back to
 * `Cal.ns[...]("modal")` whenever a page had no inline calendar. That injected
 * Cal's modal into <body>, which survives client-side navigation — so a modal
 * opened on one page could reappear on the next one without a click. The embed
 * script is now loaded only by FinalCTA, which renders the inline calendar.
 *
 * Contract: every page renders <FinalCTA />, so `#book-calendar` is always on
 * the page and we scroll to it. The /contact redirect is a safety net for a
 * page that forgets.
 */
export function useBooking() {
  const router = useRouter();
  const lenis = useLenis();

  const openBooking = useCallback(
    (source: BookingSource = "unknown") => {
      track.bookingOpen(source);

      const calendar = document.getElementById("book-calendar");
      if (calendar) {
        // Lenis owns the scroll position when it is running; a native smooth
        // scroll would fight it. Offset matches the calendar's scroll-mt-24.
        if (lenis) lenis.scrollTo(calendar, { offset: -96 });
        else calendar.scrollIntoView({ block: "start" });
        return;
      }

      router.push("/contact#book-calendar");
    },
    [router, lenis]
  );

  return { openBooking };
}
