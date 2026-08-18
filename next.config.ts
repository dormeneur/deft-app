import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves a static export — no server, no Next image
  // optimizer, so images must be pre-sized and served as-is.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
