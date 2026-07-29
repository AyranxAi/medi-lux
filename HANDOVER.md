# HANDOVER — Medi-Gyn

**Updated 2026-07-29 (session 2). Read this first in a new chat.**

Session 1 built the site. Session 2 rebuilt the hero and the symptoms section
and landed all twelve symptom photographs. The luxury-cinema film pass (§5) is
still planned, not started.

---

## 1 · What exists and where

| Thing | Where |
|---|---|
| Source of truth (Next.js **16.2.12** + Tailwind **v4** + framer-motion) | repo `AyranxAi/medi-lux`, local `~/Documents/medi-gyn/medi-lux` |
| **Live — CANONICAL (Vercel)** | **https://medi-lux.vercel.app** — repo wired to Vercel directly; every push to `main` auto-deploys. Project dashboard: `https://vercel.com/ayran-ai-s-projects/medi-lux`. `vercel.json` pins `outputDirectory: out`. |
| Live — secondary (GitHub Pages) | https://ayranxai.github.io/medi-lux/ (`.github/workflows/deploy.yml`, basePath `/medi-lux`). Same commit, second URL. |
| Dead end (don't reuse) | `AyranxAi/medi-gyn-app`; `medi-gyn.vercel.app` is the old site from `AyranxAi/medi-gyn` — untouched. |
| Design brief (client's, supersedes everything) | `~/Downloads/Web design checklist.md` — Irina's strategy doc |
| Distilled rules | `DESIGN_DIRECTION.md` · image slots `IMAGE_PROMPTS.md` · **all copy in `lib/content.ts`** |
| Doctor photos (18, real) | `public/images/doctors/doc-01..18.webp` |
| Logo vectors | `components/Logo.tsx` / `app/icon.svg` |

**⚠ Commit author must stay `AyranxAi@users.noreply.github.com`.** Vercel's Hobby
plan refuses builds whose Git author isn't on the account. A fresh clone (e.g. a
new cloud session) will NOT have this configured — set it before the first
commit:

```
git config user.name "AyranxAi"
git config user.email "AyranxAi@users.noreply.github.com"
```

Homepage order (Irina's checklist, non-negotiable): hero → symptoms → 4 pathways
→ Method (burgundy band) → Why → 18-expert rail → products → menoSTART → CTA.
Plus `/pathways/[slug]` ×4, `/quiz`, `/book`, `/events`, `/about`, `/products`.
`npm run build` = green, all static.

## 2 · What session 2 changed

**Hero** (`components/HeroCarouselClient.tsx`)
- Full viewport: `min-h-[100svh]`, no max-height cap. Measured 900/900 desktop,
  844/844 mobile.
- Scrim **neutralised**: was `rgba(36,17,24)` — a plum-black that pulled every
  slide red — now `rgba(20,20,20)` at identical opacities. Neutral is a shade
  darker in luminance, so contrast improved slightly.
- Removing the scrim entirely was tried and **rejected on measurement** (§4).

**Header** (`components/Header.tsx`)
- `fixed`, not `sticky`, so it overlays the hero. Non-hero routes get an 88px
  spacer so their layout is unchanged.
- Transparent only at the top of routes in `OVERLAY_ROUTES` (currently `/`).
- **Hides on scroll down, returns with its backdrop on scroll up.** This replaced
  "fade a solid bar in", which Ayran rejected as not actually transparent.
- Bar 88px; logo 40/44/48px; nav type 14.5px; its own `max-w-[1440px]` container
  because `wrap` (max-w-6xl) was 55px too narrow for the larger type at 1280.

**Symptoms section** — rebuilt (`components/SymptomsRail.tsx` +
`SymptomsRailClient.tsx`, section markup in `components/home.tsx`)
- Was a 12-card text grid. Now: cream background, left kicker + headline with the
  helper line set right, five filter tabs, and a scroll-snap rail of 3:4
  photo cards (`320/384/440px`) with scrim, gold category icon, and a decorative
  gold arrow disc.
- Categories live in `SYMPTOM_CATEGORIES`; every symptom carries a `category`.
  "All" leads so the section opens showing all twelve.
- Arrows appear from `xl`, dots from `sm` — both measured to fit, see §4.
- Quiz CTA survives as a burgundy end card in the rail.

**Images** — all twelve `SYM-01…12.webp` are in place. No placeholders remain in
the rail. See `IMAGE_PROMPTS.md` for the slot ↔ image map.

## 3 · Locked decisions (do not re-litigate)

- **LOGO: never redraw.** Lowercase serif **medi✦gyn**, the DNA helix *is* the
  "y". Colours only. Ayran: *"keep it up, just change the colors."*
- Hero headline: **"Your Symptoms Are Not Random. They Are Signals."**
- Type: **Cormorant Garamond + Inter**. Tokens in `app/globals.css` (ivory
  `#FAF7F1`, cream `#F4EDE1`, taupe, burgundy `#5C1F31`, rose, gold `#C2A05E`,
  gold-deep for small text on light). One burgundy CTA per viewport.
- **Symptoms section stays LIGHT.** A deep burgundy band was built, shipped, and
  reverted. It reads well against flat placeholder gradients but competes with
  real photographs; the light ground lets the images be the subject. Ayran and
  ChatGPT both landed here independently. Don't re-propose the dark band.
- **Never AI-generate a clinician's face.** Doctor slots = real photos only.
- WCAG AA is a client requirement: contrast, focus rings, 44px targets,
  reduced-motion, skip link. All present — keep them.
- Dr. Khalid's B&W photo → he wants it coloured, but *"don't worry about it now"*.

## 4 · Traps that cost time (read before touching these)

- **Tailwind v4 uses the standalone `translate` property**, not `transform`. A
  `transition-[transform,…]` on a `-translate-y-full` animates *nothing*. The
  header's transition list must name `translate`.
- **Next 16 no longer overrides `scroll-behavior: smooth` on route changes.**
  `<html>` carries `data-scroll-behavior="smooth"` in `app/layout.tsx` to restore
  the instant-jump behaviour. Removing it makes navigation visibly scroll.
- **JSX comments in expression position.** After `return (`, use `/* … */`, not
  `{/* … */}` — the braces are parsed as an object literal and the build fails.
- **`trailingSlash: true`** — `usePathname()` returns `/about/`. Normalise before
  matching routes.
- **Measure, don't guess, when things must fit.** The nav overflowed at exactly
  1280 and the filter tabs needed 1027px against 972px available. Both were found
  by reading `scrollWidth` vs `clientWidth` in Playwright, not by eye.
- **HERO-02 fails contrast.** Sampling the real pixels behind the headline on
  each slide, against ivory, AA needs 3.0 for large text:

  | slide | no scrim | current neutral scrim |
  |---|---|---|
  | HERO-01 | 1.01 ✗ | 4.31 ✓ |
  | **HERO-02** | 1.06 ✗ | **2.64 ✗** |
  | HERO-03 | 1.09 ✗ | 3.37 ✓ |
  | HERO-04 | 4.27 ✓ | 8.23 ✓ |
  | HERO-05 | 2.10 ✗ | 5.78 ✓ |

  HERO-02 is backlit and bright edge to edge; it was already failing before the
  scrim was neutralised. Fix = a per-slide scrim bump or a different image.
  Ayran has been told; his call.

## 5 · THE NEW PATH — three references, one goal (not started)

Copy **what makes these beautiful** (not their content, their craft).

### Echelon Health (echelonhealth.ae) — Dubai
Full-bleed **black-&-white cinematic film** hero of real clinic moments. Nav =
tiny small-caps. Mist/sage neutrals + one deep accent; huge quiet sections.
Organic **curved masks** around imagery; an interactive body-map. Editorial
3-column paragraphs in small type; underlined serif links.

### VIVAMAYR (vivamayr.com) — Austria
Film hero, headline lower-left, two lines. **One coral-red accent does ALL
accent work**: logotype, one pill button, and a signature **thin arc hairline**
on acres of white. Nothing else is coloured — this discipline is the lesson.
Offering = "one core program + six modules": tiny caps label over serif name.

### Clinique La Prairie (cliniquelaprairie.com) — Switzerland
**Near-black luxury cinema.** Letterspaced caps kicker, then the signature move:
**ROMAN CAPS + *italic* in one headline** — "AT THE HEART OF / *THE SECRET OF
LIFE*". Steal this typographic gesture. **A woman's profile in shadow facing a
DNA helix of golden dust** — Medi-Gyn's emotional hook, one palette away; our
helix IS the logo. Programs as a bare caps list.

### Shared DNA (the checklist for the restyle)
1. Film first; the message lands in ≤7 words overlaid in HTML type.
2. One accent colour, ~3 times per page, never more.
3. Kickers: letterspaced caps, tiny. Headlines: serif, huge, roman+italic mix.
4. Sections breathe (~120px+); no drop shadows — hairlines and darkness.
5. Imagery: cinematic, graded, human; never clinical white-coat stock.
6. Nav: minimal, book-CTA always visible top-right.
7. Interaction optional everywhere — the page works as pure film + reading.

### Medi-Gyn translation (planned)
Hero becomes **burgundy cinema**: near-black burgundy (`~#1F0A10–#2A0F17`)
full-bleed film, gold-dust helix motif, headline in Cormorant roman+italic:
"Your Symptoms Are Not Random. / *They Are Signals.*" Below the film, the
checklist conversion journey stays, restyled with the shared DNA.

## 6 · THE FILM (Ayran's brief + recommendation)

His idea: an autoplay film like Audemars Piguet / Porsche / Patek — *"a story of
the woman and her hormone… the customer doesn't do anything, just watches."*
Still brainstorming — bring options.

**Concept draft — "Her Signals" (loop, 25–35s, silent):** darkness → faint gold
dust drifts → it becomes the helix (the logo's y) → a woman's profile in shadow,
breathing → words surface one at a time in italic serif (*fatigue… brain fog…
poor sleep…*) → she turns toward warm light → ivory morning, quiet smile → the
dust settles into the medi✦gyn wordmark → seamless loop. Book CTA floats calmly
in the corner throughout.

**Production ladder** (start cheap, upgrade without changing the page):
1. **Now**: CSS/canvas gold-dust helix over a graded still. Zero video cost.
2. **Next**: AI film (Veo/Runway) from art-directed stills — extend
   `IMAGE_PROMPTS.md` with a `FILM_PROMPTS` section.
3. **Real**: a one-day shoot with a woman 40–60; the AI cut becomes the storyboard.

**Technical spec:** `<video autoplay muted loop playsinline preload="metadata"
poster=…>`; H.264 MP4 (+WebM), 1080p 24fps, ≤12 MB; portrait 9:16 for mobile via
`<source media>`; poster = LCP image; `prefers-reduced-motion` → poster only;
overlay text always HTML (never baked in) for SEO + a11y; gradient scrim for AA;
no sound.

## 7 · Open items

1. Ayran runs permissive mode — build without asking for routine steps; batch
   only real taste/scope questions. He does ask for questions before big swings.
2. **HERO-02 contrast** (§4) — pick: per-slide scrim bump, or replace the image.
3. Remaining image slots: **IMG-01…05, IMG-09, IMG-10** still placeholders.
   IMG-06/07/08 are doctor portraits (real, in place).
4. Booking mechanism, WhatsApp number, public email — still placeholders.
5. Hero film: pick concept + production rung (§6) with Ayran before building.
6. Name normalisations to confirm: "Dr. Greta Peciulyte", "Begum Demircan";
   Dr. Ebenezer Abel Paul has no title in the filename → "Profile in progress".
7. Dr. Khalid's B&W portrait → colour grade (parked, his call).
8. **23 source PNGs sit at the repo root** (`ChatGPT Image …png`, ~40 MB, tracked
   in git). They're the originals for HERO-01…05 and SYM-01…12, plus 2 unused
   abstracts and 1 unused portrait. Safe to delete once nobody needs re-crops —
   ask first.
9. Symptom copy: Ayran's category list used fuller names ("Hot flushes and night
   sweats", "Bloating or gut issues", "Skin changes and ageing"). The shorter
   existing names were kept because they're card titles at 31px. Offer again if
   he wants the fuller wording.

## 8 · How to verify work in this repo

There's no test suite. What's been reliable:

```
npm run build                 # must be green; static export, 13 routes
npx next dev -p 3737          # then drive it with Playwright
```

Chromium is at `/opt/pw-browsers/chromium` (`playwright-core` is available; do
NOT run `playwright install`). Screenshot a section with
`page.locator('section[aria-labelledby="…"]').screenshot()`. For anything that
must *fit*, read `scrollWidth` vs `clientWidth` rather than eyeballing a
screenshot — that's what caught both overflow bugs. For contrast over imagery,
sample the image pixels via canvas and composite the scrim analytically; the
script pattern is in the session-2 history if needed.
