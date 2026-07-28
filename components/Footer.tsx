import Link from "next/link";
import Logo from "@/components/Logo";
import { BRAND, PATHWAYS, FOOTER_DISCLAIMER } from "@/lib/content";

const CLINIC_LINKS = [
  { label: "About Medi-Gyn", href: "/about" },
  { label: "Doctors & experts", href: "/about#doctors" },
  { label: "Events — menoSTART", href: "/events" },
  { label: "Lab testing & products", href: "/products" },
  { label: "Symptom quiz", href: "/quiz" },
];

export default function Footer() {
  return (
    <footer className="bg-burgundy text-ivory">
      <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo mono className="text-ivory" />
          <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-ivory/70">
            Where women’s symptoms are decoded — not dismissed.
          </p>
        </div>

        <nav aria-label="Care pathways">
          <h3 className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
            Care pathways
          </h3>
          <ul className="mt-4 space-y-2.5">
            {PATHWAYS.map((p) => (
              <li key={p.slug}>
                <Link href={`/pathways/${p.slug}`} className="text-[13.5px] text-ivory/85 transition-colors hover:text-ivory">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Clinic">
          <h3 className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
            Clinic
          </h3>
          <ul className="mt-4 space-y-2.5">
            {CLINIC_LINKS.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} className="text-[13.5px] text-ivory/85 transition-colors hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
            Contact
          </h3>
          <ul className="mt-4 space-y-2.5 text-[13.5px] text-ivory/85">
            <li>
              <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-ivory">
                {BRAND.email}
              </a>
            </li>
            <li>
              <a href={BRAND.whatsappHref} className="transition-colors hover:text-ivory">
                WhatsApp us
              </a>
            </li>
            <li className="text-ivory/60">{BRAND.location}</li>
          </ul>
          <form className="mt-6" aria-label="Newsletter">
            <label htmlFor="newsletter-email" className="block text-[12px] text-ivory/70">
              A monthly letter on hormone health. No noise.
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email"
                className="h-11 w-full rounded-full border border-ivory/25 bg-transparent px-4 text-[13px] text-ivory placeholder:text-ivory/40"
              />
              {/* TODO: wire to Zoho CRM with source tracking */}
              <button type="button" className="btn-on-burgundy !px-5 shrink-0">
                Join
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-ivory/15">
        <div className="wrap flex flex-col gap-3 py-6 text-[11.5px] text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl">{FOOTER_DISCLAIMER}</p>
          <p className="shrink-0">© 2026 {BRAND.name}. Preview build — content pending clinical review.</p>
        </div>
      </div>
    </footer>
  );
}
