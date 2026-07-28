/*
  All site copy lives here — one editable source, no strings buried in components.
  Wording follows the client checklist (Web design checklist.md) exactly where
  specified; everything else is draft copy pending Irina's review.
  ⚠ All medical claims/copy require clinical sign-off before going live.
*/

export const BRAND = {
  name: "Medi-Gyn",
  tagline: "Hormone Health · Menopause · Longevity",
  positioning:
    "Advanced Women’s Hormone Health, Menopause & Longevity Medicine",
  whatsappHref: "https://wa.me/0000000000", // TODO: real WhatsApp number
  email: "hello@medi-gyn.com", // TODO: confirm public contact email
  location: "Dubai · Online consultations worldwide",
};

/* ---------------------------------- nav ---------------------------------- */

export type NavItem = {
  label: string;
  href: string;
  submenu?: { label: string; note: string; href: string }[];
};

export const HORMONE_PROGRAMS = [
  {
    label: "BHRT Hormone Balancing",
    note: "Body-identical hormones, dosed to your labs and stage.",
    href: "/pathways/hormone-therapy#programs",
  },
  {
    label: "PMS & Cycle Support",
    note: "For cycles that derail life every month.",
    href: "/pathways/hormone-therapy#programs",
  },
  {
    label: "Testosterone Top-Up",
    note: "Energy, strength, and libido — where labs support it.",
    href: "/pathways/hormone-therapy#programs",
  },
  {
    label: "Hormone + Gut Health",
    note: "Treating the axis, not just the hormone.",
    href: "/pathways/hormone-therapy#programs",
  },
  {
    label: "Reverse Ageing / Longevity",
    note: "Hormonal foundations for long-term vitality.",
    href: "/pathways/hormone-therapy#programs",
  },
];

export const NAV: NavItem[] = [
  {
    label: "Hormone Health",
    href: "/pathways/hormone-therapy",
    submenu: HORMONE_PROGRAMS,
  },
  { label: "Menopause Care", href: "/pathways/menopause-care" },
  { label: "Functional Medicine", href: "/pathways/functional-medicine" },
  { label: "Peptide Therapy", href: "/pathways/peptide-regenerative" },
  { label: "Lab Testing & Products", href: "/products" },
  { label: "Events", href: "/events" },
  { label: "About", href: "/about" },
];

/* ---------------------------------- hero ---------------------------------- */

export const HERO = {
  kicker: BRAND.positioning,
  headline: "Your Symptoms Are Not Random. They Are Signals.",
  subheadline:
    "Medi-Gyn helps women decode the hormonal signals behind fatigue, weight changes, brain fog, poor sleep, mood shifts, low libido, and ageing-related changes through personalised hormone, menopause, functional medicine, and longevity care.",
  primaryCta: { label: "Book Your Consultation", href: "/book" },
  secondaryCta: { label: "Take the Hormone Symptom Quiz", href: "/quiz" },
  tertiaryCta: { label: "Explore your care pathways", href: "#pathways" },
  trustLine: "Online consultations · Dubai & worldwide · Doctor-led review",
  imageSlot: {
    id: "IMG-01",
    caption: "Hero — real woman 40–60, natural light, confident & warm (portrait)",
  },
};

/* -------------------------------- symptoms -------------------------------- */

export type Symptom = { name: string; signal: string; pathway: string };

export const SYMPTOMS: Symptom[] = [
  { name: "Weight gain", signal: "Often metabolic and hormonal — not a willpower problem.", pathway: "functional-medicine" },
  { name: "Fatigue", signal: "When rest doesn’t restore you, hormones may be why.", pathway: "hormone-therapy" },
  { name: "Poor sleep", signal: "Night waking and early waking have hormonal patterns.", pathway: "menopause-care" },
  { name: "Brain fog", signal: "Focus and recall shift with oestrogen — and can shift back.", pathway: "menopause-care" },
  { name: "Mood changes", signal: "Irritability and flatness can be chemistry, not character.", pathway: "hormone-therapy" },
  { name: "Low libido", signal: "Desire is physiology as much as psychology.", pathway: "hormone-therapy" },
  { name: "PMS", signal: "Severe cycles are a signal, not something to endure.", pathway: "hormone-therapy" },
  { name: "Hot flashes", signal: "The classic signal — and one of the most treatable.", pathway: "menopause-care" },
  { name: "Hair thinning", signal: "Hair follows hormones, thyroid, and nutrition.", pathway: "functional-medicine" },
  { name: "Gut issues", signal: "The gut and your hormones regulate each other.", pathway: "functional-medicine" },
  { name: "Skin ageing", signal: "Collagen and skin quality respond to regenerative care.", pathway: "peptide-regenerative" },
  { name: "PCOS / cycle irregularity", signal: "Irregular cycles deserve investigation, not dismissal.", pathway: "hormone-therapy" },
];

export const SYMPTOMS_SECTION = {
  kicker: "Start where you are",
  headline: "What are you experiencing?",
  intro:
    "Choose what feels closest. Each one leads to the care pathway designed around it — no medical vocabulary required.",
  quizCard: {
    title: "Not sure where you fit?",
    body: "Take the two-minute symptom quiz and we’ll route you to the right starting point.",
    cta: { label: "Take the quiz", href: "/quiz" },
  },
};

/* -------------------------------- pathways -------------------------------- */

export type Pathway = {
  slug: string;
  name: string;
  tagline: string;
  whoFor: string;
  symptoms: string[];
  next: string;
  evaluate: string[];
  planMayInclude: string[];
  specialistIndex: number;
  faq: { q: string; a: string }[];
  imageSlot: { id: string; caption: string; tone: "rose" | "gold" | "taupe" };
};

export const PATHWAYS: Pathway[] = [
  {
    slug: "hormone-therapy",
    name: "Hormone Therapy & BHRT",
    tagline: "Rebalancing the hormones that shape how every day feels.",
    whoFor:
      "Women whose energy, mood, cycles, or libido no longer feel like their own — at any age, at any stage.",
    symptoms: ["Fatigue", "Mood changes", "Low libido", "PMS", "Cycle irregularity"],
    next: "Symptom review → targeted labs → a personalised BHRT / hormone plan with scheduled follow-up.",
    evaluate: [
      "Full hormone panel — oestrogen, progesterone, testosterone, DHEA, cortisol rhythm",
      "Thyroid function in full, not just TSH",
      "Metabolic markers and key vitamins",
      "Your symptom pattern across the cycle",
    ],
    planMayInclude: [
      "Body-identical hormone therapy (BHRT), individually dosed",
      "Cycle support and PMS protocol",
      "Testosterone top-up where labs support it",
      "Hormone + gut axis support",
      "Nutrition and lifestyle prescription",
      "Scheduled follow-up and dose adjustment",
    ],
    specialistIndex: 0,
    faq: [
      {
        q: "Is BHRT safe?",
        a: "Hormone therapy is prescribed only after a specialist reviews your history and labs, and is monitored with follow-up. It is not suitable for everyone — that assessment is exactly what the consultation is for.",
      },
      {
        q: "Do I need labs before my first consultation?",
        a: "No. Bring what you have — recent results are read closely, and only genuinely missing tests are ordered.",
      },
    ],
    imageSlot: { id: "IMG-02", caption: "Pathway — woman mid-40s, morning light, quiet strength", tone: "rose" },
  },
  {
    slug: "menopause-care",
    name: "Menopause Care",
    tagline: "Expert, unhurried care for perimenopause, menopause, and beyond.",
    whoFor:
      "Women in perimenopause, menopause, or post-menopause who want their symptoms decoded — not dismissed.",
    symptoms: ["Hot flashes", "Poor sleep", "Brain fog", "Anxiety", "Joint aches"],
    next: "Stage assessment → labs where useful → a plan across HRT, lifestyle, and long-term health.",
    evaluate: [
      "Menopausal stage and full symptom mapping",
      "Hormone and bone-relevant labs where useful",
      "Cardiovascular and metabolic baseline",
      "Sleep, mood, and cognitive pattern",
    ],
    planMayInclude: [
      "HRT / BHRT where appropriate for you",
      "Non-hormonal symptom strategies",
      "Sleep and mood support",
      "A long-term plan for bone, heart, and brain health",
      "Follow-up cadence through the whole transition",
    ],
    specialistIndex: 0,
    faq: [
      {
        q: "I’m not sure I’m in perimenopause. Should I still book?",
        a: "Yes — uncertainty is the most common starting point. Stage assessment is the first step of this pathway.",
      },
      {
        q: "Do you only prescribe HRT?",
        a: "No. HRT is one tool. Your plan can combine hormonal, non-hormonal, and lifestyle medicine, depending on your health picture and preferences.",
      },
    ],
    imageSlot: { id: "IMG-03", caption: "Pathway — woman mid-50s, warm daylight, at ease", tone: "gold" },
  },
  {
    slug: "functional-medicine",
    name: "Functional Medicine",
    tagline: "Finding the root causes underneath persistent symptoms.",
    whoFor:
      "Women who sense the issue runs deeper — metabolism, gut, thyroid, inflammation — and want causes found, not managed.",
    symptoms: ["Weight changes", "Gut issues", "Hair thinning", "Persistent fatigue"],
    next: "Advanced testing → whole-systems review → a root-cause protocol, monitored over time.",
    evaluate: [
      "Gut health and microbiome signals",
      "Thyroid, iron, B12, vitamin D",
      "Inflammation and metabolic markers",
      "Nutrition, stress, and lifestyle load",
    ],
    planMayInclude: [
      "A root-cause protocol across gut, thyroid, and metabolism",
      "Targeted supplementation — only what your labs justify",
      "A practical nutrition plan",
      "Retesting at meaningful intervals",
    ],
    specialistIndex: 1,
    faq: [
      {
        q: "How is this different from regular check-ups?",
        a: "Standard check-ups ask “is anything failing?”. Functional medicine asks “why do you feel this way?” — and tests more deeply to answer it.",
      },
      {
        q: "Will I be sold a shelf of supplements?",
        a: "No. Anything recommended must be justified by your labs and reviewed at follow-up. Medi-Gyn is a clinic before it is a shop.",
      },
    ],
    imageSlot: { id: "IMG-04", caption: "Pathway — woman late 30s, kitchen daylight, grounded", tone: "taupe" },
  },
  {
    slug: "peptide-regenerative",
    name: "Peptide & Regenerative Support",
    tagline: "Supervised regenerative care for recovery, skin, and healthy ageing.",
    whoFor:
      "Women optimising recovery, skin quality, and long-term vitality beyond the basics — with medical supervision, not trends.",
    symptoms: ["Skin ageing", "Slow recovery", "Low resilience"],
    next: "Eligibility and safety review → specialist consult → a supervised regenerative protocol.",
    evaluate: [
      "Medical eligibility and safety screen",
      "Recovery, skin, and performance goals",
      "Current medication and interaction review",
      "Baseline labs before any protocol",
    ],
    planMayInclude: [
      "Supervised peptide protocols where clinically appropriate",
      "Regenerative skin support",
      "Recovery and longevity foundations",
      "Monitoring and scheduled safety review",
    ],
    specialistIndex: 2,
    faq: [
      {
        q: "Can I start peptides without a consultation?",
        a: "No. Every regenerative protocol at Medi-Gyn begins with a medical eligibility review. That is not friction — it is the product.",
      },
      {
        q: "Is this anti-ageing?",
        a: "We’d call it graceful ageing: supporting the biology of recovery and skin rather than promising to stop time.",
      },
    ],
    imageSlot: { id: "IMG-05", caption: "Pathway — woman ~60, silver hair, luminous natural skin", tone: "rose" },
  },
];

export const PATHWAYS_SECTION = {
  kicker: "Care pathways",
  headline: "Four ways in. One standard of care.",
  intro:
    "Every pathway starts the same way — with your story, your history, and your labs — and ends in a plan that is yours alone.",
};

/* --------------------------------- method --------------------------------- */

export const METHOD = {
  kicker: "The Medi-Gyn Method",
  headline: "How care unfolds here",
  steps: [
    {
      title: "We listen to your symptoms and story",
      body: "A real conversation first. Your experience is the primary data.",
    },
    {
      title: "We review your medical history and labs",
      body: "Existing results are read closely; only missing tests are ordered.",
    },
    {
      title: "You meet with a specialist",
      body: "Online, unhurried, with a clinician who works in women’s hormones daily.",
    },
    {
      title: "You receive a personalised, fully customised care plan",
      body: "Medication, nutrition, and lifestyle — dosed to you, not to an average.",
    },
    {
      title: "We follow up, adjust, and support continuity",
      body: "Hormone care is a relationship, not a transaction. We stay with you.",
    },
  ],
};

/* ---------------------------------- why ----------------------------------- */

export const WHY = {
  kicker: "Why Medi-Gyn",
  headline: "Built like a clinic, not a funnel",
  blocks: [
    {
      icon: "award",
      title: "Women’s hormone specialisation",
      body: "This is not a general clinic with a women’s page. Hormonal health is the entire practice.",
    },
    {
      icon: "shield",
      title: "Doctor-led clinical review",
      body: "Care decisions are reviewed by clinicians where appropriate — never sold by a funnel.",
    },
    {
      icon: "user",
      title: "Personalised care plans",
      body: "No standard protocols. Your labs, your stage, your plan.",
    },
    {
      icon: "video",
      title: "Online consultations",
      body: "Specialist care from home — wherever home is.",
    },
    {
      icon: "leaf",
      title: "Functional & regenerative approach",
      body: "We treat causes and build long-term capacity, not only symptoms.",
    },
    {
      icon: "refresh",
      title: "Continuity & follow-up",
      body: "Adjustment and support after the plan, not just at the start.",
    },
    {
      icon: "globe",
      title: "GCC & international access",
      body: "Based in Dubai, caring for women across the region and beyond.",
    },
    {
      icon: "compass",
      title: "A European philosophy of care",
      body: "Considered, evidence-informed, and never rushed.",
    },
  ],
};

/* -------------------------------- doctors --------------------------------- */

export type Doctor = {
  name: string;
  credentials: string;
  specialty: string;
  bestFor: string[];
  imageSlot: { id: string; caption: string };
};

export const DOCTORS_SECTION = {
  kicker: "Doctors & experts",
  headline: "The specialists who will actually see you",
  intro:
    "For medical care, trust comes before conversion — so our clinicians are on the front page, not hidden behind it.",
};

// TODO: real roster, credentials, and REAL photographs (never AI) from Irina.
export const DOCTORS: Doctor[] = [
  {
    name: "Dr. [Name Surname]",
    credentials: "MD — credentials to be confirmed",
    specialty: "Hormone & Menopause Medicine",
    bestFor: ["Perimenopause", "BHRT", "Sleep"],
    imageSlot: { id: "IMG-06", caption: "Real clinician portrait only — no AI, no stock" },
  },
  {
    name: "Dr. [Name Surname]",
    credentials: "MD — credentials to be confirmed",
    specialty: "Functional Medicine & Gut Health",
    bestFor: ["Gut & thyroid", "Weight", "Fatigue"],
    imageSlot: { id: "IMG-07", caption: "Real clinician portrait only — no AI, no stock" },
  },
  {
    name: "Dr. [Name Surname]",
    credentials: "MD — credentials to be confirmed",
    specialty: "Regenerative & Longevity Medicine",
    bestFor: ["Peptides", "Skin", "Healthy ageing"],
    imageSlot: { id: "IMG-08", caption: "Real clinician portrait only — no AI, no stock" },
  },
];

/* -------------------------------- products -------------------------------- */

export const PRODUCTS_SECTION = {
  kicker: "Supportive tools",
  headline: "Testing & products, when they serve the plan",
  intro:
    "Medi-Gyn is a clinic before it is a shop. Tests and products sit inside care plans — not in front of them.",
  groups: [
    {
      icon: "flask",
      title: "Advanced testing",
      body: "Hormone panels, metabolic and gut testing — ordered when they change decisions.",
    },
    {
      icon: "capsule",
      title: "Hormone-supportive products",
      body: "Clinically chosen support for cycle, transition, and balance.",
    },
    {
      icon: "infinity",
      title: "Longevity products",
      body: "Foundations for energy, recovery, and healthy ageing.",
    },
    {
      icon: "sparkle",
      title: "Skin & regenerative products",
      body: "Skin quality from the inside out, aligned with your plan.",
    },
  ],
  cta: { label: "Browse lab testing & products", href: "/products" },
};

/* --------------------------------- events --------------------------------- */

export const EVENTS_SECTION = {
  kicker: "Events & community — menoSTART",
  headline: "Reclaim Your Energy, Clarity & Confidence",
  body: "Your symptoms are signals from your hormones — menoSTART is where you learn to read them, together with women at the same stage and the clinicians who treat it.",
  cta: { label: "Explore menoSTART", href: "/events" },
  imageSlot: {
    id: "IMG-09",
    caption: "Event — small warm gathering of women 40–60, candid, laughing",
  },
};

/* -------------------------------- CTA band -------------------------------- */

export const CTA_BAND = {
  headline: "Your symptoms have been talking. Let’s listen.",
  body: "One consultation is enough to stop guessing and start decoding.",
  primary: { label: "Book Your Consultation", href: "/book" },
  secondary: { label: "or start with the symptom quiz", href: "/quiz" },
};

/* ---------------------------------- quiz ---------------------------------- */

export type QuizQuestion = {
  id: string;
  question: string;
  multi?: boolean;
  options: string[];
};

export const QUIZ: QuizQuestion[] = [
  {
    id: "stage",
    question: "Which stage best describes you right now?",
    options: [
      "My cycles are regular",
      "My cycles are changing or irregular",
      "No period for 12+ months",
      "Post-surgical or medical menopause",
      "I’m not sure",
    ],
  },
  {
    id: "symptoms",
    question: "What are you experiencing? Choose all that apply.",
    multi: true,
    options: SYMPTOMS.map((s) => s.name),
  },
  {
    id: "duration",
    question: "How long has this been going on?",
    options: ["Less than 3 months", "3–12 months", "1–3 years", "More than 3 years"],
  },
  {
    id: "priority",
    question: "What matters most to you right now?",
    options: [
      "Energy & metabolism",
      "Sleep & mood",
      "Libido & intimacy",
      "Cycle regularity",
      "Healthy ageing & longevity",
    ],
  },
  {
    id: "hrt",
    question: "Have you used hormone therapy before?",
    options: ["Never", "Currently using it", "Used it in the past", "I’d prefer to discuss this"],
  },
];

/* -------------------------------- disclaimer ------------------------------- */

export const SAFETY_NOTE =
  "All care at Medi-Gyn begins with a medical consultation. Treatments described here are prescribed only where clinically appropriate, after review of your history and labs, and are not suitable for everyone. This page is information, not medical advice.";

export const FOOTER_DISCLAIMER =
  "Medi-Gyn provides medical information for education. It is not a substitute for personalised medical advice, diagnosis, or treatment.";
