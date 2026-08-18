"use client";

import { sendGAEvent } from '@next/third-parties/google';

// ─────────────────────────────────────────────────────────────
// Core event dispatcher
// ─────────────────────────────────────────────────────────────

const dispatch = (eventName: string, eventData?: Record<string, unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Track] ${eventName}`, eventData ?? {});
  }
  try {
    sendGAEvent({ event: eventName, value: eventData });
  } catch {
    // GA not loaded — silently ignore
  }
};

// ─────────────────────────────────────────────────────────────
// Booking source — every place a booking can originate from
// ─────────────────────────────────────────────────────────────

export type BookingSource =
  | 'navbar'
  | 'hero'
  | 'how_it_works'
  | 'testimonials'
  | 'pricing'
  | 'floating_widget'
  | 'final_cta'
  | 'proof_strip'
  | 'case_study'
  | 'contact'
  | 'unknown';

// ─────────────────────────────────────────────────────────────
// Typed event helpers — use these everywhere, not dispatch()
// ─────────────────────────────────────────────────────────────

export const track = {
  /** Cal.com modal opened */
  bookingOpen: (source: BookingSource) =>
    dispatch('booking_open', { source }),

  /** Cal.com booking successfully created (onBookingSuccessful) */
  bookingComplete: (source: BookingSource) =>
    dispatch('booking_complete', { source }),

  /** Any CTA button clicked */
  ctaClick: (button: string, source: BookingSource) =>
    dispatch('cta_click', { button, source }),

  /** Stripe plan link clicked */
  stripeClick: (plan: string) =>
    dispatch('stripe_click', { plan }),

  /** Portfolio project viewed */
  portfolioView: (project: string) =>
    dispatch('portfolio_view', { project }),

  /** Pricing section entered viewport */
  pricingView: () =>
    dispatch('pricing_view', {}),

  /** Language switched */
  languageSwitch: (lang: 'en' | 'th') =>
    dispatch('language_switch', { lang }),

  /** Contact form submitted */
  formSubmission: (status: 'success' | 'error') =>
    dispatch('form_submission', { form: 'contact', status }),
};

// ─────────────────────────────────────────────────────────────
// Legacy compatibility — keeps existing callers working
// ─────────────────────────────────────────────────────────────

export const trackEvent = (
  eventName: string,
  eventData?: Record<string, unknown>
) => dispatch(eventName, eventData);
