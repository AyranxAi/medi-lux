import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import { EVENTS_SECTION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events & Community — menoSTART",
  description:
    "menoSTART: Reclaim your energy, clarity & confidence. Events and community for women decoding their hormonal signals.",
};

export default function EventsPage() {
  return (
    <>
      <section className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="kicker">{EVENTS_SECTION.kicker}</p>
            <h1 className="h-display mt-4 text-5xl sm:text-6xl">
              {EVENTS_SECTION.headline}
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft">
              {EVENTS_SECTION.body}
            </p>
            <Link href="/book" className="btn-primary mt-8">
              Register your interest
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <ImageSlot
              id="IMG-09"
              caption={EVENTS_SECTION.imageSlot.caption}
              tone="gold"
              className="aspect-[4/3] rounded-3xl"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-cream">
        <div className="wrap py-16 sm:py-20">
          <Reveal>
            <p className="kicker">Event landing template</p>
            <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-ink-soft">
              This page becomes the event landing template (priority deliverable #7):
              upcoming menoSTART dates, registration connected to the same booking
              journey, and post-event follow-up into the clinic — the
              event-to-clinic conversion the brief calls for. Existing menoSTART
              content ports in here unchanged.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
