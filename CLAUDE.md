# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev            # dev server (Turbopack)
npm run build          # production build — also runs the TypeScript check
npm run lint           # eslint (flat config, eslint-config-next)
npx tsc --noEmit       # typecheck only, faster than a full build
```

There is no test suite. `npm run build` is the gate — it type-checks and prerenders every route.

`npx eslint src` currently reports 2 pre-existing errors (`no-explicit-any` on the Cal.com `cal("ui")`
call in `FinalCTA`, and `react-hooks/set-state-in-effect` on the `mounted` flag in `Navbar`). They
predate current work — don't treat them as regressions introduced by your change.

Required env vars live in `.env.local`: `NEXT_PUBLIC_EMAILJS_*` (contact form), `NEXT_PUBLIC_GA_ID`
(analytics; absent = GA silently skipped).

## Architecture

Next.js 16 App Router marketing site for a Bangkok web-design agency. Everything is static —
no database, no API routes. Third-party services are reached from the client.

### Content lives in data files, not components

- `src/data/content.ts` — all marketing copy plus the portfolio project list, keyed `en` / `th`.
- `src/data/pricing.ts` — plans, features, and Stripe payment links.

`src/context/LanguageContext.tsx` **hardcodes English** (`CONTENT.en`); the `th` half of both files
is currently dead. The `useLanguage()` hook and the `lang` field are kept only so callers compile.
If you edit copy, edit `en` — syncing `th` achieves nothing until the switcher comes back.

`FAQ`, `Hero`, `About`, `FounderSnippet` and `FinalCTA` keep their copy inline instead. `content.ts`
is only read for `services`, `how`, `portfolio` and `contact` — check before assuming a key is live.

**No invented proof.** The site used to ship six made-up testimonials, a "spots almost gone" footer
line and unmeasured case-study stats ("3x inquiries", "99/100 Lighthouse"). All were removed. Do not
add reviews, ratings, client counts or result metrics unless the user supplies them as real. Proof on
this site is the work itself and the founder.

Home page order: `Hero` (which embeds `WorkShowcase`) → `Services` (ticker band) → `HowItWorks` → `Pricing` →
`FounderSnippet` → `FAQ` → `FinalCTA`. Page-level sections take `headingAs="h1"` when they open a
route (`Pricing`, `FounderSnippet`); `Portfolio` and `Contact` always render the page `h1`.

Brand and founder facts (used across `FounderSnippet` / `About` / `SocialLinks`): Aditya Bharti,
CS at VIT Chennai, Thai national raised in India, Bangkok-based. GitHub `dormeneur`, Instagram
`@ifnotadi`, LinkedIn `aadityabhartii`. Prior work: V Help (1,260+ daily users), JARVIS. Keep site
copy to these — the founder card previously shipped invented metrics and they were removed.

Adding a portfolio project means adding an entry to `CONTENT.en.portfolio.projects`; it appears on
`/work` (`Portfolio`, one ruled row per project) automatically. The home-page `WorkShowcase` picks
three by id. Each project has `images: [default, hover]` — the second fades in on hover. Screenshots
live in `public/portfolio/<name>-1.webp` / `-2.webp`, ~1600px wide (sources in the git-ignored `assets/`) — the export has no image
optimizer, so resize before committing (`sharp` is in `node_modules`).

### Booking flow — scroll only, never a popup

`components/providers/BookingProvider.tsx` exports the `useBooking()` hook (no provider, no
context — it holds no state). Every "book a call" button calls `openBooking(source)`; none of them
talk to Cal.com directly.

`openBooking` scrolls to `#book-calendar`, or routes to `/contact#book-calendar` if the page somehow
lacks it. **There is no modal path, and adding one back is a regression.** The old version init'd the
Cal embed API on mount and fell back to `Cal.ns[...]("modal")`. Cal injects that modal into `<body>`,
which survives client-side navigation, so a modal opened on one page could reappear on another
without a click.

**Every page must render `<FinalCTA />`** — it owns `#book-calendar` and is the only thing that loads
the Cal embed script. All six routes currently do. Keep the id stable.

The Cal namespace/link pair (`project-discussion` / `adityabharti/project-discussion`) now lives only
in `FinalCTA`.

### Smooth scrolling

`components/providers/SmoothScroll.tsx` wraps the app in Lenis (`lerp: 0.09`, same as app.vhelpcc.com;
off under reduced motion, native on touch). Lenis owns the scroll position, so scroll programmatically
with `useLenis().scrollTo(...)` as `useBooking` does — never `scrollIntoView({ behavior: "smooth" })`
or CSS `scroll-behavior: smooth`. Give any inner scroll container `data-lenis-prevent`.

### Analytics

`src/lib/tracking.ts` is the only place that touches GA. Use the typed `track.*` helpers and the
`BookingSource` union rather than raw event names, so booking attribution stays consistent.

### Insights (blog)

MDX files in `content/insights/*.mdx`, read at build time by `src/lib/mdx.ts` (fs + gray-matter) and
rendered through `next-mdx-remote`. Frontmatter drives sorting by `date`.

## Styling

Tailwind v4, CSS-first config — there is no `tailwind.config`. Tokens are declared in
`src/app/globals.css` under `@theme inline` (Tailwind class names) and mirrored in `:root`
(consumed as raw CSS vars). Adding a brand colour means adding it in **both** places.

Dark theme only: black `#000` background, hairline `#232323` borders, green `#4ADE80` as the single
accent (CTAs, active states, small metadata). The amber token exists but is unused. Text is white,
`brand-muted` (#999) or `brand-subtle` (#8A8A8A) — nothing dimmer, it fails contrast on black.

Fonts: Bricolage Grotesque for headlines (`font-heading`, `.display-headline`, `.section-headline`),
Instrument Sans for everything else. Sections are separated by rules (`Section variant="divide"`) and
ruled rows, not cards; corners are `rounded-lg` at most — except buttons, which are full capsules. No eyebrow labels above headings, no glows.

### Interaction primitives

`globals.css` defines a small set of reusable, JS-free effects. Prefer them over per-component
hover styling — they are what makes the interactions feel like one system:

| Class | Effect |
|---|---|
| `.btn-wipe` | radial colour wipe + lift on hover. Add `.btn-wipe-teal` / `.btn-wipe-light` when green / white should flood a dark or outline button; the default white suits green buttons |
| `.btn-primary` / `.btn-ghost` / `.btn-sm` | button shape and colour. Every CTA is `btn-wipe btn-primary` (or `btn-wipe btn-wipe-light btn-ghost` for the secondary) |
| `.link-rule` | text link whose underline draws in from the left |
| `.ticker` | the services band: a fast full-width marquee (`Services`). Speed is the `animation` duration in `globals.css`; hover slows it via `playbackRate` in JS (changing the duration on hover makes the track jump) |
| `.nose-nudge` | the hero's "See pricing" shape: pulls right, snaps back, bounces, rests, repeats. Paused on hover, off under reduced motion and below `sm` |
| `.rise` | hero entrance (fade + lift + blur), staggered with `--i`. Used once, in `Hero` — don't spread it across sections |
| `.card-wipe` | corner dot expands to flood the whole card — pair with Tailwind `group-hover:` for text recolouring |
| `[data-tooltip="…"]` | CSS tooltip above the element. Never put it on something with `overflow: hidden` (e.g. `.btn-wipe`) — it gets clipped |
| `.social-pill` | icon pill that opens to show the handle in the platform's colour; used by `ui/SocialLinks` |
| `.progress-loader` | brand loading bar, used by `src/app/loading.tsx` |

Every hover-only rule is wrapped in `@media (hover: hover)` so touch devices never latch a hover
state, and all of them are damped under `prefers-reduced-motion`. Keep new effects to the same two
rules.

UI primitives come from shadcn (Base UI flavour, `components.json`): `ui/accordion` drives the FAQ,
`ui/input` / `ui/textarea` the contact form. Add more with `npx shadcn@latest add <name>`, then check
the generated imports — the CLI once wrote `from "cn"` and installed an unrelated npm package; it must
be `@/lib/utils`. CTAs are raw `<button>` / `<Link>` with the button classes above.

`components/ui/layout-wrappers.tsx` exports `Section` (vertical rhythm + background variant) and
`Container` (max width). Use them rather than repeating `py-20 md:py-28` / `max-w-[1280px]`.
`Section` still accepts a legacy `bg` prop that just maps onto `variant="divide"`.

`Section` drops its default `py-20 md:py-28` entirely when the caller's className contains any
vertical padding — tailwind-merge cannot cancel a `md:` variant with a plain `pt-32`, so the default
used to survive at desktop widths and stack on top of the override. If you pass padding, pass all of
it including the `md:` step. Two adjacent `Section`s always produce ~224px between their content at
`md+`; that is the site rhythm, but it is wrong when the two are really one logical section (this is
what made the insights pages look broken).
