import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import HeroCarouselClient from "@/components/HeroCarouselClient";
import { HERO } from "@/lib/content";

/*
  Hero rotation — resolves each HERO-XX slot on disk at build time (same
  drop-a-file convention as ImageSlot: public/images/<id>.webp) and hands the
  result to the client slider. Missing slots render as toned placeholders, so
  the carousel works before the real images are uploaded.
*/
function findImage(id: string): string | null {
  for (const ext of ["webp", "avif", "jpg", "jpeg", "png"]) {
    const rel = `/images/${id}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

export default function HeroCarousel({ children }: { children: ReactNode }) {
  const slides = HERO.slides.map((s) => ({ ...s, src: findImage(s.id) }));
  return <HeroCarouselClient slides={slides}>{children}</HeroCarouselClient>;
}
