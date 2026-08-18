# Deft — Full Strategy Session
> Complete record of the audit, strategic analysis, and implementation planning conducted in this session.
> Last updated: June 2026

---

## Table of Contents

1. [Full Codebase Audit](#1-full-codebase-audit)
2. [Business-First Strategic Analysis](#2-business-first-strategic-analysis)
3. [Founder's Strategic Commentary](#3-founders-strategic-commentary)
4. [Final Strategy — Positioning, Offer, and Conversion Architecture](#4-final-strategy)
5. [Implementation Roadmap](#5-implementation-roadmap)
6. [Homepage Wireframe](#6-homepage-wireframe)
7. [Architectures](#7-architectures)
8. [Immediate Actions Before Any Code](#8-immediate-actions-before-any-code)

---

## 1. Full Codebase Audit

### Architecture

| Dimension | Detail |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript |
| React | 19.2.4 |
| Styling | Tailwind CSS v4 |
| Component Library | shadcn/ui (Radix primitives) |
| Animations | Framer Motion v12 |
| Icons | Lucide React |
| Fonts | Cormorant Garamond (headings) + Sarabun (body/Thai) |
| CMS | None — content hardcoded in `src/data/content.ts` |
| Router | App Router |
| Server Components | Yes — page level; sections are `"use client"` for Framer Motion |
| Static Generation | Default Next.js static; `generateStaticParams` only on blog slug |
| Dynamic Routes | `/insights/[slug]` |

### External Services

| Service | Status | Notes |
|---|---|---|
| Calendly | ✅ Integrated | `react-calendly` PopupModal via BookingProvider |
| Stripe | ✅ Integrated | Direct payment links only — no embedded checkout |
| EmailJS | ✅ Integrated | Contact form submissions to personal Gmail |
| GA4 | ✅ Integrated | via `@next/third-parties/google`, conditional on env var |
| Clarity | ❌ Not installed | |
| Resend | ❌ Not installed | |
| HubSpot | ❌ Not installed | |
| PostHog | ❌ Not installed | |

### Current Pages

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/pricing` | Standalone pricing page |
| `/work` | Portfolio page |
| `/contact` | Contact form + About section |
| `/insights` | Blog listing |
| `/insights/[slug]` | Blog post (1 article exists) |

### Analytics — What Is and Isn't Tracked

**Currently tracked:**
- `form_submission` (success/error) on contact form
- `language_switch` on navbar language toggle

**Not tracked (critical gaps):**
- `booking_open` — Calendly popup open
- `booking_complete` — `onEventScheduled` callback
- `cta_click` — any "Book Free Call" button
- `stripe_click` — any pricing plan click
- `portfolio_view` — which project viewed
- `scroll_depth` — 25/50/75/100%
- Any exit intent signals

### SEO Audit

**What exists:**
- `sitemap.ts` — App Router sitemap
- `robots.ts` — allows all
- Metadata API — title, description, keywords, OG, Twitter card
- `LocalBusiness` JSON-LD schema in layout

**Issues found:**
- URL inconsistency: sitemap uses `deft-websites.vercel.app`; robots.ts uses `deft.agency`; schema uses `deft.agency`
- OG image references `/og-image.jpg` which does not exist in `/public`
- Blog post slug not included in sitemap
- No explicit canonical tags
- Blog article is under 300 words and developer-focused

### Conversion Funnel Gaps

| Location | CTA Present? | Tracked? |
|---|---|---|
| Navbar | ❌ No CTA button | — |
| Hero | ✅ | ❌ |
| After VideoDemo | ❌ | — |
| After Services | ❌ | — |
| After HowItWorks | ❌ | — |
| Pricing cards | ❌ Stripe links only | ❌ |
| After Testimonials | ❌ | — |
| Contact section | ✅ (below form) | ❌ |
| FloatingContact widget | ❌ WhatsApp/LINE only | — |

### Content Problems Found

- **VideoDemo section**: `"Paste your Loom or YouTube demo URL here"` is live placeholder copy in `content.ts`
- **HowItWorks Step 1**: "We reach out to local businesses directly" — reads as cold-calling from the agency's perspective, not the prospect's
- **Services**: "Supabase backend," "Backend Systems" — developer jargon irrelevant to target clients
- **About section**: Buried on the `/contact` page — invisible to 90% of visitors
- **Portfolio**: Personal portfolio and NFT demo presented alongside the one real client case study
- **Hero stats**: `฿2,000 Starting at`, `7 Days Live in`, `Monthly Ongoing support` — features, not outcomes

---

## 2. Business-First Strategic Analysis

### Top 10 Reasons a Prospect Would NOT Hire Deft Today

1. **One real client.** Portfolio has Emporium Tailors (real), a personal developer portfolio, and an NFT art demo. Any prospect spending 90 seconds investigating understands they would be client number two.

2. **The founder is introduced as a student.** "Computer Science Engineering student" signals: what happens when exams start? Is this a side project? The framing triggers reliability doubts before the pitch begins.

3. **No face, no trust.** No photo of Aditya anywhere. The founder avatar is a single letter in a teal circle. In the Thai business context, personal relationships and faces matter enormously.

4. **No answer to "what if something goes wrong?"** No SLA, no support policy, no response time guarantee beyond "monthly support." A restaurant owner has zero reassurance about Friday night downtime.

5. **Unverifiable testimonials.** "Khun Somchai P." with no photo, no business link, no before/after. In 2026 unverified quotes read as fabricated. They create more doubt than they resolve.

6. **Pricing page sends cold visitors directly to Stripe.** A ฿15,000 purchase from a cold visitor with no prior relationship does not happen. No middle step exists. The message is "pay first, talk later."

7. **The website speaks to everyone.** Restaurants, salons, tailors, e-commerce, NFT galleries, backend systems. A restaurant owner looking at a site that also builds "decentralized NFT art spaces" does not feel understood.

8. **No geographic authority.** Says "Bangkok" but no Google Reviews, no local associations, no specificity beyond one Sukhumvit address. Emporium Tailors is the only proof of local presence and it is buried in a carousel.

9. **No risk reversal.** No money-back guarantee, no "free demo first" as a front-facing offer. The most powerful differentiator — "we show you a working demo before you pay" — is mentioned in one testimonial, never positioned as the actual offer.

10. **Positioning contradiction.** Premium design language with ฿2,000 pricing. A prospect either thinks quality is poor because it's cheap, or that the premium presentation is theater. Both block conversion.

### What a Local Business Owner Thinks After 60 Seconds

Internal monologue reconstructed:

> *"Nice looking site. Fast. Okay so they do websites for restaurants, salons — that's me. ฿2,000 starting, seems very cheap — too cheap? Or is there a catch with the monthly fee? Who actually built this? Let me check the portfolio. Emporium Tailors — okay that's real, I know that area. 'Tripled booking inquiries' — but that's just one place. The other two don't seem like real clients. Who is Aditya Bharti? A student? Does he work alone? What if I need changes at 10pm? Can I call someone? How long has this business existed? Will they still be around next year?"*

Every one of those questions goes unanswered. The visit ends with uncertainty, not conviction.

### Freelancer vs. Agency vs. Premium Signals

**Signals that say "freelancer / student project":**
- "run by Aditya Bharti, a Computer Science Engineering student"
- Single-initial avatar instead of real photo
- Personal portfolio presented alongside client work
- No team page or team mentions
- Starting price of ฿2,000
- Personal Calendly handle (`calendly.com/adityabharti`)
- Personal Gmail visible in contact details
- "First project: Emporium Tailors" in About

**Signals that say "premium agency":**
- Design quality is genuinely excellent — typography, spacing, color system
- Bilingual EN/TH — signals local commitment
- 99/100 Lighthouse claim on Emporium Tailors
- Stripe integration (not just "contact me")
- JSON-LD schema markup
- Tiered pricing structure

**Split: approximately 60% freelancer signals / 40% premium signals.**

### Sections Actively Reducing Trust

- **Portfolio carousel**: Auto-advancing through two non-client projects is harmful. "You Could Be Here Next" slide signals scarcity of real work.
- **VideoDemo section**: Raw HTML5 `<video>` player with browser controls looks unfinished. Signals technical laziness to the audience evaluating technical competence.
- **About section on contact page**: The most important brand story is invisible to anyone who doesn't navigate to `/contact`.
- **HowItWorks Step 1**: "We reach out to local businesses directly" — describes cold-calling, reduces perceived exclusivity.
- **Placeholder copy in content.ts**: "Paste your Loom or YouTube demo URL here" — live in the codebase, signals unfinished product.

### To Double Booked Calls Without Changing Traffic

In strict priority order:
1. Add "Book Free Call" button to navbar (visible on every scroll, every page)
2. Replace CTA copy: "Book a Free Call" → "See Your Website Demo — Free"
3. Add Calendly to FloatingContact widget (self-service, lower friction than WhatsApp)
4. Add hard booking CTA after HowItWorks (most qualified visitors have no action to take)
5. Add `onEventScheduled` tracking to Calendly

### What's Missing to Close a ฿15,000 Premium Deal

- **Proof that it worked before** — one strong case study with real numbers
- **A face** — photo of Aditya
- **Process description** — what the ฿15,000 experience actually feels like, step by step
- **Risk reversal** — the demo-first approach needs to be the headline offer, not a buried testimonial detail
- **Premium-tier proof** — the three testimonials are appropriate for Starter/Growth; there is no proof point for a ฿15,000 investment

### Sections to Completely Remove

| Section | Reason |
|---|---|
| NFT Art Gallery from portfolio | Not a client; implies serving a completely different audience |
| Personal portfolio from portfolio | Not client work; reveals one-person operation |
| "You Could Be Here Next" carousel slide | Signals absence of real work |
| VideoDemo section (current form) | Raw video player is worse than no section |
| Six-category services grid | Narrow to 4–5 niche-relevant categories; delete "Backend Systems" and "E-Commerce" from homepage |

### Over-Engineered for Visual Appeal, Underperforming for Conversion

- **Portfolio carousel animation system**: Spring physics and directional slides make the content harder to read. A prospect reading the Emporium Tailors case study is fighting the animation.
- **Abstract circle decorations in Hero**: Zero information value. Three barely-visible concentric rings are a developer's placeholder, not a conversion element.
- **Framer Motion entrance animations on every section heading**: Now a commodity pattern. Delays the moment a prospect can read content.

---

## 3. Founder's Strategic Commentary

The following strategic guidance was provided during the session and should be treated as business decisions, not suggestions.

### The Core Insight

> *The website has a proof problem, not a CTA problem. You could add 15 booking buttons and quadruple the analytics events and the conversion rate would still be low, because a prospect with a real budget reads the page and cannot find enough evidence to trust you with their money.*

**The correct sequencing is: manufacture proof first, then build the funnel to promote it.**

### Three Actions Before Writing a Single Line of Code

**1. Get a testimonial from Emporium Tailors**

This is the highest ROI activity in the entire business right now. Request:
- Owner photo
- Store photo
- Permission to use their logo
- Before/after description (no website → website)
- Approximate inquiry increase
- Short video testimonial (ideal but not required)

Even a single sentence — *"Since launching the website we've received significantly more online inquiries and customers can now find us easily"* — with a real face and logo is worth more than 50 animations.

**2. Create one killer case study**

Not a portfolio item. A case study. Structure:
```
Problem → Why Emporium needed a website
↓
What was built
↓
Timeline
↓
Results
↓
Client quote
↓
Call To Action
```
One strong case study can close the next 3 clients.

**3. Decide the niche**

Current service list weakens trust:
- Restaurants
- Salons
- Tailors
- E-commerce
- NFT portfolios
- Backend systems

Recommended: **"Websites for Bangkok local businesses"** or **"Websites for tailors, salons, and service businesses"** for the next 6–12 months.

### On the Student Framing

**Bad:** "Computer Science Engineering Student"
**Good:** "Founder of Deft. Building websites for Bangkok businesses. Studying Computer Science at VIT Chennai."

The first makes you sound inexperienced. The second makes you sound ambitious. Same facts, different frame. Lead with identity and purpose, not student status.

### On Niche vs. Generalist

Use **"Bangkok local businesses"** as external-facing positioning (broad enough to attract, specific enough to exclude SaaS and Web3), but structure the services section to list the exact verticals (restaurants, salons, tailors, repair shops, clinics). A restaurant owner sees themselves immediately; the positioning doesn't turn away a clinic or law firm.

---

## 4. Final Strategy

### Positioning Statement

> *Deft builds fast, professional websites for Bangkok's local service businesses — restaurants, salons, tailors, and shops — that are losing customers because they have no credible online presence. We deliver in 7 days and show you a working demo before you pay anything.*

### The Three Positioning Pillars (in order of importance)

1. **Risk-free first step.** You see the demo before you pay. Nothing to lose.
2. **Built for Bangkok local businesses.** Not a generic template. A website your local customers will trust.
3. **Delivered in 7 days.** Not months. Done.

These answer the three questions every local business owner asks:
- *What if I don't like it?* → You see it first.
- *Is this for a business like mine?* → Yes, specifically Bangkok service businesses.
- *How long will this take?* → 7 days.

### The Single Strongest Offer: The Deft Preview

> *Tell us about your business. We'll build a working demo of your new homepage — free — and show it to you on a 30-minute call. No payment. No commitment. If you love it, we launch within 7 days.*

**Why this offer is powerful:**
- Eliminates the prospect's primary objection ("I don't know what I'll get") before the conversation starts
- Costs the prospect nothing
- Gives them something tangible to show their business partner before deciding
- Filters for serious prospects (they share business information to trigger the demo)
- Turns the discovery call into a presentation, not a sales pitch
- Completely differentiated — no other Bangkok web agency offers this
- Already what Deft does (Khun Chaiwat's testimonial confirms it)

**Framing for the homepage:**
> *Before you spend a single baht, you'll see exactly what your new website looks like.*

Sub-line:
> *We build your homepage demo — completely free — and walk you through it on a 30-minute call. Most clients book within 24 hours.*

### Pricing Strategy

**Rename tiers to outcomes:**

| Current Name | New Name | Price |
|---|---|---|
| Starter | Online Presence | ฿2,000 + ฿200/mo |
| Growth | Growth Engine | ฿6,000 + ฿600/mo |
| Premium | Full Transformation | ฿15,000 + ฿1,500/mo |

**Outcome descriptions:**
- Online Presence: "Customers can find you, trust you, and contact you."
- Growth Engine: "Your website actively generates new inquiries every week."
- Full Transformation: "A complete digital system that works while you sleep."

**Add below the pricing grid:**
> *Not sure which plan is right? We'll show you what your website could look like — for free — before you decide.*

Do not change the prices. They are a strength for the target niche. Frame them better instead.

### CTA Strategy

There is one primary action across the entire site: **Get My Free Demo**

Every CTA is a variation:
- Navbar: "Get My Free Demo"
- Hero: Primary button, full weight
- After HowItWorks: "Ready to see yours? It's free."
- After Testimonials: "Get results like these — book your free demo"
- Pricing: "Start with a free demo first"
- FloatingContact: Calendly labelled "Free Demo"
- Footer: "See your website before you pay"

Every Calendly CTA sets the expectation: *"We'll show you a working demo of your new website."* Not "free consultation." A demo. That is the deliverable.

---

## 5. Implementation Roadmap

Ordered strictly by expected business impact, not development complexity.

### Tier 1 — Proof and Positioning (Highest ROI — Do Before Any Code)

| # | Action | Why | Effort |
|---|---|---|---|
| 1 | Get Emporium Tailors owner photo + result quote | Closes deals; costs zero; changes trust score immediately | Outreach |
| 2 | Get a real photo of Aditya | Every visitor sees this; no site builds personal trust without a face | Photography |
| 3 | Rewrite hero with "The Deft Preview" offer | Changes what every visitor understands in the first 5 seconds | Copy |
| 4 | Build the full Emporium Tailors case study page (`/work/emporium-tailors`) | Single page answering every Premium prospect objection | Content + Code |
| 5 | Remove NFT/personal projects from portfolio | Trust increases immediately; costs 2 minutes | Config change |
| 6 | Decide and commit to Bangkok local business niche | All copy, SEO, and positioning work compounds from this decision | Decision |
| 7 | Reframe Aditya's bio (founder framing, not student framing) | Low effort; meaningful trust impact | Copy |

### Tier 2 — Funnel Infrastructure

| # | Action | Why |
|---|---|---|
| 8 | Add navbar CTA button "Get My Free Demo" | Affects 100% of all visits |
| 9 | Add Calendly to FloatingContact widget | Persistent access to booking on all pages |
| 10 | Add `onEventScheduled` tracking to BookingProvider | Enables measurement of everything |
| 11 | Track every CTA click with event name and location | Know which CTAs convert |
| 12 | Add post-HowItWorks CTA block | Captures most qualified mid-funnel intent |
| 13 | Add post-Testimonials CTA block | Captures convinced visitors with no action |
| 14 | Add booking path to pricing page ("Not sure? Start with a free demo first") | Recovers lost high-value leads |

### Tier 3 — SEO and Technical Fixes

| # | Action |
|---|---|
| 15 | Fix URL inconsistency: align sitemap, robots.ts, and schema to single domain |
| 16 | Add blog post slugs to sitemap |
| 17 | Create `/public/og-image.jpg` and reference it in metadata |
| 18 | Rewrite blog article to be client-focused with booking CTA at end |

### Tier 4 — Content and Copy

| # | Action |
|---|---|
| 19 | Rewrite services section — outcome language, no tech jargon, 4–5 niche verticals only |
| 20 | Rewrite HowItWorks from prospect's perspective (not Deft's operational perspective) |
| 21 | Strengthen testimonials — add result metrics, business type badge, richer attribution |
| 22 | Remove VideoDemo section until a polished, professional demo video exists |
| 23 | Rewrite pricing plan framing (outcome names, outcome descriptions) |

### Tier 5 — Growth Layer

| # | Action |
|---|---|
| 24 | Acquire one more real client project (second proof point) |
| 25 | Service-specific landing pages (`/services/restaurant-websites`, etc.) for long-tail SEO |
| 26 | Strengthen blog content strategy — one article per vertical per month |

### All Business Activities Ranked by Expected ROI

| Rank | Activity | Reason |
|---|---|---|
| 1 | Emporium Tailors owner photo + result quote | Closes deals; costs zero |
| 2 | Real photo of Aditya | Every visitor sees this |
| 3 | Rewrite hero with Deft Preview offer | First 5 seconds of every visit |
| 4 | Full Emporium Tailors case study page | Single page answering every objection |
| 5 | Remove NFT/personal projects from portfolio | Immediate trust increase; 2 minutes |
| 6 | Navbar CTA button | 100% of all visits |
| 7 | Calendly in FloatingContact | All pages, persistent |
| 8 | Acquire one more real client | Changes perception from "one tailor" to "pattern" |
| 9 | Commit to Bangkok local business niche | All subsequent work compounds |
| 10 | Post-section CTAs | Captures mid-funnel intent |
| 11 | Reframe Aditya bio | Low effort, meaningful trust impact |
| 12 | Rewrite pricing plan framing | Supports Premium close |
| 13 | `onEventScheduled` tracking | Enables measurement |
| 14 | Fix URL inconsistency | SEO hygiene; 15 minutes |
| 15 | Rewrite blog article | Long-term SEO and conversion |
| 16 | Remove VideoDemo section | Removes active trust damage |
| 17 | All other analytics events | Useful after funnel has volume |
| 18 | Service-specific landing pages | Month 3–6 SEO play |

---

## 6. Homepage Wireframe

```
┌────────────────────────────────────────────────────┐
│ NAVBAR                                             │
│ Deft    [Home] [Work] [Pricing] [Insights]         │
│                          [Get My Free Demo ▶]      │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ HERO                                               │
│                                                    │
│  [badge: Web Design for Bangkok Businesses]        │
│                                                    │
│  More customers find you.                          │
│  More customers trust you.                         │
│  See your website before you pay.                  │
│                                                    │
│  [sub: We build a working demo of your new website │
│   — free — and show it to you before you spend a  │
│   single baht.]                                    │
│                                                    │
│  [Get My Free Demo ▶]    [See Our Work]            │
│                                                    │
│  ─── Emporium Tailors · 3x more inquiries ────    │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ PROOF STRIP  (immediately below hero)              │
│                                                    │
│  [Owner photo]  [Store photo / logo]               │
│  "3x booking inquiries in the first month"         │
│  — Owner Name, Emporium Tailors, Sukhumvit         │
│                         [Read the case study →]    │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ WHO THIS IS FOR                                    │
│                                                    │
│  We build websites for:                            │
│  [🍜 Restaurant]  [✂️ Salon]  [👔 Tailor]          │
│  [🔧 Repair Shop]  [🏥 Clinic]                     │
│                                                    │
│  "If your customers can't find you online,         │
│   you're losing them to competitors who are."      │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ HOW IT WORKS                                       │
│                                                    │
│  01. Tell us about your business                   │
│      Fill in a short form. 2 minutes.              │
│                                                    │
│  02. We build your demo — free                     │
│      A real working homepage for your business.    │
│      No templates.                                 │
│                                                    │
│  03. We launch in 7 days                           │
│      You approve it, we go live.                   │
│      Monthly support from day one.                 │
│                                                    │
│              [Start with Your Free Demo ▶]         │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ CASE STUDY — EMPORIUM TAILORS                      │
│                                                    │
│  [Before / After website screenshot]               │
│  [Photo of store or owner]                         │
│                                                    │
│  The problem → The build → The result              │
│  3x inquiries. 99/100 Lighthouse. 7 days.          │
│                                                    │
│  [Owner photo + full name + quote]                 │
│                              [Full story →]        │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ TESTIMONIALS                                       │
│  (3 cards; business type badge; result metric)     │
│                                                    │
│         [Book your free demo today ▶]              │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ PRICING                                            │
│                                                    │
│  Online Presence / Growth Engine /                 │
│  Full Transformation                               │
│                                                    │
│  [Not sure which plan? Start with a demo first]    │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ ABOUT (3 sentences + real photo)                   │
│                                                    │
│  Founder of Deft. Building websites for Bangkok    │
│  businesses since 2025. Studying Computer Science  │
│  at VIT Chennai.                                   │
│                                                    │
│  [Real photo of Aditya]                            │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ FINAL CTA  (dark background section)               │
│                                                    │
│  See your website before you pay for it.           │
│                                                    │
│       [Get My Free Demo — It's Free ▶]             │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│ FOOTER                                             │
└────────────────────────────────────────────────────┘
```

---

## 7. Architectures

### Messaging Hierarchy

Each section earns the right to the next by answering one question:

| Section | Question It Answers |
|---|---|
| Hero | What do I get? What's the risk? |
| Proof Strip | Has this worked before? |
| Who This Is For | Is this for a business like mine? |
| How It Works | What actually happens? |
| Case Study | Can I see a real example with real results? |
| Testimonials | Do other people like me trust this? |
| Pricing | Can I afford this? |
| About | Who is behind this? Can I trust them? |
| Final CTA | What do I do next? |

### Trust Architecture

Trust is built in layers. Each must exist before the next one works.

**Layer 1 — I am real and findable**
Aditya's real name, real photo, real location, real phone number. Google Maps showing a real place. Professional email (`aditya@deft.agency`), not personal Gmail.

**Layer 2 — I have done this before**
Emporium Tailors case study. The business is real, searchable, has a website visitors can click through to. The result (3x inquiries) is attributed to a named, real person.

**Layer 3 — Other people trust me**
Testimonials with business types, locations, and result metrics. Specificity builds credibility: "Khun Nattaya, Beauty Salon, Thonglor" is more credible than "N.R., satisfied customer."

**Layer 4 — You have nothing to lose**
The Deft Preview offer removes financial risk entirely. "We build it before you pay" is the trust-completing layer that converts a skeptical prospect into a booked call.

### Offer Architecture

```
PRIMARY OFFER
└── The Deft Preview
    ├── What it is: Working homepage demo, built for your business, free
    ├── What it costs: Zero
    ├── What happens: 30-min call where you see the demo live
    ├── Commitment required: None
    └── CTA: "Get My Free Demo"

SECONDARY OFFER (for visitors not ready to demo)
└── Free Website Review
    ├── What it is: Review of their current site or competitor's
    ├── What it costs: Zero
    ├── What you get: 5-point written assessment
    └── CTA: "Get a Free Review" (captures email)

PURCHASE OFFERS (for visitors ready to buy)
├── Online Presence — ฿2,000 + ฿200/mo
├── Growth Engine — ฿6,000 + ฿600/mo
└── Full Transformation — ฿15,000 + ฿1,500/mo
    └── Each links to Stripe OR to "Book a call first"
```

### Conversion Architecture

```
Traffic arrives
    ↓
Hero answers: Who is this for? What do I get? What's the risk?
    ↓
Proof strip answers: Has this worked before?
    ↓
Services section answers: Is this for my business type?
    ↓
How It Works answers: What actually happens?
    ↓
Case study answers: Can I see a real example?
    ↓
Testimonials answer: Do other people like me trust this?
    ↓
Pricing answers: Can I afford this?
    ↓
Final CTA: One button. No hesitation.
    ↓
Calendly: Books call with expectation set
("We'll show you a working demo of your new website")
    ↓
30-minute call happens → Demo presented → Decision made
    ↓
Closed deal
```

### Scores (Baseline — Pre-Implementation)

| Dimension | Score | Key Reason |
|---|---|---|
| Conversion | 28/100 | No persistent CTA, no tracking, pricing goes direct to payment |
| Trust | 31/100 | One real client, unverifiable testimonials, student framing, no photo |
| Positioning | 22/100 | Serves everyone; "beautifully online" is decorator language; no differentiated offer |
| Premium Perception | 45/100 | Design is premium; pricing and framing are contradictory |
| Lead Generation | 19/100 | Zero funnel events tracked, no mid-page CTAs, no lead magnet |

---

## 8. Immediate Actions Before Any Code

These three assets must be obtained or created before implementation begins. They determine 80% of the conversion impact of all future changes.

### Action 1 — Emporium Tailors Testimonial (Highest Priority)

Contact the owner directly. Request:
- [ ] Owner photo (phone photo acceptable if clear)
- [ ] Store exterior or interior photo
- [ ] Permission to use their business name and logo
- [ ] One-sentence result quote (e.g., "Since launching the website we've received significantly more online inquiries")
- [ ] Approximate inquiry increase if they will share it
- [ ] Short video testimonial if they are willing

Even the minimal version — one sentence, one face, one logo — changes the trust score of the entire site more than any UI work.

### Action 2 — Real Photo of Aditya

A professional headshot or clean-background photo. Can be taken with a phone in good light. This is non-negotiable. No business in Bangkok will spend ฿15,000 with a teal circle containing the letter "A."

### Action 3 — Confirm the Deft Preview Offer

Before the offer can be featured on the site, confirm:
- [ ] The offer name "The Deft Preview" is approved
- [ ] The copy ("We build your homepage demo — completely free — and walk you through it on a 30-minute call") is approved
- [ ] The Calendly event description is updated to set the demo expectation
- [ ] Aditya is prepared to build a simple demo before each scheduled call

### Gate

**Do not begin Tier 2 (funnel infrastructure) implementation until the above three actions are complete.** The funnel will drive traffic to a proof-less page and waste every visitor if the proof assets are not in place first.

---

## Appendix — Key Decisions Made This Session

| Decision | Recommendation | Status |
|---|---|---|
| Niche or generalist? | Bangkok local service businesses | Recommended — pending final decision |
| Primary offer? | The Deft Preview (demo before payment) | Recommended |
| Remove NFT gallery? | Yes, immediately | Recommended |
| Remove personal portfolio from portfolio? | Yes, immediately | Recommended |
| Student vs. founder framing? | Lead with founder, mention student as context | Recommended |
| Pricing changes? | Rename tiers, rewrite descriptions — no price changes | Recommended |
| VideoDemo section? | Remove until professional demo video exists | Recommended |
| About section location? | Move to homepage, create standalone `/about` page | Recommended |
| Portfolio section format? | Replace carousel with static expandable case studies | Recommended |
| FloatingContact? | Add Calendly alongside WhatsApp/LINE | Recommended |

---

*This document captures the complete strategic session. Implementation should not begin until Tier 1 proof assets are confirmed and the strategic decisions above are finalized by the founder.*
