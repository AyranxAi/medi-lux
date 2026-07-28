# HANDOVER — Medi-Gyn recreation → the Luxury-Cinema pass

**Written 2026-07-29. Read this first in a new chat.** The build so far is done and
live; the path forward changes: we now restyle toward three luxury-clinic
references and build a cinematic video hero. Ayran's words: *"we are going to
copy the styles of this three on what makes them beautiful"* and the hero
becomes a film *"the customer doesn't do anything, just watch"*.

---

## 1 · What exists and where

| Thing | Where |
|---|---|
| Source of truth (Next.js 16 + Tailwind v4 + framer-motion) | repo `AyranxAi/medi-lux`, local `~/Documents/medi-gyn/medi-lux` |
| **Live — CANONICAL (Vercel)** | **https://medi-lux.vercel.app** — Ayran connected the medi-lux repo to Vercel directly; every push to `main` auto-deploys. `vercel.json` pins `outputDirectory: out` (without it Vercel served `public/` and HTML 404'd). Commit author must stay `AyranxAi@users.noreply.github.com` (Vercel Hobby rule; configured in the clone). |
| Live — secondary (GitHub Pages) | https://ayranxai.github.io/medi-lux/ (workflow `.github/workflows/deploy.yml`, basePath `/medi-lux`). Same commit, second URL — ignore unless Vercel is down. |
| Dead end (don't reuse) | Repo `AyranxAi/medi-gyn-app` (~/Documents/medi-gyn/app) got one static-export push (`403b5b1`) during deploy hunting before Ayran wired medi-lux→Vercel; its old round-2 prototype is restorable from `8e444aa`. `medi-gyn.vercel.app` (old "Choose How You Age" site) is served from repo `AyranxAi/medi-gyn` (~/Documents/medi-gyn/site) — untouched. |
| Design brief (client's, supersedes everything) | `~/Downloads/Web design checklist.md` — Irina's strategy doc |
| Distilled rules | `DESIGN_DIRECTION.md` · image slots/prompts `IMAGE_PROMPTS.md` · copy all in `lib/content.ts` |
| Doctor photos (18, real) | `~/Documents/medi-gyn/Doctors/` → copied to `public/images/doctors/doc-01..18.webp` |
| Logo vectors | `~/Documents/medi-gyn/brand-assets/logo/*/PDF/` (extract: `pdftocairo -svg`) |

Current homepage (checklist order, all shipped): hero → symptom cards →
4 pathways → Method (burgundy band) → Why → **18-expert swipe rail** (scroll-snap,
real portraits, Irina first) → products (low) → menoSTART → CTA band. Plus
`/pathways/[slug]` (10-part template ×4), `/quiz` (routes to pathways), `/book`,
`/events`, `/about`, `/products`. Build: `npm run build` = green, all static.

## 2 · Locked decisions & guardrails (do not re-litigate)

- **Landing page only** is in scope right now. Design integration + taste of luxury.
- **LOGO: never redraw.** The real mark is lowercase serif **medi✦gyn** — the DNA
  helix *is* the "y" of "gyn"; monogram "mg" = favicon. Exact vectors live in
  `components/Logo.tsx` / `app/icon.svg`. Geometry untouched, colors only
  (currently deep-burgundy letters + soft-gold helix). Ayran was explicit after
  I once approximated it: *"keep it up, just change the colors — it's still the logo."*
- Hero headline: **"Your Symptoms Are Not Random. They Are Signals."**
- Type: **Cormorant Garamond + Inter**. Tokens in `app/globals.css`
  (ivory `#FAF7F1`, cream, taupe, burgundy `#5C1F31`, rose, gold `#C2A05E`,
  gold-deep for small text). One burgundy CTA per viewport.
- Brand's own logo colors are already burgundy `#8B2236` / champagne `#E1D3A8` /
  ivory `#FDFAF4` — the brand and the checklist palette agree.
- WCAG accessibility is a client requirement (checklist): AA contrast, focus
  rings, 44px targets, reduced-motion, skip link — all present; keep them.
- Dr. Khalid's B&W photo → he wants it colored, **but "don't worry about it now"**.
- Never AI-generate a clinician's face. Doctor slots = real photos only.

## 3 · THE NEW PATH — three references, one goal

Copy **what makes these beautiful** (not their content, their craft):

### Echelon Health (echelonhealth.ae) — Dubai
- Full-bleed **black-&-white cinematic film** hero of real clinic moments (a
  greeting at a door — human warmth, not machines). Nav = tiny small-caps, EN/AR.
- Palette: mist/sage neutrals + one deep accent; huge quiet sections.
- Organic **curved masks** around imagery; an interactive body-map (X-ray body
  inside a curved dark panel) — medical tech presented as art.
- Editorial 3-column paragraphs in small type; underlined serif links.

### VIVAMAYR (vivamayr.com) — Austria
- Film hero, headline lower-left, two lines: "Life Changing / with VIVAMAYR" —
  brand name set in its own logotype color inline with white text.
- **One coral-red accent does ALL accent work**: logotype, one pill button
  (INQUIRY), and a signature **thin arc hairline** drawn on acres of white.
  Nothing else is colored. This discipline is the lesson.
- Centered logo in the nav bar; utility bar above (phone, email, DE|EN).
- Offering = "one core program + six modules": tiny caps label `MODULE` over
  serif name + one sentence + "Learn more". Calm grid, no cards-with-shadows.

### Clinique La Prairie (cliniquelaprairie.com) — Switzerland
- **Near-black luxury cinema.** Kicker in letterspaced caps ("THE MOST
  PROGRESSIVE, LONGEVITY CLINIC IN THE WORLD"), then the signature move:
  **ROMAN CAPS + *italic* in one headline** — "AT THE HEART OF / *THE SECRET OF
  LIFE*", "WE ARE / *LIFE-CHANGERS*". Steal this typographic gesture.
- **A woman's profile in shadow facing a DNA helix of golden dust particles.**
  This is Medi-Gyn's emotional hook, one palette away — our helix IS the logo.
- Programs as a bare caps list (REVITALISATION / MASTER DETOX / …) — names
  carry the luxury; no thumbnails needed.
- Outline buttons, WhatsApp glyph in the header, destinations as an empire list.

### Shared DNA (the actual checklist for our restyle)
1. Film first; the message lands in ≤7 words overlaid in HTML type.
2. One accent color, used ~3 times per page, never more.
3. Kickers: letterspaced caps, tiny. Headlines: serif, huge, roman+italic mix.
4. Sections breathe (~120px+); no drop shadows — hairlines and darkness.
5. Imagery: cinematic, graded, human; never clinical white-coat stock.
6. Nav: minimal, book-CTA always visible top-right.
7. Interaction is optional everywhere — the page works as pure film + reading.

### Medi-Gyn translation (planned, next chat)
- Hero becomes **burgundy cinema**: near-black burgundy (`~#1F0A10–#2A0F17`)
  full-bleed film, gold-dust helix motif (echoes the logo's y), headline in
  Cormorant roman+italic: "Your Symptoms Are Not Random. / *They Are Signals.*"
- Below the film, the checklist conversion journey stays (Irina's structure is
  non-negotiable), restyled with the shared DNA above.
- The VIVAMAYR lesson applied: burgundy CTA + gold hairline arc = the only chrome.

## 4 · THE FILM (Ayran's emotional-hook brief + my recommendation)

His idea: an autoplay film like Audemars Piguet / Porsche / Patek — *"a story of
the woman and her hormone… slides slowly or a film that shows and repeats, the
customer doesn't do anything, just watches."* Still brainstorming — bring options.

**Concept draft — "Her Signals" (loop, 25–35s, silent):**
darkness → faint gold dust drifts → it becomes the helix (the logo's y) →
a woman's profile in shadow, breathing → words surface one at a time in italic
serif (*fatigue… brain fog… poor sleep…*) as drifting light → she turns toward
warm light → ivory morning, she is herself, quiet smile → the dust settles into
the medi✦gyn wordmark → fade, seamless loop. Nothing to click; the Book CTA
floats calmly in the corner the whole time.

**Production ladder** (start cheap, upgrade without changing the page):
1. **Now**: CSS/canvas gold-dust helix animation over a graded still (zero video
   cost, ships immediately, already premium).
2. **Next**: AI-generated film (Veo/Runway) from art-directed stills + motion
   prompts — extend `IMAGE_PROMPTS.md` with a `FILM_PROMPTS` section.
3. **Real**: a one-day shoot with a real woman 40–60 (the checklist's
   authenticity rule) — the AI cut becomes the storyboard.

**Technical spec (whoever builds it):** `<video autoplay muted loop playsinline
preload="metadata" poster=…>`; H.264 MP4 (+WebM), 1080p 24fps, target ≤12 MB;
portrait 9:16 variant for mobile via `<source media>`; poster = LCP image;
`prefers-reduced-motion` → poster only; overlay text is always HTML (never baked
into the video) for SEO + accessibility; gradient scrim for AA contrast; no sound.

## 5 · Open items

1. Ayran runs permissive mode (`--dangerously-skip-permissions`) — build without
   asking for routine steps; batch only real taste/scope questions.
2. Ayran will color-grade Dr. Khalid's B&W portrait later (parked, his call).
3. Name normalisations to confirm with him: "Dr. Greta Peciulyte" (from
   `dr-gretap-peciulyte`), "Begum Demircan"; Dr. Ebenezer Abel Paul has no title
   in the filename → card says "Profile in progress".
4. Booking mechanism, WhatsApp number, public email — still placeholders.
5. Hero film: pick concept + production rung (§4) with Ayran before building.
6. IMAGE slots IMG-01…05, 09, 10 still placeholders — he generates via
   `IMAGE_PROMPTS.md`.
