"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/*
  Full-bleed hero slider. Auto-advances every 5s; pauses on hover, on keyboard
  focus, and while the tab is hidden. Swipe/drag and the dots move it manually
  (manual moves restart the 5s clock). With prefers-reduced-motion the rotation
  stops entirely and dot navigation switches instantly — medical site rule.
*/

const AUTOPLAY_MS = 5000;

const TONES = {
  rose: "bg-[linear-gradient(160deg,#f0e1dc_0%,#e6cfc8_55%,#d9bab2_100%)]",
  gold: "bg-[linear-gradient(160deg,#f1e7d2_0%,#e6d5b4_55%,#d9c49c_100%)]",
  taupe: "bg-[linear-gradient(160deg,#efe8da_0%,#e2d8c4_55%,#d3c6ac_100%)]",
} as const;

type Slide = {
  id: string;
  src: string | null;
  alt: string;
  brief: string;
  focal: string;
  tone: keyof typeof TONES;
};

export default function HeroCarouselClient({
  slides,
  children,
}: {
  slides: Slide[];
  children: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false); // hovered or focused
  const [hidden, setHidden] = useState(false); // tab in background
  const [width, setWidth] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const n = slides.length;

  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // `index` in the deps restarts the 5s clock after a manual move.
  useEffect(() => {
    if (reduce || engaged || hidden || n < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [reduce, engaged, hidden, n, index]);

  return (
    <div
      ref={frame}
      role="region"
      aria-roledescription="carousel"
      aria-label="Medi-Gyn — women in every stage of hormonal health"
      className="relative min-h-[100svh] w-full overflow-hidden sm:h-[100svh] sm:min-h-[640px]"
      onMouseEnter={() => setEngaged(true)}
      onMouseLeave={() => setEngaged(false)}
      onFocusCapture={() => setEngaged(true)}
      onBlurCapture={() => setEngaged(false)}
    >
      <motion.div
        className="absolute inset-0 flex touch-pan-y cursor-grab active:cursor-grabbing"
        drag={n > 1 ? "x" : false}
        dragConstraints={{ left: -width * (n - 1), right: 0 }}
        dragElastic={0.06}
        animate={{ x: -index * width }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: "tween", duration: 0.65, ease: [0.32, 0.72, 0.24, 1] }
        }
        onDragEnd={(_, info) => {
          const step =
            info.offset.x < -width / 6 || info.velocity.x < -400
              ? 1
              : info.offset.x > width / 6 || info.velocity.x > 400
                ? -1
                : 0;
          setIndex((i) => Math.min(n - 1, Math.max(0, i + step)));
        }}
      >
        {slides.map((s, i) => (
          <div
            key={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${n}`}
            aria-hidden={i !== index}
            className="relative h-full w-full shrink-0"
          >
            {s.src ? (
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="100vw"
                priority={i === 0}
                draggable={false}
                className="object-cover select-none"
                style={{ objectPosition: s.focal }}
              />
            ) : (
              <div className={`relative h-full w-full ${TONES[s.tone]}`}>
                {/* chip sits in the right third — where the subject will be — clear of the headline scrim */}
                <div className="absolute top-2/3 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 p-6 text-center sm:top-1/2 sm:left-[72%] sm:-translate-y-1/2">
                  <span className="rounded-full border border-ink/20 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-ink/60">
                    {s.id}
                  </span>
                  <p className="max-w-[30ch] font-serif text-[15px] leading-snug text-ink/65 italic">
                    {s.brief}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/*
        Scrim, bottom-anchored.

        This was a 90deg wash running 0.84 → 0.12 left to right, and it was
        fighting the photograph: 84% black buried the warm backlit left two
        thirds in grey-brown, and because it thinned to 12% exactly where the
        frame brightens, a hard tonal seam ran down the middle of the screen at
        desktop widths. Luxury heroes do not scrim, they compose — so the
        darkness now sits along the bottom, under the type, and the top ~40% of
        every frame — where the subject's face is — is left alone entirely.

        The ramp is deliberately steep rather than gentle. Two earlier passes
        were too kind to the photograph and failed the copy: 0.78→0.22 made the
        ivory headline vanish into the sunlit curtains on HERO-01, and 0.88→0.30
        still measured 2.81:1 on HERO-02 (large text needs 3:1). The copy block
        occupies the bottom ~40% of the frame, so alpha has to stay ≥0.5 to
        50% height — that is what these stops do, and everything above it, the
        subject's face included, is still untouched.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(18,16,17,0.9)_0%,rgba(18,16,17,0.86)_20%,rgba(18,16,17,0.72)_35%,rgba(18,16,17,0.5)_50%,rgba(18,16,17,0.22)_70%,rgba(18,16,17,0)_92%)]"
      />
      {/* a whisper of weight on the left so the headline never sits on a
          blown-out highlight — 42% at the very edge, gone by two thirds */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(18,16,17,0.42)_0%,rgba(18,16,17,0.18)_38%,rgba(18,16,17,0)_68%)]"
      />
      {/* keeps the transparent header legible across its full width */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(18,16,17,0.5)_0%,rgba(18,16,17,0.18)_45%,rgba(18,16,17,0)_100%)]"
      />

      {/* in-flow on mobile so the hero grows with the copy; padding clears header and dots.
          Copy sits at the foot of the frame now rather than centred — it rides the
          scrim instead of floating over the middle of the photograph. */}
      <div className="pointer-events-none relative z-10 flex min-h-[inherit] items-end sm:h-full">
        {/* pb clears the dots; pt clears the overlaying 72px header on mobile */}
        <div className="wrap w-full pt-28 pb-20 sm:pt-28 sm:pb-24">{children}</div>
      </div>

      {n > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center">
          <div className="flex items-center">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1} of ${n}`}
                aria-current={i === index}
                className="group flex h-11 w-11 cursor-pointer items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-ivory"
                      : "w-1.5 bg-ivory/45 group-hover:bg-ivory/75"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
