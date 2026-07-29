import type { NextConfig } from "next";

/*
  Vercel build. The GitHub Pages era needed `output: "export"` +
  `images: { unoptimized: true }`, which meant every photograph shipped at one
  fixed size, no AVIF and no srcset — a 1672px hero filling a 1440px full-bleed
  slot is barely half the pixels a retina screen wants, and it showed. Vercel
  optimises at the edge, so both lines are gone: next/image now resizes per
  device and serves AVIF where it is accepted.

  Pages is dead for this project (see HANDOVER). If it is ever revived, the
  export config comes back with it and vercel.json regains outputDirectory.
*/
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  trailingSlash: true,
  basePath,
  images: {
    formats: ["image/avif", "image/webp"],
    // full-bleed bands want a 2560/3840 rung; the defaults stop at 1920/2048
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2560, 3840],
  },
};

export default nextConfig;
