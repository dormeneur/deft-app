---
name: Deft
description: A black storefront with one green light on — a Bangkok web studio that shows the demo first.
colors:
  night: "#000000"
  surface: "#111111"
  surface-raised: "#1A1A1A"
  signal-green: "#4ADE80"
  signal-green-deep: "#16A34A"
  lamp-amber: "#F59E0B"
  paper-white: "#FFFFFF"
  soft-white: "#F5F5F3"
  ash: "#999999"
  ash-dim: "#888888"
  hairline: "#222222"
typography:
  display:
    fontFamily: "Sarabun, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 4.2rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Sarabun, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  serif-accent:
    fontFamily: "Cormorant Garamond, ui-serif, Georgia, serif"
    fontWeight: 400
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Sarabun, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
rounded:
  sm: "7.2px"
  md: "9.6px"
  lg: "12px"
  xl: "16.8px"
  pill: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.night}"
    rounded: "{rounded.pill}"
  button-primary-hover:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.night}"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
  button-outline-hover:
    backgroundColor: "{colors.signal-green}"
    textColor: "{colors.night}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.lg}"
  social-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ash-dim}"
    rounded: "{rounded.pill}"
    height: "40px"
---

# Design System: Deft

## Overview

**Creative North Star: "The Night Shop Window"**

Deft is a lit storefront on a dark Bangkok street: a pure black canvas with a single green light that draws the eye and says *open*. Everything else recedes into near-black surfaces and grey type, so the one thing that glows — a call to book, a card under the cursor — is unmistakable. It is built for owner-run businesses deciding, on a phone, whether to trust a small studio.

Density is generous and calm: wide sections separated by hairlines, large bold sans headlines, short copy. Personality comes from motion, not ornament — buttons and cards *flood* with colour on hover, as though a light switched on inside them. Amber appears as a rare warm secondary, never a second brand colour.

**Key Characteristics:**
- Pure black ground, near-black tonal surfaces, hairline borders.
- One accent (signal green) carries every action; amber is a quiet tag colour.
- Bold Sarabun for headlines and body; Cormorant serif only for select accents.
- Hover = flood of colour plus a small lift. Flat at rest.
- Dark theme only. No light mode.

## Colors

A black canvas with one electric green and one warm amber, everything else grey.

### Primary
- **Signal Green** (#4ADE80): The action colour — primary CTAs, links in prose, focus ring, progress bar, hover flood on outline buttons and cards. Its rarity on screen is what makes it a signal.
- **Signal Green Deep** (#16A34A): Pressed/secondary green where the bright tone is too loud.

### Secondary
- **Lamp Amber** (#F59E0B): Warm secondary for tags and accent surfaces (used at 12% tint as the `accent` background). Never a CTA.

### Neutral
- **Night** (#000000): Page background.
- **Surface** (#111111): Cards and containers.
- **Surface Raised** (#1A1A1A): Muted fills, inset panels.
- **Hairline** (#222222): Borders, dividers, inputs. (`#1f1f1f` also appears as brand-border.)
- **Paper White** (#FFFFFF): Headlines and primary text.
- **Soft White** (#F5F5F3): Prose headings, popovers.
- **Ash** (#999999 / #888888): Secondary and muted text.

### Named Rules
**The One Light Rule.** Green is the only colour that means "act". If two things on a screen glow green at rest, one of them is wrong.
**The Tokens-in-Two-Places Rule.** A new brand colour is declared in both `@theme inline` and `:root` in `globals.css`.

## Typography

**Display / Body Font:** Sarabun (with ui-sans-serif, system-ui)
**Accent Font:** Cormorant Garamond (with ui-serif, Georgia) — `font-heading`, used in prose headings and select accents.

**Character:** Sarabun is sturdy and friendly and covers Thai script, so it suits a Bangkok audience; Cormorant adds an occasional premium note.

### Hierarchy
- **Display** (700, clamp(2.2rem, 5vw, 4.2rem), 1.08): hero headline only (`.display-headline`), letter-spacing -0.025em.
- **Headline** (700, clamp(1.8rem, 3.5vw, 2.8rem), 1.12): section titles (`.section-headline`).
- **Body** (400, base): copy in Ash on black; keep lines to a comfortable measure.
- **Label** (700, 12px, +0.01em): tooltips and small tags.

### Named Rules
**The Two Classes Rule.** Use `.display-headline` and `.section-headline` rather than ad-hoc font-size stacks.

## Layout

A single centred container (`max-w-[1280px]`) inside full-width sections. Sections use `py-20 md:py-28` and are divided by 1px hairlines rather than alternating backgrounds; two adjacent sections yield about 224px between content at `md+`, which is the site rhythm. Pass all padding (including the `md:` step) when overriding, because the default is dropped when any vertical padding is present. Mobile-first: content collapses to a single column with carousels for repeating items (services, testimonials).

## Elevation & Depth

Flat by default. Depth at rest comes from tonal steps (#000 → #111 → #1A1A1A) and hairline borders, never shadows. Shadows exist only as a response to state: a green glow and small lift on hover.

### Shadow Vocabulary
- **Glow Teal** (`box-shadow: 0 0 20px rgba(74, 222, 128, 0.30)`): a primary CTA that should draw the eye.
- **Wipe hover glow** (`box-shadow: 0 0 24px rgba(74, 222, 128, 0.35)` with `scale(1.04)`): `.btn-wipe` on hover.
- **Pill lift** (`0 6px 20px var(--brand-glow)` with `translateY(-2px)`): social pills on hover.

### Named Rules
**The Flat-Until-Touched Rule.** No resting shadows. Glow and lift are earned by hover or focus.

## Shapes

Soft and rounded: base radius 0.75rem (12px) scaled through sm 0.6×, md 0.8×, xl 1.4×. Buttons and social controls are full pills (9999px); cards and panels use 12px+ corners. Borders are always 1px hairlines.

## Components

### Buttons
- **Shape:** full pill (9999px).
- **Primary:** Signal Green fill, black label; hover floods white and lifts (`.btn-wipe`).
- **Outline/dark:** Surface fill, white label, hairline border; hover floods green with a black label (`.btn-wipe .btn-wipe-teal`).
- **Secondary light:** dark button that floods white with a black label (`.btn-wipe-light`).
- Every new CTA carries `.btn-wipe`.

### Cards / Containers
- **Corner Style:** 12px+.
- **Background:** Surface (#111111) with hairline border.
- **Hover:** `.card-wipe` — a green dot in the top-right corner expands to flood the card; text recolours via `group-hover:`.
- **Project cards:** shared `ui/ProjectCard`.

### Social Pills
A 40px circle that opens into the handle on hover and takes on the platform's brand colour; shown open on touch.

### Tooltips
`[data-tooltip]` — white bubble, black bold 12px text, 6px radius, above the element. Never on an `overflow: hidden` element.

### Marquee
Testimonial rows scroll continuously; hover slows the track via `playbackRate` (never by changing animation-duration).

### Progress Loader
150×8px pill track with a green fill sweeping across (`.progress-loader`, used in `app/loading.tsx`).

## Do's and Don'ts

### Do:
- **Do** use Signal Green (#4ADE80) for the single most important action on a screen.
- **Do** wrap every hover-only effect in `@media (hover: hover)` and damp it under `prefers-reduced-motion`.
- **Do** reuse `.btn-wipe`, `.card-wipe`, `.social-pill` before writing bespoke hover styling.
- **Do** use `Section` and `Container` from `ui/layout-wrappers` for rhythm and width.
- **Do** keep copy to confirmed facts.

### Don't:
- **Don't** add a light theme or a second accent colour.
- **Don't** put resting shadows on cards or buttons.
- **Don't** add a booking modal or popup; booking scrolls to `#book-calendar`.
- **Don't** change `animation-duration` on hover for marquees; it makes the track jump backwards.
- **Don't** put `data-tooltip` on an element with `overflow: hidden`.
