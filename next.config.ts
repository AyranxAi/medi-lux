import type { NextConfig } from "next";

/*
  Static export so the site can go live on GitHub Pages (public repo).
  NEXT_PUBLIC_BASE_PATH is set to "/medi-lux" by the Pages workflow;
  locally it stays empty. Moving to Vercel later: delete the basePath
  line and (optionally) `output` — nothing else changes.
*/
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
