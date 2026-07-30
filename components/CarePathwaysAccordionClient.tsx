"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import type { Pathway, PathwayPanel } from "@/lib/content";

export type ResolvedPathwayPanel = PathwayPanel &
  Pick<Pathway, "slug" | "name"> & { src: string | null };

/*
  Care pathways — one continuous horizontal image accordion on desktop, the
  same four panels stacked vertically below 1024px.

  Three decisions worth knowing before editing this file:

  1. Activation and navigation are deliberately separate. The whole panel is a
     <button> that only ever changes which panel is open; the single way to
     reach a pathway page is the "Explore pathway" anchor inside the open one.
     Clicking an already-open panel is therefore a no-op, and the accordion has
     no fully-collapsed state.

  2. Each panel carries two absolutely-positioned text layers — closed and open
     — that cross-fade in place. The number and title appear in both, at
     different sizes; fading between two static blocks is calmer than animating
     font-size, and `inert` keeps exactly one of them in the accessibility tree
     so nothing is announced twice.

  3. All the motion is CSS, in the `.pathways-acc` block in globals.css. This
     component only owns which slug is active. framer-motion is available and
     used elsewhere on the page, but a width transition does not need it.
*/

/* the default is one data value, not a constant here — see `defaultActive` */
function initialSlug(panels: ResolvedPathwayPanel[]): string {
  return (panels.find((p) => p.defaultActive) ?? panels[0]).slug;
}

export default function CarePathwaysAccordionClient({
  panels,
}: {
  panels: ResolvedPathwayPanel[];
}) {
  const [activeSlug, setActiveSlug] = useState(() => initialSlug(panels));

  return (
    <div className="pathways-acc overflow-hidden rounded-3xl bg-ink">
      {panels.map((p) => (
        <PathwayPanelView
          key={p.slug}
          panel={p}
          active={p.slug === activeSlug}
          onActivate={() => setActiveSlug(p.slug)}
        />
      ))}
    </div>
  );
}

function PathwayPanelView({
  panel,
  active,
  onActivate,
}: {
  panel: ResolvedPathwayPanel;
  active: boolean;
  onActivate: () => void;
}) {
  const openId = `pathway-panel-${panel.slug}`;
  const triggerId = `pathway-trigger-${panel.slug}`;

  /*
    Two focal points per photograph on desktop. The open panel is a ~1.25
    landscape box and the closed one a ~0.38 vertical sliver; a single
    object-position cannot always serve both. Falls back when unset.
  */
  const desktopPosition = active
    ? panel.objectPositionDesktop
    : (panel.objectPositionDesktopInactive ?? panel.objectPositionDesktop);

  return (
    <div className="pathways-acc__panel" data-active={active}>
      {panel.src ? (
        /*
          One element, two framings. The breakpoint picks between the custom
          properties in CSS rather than this rendering a second <Image> for
          desktop, which would put two rungs of the same photograph on the wire.
        */
        <Image
          src={panel.src}
          alt={panel.image.alt}
          fill
          sizes="(min-width: 1024px) 620px, 100vw"
          loading="lazy"
          className="pathways-acc__img object-cover"
          style={
            {
              "--acc-op-mobile": panel.objectPositionMobile,
              "--acc-op-desktop": desktopPosition,
            } as CSSProperties
          }
        />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#f0e1dc_0%,#e6cfc8_55%,#d9bab2_100%)]" />
      )}

      <div
        className="pathways-acc__scrim pathways-acc__scrim--closed"
        data-show={!active}
      />
      <div
        className="pathways-acc__scrim pathways-acc__scrim--open"
        data-show={active}
      />

      {/*
        Sits beneath both text layers and fills the panel, so a click anywhere
        that is not the CTA opens the pathway. Its accessible name carries the
        visible title, satisfying "label in name".
      */}
      <button
        type="button"
        id={triggerId}
        className="pathways-acc__trigger"
        aria-expanded={active}
        aria-controls={openId}
        aria-label={`${panel.number} — ${panel.name}`}
        onClick={onActivate}
      />

      {/* ---------------------------- closed ---------------------------- */}
      <div
        className="pathways-acc__layer pathways-acc__layer--closed px-5 sm:px-7 lg:px-5 lg:pb-8"
        data-show={!active}
        inert={active}
      >
        <p className="pathways-acc__rise shrink-0 text-[10px] font-semibold tracking-[0.3em] text-gold-tint/85">
          {panel.number}
        </p>
        <h3 className="pathways-acc__rise font-serif text-[19px] leading-[1.2] font-medium text-ivory lg:mt-3 lg:text-[17px]">
          {panel.name}
        </h3>
        <p className="pathways-acc__rise mt-2.5 hidden text-[11.5px] leading-relaxed text-ivory/75 lg:block">
          {panel.shortDescription}
        </p>
        {/* no __rise here on purpose — it owns its own opacity transition */}
        <p className="pathways-acc__hint mt-4 hidden items-center gap-1.5 text-[11px] font-semibold tracking-wide text-gold-tint lg:flex">
          View pathway
          <Icon name="arrow-right" className="h-3 w-3" />
        </p>
      </div>

      {/* ----------------------------- open ----------------------------- */}
      <div
        id={openId}
        role="region"
        aria-labelledby={triggerId}
        className="pathways-acc__layer pathways-acc__layer--open px-5 pb-7 sm:px-7 sm:pb-8 lg:px-7 lg:pb-8 xl:px-9 xl:pb-9"
        data-show={active}
        inert={!active}
      >
        <p className="pathways-acc__rise text-[10px] font-semibold tracking-[0.3em] text-gold-tint">
          {panel.number}
        </p>
        {/*
          Type steps down at lg and back up at xl, which is a contrast decision
          as much as a typographic one. A 2.4:1 panel at 1024 is only 400px
          tall; at the xl sizes this block ran to ~315px of it, and protecting
          type that high needed a scrim that swallowed the photograph. Smaller
          here means a lighter scrim there.

          The capped measure also stops pathway 04's title running the full
          width of the panel and straight across the vial behind it.
        */}
        <h3 className="pathways-acc__rise mt-2.5 max-w-[19ch] font-serif text-[27px] leading-[1.12] font-medium text-ivory sm:text-[31px] lg:text-[25px] xl:text-[29px]">
          {panel.name}
        </h3>
        <p className="pathways-acc__rise mt-2.5 max-w-[42ch] text-[13.5px] leading-relaxed text-ivory/90 lg:text-[13px]">
          {panel.fullDescription}
        </p>
        <div className="pathways-acc__rise mt-4 flex flex-wrap gap-1.5">
          {panel.keyTerms.map((term) => (
            <span key={term} className="chip-on-image">
              {term}
            </span>
          ))}
        </div>
        <div className="pathways-acc__rise mt-4">
          <Link
            href={panel.route}
            className="pointer-events-auto inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold tracking-wide text-gold-tint transition-colors hover:text-ivory"
          >
            Explore pathway
            <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
