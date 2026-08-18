// ============================================================
// DYNAMIC PRICING CONFIG — Edit this file to change all plans.
// No need to touch any component code.
// ============================================================

export type PlanLocale = {
  name: string;
  tagline: string;
  upfront: string;
  monthly: string;
  description: string;
  features: string[];
  cta: string;
};

export type Plan = {
  id: string;
  featured?: boolean;
  stripeLink: string;
  en: PlanLocale;
  th: PlanLocale;
};

export type PricingLabels = {
  title: string;
  subtitle: string;
  popularBadge: string;
  upfrontLabel: string;
  monthLabel: string;
  bookDemoLabel: string;
  bookDemoCta: string;
};

export type PricingConfig = {
  en: PricingLabels;
  th: PricingLabels;
  plans: Plan[];
};

export const PRICING: PricingConfig = {
  en: {
    title: "Simple, Honest Pricing",
    subtitle:
      "No hidden fees. No confusing contracts. Pick the plan that fits your business.",
    popularBadge: "Most Popular",
    upfrontLabel: "upfront",
    monthLabel: "/ month",
    bookDemoLabel: "Not sure which plan fits? See your website demo first — it's free.",
    bookDemoCta: "Book a Free Demo",
  },
  th: {
    title: "ราคาชัดเจน ไม่มีค่าใช้จ่ายซ่อนเร้น",
    subtitle:
      "ไม่มีค่าธรรมเนียมซ่อน ไม่มีสัญญายุ่งยาก เลือกแพ็กเกจที่เหมาะกับธุรกิจของคุณ",
    popularBadge: "ยอดนิยม",
    upfrontLabel: "ค่าเริ่มต้น",
    monthLabel: "/ เดือน",
    bookDemoLabel: "ยังไม่แน่ใจว่าแพ็กเกจไหนเหมาะกับคุณ? ดู demo เว็บไซต์ของคุณก่อน — ฟรี",
    bookDemoCta: "จอง Demo ฟรี",
  },

  plans: [
    {
      id: "starter",
      stripeLink: "https://buy.stripe.com/00w4gz6xwcIC4Jv1X7b7y06",
      en: {
        name: "Online Presence",
        tagline: "Customers can find you, trust you, and contact you.",
        upfront: "฿2,000",
        monthly: "฿200",
        description:
          "A clean, fast website that shows up on Google and gives customers a reason to choose you.",
        features: [
          "3–5 page website",
          "Mobile-friendly design",
          "Contact form",
          "Google Maps embed",
          "Basic SEO setup",
          "1 revision round",
        ],
        cta: "Start with a Demo",
      },
      th: {
        name: "Starter",
        tagline: "สำหรับธุรกิจที่เพิ่งเริ่มต้น",
        upfront: "฿2,000",
        monthly: "฿200",
        description:
          "ตัวตนออนไลน์ที่สะอาดและเป็นมืออาชีพ สร้างความเชื่อถือให้ลูกค้าใหม่",
        features: [
          "เว็บไซต์ 3–5 หน้า",
          "ดีไซน์รองรับมือถือ",
          "ฟอร์มติดต่อ",
          "ฝัง Google Maps",
          "SEO พื้นฐาน",
          "แก้ไข 1 รอบ",
        ],
        cta: "เริ่มต้น",
      },
    },
    {
      id: "growth",
      featured: true,
      stripeLink: "https://buy.stripe.com/cNi6oHaNM6ke0tf31bb7y08",
      en: {
        name: "Growth Engine",
        tagline: "Your website actively generates new inquiries every week.",
        upfront: "฿6,000",
        monthly: "฿600",
        description:
          "A full-featured website with gallery, blog, booking forms, and SEO that brings in leads while you work.",
        features: [
          "Up to 10 pages",
          "Gallery / Blog section",
          "Supabase backend",
          "Booking & inquiry forms",
          "SEO optimisation",
          "2 revision rounds",
          "Priority response",
        ],
        cta: "Start with a Demo",
      },
      th: {
        name: "Growth",
        tagline: "สำหรับธุรกิจที่กำลังขยาย",
        upfront: "฿6,000",
        monthly: "฿600",
        description:
          "เว็บไซต์ครบฟีเจอร์พร้อม backend เพื่อช่วยให้ธุรกิจเติบโตออนไลน์",
        features: [
          "สูงสุด 10 หน้า",
          "แกลเลอรี / บล็อก",
          "Supabase backend",
          "ฟอร์มจองคิว & สอบถาม",
          "ปรับแต่ง SEO",
          "แก้ไข 2 รอบ",
          "ตอบกลับด่วน",
        ],
        cta: "เริ่มเติบโต",
      },
    },
    {
      id: "premium",
      stripeLink: "https://buy.stripe.com/cNi9AT4po382a3PbxHb7y07",
      en: {
        name: "Full Transformation",
        tagline: "A complete digital system that works while you sleep.",
        upfront: "฿15,000",
        monthly: "฿1,500",
        description:
          "Custom-built from scratch. Admin dashboard, payment integration, advanced SEO, and dedicated monthly support.",
        features: [
          "Unlimited pages",
          "Custom design system",
          "Admin dashboard",
          "Payment integration",
          "Advanced SEO",
          "Unlimited revisions",
          "Dedicated monthly support",
        ],
        cta: "Start with a Demo",
      },
      th: {
        name: "Premium",
        tagline: "สำหรับธุรกิจจริงจัง",
        upfront: "฿15,000",
        monthly: "฿1,500",
        description:
          "โซลูชันดิจิทัลครบชุดเฉพาะตัว สำหรับธุรกิจที่ให้ความสำคัญกับตัวตนออนไลน์อย่างจริงจัง",
        features: [
          "หน้าไม่จำกัด",
          "ระบบดีไซน์เฉพาะตัว",
          "แดชบอร์ดแอดมิน",
          "รับชำระเงินออนไลน์",
          "SEO ขั้นสูง",
          "แก้ไขไม่จำกัด",
          "ดูแลรายเดือนโดยตรง",
        ],
        cta: "เลือก Premium",
      },
    },
  ],
};
