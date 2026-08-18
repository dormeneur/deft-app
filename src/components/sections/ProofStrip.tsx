// ponytail: contained marquee — same width as hero content, fade edges
const INDUSTRIES = [
    "Restaurants", "Salons & Beauty", "Tailors & Fashion",
    "Repair Shops", "Clinics", "Cafés", "Local Boutiques",
    "Auto Services", "Fitness Studios", "Photographers",
];

export function ProofStrip() {
    const items = [...INDUSTRIES, ...INDUSTRIES];

    return (
        <div className="bg-black py-3">
            <div
                className="mx-auto w-full max-w-[1280px] px-6 md:px-12 overflow-hidden"
                style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                }}
            >
                <div className="marquee-track">
                    {items.map((name, idx) => (
                        <span key={idx} className="inline-block mx-8 text-[12px] font-medium text-[#444] whitespace-nowrap">
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
