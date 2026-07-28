import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://medi-lux.vercel.app"),
  title: {
    default:
      "Medi-Gyn — Advanced Women’s Hormone Health, Menopause & Longevity Medicine",
    template: "%s — Medi-Gyn",
  },
  description:
    "Medi-Gyn helps women decode the hormonal signals behind fatigue, weight changes, brain fog, poor sleep, mood shifts, low libido, and ageing-related changes through personalised hormone, menopause, functional medicine, and longevity care.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:rounded-full focus:bg-burgundy focus:px-5 focus:py-2 focus:text-sm focus:text-ivory"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
