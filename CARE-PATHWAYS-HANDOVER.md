# HANDOVER — Care Pathways interactive accordion

**Written 2026-07-30 by a Claude Code session scoped to `AyranxAi/medi-lux`.**
**Intended reader: the next session, working in `AyranxAi/medi-gyn-app`.**

Nothing was built. This session could only *read* `medi-lux`, and Ayran wants the
work done in `medi-gyn-app`. Everything needed to build it is below, including
the parts of the `medi-lux` codebase you may not be able to open yourself.

---

## 0 · Read this first — the repo question

Ayran's framing: **`medi-lux` = final, `medi-gyn-app` = the test copy.**

The existing `HANDOVER.md` in `medi-lux` (line 18) contradicts this — it calls
`AyranxAi/medi-gyn-app` a *"Dead end (don't reuse)"*. That note was written by an
earlier session, before Ayran re-designated the repos.

**Your first job is to resolve this, not assume it.** Open `medi-gyn-app` and check:

1. Does it contain a Next.js app with `components/home.tsx` and `lib/content.ts`?
2. Does `lib/content.ts` export a `PATHWAYS` array with the four slugs?
3. Do the routes `app/pathways/[slug]/page.tsx` exist?
4. Does `app/globals.css` carry the `@theme inline` token block (ivory, burgundy, gold)?

- **All four yes** → it is a working copy of the site. Build the accordion there. §2 onward applies directly.
- **Any no** → it is stale or a different codebase. **Stop and tell Ayran** before
  writing anything. The likely fix is to sync `medi-lux`'s current `main` into
  `medi-gyn-app` first, which is his call, not yours.

**Strong recommendation for the new session: select BOTH repositories.** The web
session repo picker supports multiple repos. With `medi-lux` attached read-only
you can diff the two codebases and copy the real design system across instead of
trusting this document. See §1.

---

## 1 · How to start the new session on `medi-gyn-app`

The repository is fixed **when the session is created** — it cannot be changed
mid-session, and there is no tool to add one. This session was locked to
`medi-lux`, which is why the work stopped.

**Steps** (from the Claude Code on the web docs):

1. Go to **claude.ai/code**.
2. Click the **repository selector below the input box**.
3. Choose **`AyranxAi/medi-gyn-app`**. Each repo gets its own **branch selector** —
   set it if you don't want the default branch.
4. Click it again and **also add `AyranxAi/medi-lux`** (multiple repos per session
   are supported). This gives the session the real design system to copy from.
5. Set the mode dropdown to **Accept edits** (or **Plan** to approve the approach first).
6. Paste the task prompt and submit.

**Shortcut — a pre-filled link that selects both repos:**

```
https://claude.ai/code?repositories=AyranxAi/medi-gyn-app,AyranxAi/medi-lux&prompt=Read%20CARE-PATHWAYS-HANDOVER.md%20and%20build%20the%20Care%20Pathways%20accordion%20it%20specifies
```

**If `medi-gyn-app` does not appear in the picker:** a cloud session can use any
repo the connected GitHub account can see. Confirm the connected account has
access on GitHub. If you also want PR auto-fix, install the Claude GitHub App on
it: github.com → **Settings → Applications → Claude → Configure** → check that
the repo is listed under **Repository access**. Private repos need the same
authorization as public ones.

---

## 2 · The four images — NOT YET IN ANY REPO

Ayran attached four photographs in chat on 2026-07-30. **Chat attachments do not
land in the repository.** I re-fetched all three `medi-lux` branches (`main`,
`blond`, `claude/medi-lux-hero-images-dic90k`) — the newest commits are all from
July 29 and none of the four images are present. The ~23 `ChatGPT Image *.png`
files at the `medi-lux` repo root are the older HERO/SYM originals, not these.

**Ayran must upload them** (GitHub → repo → *Add file → Upload files*) before this
can be built. Ask him where he put them.

### The four images, as described in his brief

| # | Pathway | Image content | Route |
|---|---|---|---|
| 01 | Hormone Therapy & BHRT | Flat-lay: embossed *Symptom Journal*, "Hormone Insights" lab report with estradiol/progesterone/cortisol charts, gold pen, water glass, pale rose | `/pathways/hormone-therapy` |
| 02 | Menopause Care | Woman in cream linen at a sunlit window, hand resting at her neck, dark hair, sheer curtain | `/pathways/menopause-care` |
| 03 | Functional Medicine | Ceramic bowl of yoghurt with figs, blackberries, blueberries, granola, gold spoon; lemon halves, coffee, marble | `/pathways/functional-medicine` |
| 04 | Peptide & Regenerative Support | Mature woman's neck and décolletage in ivory silk, hand at throat, unlabelled clear vial on a travertine plinth | `/pathways/peptide-regenerative` |

**Confirm this mapping with Ayran before wiring it** — it is my reading of the
attachments, not something he stated explicitly.

### Preparing them

`next.config.ts` sets **`images: { unoptimized: true }`** (required by
`output: "export"`). **next/image will NOT resize or generate srcset.** Whatever
file you ship is what every visitor downloads. So:

- Convert to **WebP**, ~1600px on the long edge, quality ~78. Existing `SYM-*.webp`
  files are 55–120 KB each — match that budget.
- Name them `PATH-01.webp` … `PATH-04.webp` in `public/images/` (existing
  convention: `HERO-01.webp`, `SYM-01.webp`, `IMG-06.webp`).
- Do **not** bake any text into the images. Titles and numbers are HTML.
- Do not crop, regrade, or regenerate the photographs — cropping is done in CSS
  via `object-fit: cover` + `object-position` only.

---

## 3 · What to build

Replace the current 2×2 Care Pathways card grid with **one continuous horizontal
image accordion** of four panels. Ayran's full brief is the authority; this is the
distilled spec.

### Keep the section intro exactly as-is

- Eyebrow: `CARE PATHWAYS`
- Headline: `Four ways in. One standard of care.`
- Body: `Every pathway starts the same way — with your story, your history, and your labs — and ends in a plan that is yours alone.`

All three already exist verbatim as `PATHWAYS_SECTION` in `lib/content.ts`.

### Desktop (≥1024px)

- One wide container, **rounded radius on the outer container only**, four panels
  edge-to-edge inside it, no gaps, no per-panel radius, no per-panel shadow.
- Very thin subtle internal dividers.
- **Aspect ratio ~2.4:1** for the whole accordion; width follows the existing
  `.wrap` container (`max-w-6xl` = 1152px → ~480px tall).
- Active panel **52%**, each inactive **16%** — totals exactly 100%, never overflows.
- Images fill panels with `object-fit: cover`.

**Resting state:** exactly one panel open on load. The default must be
**one configurable data value** — Ayran wants **Menopause Care (02)** as the default.

**Inactive panels show:** number, title, one short supporting line, a warm dark
overlay for legibility, and a subtle affordance that they're clickable. Keep them
*attractive* — do not crush them to near-black.

**Active panel reveals:** number, title, one concise description, 3–4 symptom
terms, and an `Explore pathway →` CTA. Text fades and rises gently. Use a **soft
bottom gradient** behind the text, not an opaque card. Don't overfill it.

### Interaction

- Click or keyboard activates; **activation never navigates**. Navigation happens
  only through the visible CTA anchor.
- Clicking the already-active panel keeps it open — the accordion never fully collapses.
- Outer width and height stay fixed; the page must not scroll on activation.

### Hover

No resizing. Only: slightly lift brightness, slightly reduce overlay, reveal a
discreet arrow / "View pathway" hint, pointer cursor. **No scale transforms** —
they crop faces and shift neighbours.

### Animation

| Property | Duration |
|---|---|
| panel width / flex-basis | 650–750ms |
| text opacity + transform | 350–500ms |
| image overlay | 400–500ms |

Easing `cubic-bezier(0.22, 1, 0.36, 1)`. No spring physics, no elastic, no zoom.

### Mobile / tablet

Below the breakpoint, become a **vertical** accordion — never four narrow columns.

- Four full-width rows; closed ~96–120px, open ~420–520px.
- One open at a time; first tap opens; the CTA inside navigates.
- Closed rows: number + title. Open row: description, key terms, CTA.
- Same image order, same visual language, no horizontal scrolling.

`lg` (1024px) is the natural switch point — at 768px, four 16% columns are ~123px
each, which is too cramped. **Verify by measurement, not by eye** (see §7).

### Accessibility (a client requirement — WCAG AA)

- Panels are semantic `<button>`s controlling regions.
- Tab-reachable; Enter and Space activate.
- Visible focus ring matching the brand (globals.css already sets
  `outline: 2px solid var(--color-gold-deep); outline-offset: 3px`).
- `aria-expanded` on each control, `aria-controls` pointing at its content region.
- Real alt text on all four images.
- CTA is a proper `<a>` / `next/link`, never a div.
- Text contrast meets AA over the imagery.
- Active state must not be signalled by colour alone.
- `prefers-reduced-motion: reduce` → remove or greatly shorten the width motion;
  switch immediately or with a short fade.

### Implementation

- One reusable component, not four duplicated blocks. Suggested:
  `components/CarePathwaysAccordion.tsx`, an internal `PathwayPanel`, and the data
  extending the existing `PATHWAYS` array in `lib/content.ts`.
- **TypeScript. `useState` for the active pathway. No new dependencies.**
  (`framer-motion` 12.43.0 is already installed and used by `Reveal`/`HeroCarousel`
  — you may reuse it, but CSS transitions are the better fit here and are what the
  brief asks for.)
- Mark it `"use client"`. `components/home.tsx` is a server component; the current
  `CarePathways()` section wrapper can stay server-side and render the client
  accordion inside, the same way it already renders `<SymptomsRail />`.

### Per-pathway data shape

Extend each existing `Pathway` object with:

```ts
id · number · title · shortDescription · fullDescription · keyTerms
image src · image alt · objectPositionDesktop · objectPositionMobile
route · optional defaultActive
```

---

## 4 · `medi-lux` codebase facts (copy from here if you can't read that repo)

**Stack:** Next.js **16.2.12** (App Router) · React **19.2.4** · TypeScript ·
Tailwind **v4** · framer-motion **12.43.0**. `output: "export"`,
`trailingSlash: true`, `images: { unoptimized: true }`. No test suite.

> ⚠ **This is not the Next.js you may know.** `medi-lux/AGENTS.md` instructs:
> read the relevant guide in `node_modules/next/dist/docs/` before writing code.
> Do that in whichever repo you build in.

**Files that own the current section**

| File | What |
|---|---|
| `components/home.tsx` | `CarePathways()` at **lines 102–164** — the 2×2 grid to replace |
| `lib/content.ts` | `Pathway` type (~184), `PATHWAYS` array (~198–334), `PATHWAYS_SECTION` (~336–341) — **all copy lives here** |
| `app/page.tsx` | renders `<CarePathways />` third, between `<Symptoms />` and `<Method />` |
| `app/pathways/[slug]/page.tsx` | the four destination pages |
| `components/ImageSlot.tsx` | the existing image component — **see the caveat below** |
| `app/globals.css` | all design tokens and component classes |

**Routes for the four CTAs — these already exist. Do not invent new pages.**

```
/pathways/hormone-therapy
/pathways/menopause-care
/pathways/functional-medicine
/pathways/peptide-regenerative
```

(With `trailingSlash: true`, `usePathname()` returns `/about/` — normalise before
matching routes.)

**Design tokens** — `app/globals.css`, `@theme inline`:

```
ivory   #faf7f1    burgundy       #5c1f31    gold        #c2a05e    ink       #2e2228
cream   #f4ede1    burgundy-deep  #471826    gold-deep   #8a6a34    ink-soft  #6a585f
taupe   #e9e1d2    rose           #c79a92    gold-tint   #f1e7d2
line    #ded4c2    rose-tint      #f0e1dc
```

`gold-deep` is the AA-contrast gold for small text on ivory — use it, not `gold`.

**Typography:** Cormorant Garamond (`--font-cormorant`, serif, weights 400/500/600
+ italic) and Inter (`--font-inter`, sans). Loaded via `next/font/google` in
`app/layout.tsx`. **Do not import another font.**

**Existing component classes** (reuse, don't reinvent):

```css
.wrap    → mx-auto w-full max-w-6xl px-5 sm:px-8     /* the page container */
.section → py-20 sm:py-28
.kicker  → text-[11px] font-semibold tracking-[0.28em] uppercase text-gold-deep
.h-display → font-serif font-medium tracking-tight text-balance
.chip    → rounded-full border border-line bg-ivory px-3 py-1 text-[11px] ...
.btn-primary / .btn-secondary / .btn-on-burgundy / .btn-outline-ivory
```

**⚠ `ImageSlot` caveat.** It hardcodes `className="object-cover"` with no
`object-position` support, and falls back to a toned placeholder when the file is
missing. It cannot express per-pathway focal points as-is. Either **add an
`objectPosition` prop** to it (preferred — keeps one image component) or use
`next/image` directly in the accordion. Don't silently fork it.

**⚠ Commit author, or Vercel refuses the build.** Vercel's Hobby plan rejects
builds whose git author isn't on the account. A fresh clone will not have this set:

```
git config user.name "AyranxAi"
git config user.email "AyranxAi@users.noreply.github.com"
```

---

## 5 · Copy — already approved, already in the repo

Ayran's brief supplies copy that is **near-verbatim what `lib/content.ts` already
contains** (`whoFor` and `symptoms` per pathway). His instruction: *"Use the
website's existing copy if equivalent approved content already exists."* So reuse
these and trim the term lists to the 3–4 he specified.

**01 · Hormone Therapy & BHRT** — `/pathways/hormone-therapy`
> For women whose energy, mood, cycles or libido no longer feel like their own.

Terms: Fatigue · Mood changes · Low libido · Cycle irregularity
*(repo also carries "PMS" — drop it to keep to four)*

**02 · Menopause Care** — `/pathways/menopause-care` — **DEFAULT ACTIVE**
> Personalised care through perimenopause, menopause and beyond.

Terms: Hot flashes · Poor sleep · Brain fog · Anxiety
*(repo also carries "Joint aches" — drop it)*

**03 · Functional Medicine** — `/pathways/functional-medicine`
> A deeper investigation into metabolism, digestion, thyroid health and inflammation.

Terms: Gut issues · Weight changes · Persistent fatigue · Hair thinning

**04 · Peptide & Regenerative Support** — `/pathways/peptide-regenerative`
> Medically supervised support for recovery, resilience, healthy ageing and vitality.

Terms: Slow recovery · Skin ageing · Low resilience · Long-term vitality
*(repo currently has only three — "Long-term vitality" is new from the brief)*

**CTA on every panel:** `Explore pathway →`

Richer per-pathway copy (`tagline`, `next`, `evaluate`, `planMayInclude`, `faq`)
already exists in `lib/content.ts` and feeds the detail pages — leave it alone.

---

## 6 · Starting `object-position` values, and a real tension to solve

These are **starting points to tune against the actual crops**, not measured values.

| # | Pathway | Desktop | Mobile | Must stay in frame |
|---|---|---|---|---|
| 01 | Hormone Therapy | `center 45%` | `center 50%` | journal, report, gold pen; keep glass + flower |
| 02 | Menopause Care | `60% 30%` | `center 30%` | face, neck gesture, upper body — **never crop the top of her head or her hand** |
| 03 | Functional Medicine | `center 55%` | `center 50%` | bowl, figs, berries, spoon, lemon — **don't crop the bowl** |
| 04 | Peptide & Regenerative | `58% 55%` | `center 60%` | neck/shoulder **and** the vial — **the vial must not leave the frame** |

**The tension worth knowing before you start.** All four sources are portrait
(~3:4). At 1152px wide and 2.4:1:

- an **inactive** panel is ~184 × 480 → aspect **0.38**, a very narrow vertical slice
- the **active** panel is ~599 × 480 → aspect **1.25**, landscape

So each photo must survive both a tall sliver *and* a landscape crop. A single
`objectPositionDesktop` may not serve both — image 04 especially, where the vial
sits right-of-centre and will fall outside a narrow slice centred on the neck.

**Recommendation:** allow an optional `objectPositionDesktopInactive` alongside
`objectPositionDesktop`, defaulting to the same value when absent. It costs
nothing and saves a rebuild. Flag this to Ayran either way — his brief assumes one
value per breakpoint, and this is a deviation worth his sign-off.

---

## 7 · How to verify (there is no test suite)

```bash
npm run build      # must be green — static export
npx next dev -p 3737
```

Chromium is pre-installed at `/opt/pw-browsers/chromium` and `playwright-core` is
available. **Never run `playwright install`.**

Ayran asked for confirmation at **1440, 1024, 768, 430 and 375px**. Test all five.

**Measure, don't eyeball.** Two overflow bugs in this project were only caught by
reading `scrollWidth` vs `clientWidth` in Playwright — the nav overflowed at
exactly 1280px, and filter tabs needed 1027px against 972px available. Assert
`scrollWidth <= clientWidth` on the accordion and on `document.documentElement` at
every width.

Screenshot the section with
`page.locator('section[aria-labelledby="pathways-h"]').screenshot()`.

**For contrast over the photographs:** sample the real image pixels via canvas and
composite the overlay analytically. Do not guess. Precedent: HERO-02 in this
project fails AA at 2.64 against the 3.0 needed for large text, and that was only
found by measuring.

### Acceptance criteria (Ayran's, verbatim in intent)

1. All four panels fit in one horizontal row on desktop
2. The outer container never overflows
3. Exactly one panel active at a time
4. Clicking an inactive panel expands it
5. Clicking a panel does not immediately navigate
6. The visible CTA opens the relevant pathway page
7. Focal points stay correct at all widths
8. Mobile becomes a vertical accordion
9. Keyboard navigation works
10. Reduced-motion respected
11. No layout shift or abrupt jumps
12. Feels calm, editorial, luxurious
13. **No unrelated page sections modified**

### What to report back to Ayran when done

- exact files changed
- a concise explanation of the component structure
- the `object-position` values he can adjust later, and where they live
- screenshots or a clear description of desktop / tablet / mobile
- explicit confirmation of testing at 1440, 1024, 768, 430, 375

---

## 8 · Traps that have already cost this project time

- **Tailwind v4 uses the standalone `translate` property, not `transform`.** A
  `transition-[transform,…]` on `-translate-y-full` animates nothing. Name
  `translate` in the transition list. Relevant if you animate panel content.
- **Next 16 no longer overrides `scroll-behavior: smooth` on route changes.**
  `<html>` carries `data-scroll-behavior="smooth"` in `app/layout.tsx`. Leave it.
- **JSX comments in expression position:** after `return (`, use `/* … */`, not
  `{/* … */}` — the braces parse as an object literal and the build fails.
- **`trailingSlash: true`** — `usePathname()` returns `/about/`.
- The symptoms section **stays light**. A burgundy band was built, shipped and
  reverted; it competes with real photographs. Don't re-propose it, and don't let
  the accordion drag the page dark.
- **One burgundy CTA per viewport** is a brand rule. The accordion's
  `Explore pathway →` should be a text CTA in burgundy or warm ivory depending on
  image contrast — not a filled burgundy button competing with the page's primary.

---

## 9 · Open questions for Ayran

1. **Which repo, confirmed?** `medi-gyn-app` is marked a dead end in `medi-lux`'s
   own handover. Is it a current copy of the site, or does it need syncing first?
2. **Where were the four images uploaded**, and does the mapping in §2 match his
   intent?
3. **Breakpoint:** `lg` (1024px) for horizontal → vertical. Tablet portrait (768px)
   goes vertical. Confirm — his brief says "choose based on actual available width".
4. **Split `object-position` for active vs inactive panels?** (§6) — a deviation
   from his brief that image 04 probably needs.
5. **"Peptide Therapy" vs "Peptide & Regenerative Support"** — the footer nav in
   `lib/content.ts` line 62 uses the short name, the pathway data uses the long
   one. The accordion should use the long one; leave the footer alone unless asked.
