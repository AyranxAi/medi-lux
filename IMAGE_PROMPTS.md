# Image slots & AI-placeholder prompts

Drop a generated image at `public/images/<SLOT-ID>.webp` (or `.jpg`/`.png`) and the
site picks it up automatically — no code changes. Until then each slot renders a
toned placeholder showing its ID and shot brief.

**Ground rules**
- Every image: real-feeling women 35–60, natural light, visible skin texture and
  fine lines, warm ivory/cream/taupe environments, muted rose or burgundy in the
  clothing. Never glossy, never neon, never "stock-photo fake".
- These AI images are **temporary placeholders** until the real photo shoot.
- **IMG-06 → IMG-08 (doctors) are REAL-PHOTO-ONLY.** We never AI-generate a
  clinician's likeness — patients must be able to trust that the face they see is
  the doctor they meet. Leave these as placeholders until real portraits arrive.

## Style suffix (append to every prompt)

> photorealistic editorial photograph, soft natural window light, warm ivory and
> cream tones with muted rose accents, shallow depth of field (85mm f/2.0),
> visible natural skin texture, no heavy retouching, calm confident expression,
> Kinfolk / luxury-clinic aesthetic, no text, no logos

## Hero rotation (HERO-01 → HERO-05)

The homepage hero is a full-width slider that auto-advances every 5 seconds
(pauses on hover/focus, supports swipe, stops under reduced-motion). The five
approved images are in place at `public/images/HERO-0X.webp` (WebP q82,
converted from the uploads at the repo root). To replace one, drop a new
16:9 landscape WebP over the same filename:

| ID | Image |
|----|-------|
| HERO-01 | Silver-blonde woman among sunlit sheer ivory curtains, warm golden light |
| HERO-02 | Golden profile, eyes closed, translucent molecule structure beside her |
| HERO-03 | Silhouette in flowing rose-burgundy veils, backlit |
| HERO-04 | Calm dark-haired woman, black wrap top, terracotta wall |
| HERO-05 | Doctor–patient consultation in ivory suite, white roses |

Keep the main subject in the right two-thirds of frame — the left side carries
the headline scrim.

## Slots

| ID | Where | Aspect | Prompt (before suffix) |
|----|-------|--------|------------------------|
| IMG-01 | ~~Homepage hero (arch frame)~~ superseded by the HERO-01…05 rotation above | 3:4 portrait | Confident woman around 50, natural silver-streaked hair, linen blouse in muted rose, seated near a large window in a warm ivory interior, looking toward camera with quiet warmth — "confident & warm", per the brief's own hero note |
| IMG-02 | Pathway — Hormone Therapy & BHRT | 16:7 → also used 4:3 | Woman mid-40s in soft morning light stretching by a window, cream knit top, serene energy, warm taupe bedroom |
| IMG-03 | Pathway — Menopause Care | 16:7 → also 4:3 | Woman mid-50s laughing gently over tea at a marble kitchen counter, cashmere in ivory, warm daylight |
| IMG-04 | Pathway — Functional Medicine | 16:7 → also 4:3 | Woman late-30s preparing a colorful healthy meal in a bright kitchen, grounded and unhurried, taupe apron |
| IMG-05 | Pathway — Peptide & Regenerative | 16:7 → also 4:3 | Woman around 60 with silver hair and luminous natural skin, close warm portrait against soft cream backdrop |
| IMG-06 | Doctor card 1 | 4:4.4 | — REAL PHOTO ONLY — |
| IMG-07 | Doctor card 2 | 4:4.4 | — REAL PHOTO ONLY — |
| IMG-08 | Doctor card 3 | 4:4.4 | — REAL PHOTO ONLY — |
| IMG-09 | Events / menoSTART | 4:3 | Small warm gathering of five diverse women 40–60 in a bright elegant salon, candid laughter, tea and notebooks, golden-hour light |
| IMG-10 | About / founder (arch frame) | 3:4 portrait | — Prefer the founder's REAL portrait. If a temporary stand-in is unavoidable, flag it visibly as placeholder — |

## Symptom rail (SYM-01 → SYM-12)

The "What are you experiencing?" section is a swipeable rail of 3:4 cards
carrying the hero's treatment: full-bleed photo, warm scrim, ivory copy. The
symptom name and its one-line signal sit over the **bottom third** — keep that
area free of busy detail and let the subject read in the upper two-thirds.

Each card links to a care pathway, so the mood should match the symptom without
being literal or clinical. No visible distress, no medical props.

| ID | Symptom | Prompt (before suffix) |
|----|---------|------------------------|
| SYM-01 | Weight gain | Cropped at the waist, hands working a trouser button that no longer closes, ivory tailoring, Riviera window behind — **shot supplied** |
| SYM-02 | Fatigue | Chin resting on her hand at a sunlit desk, coffee cooling beside her, warm interior |
| SYM-03 | Poor sleep | Awake in low lamplight, silk pyjamas, propped against hotel-white pillows |
| SYM-04 | Brain fog | At a laptop by a balcony window, fingers at her temple, gaze drifted off the screen — **shot supplied** |
| SYM-05 | Mood changes | By a rain-flecked window, muted daylight, quiet unreadable expression |
| SYM-06 | Low libido | Two hands apart on ivory bedlinen, soft morning light, no faces — suggestion, not illustration |
| SYM-07 | PMS | Curled on a deep-toned sofa under a throw, warm lamplight, hand resting at her abdomen |
| SYM-08 | Hot flashes | Close on the neck and décolletage, hand at her throat, skin flushed, warm afternoon light — **shot supplied** |
| SYM-09 | Hair thinning | At the mirror, both hands parting her hair to look at the scalp, soft bathroom light — **shot supplied** |
| SYM-10 | Gut issues | Seated in a linen armchair, one hand at her cheek, the other resting flat on her abdomen, coastal light — **shot supplied** |
| SYM-11 | Skin ageing | Close portrait in soft window light, bare skin, fine lines visible and unretouched |
| SYM-12 | PCOS / cycle irregularity | A journal and calendar open on a linen bedspread, her hand pausing over a marked date |

## Export settings

- Generate at 2048px on the long edge minimum, export **WebP quality ~82**.
- Name exactly `IMG-01.webp` … `IMG-10.webp`, `HERO-01.webp` … `HERO-05.webp`,
  and `SYM-01.webp` … `SYM-12.webp` in `public/images/`.
