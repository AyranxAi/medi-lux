import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ImageSlot from "@/components/ImageSlot";
import { Doctors } from "@/components/home";

export const metadata: Metadata = {
  title: "About",
  description:
    "Medi-Gyn brings together hormone health, menopause care, functional medicine, and regenerative support — so women feel seen, understood, and empowered.",
};

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="kicker">About Medi-Gyn</p>
            <h1 className="h-display mt-4 text-5xl sm:text-6xl">
              Where Women’s Symptoms Are Decoded — Not Dismissed.
            </h1>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-ink-soft">
              Medi-Gyn brings together hormone health, menopause care, functional
              medicine, and regenerative support to help women feel seen,
              understood, and empowered through every stage of hormonal change.
            </p>
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-soft">
              We were founded on a simple frustration: women describing real
              symptoms and hearing “that’s normal for your age.” Our answer is
              unhurried, evidence-informed, doctor-led care — personalised to your
              labs, your stage, and your life.
            </p>
            <Link href="/book" className="btn-primary mt-8">
              Book Your Consultation
            </Link>
          </Reveal>
          <Reveal delay={0.12}>
            <ImageSlot
              id="IMG-10"
              caption="Founder — real portrait, natural light, warm authority"
              tone="taupe"
              className="aspect-[3/4] rounded-b-[24px] rounded-t-[999px]"
              sizes="(max-width: 1024px) 90vw, 40vw"
              priority
            />
          </Reveal>
        </div>
      </section>

      <div id="doctors">
        <Doctors />
      </div>
    </>
  );
}
