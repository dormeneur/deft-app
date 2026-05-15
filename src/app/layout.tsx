import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Sarabun } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { BookingProvider } from "@/components/providers/BookingProvider";
import { Toaster } from "sonner";
import Script from "next/script";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0F766E",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Deft",
    default: "Deft | Premium Web Design Agency in Bangkok",
  },
  description: "We build fast, high-converting websites for Thai businesses. Minimalist design, affordable pricing, and real monthly support.",
  keywords: ["web design bangkok", "website agency thailand", "local business websites", "react development", "custom websites bangkok"],
  openGraph: {
    title: "Deft | Premium Web Design Agency in Bangkok",
    description: "Your business, beautifully online. Premium, fast, and affordable websites for local businesses in Thailand.",
    url: "https://deft.agency",
    siteName: "Deft",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deft | Premium Web Design",
    description: "Your business, beautifully online.",
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
      className={`${cormorantGaramond.variable} ${sarabun.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>
          <BookingProvider>
            {children}
            <Toaster position="bottom-center" toastOptions={{
              className: 'bg-brand-bg border-brand-border text-brand-text font-sans shadow-xl'
            }} />
          </BookingProvider>
        </LanguageProvider>
        <Script id="schema-local-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </body>
    </html>
  );
}
