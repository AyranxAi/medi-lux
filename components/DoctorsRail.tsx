"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { EXPERTS } from "@/lib/content";

/*
  Swipeable expert rail — native scroll-snap (buttery on touch, accessible by
  keyboard) with hairline arrow buttons for desktop. No carousel library.
*/
export default function DoctorsRail() {
  const rail = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function onScroll() {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > el.scrollWidth - el.clientWidth - 8);
  }

  function nudge(dir: 1 | -1) {
    rail.current?.scrollBy({ left: dir * 580, behavior: "smooth" });
  }

  const arrowCls =
    "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-burgundy transition-colors hover:border-gold disabled:cursor-default disabled:opacity-30";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-[12px] tracking-wide text-ink-soft">
          {EXPERTS.length} specialists · swipe to explore
        </p>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => nudge(-1)} disabled={atStart} aria-label="Previous specialists" className={arrowCls}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" onClick={() => nudge(1)} disabled={atEnd} aria-label="More specialists" className={arrowCls}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={rail}
        onScroll={onScroll}
        aria-label="Medi-Gyn doctors and experts"
        className="-mx-5 flex snap-x gap-5 overflow-x-auto scroll-px-5 px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {EXPERTS.map((e) => (
          <article
            key={e.img}
            className="w-[228px] shrink-0 snap-start sm:w-[248px]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-taupe">
              <Image
                src={e.img}
                alt={`${e.name} — ${e.specialty}`}
                fill
                sizes="248px"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-[10px] font-semibold tracking-[0.22em] uppercase text-gold-deep">
              {e.role}
            </p>
            <h3 className="mt-1 font-serif text-[20px] leading-tight font-medium text-ink">
              {e.name}
            </h3>
            <p className="mt-0.5 text-[12.5px] leading-snug text-ink-soft">
              {e.specialty}
            </p>
            {/*
              There used to be a "Book with this doctor" link on every card —
              eighteen calls to action in one rail, on top of the header button,
              the hero and the closing band. That is a marketplace pattern, and
              it contradicts the one-CTA rule this site is built on. The face,
              the name and the credential are the argument; booking happens once,
              below.
            */}
          </article>
        ))}
      </div>
    </div>
  );
}
