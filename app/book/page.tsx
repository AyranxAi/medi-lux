import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { BRAND } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book Your Consultation",
  description:
    "Book a personalised hormone health consultation with a Medi-Gyn specialist — online, from anywhere.",
};

const AFTER_BOOKING = [
  "You’ll receive a short intake so your specialist knows your story before you meet.",
  "Bring any recent labs — they’ll be read closely, and only missing tests are ordered.",
  "You leave the consultation with a written, personalised next step. Always.",
];

export default function BookPage() {
  return (
    <section className="section">
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="kicker">One clear next step</p>
          <h1 className="h-display mt-4 text-5xl sm:text-6xl">
            Book Your Consultation
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            One consultation is enough to stop guessing. Online, unhurried, with a
            specialist in women’s hormone health.
          </p>
          <ul className="mt-8 space-y-4">
            {AFTER_BOOKING.map((line) => (
              <li key={line} className="flex gap-3 text-[14px] leading-relaxed text-ink">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl border border-line bg-cream p-5">
            <p className="text-[13px] leading-relaxed text-ink-soft">
              Prefer to talk first?{" "}
              <a href={BRAND.whatsappHref} className="font-semibold text-burgundy underline-offset-4 hover:underline">
                Message us on WhatsApp
              </a>{" "}
              or write to{" "}
              <a href={`mailto:${BRAND.email}`} className="font-semibold text-burgundy underline-offset-4 hover:underline">
                {BRAND.email}
              </a>
              .
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Booking embed placeholder — Zoho Bookings / calendar TBD */}
          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-line bg-ivory p-8 text-center">
            <span className="rounded-full border border-ink/20 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-ink/60">
              BOOKING-EMBED
            </span>
            <p className="max-w-[32ch] font-serif text-[17px] leading-snug text-ink/65 italic">
              Booking system embeds here — Zoho Bookings / calendar, one journey for
              consultations, events, and enquiries.
            </p>
          </div>

          <form className="mt-8 space-y-4" aria-label="Consultation enquiry (preview)">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold-deep">
              Or leave an enquiry
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="f-name" className="mb-1.5 block text-[12.5px] font-medium text-ink">
                  Name
                </label>
                <input id="f-name" type="text" autoComplete="name" className="h-12 w-full rounded-xl border border-line bg-ivory px-4 text-[14px]" />
              </div>
              <div>
                <label htmlFor="f-email" className="mb-1.5 block text-[12.5px] font-medium text-ink">
                  Email
                </label>
                <input id="f-email" type="email" autoComplete="email" className="h-12 w-full rounded-xl border border-line bg-ivory px-4 text-[14px]" />
              </div>
            </div>
            <div>
              <label htmlFor="f-topic" className="mb-1.5 block text-[12.5px] font-medium text-ink">
                What are you experiencing?
              </label>
              <textarea id="f-topic" rows={4} className="w-full rounded-xl border border-line bg-ivory p-4 text-[14px]" />
            </div>
            {/* TODO: submit → Zoho CRM with UTM/source tracking; until then disabled */}
            <button type="button" disabled className="btn-primary w-full opacity-50" title="Form wiring pending">
              Send enquiry — connects to Zoho CRM (wiring pending)
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
