import Link from "next/link";
import { BRAND } from "@/lib/content";

/*
  DNA-helix mark rebuilt as SVG from the reference logo image.
  Treatment (user-approved 2026-07-28): burgundy strands, soft-gold rungs.
  `mono` renders everything in currentColor for the burgundy footer.
  NOTE: approximation of the original — trace exactly once the vector file arrives.
*/
export function HelixMark({
  className = "h-9 w-auto",
  mono = false,
}: {
  className?: string;
  mono?: boolean;
}) {
  const strand = mono ? "currentColor" : "var(--color-burgundy)";
  const rung = mono ? "currentColor" : "var(--color-gold)";
  return (
    <svg
      viewBox="0 0 100 144"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {/* strand A (painted under the rungs) */}
      <path
        d="M31 10 C31 38, 69 42, 69 72 C69 102, 31 106, 31 134"
        stroke={strand}
        strokeWidth="8.5"
        strokeLinecap="round"
        opacity={mono ? 0.75 : 0.85}
      />
      {/* rungs — widths follow the helix opening */}
      <g stroke={rung} strokeWidth="3.4" strokeLinecap="round">
        <path d="M36 16 H64" />
        <path d="M39.5 25 H60.5" />
        <path d="M38.5 55 H61.5" />
        <path d="M33.5 66 H66.5" />
        <path d="M33.5 78 H66.5" />
        <path d="M38.5 89 H61.5" />
        <path d="M39.5 119 H60.5" />
        <path d="M36 128 H64" />
      </g>
      {/* strand B (painted over — gives the weave) */}
      <path
        d="M69 10 C69 38, 31 42, 31 72 C31 102, 69 106, 69 134"
        stroke={strand}
        strokeWidth="8.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({
  mono = false,
  className = "",
}: {
  mono?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={`${BRAND.name} — home`}
    >
      <HelixMark mono={mono} className="h-9 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-[21px] font-semibold tracking-[0.22em] ${
            mono ? "text-current" : "text-ink"
          }`}
        >
          MEDI-GYN
        </span>
        <span
          className={`mt-1.5 hidden text-[8.5px] font-medium tracking-[0.3em] uppercase whitespace-nowrap sm:block ${
            mono ? "text-current opacity-70" : "text-gold-deep"
          }`}
        >
          {BRAND.tagline}
        </span>
      </span>
    </Link>
  );
}
