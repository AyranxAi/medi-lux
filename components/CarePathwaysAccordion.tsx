import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import CarePathwaysAccordionClient from "@/components/CarePathwaysAccordionClient";
import type { ResolvedPathwayPanel } from "@/components/CarePathwaysAccordionClient";
import { PATHWAYS } from "@/lib/content";

/*
  Resolves each pathway's PATH-XX photograph on disk at build time — the same
  drop-a-file convention ImageSlot, HeroCarousel and SymptomsRail already use —
  and hands the result to the client accordion. A missing file renders as a
  toned panel, so the section still works before a photograph lands.

  The `?v=` is a content fingerprint, and it is load-bearing: every cache in the
  chain keys on the URL, so replacing a file's contents while keeping its name
  used to leave stale bytes being served (see the note in HeroCarousel). Hashing
  the contents into the URL makes that class of bug impossible here too — which
  matters, because re-cropping a pathway image is an expected edit.
*/
function findImage(id: string): string | null {
  for (const ext of ["webp", "avif", "jpg", "jpeg", "png"]) {
    const rel = `/images/${id}.${ext}`;
    const abs = path.join(process.cwd(), "public", rel);
    if (!fs.existsSync(abs)) continue;
    const hash = crypto
      .createHash("sha1")
      .update(fs.readFileSync(abs))
      .digest("hex")
      .slice(0, 8);
    return `${rel}?v=${hash}`;
  }
  return null;
}

export default function CarePathwaysAccordion() {
  const panels: ResolvedPathwayPanel[] = PATHWAYS.map((p) => ({
    slug: p.slug,
    name: p.name,
    ...p.panel,
    src: findImage(p.panel.image.id),
  }));

  return <CarePathwaysAccordionClient panels={panels} />;
}
