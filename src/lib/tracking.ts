"use client";

import { sendGAEvent } from '@next/third-parties/google';

/**
 * Utility for tracking analytics events across the application.
 */
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Tracking Event]: ${eventName}`, eventData);
  }

  // Send event to Google Analytics 4 (if enabled via NEXT_PUBLIC_GA_ID)
  try {
    sendGAEvent({ event: eventName, value: eventData });
  } catch (err) {
    // Graceful fallback if GA isn't loaded
  }
};
