/*
  Fine-line icon set (brief: minimal, medical-longevity inspired; SVG, never emoji).
  Draft strokes — replace with a commissioned set later without touching call sites.
*/
const PATHS: Record<string, React.ReactNode> = {
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14 7.2 22l4.8-2.8L16.8 22l-1.3-8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5.5L12 2 4 5.5V12c0 6 8 10 8 10z" />
      <path d="M9 11.5l2 2 4-4.5" />
    </>
  ),
  user: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  video: (
    <>
      <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
      <path d="M15.5 10.5 21.5 7v10l-6-3.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 21C5 12 11 5 21 4c-.5 10-6.5 16-16 17z" />
      <path d="M5 21c1.5-5 5-9 10-11.5" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.4-5.7" />
      <path d="M20 3.5v4.3h-4.3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14.5 14.5 0 0 1 0 18 14.5 14.5 0 0 1 0-18z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.8 8.2l-2.4 5.2-5.2 2.4 2.4-5.2 5.2-2.4z" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3v6L4.8 17.8A2.5 2.5 0 0 0 7 21.5h10a2.5 2.5 0 0 0 2.2-3.7L14.5 9V3" />
      <path d="M8 3h8" />
      <path d="M7.5 14.5h9" />
    </>
  ),
  capsule: (
    <>
      <path d="M10.4 3.6a4.6 4.6 0 0 1 6.5 0l3.5 3.5a4.6 4.6 0 0 1 0 6.5l-6.8 6.8a4.6 4.6 0 0 1-6.5 0l-3.5-3.5a4.6 4.6 0 0 1 0-6.5z" />
      <path d="M7 13.4 13.4 7" />
    </>
  ),
  infinity: (
    <>
      <path d="M7 8.5c-3.2 0-3.2 7 0 7 3.6 0 6.4-7 10-7 3.2 0 3.2 7 0 7-3.6 0-6.4-7-10-7z" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3z" />
      <path d="M19 16.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
    </>
  ),
  "arrow-right": <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  check: <path d="M4.5 12.5l5 5L19.5 6.5" />,
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l6-3.5-6-3.5z" />
    </>
  ),
};

export default function Icon({
  name,
  className = "h-6 w-6",
  strokeWidth = 1.5,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] ?? <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}
