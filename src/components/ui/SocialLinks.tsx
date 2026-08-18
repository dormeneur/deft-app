import type { CSSProperties } from "react";
import { GithubIcon, InstagramIcon, LineIcon, WhatsappIcon } from "@/components/ui/BrandIcons";

// Single source of truth — footer, founder card and contact section all
// render this row. `brand` is the colour that floods in on hover; `fg` is
// whatever stays readable on top of it.
export const SOCIALS = [
    {
        title: "Instagram",
        handle: "@ifnotadi",
        href: "https://instagram.com/ifnotadi",
        Icon: InstagramIcon,
        brand: "linear-gradient(45deg,#F58529,#DD2A7B,#8134AF,#515BD4)",
        fg: "#ffffff",
        glow: "rgba(221,42,123,0.40)",
    },
    {
        title: "GitHub",
        handle: "dormeneur",
        href: "https://github.com/dormeneur",
        Icon: GithubIcon,
        brand: "#ffffff",
        fg: "#000000",
        glow: "rgba(255,255,255,0.25)",
    },
    {
        title: "LINE",
        handle: "aditya_bharti",
        href: "https://line.me/ti/p/~aditya_bharti",
        Icon: LineIcon,
        brand: "#06C755",
        fg: "#ffffff",
        glow: "rgba(6,199,85,0.40)",
    },
    {
        title: "WhatsApp",
        handle: "+66 063 823 2303",
        href: "https://wa.me/66638232303",
        Icon: WhatsappIcon,
        brand: "#25D366",
        fg: "#000000",
        glow: "rgba(37,211,102,0.40)",
    },
];

export function SocialLinks({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-wrap items-center gap-2 ${className}`}>
            {SOCIALS.map(({ title, handle, href, Icon, brand, fg, glow }) => (
                <a
                    key={title}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${title} — ${handle}`}
                    className="social-pill"
                    style={{ "--brand": brand, "--brand-fg": fg, "--brand-glow": glow } as CSSProperties}
                >
                    <Icon className="w-[18px] h-[18px] shrink-0" />
                    <span className="pill-label">
                        <span className="block pl-2.5 text-[13px] font-semibold">{handle}</span>
                    </span>
                </a>
            ))}
        </div>
    );
}
