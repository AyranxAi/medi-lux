"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { NAV } from "@/lib/content";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/90 backdrop-blur-md">
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Logo />

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-6 xl:flex">
          {NAV.map((item) =>
            item.submenu ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 py-2 text-[13px] font-medium whitespace-nowrap text-ink transition-colors hover:text-burgundy"
                >
                  {item.label}
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <div className="pointer-events-none absolute left-1/2 top-full w-[340px] -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-200 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="rounded-2xl border border-line bg-ivory p-2 shadow-[0_18px_50px_-24px_rgba(46,34,40,0.35)]">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block rounded-xl px-4 py-3 transition-colors hover:bg-cream"
                      >
                        <span className="block font-serif text-[16px] font-medium text-ink">
                          {sub.label}
                        </span>
                        <span className="mt-0.5 block text-[12px] text-ink-soft">
                          {sub.note}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="py-2 text-[13px] font-medium whitespace-nowrap text-ink transition-colors hover:text-burgundy"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/book" className="btn-primary hidden !px-6 sm:inline-flex">
            Book Consultation
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border border-line xl:hidden"
          >
            <span className={`h-[1.5px] w-5 bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-[1.5px] w-5 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          aria-label="Mobile"
          className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-72px)] overflow-y-auto bg-ivory px-5 pb-10 pt-4 xl:hidden"
        >
          <ul className="divide-y divide-line">
            {NAV.map((item) => (
              <li key={item.label} className="py-1">
                {item.submenu ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-serif text-2xl text-ink [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" aria-hidden="true">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>
                    <ul className="pb-4">
                      <li>
                        <Link href={item.href} onClick={() => setOpen(false)} className="block py-2.5 pl-4 text-[15px] font-medium text-burgundy">
                          View the full pathway
                        </Link>
                      </li>
                      {item.submenu.map((sub) => (
                        <li key={sub.label}>
                          <Link href={sub.href} onClick={() => setOpen(false)} className="block py-2.5 pl-4 text-[15px] text-ink-soft">
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={item.href} onClick={() => setOpen(false)} className="block py-4 font-serif text-2xl text-ink">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link href="/book" onClick={() => setOpen(false)} className="btn-primary mt-8 w-full">
            Book Your Consultation
          </Link>
        </nav>
      )}
    </header>
  );
}
