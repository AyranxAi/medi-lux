"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import type { SymptomCategory } from "@/lib/content";

/*
  Symptom rail — category filters over a scroll-snap rail of photo cards.
  Native scroll does the movement (buttery on touch, keyboard-scrollable); the
  arrows and dots are desktop affordances on top of it. No carousel library.
*/

const TONES = {
  rose: "bg-[linear-gradient(160deg,#f0e1dc_0%,#e6cfc8_55%,#d9bab2_100%)]",
  gold: "bg-[linear-gradient(160deg,#f1e7d2_0%,#e6d5b4_55%,#d9c49c_100%)]",
  taupe: "bg-[linear-gradient(160deg,#efe8da_0%,#e2d8c4_55%,#d3c6ac_100%)]",
} as const;

const CATEGORY_ICONS: Record<string, string> = {
  hormones: "refresh",
  energy: "compass",
  metabolism: "leaf",
  intimacy: "sparkle",
};

type Card = {
  name: string;
  signal: string;
  pathway: string;
  category: string;
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

const CARD_W = "w-[320px] shrink-0 snap-start sm:w-[384px] lg:w-[440px]";

export default function SymptomsRailClient({
  cards,
  categories,
  quiz,
}: {
  cards: Card[];
  categories: SymptomCategory[];
  quiz: Quiz;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(categories[0]?.id ?? "all");
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const shown = useMemo(
    () => (active === "all" ? cards : cards.filter((c) => c.category === active)),
    [cards, active],
  );

  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const total = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth));
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > el.scrollWidth - el.clientWidth - 8);
    setPages(total);
    setPage(Math.min(Math.round(el.scrollLeft / el.clientWidth), total - 1));
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  // a new filter changes both the card count and the scroll extent
  useEffect(() => {
    rail.current?.scrollTo({ left: 0 });
    measure();
  }, [active, measure]);

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const arrowCls =
    "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-burgundy transition-colors hover:border-gold disabled:cursor-default disabled:opacity-30";

  return (
    <div>
      {/* filters + arrows share the rule above the rail */}
      <div className="flex flex-col gap-5 border-b border-line lg:flex-row lg:items-end lg:justify-between">
        <div
          role="tablist"
          aria-label="Filter symptoms by area"
          className="-mx-5 flex gap-5 overflow-x-auto px-5 xl:gap-7 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(c.id)}
                className={`group -mb-px flex shrink-0 cursor-pointer items-center gap-2 border-b-2 pb-3.5 text-[11px] font-semibold tracking-[0.1em] xl:text-[11.5px] xl:tracking-[0.14em] whitespace-nowrap uppercase transition-colors ${
                  on
                    ? "border-burgundy text-burgundy"
                    : "border-transparent text-ink-soft hover:text-burgundy"
                }`}
              >
                <Icon
                  name={c.icon}
                  className={`h-[18px] w-[18px] transition-colors ${on ? "text-burgundy" : "text-gold-deep"}`}
                />
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="hidden shrink-0 gap-2 pb-3 xl:flex">
          <button type="button" onClick={() => nudge(-1)} disabled={atStart} aria-label="Previous symptoms" className={arrowCls}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" onClick={() => nudge(1)} disabled={atEnd} aria-label="More symptoms" className={arrowCls}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={rail}
        onScroll={measure}
        aria-label="Symptoms — choose what feels closest"
        className="-mx-5 mt-9 flex snap-x gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shown.map((c) => (
          <Link
            key={c.img}
            href={`/pathways/${c.pathway}`}
            className={`group relative aspect-[3/4] overflow-hidden rounded-2xl ${CARD_W}`}
          >
            {c.src ? (
              <Image
                src={c.src}
                alt={`${c.name} — ${c.brief}`}
                fill
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 384px, 440px"
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

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(36,17,24,0.92)_0%,rgba(36,17,24,0.6)_32%,rgba(36,17,24,0.1)_62%,rgba(36,17,24,0)_80%)]"
            />

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50">
                <Icon
                  name={CATEGORY_ICONS[c.category] ?? "sparkle"}
                  className="h-4 w-4 text-gold"
                />
              </span>
              <h3 className="mt-4 font-serif text-[31px] leading-tight font-medium text-ivory">
                {c.name}
              </h3>
              <p className="mt-2 max-w-[32ch] text-[13.5px] leading-relaxed text-ivory/80">
                {c.signal}
              </p>
              {/* styled like a button but decorative — the whole card is the link */}
              <span
                aria-hidden="true"
                className="mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors group-hover:border-gold group-hover:bg-gold/15"
              >
                <Icon name="arrow-right" className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}

        {/* quiz stays in the rail so the routing CTA survives the restyle */}
        <Link
          href={quiz.cta.href}
          className={`group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl bg-burgundy p-7 transition-colors hover:bg-burgundy-deep sm:p-8 ${CARD_W}`}
        >
          <h3 className="font-serif text-[31px] leading-tight font-medium text-ivory">
            {quiz.title}
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ivory/75">
            {quiz.body}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-gold">
            {quiz.cta.label}
            <Icon name="arrow-right" className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>

      {pages > 1 && (
        <div className="mt-8 hidden justify-center sm:flex">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                const el = rail.current;
                if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
              }}
              aria-label={`Go to symptoms ${i + 1} of ${pages}`}
              aria-current={i === page}
              className="group flex h-11 w-7 cursor-pointer items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  i === page ? "bg-burgundy" : "bg-line group-hover:bg-rose"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
