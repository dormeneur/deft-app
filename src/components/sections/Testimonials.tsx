"use client";

import type { MouseEvent } from "react";
import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Container, Section } from "@/components/ui/layout-wrappers";

const ALL_ITEMS = [
  { name: "Khun Somchai P.", role: "Street Food Stall · Silom", q: "Before Deft, I had no website at all. Now customers find me on Google every week and I get new orders regularly." },
  { name: "Khun Nattaya R.", role: "Beauty Salon · Thonglor", q: "My old website looked terrible on mobile. Deft redesigned it in a few days — fast, professional, explained everything clearly." },
  { name: "Khun Chaiwat M.", role: "Auto Repair Shop · On Nut", q: "Aditya showed me a working demo before I paid anything. Now I have three times the booking inquiries every month." },
  { name: "Khun Piyaporn S.", role: "Nail Salon · Ekkamai", q: "The website was live in under a week. Clean, fast, and our customers actually use the booking form now." },
  { name: "Khun Thanapol W.", role: "Tailor & Alterations · Asoke", q: "We finally look professional online. Competitors can't match our website quality. Worth every baht." },
  { name: "Khun Araya K.", role: "Home Clinic · Ari", q: "Setup was painless. The site loads instantly and Google now shows us for our neighbourhood searches." },
];

function TestiCard({ name, role, q }: { name: string; role: string; q: string }) {
  const initials = name.split(" ").slice(-2).map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <figure className="shrink-0 w-[320px] md:w-[380px] bg-[#0E0E0E] border border-[#1f1f1f] rounded-2xl p-7 mx-2.5">
      {/* Rating first — one clear signal, nothing competing with it */}
      <div className="flex gap-1 mb-5" role="img" aria-label="Rated 5 out of 5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="w-[19px] h-[19px] fill-brand-gold text-brand-gold" />
        ))}
      </div>

      <blockquote className="text-[15px] md:text-[16px] text-[#A8A8A8] leading-[1.65] mb-7">
        {q}
      </blockquote>

      {/* Attribution — name and role together, not split across the card */}
      <figcaption className="flex items-center gap-3 pt-5 border-t border-[#1a1a1a]">
        <span className="w-9 h-9 shrink-0 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[12px] font-bold text-brand-teal">
          {initials}
        </span>
        <span className="min-w-0">
          <span className="block text-[14px] font-semibold text-white leading-tight">{name}</span>
          <span className="block text-[12px] text-[#5a5a5a] truncate">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

// ponytail: playbackRate keeps the track's current position — changing
// animation-duration in CSS would make it jump backwards on hover.
const setSpeed = (rate: number) => (e: MouseEvent<HTMLDivElement>) => {
  e.currentTarget.getAnimations().forEach((a) => { a.playbackRate = rate; });
};

const FADE = {
  maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
} as const;

export function Testimonials() {
  const { t } = useLanguage();

  const row1 = [...ALL_ITEMS, ...ALL_ITEMS];
  const row2 = [...ALL_ITEMS.slice(2), ...ALL_ITEMS.slice(0, 2), ...ALL_ITEMS.slice(2), ...ALL_ITEMS.slice(0, 2)];

  return (
    <Section id="testimonials">
      <Container>
        <h2 className="section-headline mb-14">{t.testi.title}</h2>
      </Container>

      {[row1, row2].map((row, idx) => (
        <div key={idx} className="overflow-hidden mb-3 last:mb-0" style={FADE}>
          <div
            className={idx === 0 ? "marquee-row" : "marquee-row marquee-row-reverse"}
            onMouseEnter={setSpeed(0.25)}
            onMouseLeave={setSpeed(1)}
          >
            {row.map((item, i) => <TestiCard key={i} {...item} />)}
          </div>
        </div>
      ))}
    </Section>
  );
}
