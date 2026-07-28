# medi-lux — Medi-Gyn website recreation

A ground-up, conversion-focused recreation of [medi-gyn.com](https://medi-gyn.com),
built strictly from the client's design checklist (the strategy brief supersedes
all earlier brand direction). Goal: a **premium patient conversion engine** —
clinical credibility + feminine intelligence + Monaco/Dubai luxury + warmth.

## Stack

Next.js 16 (App Router) · Tailwind v4 · framer-motion · Cormorant Garamond + Inter

## Run

```bash
npm install
npm run dev
```

## Map

| Path | What |
|---|---|
| `app/page.tsx` | Homepage — the full conversion journey (8 sections + CTA band) |
| `app/pathways/[slug]` | Service page template ×4 (the brief's 10-part structure) |
| `app/quiz` | Hormone Symptom Quiz — filtering questionnaire, routes to pathways |
| `app/book` | Booking page (embed + Zoho-ready enquiry form, wiring pending) |
| `app/events` · `app/about` · `app/products` | Events/menoSTART · About+doctors · Testing & products |
| `lib/content.ts` | **Every word of copy** — edit here, not in components |
| `components/Logo.tsx` | DNA-helix mark as SVG (burgundy strands, gold rungs) |
| `components/ImageSlot.tsx` | Art-directed image slots — see `IMAGE_PROMPTS.md` |
| `DESIGN_DIRECTION.md` | The distilled design rules we build against |

## Status — backbone v1 (2026-07-28)

- [x] Homepage conversion journey, all 8 sections in the brief's order
- [x] Navigation restructure (8 items + Hormone Health dropdown)
- [x] Service page template, data-driven across 4 pathways
- [x] Doctor profile card design (real-photo-only slots)
- [x] Symptom quiz (preview logic; not yet capturing leads)
- [x] Mobile-first layouts, WCAG focus states, reduced-motion support
- [ ] Images (drop `IMG-*.webp` into `public/images/` — auto-detected)
- [ ] Real doctor roster, credentials, portraits
- [ ] Booking system + Zoho CRM + GA4/Meta Pixel/GTM wiring
- [ ] Event landing template with real menoSTART content
- [ ] Blog/article template · product category data · SEO meta pass

## Open questions (for Irina / Ayran)

1. Booking mechanism: Zoho Bookings? Calendly? WhatsApp-first?
2. Real WhatsApp number + public contact email
3. Doctor roster: names, credentials, "best for" tags, real portraits
4. menoSTART: existing content/assets to port
5. Symptom→pathway routing table: my draft mapping needs her sign-off
6. Languages: EN only, or AR/RU/DE planned?
7. Domain/deploy target for the preview
8. Original logo vector file (current SVG is a careful approximation)
