import fs from "node:fs";
import path from "node:path";
import SymptomsRailClient from "@/components/SymptomsRailClient";
import { SYMPTOMS, SYMPTOM_CATEGORIES, SYMPTOMS_SECTION } from "@/lib/content";

/*
  Resolves each symptom's SYM-XX slot on disk at build time (same convention as
  ImageSlot and HeroCarousel) and hands the result to the client rail. Missing
  slots render as toned placeholders, so the section works before the photos land.
*/
function findImage(id: string): string | null {
  for (const ext of ["webp", "avif", "jpg", "jpeg", "png"]) {
    const rel = `/images/${id}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

export default function SymptomsRail() {
  const cards = SYMPTOMS.map((s) => ({ ...s, src: findImage(s.img) }));
  return (
    <SymptomsRailClient
      cards={cards}
      categories={SYMPTOM_CATEGORIES}
      quiz={SYMPTOMS_SECTION.quizCard}
    />
  );
}
