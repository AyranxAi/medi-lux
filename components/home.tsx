import Link from "next/link";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import Icon from "@/components/Icon";
import DoctorsRail from "@/components/DoctorsRail";
import HeroCarousel from "@/components/HeroCarousel";
import SymptomsRail from "@/components/SymptomsRail";
import {
  HERO,
  SYMPTOMS_SECTION,
  PATHWAYS,
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
        <div className="max-w-2xl">
          <Reveal>
            <p className="kicker text-gold">{HERO.kicker}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="h-display mt-5 text-[42px] leading-[1.04] text-ivory sm:text-6xl lg:text-[64px]">
              {HERO.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ivory/85">
              {HERO.subheadline}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="pointer-events-auto mt-9 flex flex-wrap items-center gap-3">
              <Link href={HERO.primaryCta.href} className="btn-on-burgundy">
                {HERO.primaryCta.label}
              </Link>
              <Link href={HERO.secondaryCta.href} className="btn-outline-ivory">
                {HERO.secondaryCta.label}
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={HERO.tertiaryCta.href}
                className="pointer-events-auto inline-flex items-center gap-2 text-[13px] font-medium text-gold-tint transition-colors hover:text-ivory"
              >
                {HERO.tertiaryCta.label}
                <Icon name="arrow-right" className="h-3.5 w-3.5" />
              </a>
              <p className="text-[12px] tracking-wide text-ivory/70">
                {HERO.trustLine}
              </p>
            </div>
          </Reveal>
        </div>
      </HeroCarousel>
    </section>
  );
}

/* ------------------- 2 · “What are you experiencing?” ------------------- */

export function Symptoms() {
  return (
    /* Deep burgundy→espresso band. The photo cards read as lit windows against
       it, and it gives the page a dark → light → dark rhythm instead of three
       ivory sections running together. */
    <section
      className="section bg-[linear-gradient(165deg,#471826_0%,#35202a_55%,#2e2228_100%)]"
      aria-labelledby="symptoms-h"
    >
      <div className="wrap">
        <Reveal className="mx-auto max-w-4xl text-center">
          {/* written out rather than `.kicker`: this section runs the label a
              step larger and wider-tracked than the rest of the page */}
          <p className="text-[12.5px] font-semibold tracking-[0.34em] uppercase text-gold">
            {SYMPTOMS_SECTION.kicker}
          </p>
          <h2
            id="symptoms-h"
            className="h-display mt-5 text-[44px] leading-[1.05] text-ivory sm:text-6xl lg:text-7xl"
          >
            {SYMPTOMS_SECTION.headline}
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-14">
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
          <h2 id="pathways-h" className="h-display mt-4 text-4xl sm:text-5xl">
            {PATHWAYS_SECTION.headline}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {PATHWAYS_SECTION.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {PATHWAYS.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i * 0.07, 0.25)}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ivory">
                <ImageSlot
                  id={p.imageSlot.id}
                  caption={p.imageSlot.caption}
                  tone={p.imageSlot.tone}
                  className="aspect-[16/7]"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-[27px] font-medium text-ink">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                    {p.whoFor}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.symptoms.map((sym) => (
                      <span key={sym} className="chip">
                        {sym}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-[12.5px] leading-relaxed text-ink-soft">
                    <span className="font-semibold text-ink">What happens next: </span>
                    {p.next}
                  </p>
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/pathways/${p.slug}`}
                      className="inline-flex items-center gap-2 text-[13px] font-semibold text-burgundy transition-colors hover:text-burgundy-deep"
                    >
                      View pathway
                      <Icon name="arrow-right" className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------ 4 · The Medi-Gyn Method ------------------------ */

export function Method() {
  return (
    <section className="section bg-burgundy text-ivory" aria-labelledby="method-h">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
            {METHOD.kicker}
          </p>
          <h2 id="method-h" className="h-display mt-4 text-4xl sm:text-5xl">
            {METHOD.headline}
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {METHOD.steps.map((step, i) => (
            <Reveal key={step.title} delay={Math.min(i * 0.08, 0.35)}>
              <li className="border-t border-gold/40 pt-5">
                <span className="font-serif text-3xl text-gold">
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
    <section className="section" aria-labelledby="why-h">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <p className="kicker">{WHY.kicker}</p>
          <h2 id="why-h" className="h-display mt-4 text-4xl sm:text-5xl">
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

/* ------------------------ 6 · Doctors and experts ------------------------ */

export function Doctors() {
  return (
    <section className="section bg-cream" aria-labelledby="doctors-h">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <p className="kicker">{DOCTORS_SECTION.kicker}</p>
          <h2 id="doctors-h" className="h-display mt-4 text-4xl sm:text-5xl">
            {DOCTORS_SECTION.headline}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {DOCTORS_SECTION.intro}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <DoctorsRail />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------- 7 · Products and lab tests ---------------------- */

export function ProductsAndLabs() {
  return (
    <section className="section" aria-labelledby="products-h">
      <div className="wrap">
        <Reveal className="max-w-2xl">
          <p className="kicker">{PRODUCTS_SECTION.kicker}</p>
          <h2 id="products-h" className="h-display mt-4 text-4xl sm:text-5xl">
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
          <h2 id="events-h" className="h-display mt-4 text-4xl sm:text-5xl">
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
