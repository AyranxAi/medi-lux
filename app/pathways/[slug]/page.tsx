import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import Icon from "@/components/Icon";
import {
  PATHWAYS,
  DOCTORS,
  HORMONE_PROGRAMS,
  SAFETY_NOTE,
} from "@/lib/content";

/*
  Service page template per the brief — every service page follows the same
  10-part structure: hero · who it’s for · symptoms · what we evaluate ·
  what the plan may include · how the consultation works · safety ·
  specialist · FAQ · CTA.
*/

export function generateStaticParams() {
  return PATHWAYS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pathway = PATHWAYS.find((p) => p.slug === slug);
  if (!pathway) return {};
  return { title: pathway.name, description: pathway.tagline };
}

const CONSULT_STEPS = [
  { title: "Book online", body: "Choose a time that suits you — everything happens from home." },
  { title: "Tell your story", body: "A structured intake so nothing about your history is missed." },
  { title: "Meet your specialist", body: "An unhurried video consultation, questions welcome." },
  { title: "Receive your plan", body: "A written, personalised plan — with follow-up already scheduled." },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="kicker">{children}</p>;
}

export default async function PathwayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pathway = PATHWAYS.find((p) => p.slug === slug);
  if (!pathway) notFound();

  const specialist = DOCTORS[pathway.specialistIndex];

  return (
    <>
      {/* 1 · Hero — headline dominates */}
      <section className="border-b border-line">
        <div className="wrap grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <SectionLabel>Care pathway</SectionLabel>
            <h1 className="h-display mt-4 text-5xl sm:text-6xl">{pathway.name}</h1>
            <p className="mt-5 max-w-xl font-serif text-[22px] leading-snug text-ink-soft italic">
              {pathway.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book" className="btn-primary">
                Book Your Consultation
              </Link>
              <Link href="/quiz" className="btn-secondary">
                Not sure? Take the quiz
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <ImageSlot
              id={pathway.imageSlot.id}
              caption={pathway.imageSlot.caption}
              tone={pathway.imageSlot.tone}
              className="aspect-[4/3] rounded-3xl"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* 2 · Who this is for + 3 · Symptoms addressed */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionLabel>Who this is for</SectionLabel>
            <p className="mt-4 font-serif text-[26px] leading-snug text-ink">
              {pathway.whoFor}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionLabel>Symptoms addressed</SectionLabel>
            <div className="mt-4 flex flex-wrap gap-2">
              {pathway.symptoms.map((s) => (
                <span key={s} className="chip !text-[13px] !px-4 !py-1.5">
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-ink-soft">
              Experiencing something not listed here?{" "}
              <Link href="/quiz" className="font-medium text-burgundy underline-offset-4 hover:underline">
                The symptom quiz
              </Link>{" "}
              routes you to the right starting point.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Programs — hormone-therapy only */}
      {pathway.slug === "hormone-therapy" && (
        <section id="programs" className="border-y border-line bg-cream">
          <div className="wrap py-16 sm:py-20">
            <Reveal>
              <SectionLabel>Programs within this pathway</SectionLabel>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {HORMONE_PROGRAMS.map((prog, i) => (
                <Reveal key={prog.label} delay={Math.min(i * 0.05, 0.2)}>
                  <div className="h-full rounded-2xl border border-line bg-ivory p-5">
                    <h3 className="font-serif text-[18px] leading-snug font-medium text-ink">
                      {prog.label}
                    </h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
                      {prog.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4 · What Medi-Gyn evaluates + 5 · What may be included */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionLabel>What Medi-Gyn evaluates</SectionLabel>
            <ul className="mt-6 space-y-4">
              {pathway.evaluate.map((item) => (
                <li key={item} className="flex gap-3 text-[14.5px] leading-relaxed text-ink">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionLabel>What may be included in your plan</SectionLabel>
            <ul className="mt-6 space-y-4">
              {pathway.planMayInclude.map((item) => (
                <li key={item} className="flex gap-3 text-[14.5px] leading-relaxed text-ink">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 6 · How the consultation works */}
      <section className="section bg-burgundy text-ivory">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
              How the consultation works
            </p>
            <h2 className="h-display mt-4 text-4xl">Simple by design</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {CONSULT_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={Math.min(i * 0.07, 0.25)}>
                <div className="border-t border-gold/40 pt-4">
                  <span className="font-serif text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-serif text-[18px] font-medium">{step.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-ivory/70">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            {/* Planned: short AI-assisted explainer video of the process */}
            <div className="mt-12 flex items-center gap-4 rounded-2xl border border-ivory/20 p-5">
              <Icon name="play" className="h-9 w-9 shrink-0 text-gold" strokeWidth={1.2} />
              <p className="text-[13px] leading-relaxed text-ivory/75">
                <span className="font-semibold text-ivory">Explainer video — planned.</span>{" "}
                A short, warm walkthrough of exactly what happens after you book, will live here.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7 · Safety + 8 · Specialist */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionLabel>Safety, honestly</SectionLabel>
            <div className="mt-6 rounded-2xl border border-line bg-cream p-6">
              <p className="text-[13.5px] leading-relaxed text-ink-soft">{SAFETY_NOTE}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionLabel>Your specialist</SectionLabel>
            <div className="mt-6 flex items-center gap-5 rounded-2xl border border-line p-5">
              <ImageSlot
                id={specialist.imageSlot.id}
                caption="Real portrait"
                tone="taupe"
                className="h-24 w-24 shrink-0 rounded-full"
                sizes="96px"
              />
              <div>
                <p className="text-[10.5px] font-semibold tracking-[0.22em] uppercase text-gold-deep">
                  {specialist.credentials}
                </p>
                <h3 className="mt-1 font-serif text-[21px] font-medium text-ink">
                  {specialist.name}
                </h3>
                <p className="text-[13px] text-ink-soft">{specialist.specialty}</p>
                <Link
                  href="/book"
                  className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-burgundy hover:text-burgundy-deep"
                >
                  Book with this doctor
                  <Icon name="arrow-right" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9 · FAQ */}
      <section className="border-t border-line">
        <div className="wrap py-16 sm:py-20">
          <Reveal className="max-w-2xl">
            <SectionLabel>Questions, answered</SectionLabel>
          </Reveal>
          <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line">
            {pathway.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-[20px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gold-deep transition-transform group-open:rotate-45" fill="none" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-4 text-[11.5px] text-ink-soft/70">
            Medical content pending clinical review.
          </p>
        </div>
      </section>

      {/* 10 · CTA */}
      <section className="bg-burgundy py-16 text-center text-ivory sm:py-20">
        <div className="wrap">
          <Reveal>
            <h2 className="h-display mx-auto max-w-xl text-4xl">
              Start decoding what your body is telling you.
            </h2>
            <Link href="/book" className="btn-on-burgundy mt-8">
              Book Your Consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
