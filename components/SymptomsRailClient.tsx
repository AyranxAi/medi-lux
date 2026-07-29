"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/*
  Symptom rail — the hero's full-bleed treatment at card scale: photo, warm
  scrim, ivory copy. Native scroll-snap does the movement (buttery on touch,
  keyboard-scrollable), with hairline arrows and page dots for desktop, matching
  the expert rail's interaction model. No carousel library.
*/

const TONES = {
  rose: "bg-[linear-gradient(160deg,#f0e1dc_0%,#e6cfc8_55%,#d9bab2_100%)]",
  gold: "bg-[linear-gradient(160deg,#f1e7d2_0%,#e6d5b4_55%,#d9c49c_100%)]",
  taupe: "bg-[linear-gradient(160deg,#efe8da_0%,#e2d8c4_55%,#d3c6ac_100%)]",
} as const;

type Card = {
  name: string;
  signal: string;
  pathway: string;
  img: string;
  brief: string;
  tone: keyof typeof TONES;
  src: string | null;
};

type Quiz = {
  title: string;
  body: string;
  cta: { label: string; href: string };
};

const CARD_W = "w-[300px] shrink-0 snap-start sm:w-[364px] lg:w-[420px]";

export default function SymptomsRailClient({
  cards,
  quiz,
}: {
  cards: Card[];
  quiz: Quiz;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > max - 8);
    setPages(Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth)));
    setPage(Math.min(Math.round(el.scrollLeft / el.clientWidth), Math.max(0, Math.ceil(el.scrollWidth / el.clientWidth) - 1)));
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const goTo = (i: number) => {
    const el = rail.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const arrowCls =
    "absolute top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-ivory text-burgundy shadow-[0_10px_30px_-12px_rgba(46,34,40,0.45)] transition-colors hover:border-gold disabled:cursor-default disabled:opacity-30 sm:flex";

  return (
    <div className="relative">
      <div
        ref={rail}
        onScroll={measure}
        aria-label="Symptoms — choose what feels closest"
        className="-mx-5 flex snap-x gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((c) => (
          <Link
            key={c.img}
            href={`/pathways/${c.pathway}`}
            className={`group relative aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-ivory/10 ${CARD_W}`}
          >
            {c.src ? (
              <Image
                src={c.src}
                alt={`${c.name} — ${c.brief}`}
                fill
                sizes="(max-width: 640px) 300px, (max-width: 1024px) 364px, 420px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            ) : (
              <div className={`flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center ${TONES[c.tone]}`}>
                <span className="rounded-full border border-ink/20 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-ink/60">
                  {c.img}
                </span>
                <p className="max-w-[24ch] font-serif text-[14px] leading-snug text-ink/65 italic">
                  {c.brief}
                </p>
              </div>
            )}

            {/* same warm scrim as the hero, so ivory copy stays AA-readable */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(36,17,24,0.92)_0%,rgba(36,17,24,0.62)_28%,rgba(36,17,24,0.12)_55%,rgba(36,17,24,0)_75%)]"
            />

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
              <h3 className="font-serif text-[30px] leading-tight font-medium text-ivory sm:text-[34px]">
                {c.name}
              </h3>
              <p className="mt-2 max-w-[34ch] text-[14px] leading-relaxed text-ivory/80">
                {c.signal}
              </p>
            </div>
          </Link>
        ))}

        {/* quiz stays in the rail so the routing CTA survives the restyle */}
        <Link
          href={quiz.cta.href}
          className={`group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-3xl bg-ivory p-7 transition-colors hover:bg-cream sm:p-8 ${CARD_W}`}
        >
          <h3 className="font-serif text-[30px] leading-tight font-medium text-burgundy sm:text-[34px]">
            {quiz.title}
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
            {quiz.body}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-gold-deep">
            {quiz.cta.label}
            <svg viewBox="0 0 24 24" className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" aria-hidden="true">
              <path d="M4 12h15m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>

      <button
        type="button"
        onClick={() => nudge(-1)}
        disabled={atStart}
        aria-label="Previous symptoms"
        className={`${arrowCls} left-0 -translate-x-1/2`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => nudge(1)}
        disabled={atEnd}
        aria-label="More symptoms"
        className={`${arrowCls} right-0 translate-x-1/2`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {pages > 1 && (
        // one card per page on phones would mean ~10 dots; swipe is the
        // affordance there, same as the arrows being desktop-only
        <div className="mt-8 hidden justify-center sm:flex">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to symptoms ${i + 1} of ${pages}`}
              aria-current={i === page}
              className="group flex h-11 w-7 cursor-pointer items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  i === page ? "bg-gold" : "bg-ivory/25 group-hover:bg-ivory/50"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
