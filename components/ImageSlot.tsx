import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/*
  Art-directed image slot. Drop a real file at public/images/<id>.(webp|jpg|png|avif)
  and it renders automatically via next/image; until then it shows a toned
  placeholder carrying the slot ID + the exact shot brief (see IMAGE_PROMPTS.md).
*/
const TONES = {
  rose: "bg-[linear-gradient(160deg,#f0e1dc_0%,#e6cfc8_55%,#d9bab2_100%)]",
  gold: "bg-[linear-gradient(160deg,#f1e7d2_0%,#e6d5b4_55%,#d9c49c_100%)]",
  taupe: "bg-[linear-gradient(160deg,#efe8da_0%,#e2d8c4_55%,#d3c6ac_100%)]",
} as const;

function findImage(id: string): string | null {
  for (const ext of ["webp", "avif", "jpg", "jpeg", "png"]) {
    const rel = `/images/${id}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

export default function ImageSlot({
  id,
  caption,
  tone = "rose",
  className = "",
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: {
  id: string;
  caption: string;
  tone?: keyof typeof TONES;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = findImage(id);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={caption}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center ${TONES[tone]}`}
        >
          <span className="rounded-full border border-ink/20 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-ink/60">
            {id}
          </span>
          <p className="max-w-[26ch] font-serif text-[15px] leading-snug text-ink/65 italic">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}
