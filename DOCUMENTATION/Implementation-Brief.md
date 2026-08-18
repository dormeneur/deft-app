# Deft — Implementation Brief
> This is the actionable brief to hand to an agent (or yourself) when it is time to write code.
> Do not start this brief until the three gates in Strategy-Session.md Section 8 are cleared.

---

## The Goal

Maximize booked discovery calls and closed deals over the next 90 days by transforming the current portfolio-style site into a trust-first, conversion-optimized agency website.

**Primary conversion action:** Book a call via Calendly (The Deft Preview)
**Secondary action:** Contact form submission
**Tertiary action:** Stripe plan purchase

---

## What Must NOT Change

- The design system (colors, typography, spacing tokens) — it is genuinely strong
- The bilingual EN/TH system
- The Stripe integration and payment flow
- The Calendly integration
- The MDX blog infrastructure
- The EmailJS contact form

---

## Phase 1 — Content and Copy Changes (No UI work)

These changes are in `src/data/content.ts` and `src/data/pricing.ts` only.

### Hero

```
badge:  "Web Design for Bangkok Businesses"
line1:  "More customers find you."
line2:  "More customers trust you."
sub:    "We build a working demo of your new website — completely 
         free — and show it to you before you spend a single baht."
cta1:   "Get My Free Demo"
cta2:   "See Our Work"
stats:  [
  { val: "3x", label: "More inquiries for Emporium Tailors" },
  { val: "7 Days", label: "From call to live" },
  { val: "฿0", label: "To see your demo" }
]
```

### HowItWorks

```
title: "How It Works"
sub:   "From your first message to a live website — in 7 days."
steps: [
  {
    n: "01",
    title: "Tell Us About Your Business",
    body: "Fill in a short form about your business and what you need. 
           Takes 2 minutes. No commitment required."
  },
  {
    n: "02",
    title: "We Build Your Demo — Free",
    body: "We design and build a working homepage for your business 
           before you pay anything. You see it on a 30-minute call."
  },
  {
    n: "03",
    title: "Live in 7 Days",
    body: "Once you approve the design, we build the full site and 
           launch it within 7 days. Monthly support from day one."
  }
]
```

### Services (narrow to 5 niche verticals)

```
title: "Built for Bangkok Businesses Like Yours"
sub:   "If your customers are looking for you online and can't find you,
        you're losing them every day."
items: [
  { icon: "Utensils",  title: "Restaurants & Cafés",    
    desc: "Attract more diners with a menu, gallery, and booking form 
           your customers can find on Google." },
  { icon: "Scissors",  title: "Salons & Beauty",         
    desc: "Show your work, take bookings, and build a client base that 
           keeps coming back." },
  { icon: "Shirt",     title: "Tailors & Fashion",       
    desc: "Display your craftsmanship, collect inquiries, and earn trust 
           before a customer walks through your door." },
  { icon: "Wrench",    title: "Repair & Service Shops",  
    desc: "Be the first result when someone nearby needs your service." },
  { icon: "Store",     title: "Any Local Business",      
    desc: "If you serve Bangkok customers in person, you need a website 
           that works as hard as you do." }
]
```

### About (new framing)

```
p1: "Aditya Bharti is the founder of Deft and has been building 
     websites for Bangkok businesses since 2025. He is currently 
     studying Computer Science and AI Engineering at VIT Chennai."
p2: "Using modern development tools, Deft delivers websites that load 
     faster, rank higher on Google, and convert more visitors into 
     customers — at a fraction of traditional agency cost."
p3: "The first project was Emporium Tailors on Sukhumvit Road. That 
     result — tripled booking inquiries within the first month — is the 
     foundation everything else is built on."
founderRole: "Founder, Deft"
```

### Pricing (rename tiers, add outcome descriptions)

Update `src/data/pricing.ts`:
```
plans[0].en.name:        "Online Presence"
plans[0].en.tagline:     "Customers can find you, trust you, and contact you."
plans[0].en.description: "A clean, fast website that shows up on Google 
                           and gives customers a reason to choose you."

plans[1].en.name:        "Growth Engine"
plans[1].en.tagline:     "Your website actively generates new inquiries every week."
plans[1].en.description: "A full-featured website with gallery, blog, booking forms, 
                           and SEO that brings in leads while you work."

plans[2].en.name:        "Full Transformation"
plans[2].en.tagline:     "A complete digital system that works while you sleep."
plans[2].en.description: "Custom-built from scratch. Admin dashboard, payment 
                           integration, advanced SEO, and dedicated monthly support."
```

### Remove from content.ts

- `video.placeholder` field (dead placeholder copy)
- All NFT/Web3 language from portfolio projects
- Portfolio projects: remove `art-gallery` and `aditya-bharti` entries entirely
- The `"You Could Be Here Next"` portfolio entry

---

## Phase 2 — Structural UI Changes

### 2.1 Navbar — Add CTA Button

File: `src/components/layout/Navbar.tsx`

Add a "Get My Free Demo" button to the right side of the desktop navbar, next to the language dropdown. On mobile, add it to the bottom of the slide-out menu above the language toggle.

Button should call `openBooking()` from `useBooking()` and fire:
```ts
trackEvent('cta_click', { button: 'navbar', location: 'navbar' })
```

### 2.2 BookingProvider — Add Conversion Tracking

File: `src/components/providers/BookingProvider.tsx`

Add `onEventScheduled` callback to PopupModal:
```tsx
<PopupModal
  url="https://calendly.com/adityabharti"
  onModalClose={() => setIsOpen(false)}
  onEventScheduled={() => {
    trackEvent('booking_complete', { source: openSource });
  }}
  open={isOpen}
  rootElement={document.body}
/>
```

Also track `booking_open` when `setIsOpen(true)` is called.

### 2.3 FloatingContact — Add Calendly Button

File: `src/components/ui/FloatingContact.tsx`

Add a third button above WhatsApp and LINE:
- Label: "Free Demo"
- Color: brand-teal
- Action: `openBooking()` from `useBooking()`
- Track: `trackEvent('cta_click', { button: 'floating_calendly' })`

### 2.4 Homepage Section Order

File: `src/app/page.tsx`

New order:
```tsx
<Navbar />
<Hero />
<ProofStrip />          {/* NEW */}
<Services />
<HowItWorks />          {/* + CTA at bottom */}
<CaseStudySpotlight />  {/* NEW — Emporium Tailors */}
<Testimonials />        {/* + CTA at bottom */}
<Pricing />
<AboutSnippet />        {/* NEW — 3 sentences + photo */}
<FinalCTA />            {/* NEW — dark section */}
<Footer />
<FloatingContact />
```

Remove from homepage: `<VideoDemo />`

### 2.5 New Components Required

| Component | File | Description |
|---|---|---|
| `ProofStrip` | `src/components/sections/ProofStrip.tsx` | Single-client proof bar: Emporium Tailors photo, name, result metric, link to case study |
| `CaseStudySpotlight` | `src/components/sections/CaseStudySpotlight.tsx` | Two-column: left = story summary + metrics, right = website screenshot |
| `MidPageCTA` | `src/components/sections/MidPageCTA.tsx` | Reusable CTA block with headline + button. Used after HowItWorks and after Testimonials |
| `FinalCTA` | `src/components/sections/FinalCTA.tsx` | Dark background, large headline, single primary button |
| `AboutSnippet` | `src/components/sections/AboutSnippet.tsx` | 3 sentences + photo, not the full About section |

### 2.6 New Page — Emporium Tailors Case Study

File: `src/app/work/emporium-tailors/page.tsx`

Structure:
```
Header: "How Emporium Tailors Tripled Their Booking Inquiries"
↓
The Problem (no website, foot traffic only)
↓
What Was Built (bilingual, mobile-first, fast)
↓
Timeline (7 days, what happened each day)
↓
Results (3x inquiries, 99 Lighthouse, Google ranking)
↓
Client Quote (with photo when obtained)
↓
CTA: "Want results like these? Get your free demo."
```

### 2.7 Tracking — All Missing Events

File: `src/lib/tracking.ts`

Add typed helper functions:
```ts
export const track = {
  bookingOpen: (source: string) =>
    trackEvent('booking_open', { source }),
  bookingComplete: (source: string) =>
    trackEvent('booking_complete', { source }),
  ctaClick: (button: string, location: string) =>
    trackEvent('cta_click', { button, location }),
  stripeClick: (plan: string) =>
    trackEvent('stripe_click', { plan }),
  portfolioView: (project: string) =>
    trackEvent('portfolio_view', { project }),
  pricingView: () =>
    trackEvent('pricing_view', {}),
};
```

---

## Phase 3 — SEO Fixes

### 3.1 Fix URL Consistency

File: `src/app/sitemap.ts`
- Change `baseUrl` to `https://deft.agency`
- Add blog post slug entries

File: `src/app/robots.ts`
- Already uses `deft.agency` — verify no change needed

File: `src/app/layout.tsx`
- Update `openGraph.url` to `https://deft.agency`
- Update schema `"url"` to `https://deft.agency`
- Add `openGraph.images` pointing to `/og-image.jpg`

### 3.2 Create OG Image

Create or place at: `public/og-image.jpg`
- Dimensions: 1200×630px
- Content: Deft logo, tagline "Get your free website demo", brand colors

### 3.3 Metadata Per Page

Ensure each page has unique, outcome-focused title and description:
- `/`: "Get Your Free Website Demo | Deft — Bangkok Web Design"
- `/pricing`: "Website Pricing for Bangkok Businesses | Deft"
- `/work`: "Results — Emporium Tailors Case Study | Deft"
- `/work/emporium-tailors`: "How Emporium Tailors Tripled Inquiries with a New Website | Deft"

---

## Phase 4 — Portfolio Cleanup

File: `src/data/content.ts`

Remove these portfolio entries entirely:
- `art-gallery` (NFT demo — not a client)
- `aditya-bharti` (personal portfolio — not client work)
- `next` ("You Could Be Here Next" — signals absence of real work)

Keep only: `emporium-tailors`

Add a second entry when a second real client is acquired.

---

## Definition of Done

The implementation is complete when:

- [ ] Navbar has a visible "Get My Free Demo" button on desktop and mobile
- [ ] Calendly popup fires `booking_open` and `booking_complete` events
- [ ] All CTA buttons across the site fire `cta_click` with correct source
- [ ] FloatingContact has a Calendly booking button
- [ ] Homepage section order matches the wireframe
- [ ] ProofStrip component exists below Hero
- [ ] CaseStudySpotlight section exists with Emporium Tailors content
- [ ] MidPageCTA exists after HowItWorks and after Testimonials
- [ ] FinalCTA section exists at the bottom of homepage
- [ ] VideoDemo section is removed from homepage
- [ ] NFT gallery and personal portfolio are removed from portfolio data
- [ ] Hero copy uses outcome-first messaging
- [ ] HowItWorks steps are written from prospect's perspective
- [ ] Services section shows 5 niche verticals only, no tech jargon
- [ ] About section uses founder framing, not student framing
- [ ] Pricing tiers are renamed to outcome names
- [ ] Sitemap uses consistent domain
- [ ] OG image exists and is referenced in metadata
- [ ] `/work/emporium-tailors` case study page exists
- [ ] Placeholder copy ("Paste your Loom...") is removed from content.ts
