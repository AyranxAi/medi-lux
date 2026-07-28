import { BRAND } from "@/lib/content";

/*
  Brief: keep WhatsApp easily accessible (esp. mobile) without being intrusive.
  Quiet fine-line chat glyph, no green, no pulse.
*/
export default function WhatsAppButton() {
  return (
    <a
      href={BRAND.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Medi-Gyn on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-ivory/95 text-burgundy shadow-[0_10px_30px_-12px_rgba(46,34,40,0.35)] backdrop-blur transition-colors hover:bg-cream"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <path
          d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 21l2-5.4A8.5 8.5 0 1 1 21 11.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.8 9.2c0 3 2.9 5.6 5.4 6.2l1.5-1.5-1.9-1.2-1 .7c-.9-.5-1.9-1.5-2.3-2.4l.7-.9L10 8.2l-1.2 1z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
