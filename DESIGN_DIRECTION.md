# Medi-Gyn — Design Direction

**Source of truth: the client checklist (Web design checklist.md). This doc distills
it into rules we can build against. When in doubt, re-read her words, not ours.**

The feeling, in her formula:
**Clinical credibility + feminine intelligence + Monaco/Dubai luxury + warmth.**
A premium patient conversion engine — not a content storage space, not a shop,
not a wellness blog.

## 1 · The one-promise rule

Every screen makes exactly one promise and asks for exactly one action.
- Homepage promise: *"Your Symptoms Are Not Random. They Are Signals."*
- One primary CTA color (burgundy) — if two burgundy buttons are visible in the
  same viewport, one of them is wrong.
- Secondary actions are outline or text links. Tertiary actions are text only.

## 2 · Palette (tokens in `app/globals.css`)

| Token | Hex | Role |
|---|---|---|
| ivory | `#FAF7F1` | Default background |
| cream | `#F4EDE1` | Alternating sections |
| taupe / line | `#E9E1D2` / `#DED4C2` | Surfaces, hairlines |
| burgundy | `#5C1F31` | THE CTA + brand weight (footer, method band) |
| rose | `#C79A92` | Warmth — imagery tones, tints; never small text |
| gold | `#C2A05E` | Decorative glint (logo rungs, numerals, hairlines) |
| gold-deep | `#8A6A34` | Gold for small text — AA contrast on ivory |
| ink / ink-soft | `#2E2228` / `#6A585F` | Text |

Rules: hairlines instead of shadows wherever possible; shadows only to lift
menus. No neon, no gradients louder than the imagery tints. Rose is an
atmosphere, not a UI color.

## 3 · Typography

- **Cormorant Garamond** (400/500/600 + italic) — headlines, doctor names, big
  numerals. Generous sizes, tight leading (~1.05), `text-balance`.
- **Inter** — everything else. Body 14–16px, line-height ≥1.5.
- Kickers: 11px, uppercase, letterspaced 0.28em, gold-deep. This is the site's
  signature micro-detail — use it consistently, never bold headlines instead.

## 4 · Shape language

- Rounded, feminine geometry: cards 16–24px radius, pills for buttons/chips.
- **The arch** (`rounded-t-[999px]`) is the signature frame — hero and founder
  portraits only. If it appears more than twice per page it stops being special.
- Fine-line SVG icons at 1.5px stroke, never emoji, never filled blobs.

## 5 · Motion (framer-motion)

- One gesture: soft fade-up on scroll, once, 0.7s, gentle ease. Stagger ≤0.35s.
- Micro-interactions 150–300ms (hover color, arrow nudge 2px).
- Banned: parallax, loops, pulsing CTAs, anything that moves without meaning.
- `useReducedMotion` is respected everywhere — this is a medical site.

## 6 · Conversion journey (homepage order is fixed)

Hero → "What are you experiencing?" (symptom cards) → Care pathways (4) →
The Medi-Gyn Method (5 steps) → Why Medi-Gyn → Doctors → Products & labs
(low, supportive) → Events/menoSTART → closing CTA band.

Trust before conversion: doctors are on the homepage, products are below them.
The quiz is the pressure-free entry for visitors not ready to book.

## 7 · Voice

- Decode / signals / heard / understood — her vocabulary, everywhere.
- Banned words: "largest", "industry leader", "best-in-class", "cutting-edge".
- European philosophy: mentioned once, quietly, last in the Why list.
- Every medical claim ships only after clinical review (see footers/FAQ notes).

## 8 · Non-negotiables (from the UI/UX Pro Max audit checklist)

- WCAG: 4.5:1 body contrast, visible focus rings (gold), keyboard-navigable
  menus, skip link, alt text on every real image.
- Touch targets ≥44px, mobile-first layouts, no horizontal scroll.
- Performance: next/image, WebP, font `display:swap`, reserve image space
  (no CLS), lazy-load below the fold.
- SEO: one h1 per page, meta title+description per page, internal links between
  symptoms → pathways → booking.

## 9 · Still open (decisions that belong to Irina/Ayran)

Tracked in README §Open questions — booking system, WhatsApp number, doctor
roster, menoSTART assets, product catalogue, languages, domain.
