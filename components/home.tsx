import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import Icon from "@/components/Icon";
import DoctorsRail from "@/components/DoctorsRail";
import HeroCarousel from "@/components/HeroCarousel";
import SymptomsRail from "@/components/SymptomsRail";
import CarePathwaysAccordion from "@/components/CarePathwaysAccordion";
import {
  HERO,
  STILL,
  SYMPTOMS_SECTION,
  PATHWAYS_SECTION,
  METHOD,
  WHY,
  DOCTORS_SECTION,
  PRODUCTS_SECTION,
  EVENTS_SECTION,
  CTA_BAND,
} from "@/lib/content";

/* ------------------------------ 1 · Hero ------------------------------ */

export function Hero() {
  return (
    <section className="relative">
      <HeroCarousel>
        {/*
          Cormorant is a display face; it only sings above ~72px, and at 64px it
          never got there. The headline now runs to 88px on desktop while the
          section h2s below come *down* to ~40px — widening that gap is what
          buys the page a hierarchy, and it costs nothing.
        */}
        <div className="max-w-3xl">
          {/*
            No kicker here any more. 11px type over unpredictable photography
            could not be made to clear 4.5:1 on the golden slides — it measured
            2.63 as gold, 4.02 once shortened and lightened — and the honest fix
            for small text you cannot guarantee is not to set it over a photo.
            The hero is headline, one line, one action; the eyebrow was the
            least load-bearing thing in it, and the tagline still runs in the
            header, the footer and the page title.
          */}
          <Reveal delay={0.08}>
            <h1 className="h-display mt-5 text-[42px] leading-[1.03] text-ivory sm:text-[60px] lg:text-[76px]">
              {HERO.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ivory/85">
              {HERO.subheadline}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            {/* one action. The quiz is a text link beside it, not a rival button. */}
            <div className="pointer-events-auto mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href={HERO.primaryCta.href} className="btn-on-burgundy">
                {HERO.primaryCta.label}
              </Link>
              <Link
                href={HERO.secondaryCta.href}
                className="inline-flex items-center gap-2 text-[13.5px] font-medium text-gold-tint transition-colors hover:text-ivory"
              >
                {HERO.secondaryCta.label}
                <Icon name="arrow-right" className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="mt-7 text-[12px] tracking-wide text-ivory/65">
              {HERO.trustLine}
            </p>
          </Reveal>
        </div>
      </HeroCarousel>
    </section>
  );
}

/* ------------------- 2 · “What are you experiencing?” ------------------- */

export function Symptoms() {
  return (
    <section className="section-lg bg-cream" aria-labelledby="symptoms-h">
      <div className="wrap">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-3xl">
            {/* written out rather than `.kicker`: this section runs the label a
                step larger and wider-tracked than the rest of the page */}
            <p className="text-[12.5px] font-semibold tracking-[0.3em] uppercase text-gold-deep">
              {SYMPTOMS_SECTION.kicker}
            </p>
            {/* second tier of the scale: below the 88px hero, above the 40px
                section heads. This is the question the whole page answers. */}
            <h2
              id="symptoms-h"
              className="h-display mt-5 text-[40px] leading-[1.02] text-burgundy sm:text-[52px] lg:text-[56px]"
            >
              {SYMPTOMS_SECTION.headline}
            </h2>
          </div>
          <p className="max-w-[30ch] text-[14px] leading-relaxed text-ink-soft lg:pb-4 lg:text-right">
            {SYMPTOMS_SECTION.helper}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <SymptomsRail />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------- 3 · Care pathways -------------------------- */

export function CarePathways() {
  return (
    <section id="pathways" className="section" aria-labelledby="pathways-h">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <p className="kicker">{PATHWAYS_SECTION.kicker}</p>
          <h2 id="pathways-h" className="h-display mt-4 text-[32px] sm:text-[40px]">
            {PATHWAYS_SECTION.headline}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {PATHWAYS_SECTION.intro}
          </p>
        </Reveal>

        {/*
          Was a 2×2 card grid. The four photographs were doing nothing there —
          each one a 16:7 letterbox above a block of text, four times over. As
          one continuous accordion they carry the section instead, and the copy
          that used to be always-on (`whoFor`, `symptoms`, `next`) is now
          revealed one pathway at a time. The detail pages still carry all of it.
        */}
        <Reveal className="mt-12">
          <CarePathwaysAccordion />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------ 4 · The Medi-Gyn Method ------------------------ */

/*
  The one section allowed to be bigger than its neighbours: long rhythm, wide
  measure, large numerals. It carries the argument, so it gets the room — the
  point of breaking a metronome is that something has to be allowed to win.
*/
export function Method() {
  return (
    <section className="section-lg bg-burgundy text-ivory" aria-labelledby="method-h">
      <div className="wrap-wide">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
            {METHOD.kicker}
          </p>
          <h2 id="method-h" className="h-display mt-4 text-[38px] sm:text-[52px]">
            {METHOD.headline}
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {METHOD.steps.map((step, i) => (
            <Reveal key={step.title} delay={Math.min(i * 0.08, 0.35)}>
              <li className="border-t border-gold/40 pt-6">
                <span className="font-serif text-[44px] leading-none text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-[19px] leading-snug font-medium">
                  {step.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-ivory/70">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------- 5 · Why Medi-Gyn --------------------------- */

export function WhyMediGyn() {
  return (
    // supporting, not headline — tightened so the Method above it keeps the room
    <section className="section-sm" aria-labelledby="why-h">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <p className="kicker">{WHY.kicker}</p>
          <h2 id="why-h" className="h-display mt-4 text-[32px] sm:text-[40px]">
            {WHY.headline}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.blocks.map((b, i) => (
            <Reveal key={b.title} delay={Math.min(i * 0.05, 0.3)}>
              <div>
                <Icon name={b.icon} className="h-7 w-7 text-gold-deep" />
                <h3 className="mt-4 font-serif text-[20px] leading-snug font-medium text-ink">
                  {b.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                  {b.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------- 5½ · The full-bleed still -------------------------- */

/*
  The page's one moment of pure image. No card, no rail, no grid, no container —
  it runs edge to edge and breaks the 1152px measure that every other section
  obeys. One line of copy, no call to action.

  Not decoration: it is the pause between the argument (Method, Why) and the
  faces (Doctors), and it is the only place on the page where a visitor is asked
  for nothing at all.
*/
export function Still() {
  return (
    <section aria-label="Medi-Gyn" className="relative h-[62svh] min-h-[420px] w-full overflow-hidden sm:h-[78svh]">
      <Image
        src={`/images/${STILL.id}.webp`}
        alt={STILL.alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: STILL.focal }}
      />
      {/* bottom-anchored, same grammar as the hero — light enough to leave the
          photograph alone, dark enough to carry ivory serif at AA */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,16,17,0.62)_0%,rgba(18,16,17,0.3)_30%,rgba(18,16,17,0.05)_62%,rgba(18,16,17,0)_100%)]"
      />
      <div className="absolute inset-x-0 bottom-0">
        <div className="wrap-wide pb-12 sm:pb-16">
          <Reveal>
            <p className="h-display max-w-[18ch] text-[30px] leading-[1.1] text-ivory sm:text-[44px]">
              {STILL.line}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ 6 · Doctors and experts ------------------------ */

export function Doctors() {
  return (
    <section className="section bg-cream" aria-labelledby="doctors-h">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <p className="kicker">{DOCTORS_SECTION.kicker}</p>
          <h2 id="doctors-h" className="h-display mt-4 text-[32px] sm:text-[40px]">
            {DOCTORS_SECTION.headline}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {DOCTORS_SECTION.intro}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <DoctorsRail />
        </Reveal>

        {/* the one booking action for this section, replacing the eighteen that
            used to sit on the cards */}
        <Reveal delay={0.2}>
          <Link
            href="/book"
            className="mt-10 inline-flex items-center gap-2 text-[13px] font-semibold text-burgundy transition-colors hover:text-burgundy-deep"
          >
            Book a consultation
            <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------- 7 · Products and lab tests ---------------------- */

export function ProductsAndLabs() {
  return (
    // "a clinic before it is a shop" — the brief's words, now also the spacing
    <section className="section-sm" aria-labelledby="products-h">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <p className="kicker">{PRODUCTS_SECTION.kicker}</p>
          <h2 id="products-h" className="h-display mt-4 text-[32px] sm:text-[40px]">
            {PRODUCTS_SECTION.headline}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {PRODUCTS_SECTION.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS_SECTION.groups.map((g, i) => (
            <Reveal key={g.title} delay={Math.min(i * 0.06, 0.2)}>
              <div className="h-full rounded-2xl border border-line p-6">
                <Icon name={g.icon} className="h-6 w-6 text-gold-deep" />
                <h3 className="mt-4 font-serif text-[19px] font-medium text-ink">
                  {g.title}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                  {g.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <Link
            href={PRODUCTS_SECTION.cta.href}
            className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-burgundy transition-colors hover:text-burgundy-deep"
          >
            {PRODUCTS_SECTION.cta.label}
            <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------- 8 · Events and community ----------------------- */

export function Events() {
  return (
    <section className="section bg-cream" aria-labelledby="events-h">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="kicker">{EVENTS_SECTION.kicker}</p>
          <h2 id="events-h" className="h-display mt-4 text-[32px] sm:text-[40px]">
            {EVENTS_SECTION.headline}
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            {EVENTS_SECTION.body}
          </p>
          <Link href={EVENTS_SECTION.cta.href} className="btn-secondary mt-8">
            {EVENTS_SECTION.cta.label}
          </Link>
        </Reveal>
        <Reveal delay={0.12}>
          <ImageSlot
            id={EVENTS_SECTION.imageSlot.id}
            caption={EVENTS_SECTION.imageSlot.caption}
            tone="gold"
            className="aspect-[4/3] rounded-3xl"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------- Closing CTA ----------------------------- */

export function CtaBand() {
  return (
    <section className="bg-burgundy py-20 text-center text-ivory sm:py-24">
      <div className="wrap">
        <Reveal>
          <h2 className="h-display mx-auto max-w-2xl text-4xl sm:text-5xl">
            {CTA_BAND.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] text-ivory/75">
            {CTA_BAND.body}
          </p>
          <div className="mt-9 flex flex-col items-center gap-4">
            <Link href={CTA_BAND.primary.href} className="btn-on-burgundy">
              {CTA_BAND.primary.label}
            </Link>
            <Link
              href={CTA_BAND.secondary.href}
              className="text-[13px] text-ivory/70 underline-offset-4 transition-colors hover:text-ivory hover:underline"
            >
              {CTA_BAND.secondary.label}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
