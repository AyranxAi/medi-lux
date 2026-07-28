import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { PRODUCTS_SECTION } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lab Testing & Products",
  description:
    "Advanced testing, hormone-supportive, longevity, and skin & regenerative products — supportive tools inside Medi-Gyn care plans.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="section">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <p className="kicker">{PRODUCTS_SECTION.kicker}</p>
            <h1 className="h-display mt-4 text-5xl sm:text-6xl">
              Lab Testing & Products
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              {PRODUCTS_SECTION.intro}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {PRODUCTS_SECTION.groups.map((g, i) => (
              <Reveal key={g.title} delay={Math.min(i * 0.06, 0.2)}>
                <div className="h-full rounded-3xl border border-line p-8">
                  <Icon name={g.icon} className="h-7 w-7 text-gold-deep" />
                  <h2 className="mt-4 font-serif text-[24px] font-medium text-ink">
                    {g.title}
                  </h2>
                  <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-ink-soft">
                    {g.body}
                  </p>
                  {/* Category page template (priority deliverable #9): product grid renders here */}
                  <p className="mt-5 rounded-xl bg-cream px-4 py-3 text-[12px] text-ink-soft">
                    Category template — the curated catalogue migrates here, grouped
                    and quiet, never ahead of the clinical message.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <p className="mt-10 max-w-xl text-[13px] leading-relaxed text-ink-soft">
              Unsure what testing you actually need? Start with a consultation —
              tests are ordered when they change decisions, not by default.{" "}
              <Link href="/book" className="font-semibold text-burgundy underline-offset-4 hover:underline">
                Book here
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
