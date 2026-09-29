# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Owner-run Bangkok small businesses (restaurants, salons, tailors, repair shops) that have no website or one that isn't working. They are often on mobile, and the job is to decide whether to trust a small studio and book a call.

## Product Purpose
Deft is a Bangkok web-design agency site. It exists to turn those owners into booked discovery calls via inline Cal.com booking. Success is a booked call.

## Positioning
Deft shows a working demo before the client pays anything. Founder-led (Aditya Bharti), fast turnaround, fairly priced.

## Operating Context
Static Next.js 16 site deployed to Cloudflare Pages. No backend. Contact via EmailJS, booking via Cal.com embed, payments via Stripe payment links, analytics via GA. Insights blog is MDX.

## Capabilities and Constraints
- Booking is scroll-only to `#book-calendar` (rendered by `FinalCTA` on every page); never a popup.
- English only for now; the Thai copy is dormant, not deleted.
- Founder facts: Aditya Bharti, CS at VIT Chennai, Thai national raised in India, Bangkok-based. Prior work: V Help (1,260+ daily users), JARVIS.

## Brand Commitments
Dark theme only: black background, green `#4ADE80` accent, amber `#F59E0B` secondary (existing implementation; recorded, not expanded).

## Evidence on Hand
Confirmed real and usable: Emporium Tailors case study (`public/portfolio/emporiumtailors.png`), V Help and JARVIS, Jewelry Management System for Sparkling Gems Co. Ltd. Also VHELP and the personal portfolio in `/work`.
The three testimonials in `content.ts` were NOT confirmed as real; do not amplify or build layouts that depend on them. Do not invent metrics or customers.

## Product Principles
- Prove before asking: real work and a demo come ahead of claims.
- One conversion path: everything leads to the inline booking calendar.
- Copy stays within confirmed facts.
- Mobile-first for busy owners.

## Accessibility & Inclusion
No product-specific standard established.
