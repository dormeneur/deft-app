import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Toaster } from "sonner";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const sans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Deft",
    default: "Deft | Web design studio in Bangkok",
  },
  description: "Deft is a small Bangkok studio that builds websites, booking systems and business tools. You see a working demo of your site before you pay anything.",
  keywords: ["web design bangkok", "website agency thailand", "local business websites", "react development", "custom websites bangkok"],
  openGraph: {
    title: "Deft | Web design studio in Bangkok",
    description: "See a working demo of your new website before you pay anything.",
    url: "https://deft-websites.vercel.app",
    siteName: "Deft",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deft | Web design studio in Bangkok",
    description: "See a working demo of your new website before you pay anything.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Deft Web Design",
    "image": "https://deft.agency/og-image.jpg",
    "url": "https://deft.agency",
    "telephone": "+660638232303",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "535 Sukhumvit Rd, Watthana",
      "addressLocality": "Bangkok",
      "postalCode": "10110",
      "addressCountry": "TH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.731,
      "longitude": 100.570
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$"
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <Toaster position="bottom-center" toastOptions={{
            className: 'bg-brand-surface border-brand-border text-brand-text font-sans'
          }} />
        </LanguageProvider>
        <Script id="schema-local-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
