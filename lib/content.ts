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

export type HeroSlide = {
  id: string; // file slot — drop the image at public/images/<id>.webp
  alt: string; // alt text once the real file is in place
  brief: string; // what belongs in this slot, shown on the placeholder
  focal: string; // CSS object-position keeping the subject in frame when cropped
  tone: "rose" | "gold" | "taupe";
};

export const HERO = {
  kicker: BRAND.positioning,
  headline: "Your Symptoms Are Not Random. They Are Signals.",
  subheadline:
    "Medi-Gyn helps women decode the hormonal signals behind fatigue, weight changes, brain fog, poor sleep, mood shifts, low libido, and ageing-related changes through personalised hormone, menopause, functional medicine, and longevity care.",
  primaryCta: { label: "Book Your Consultation", href: "/book" },
  secondaryCta: { label: "Take the Hormone Symptom Quiz", href: "/quiz" },
  tertiaryCta: { label: "Explore your care pathways", href: "#pathways" },
  trustLine: "Online consultations · Dubai & worldwide · Doctor-led review",
  slides: [
    {
      id: "HERO-01",
      alt: "Woman around fifty with long silver-blonde hair among sunlit sheer ivory curtains, glancing back with quiet confidence",
      brief: "Silver-blonde woman in sunlit sheer curtains, warm golden light",
      focal: "68% 30%",
      tone: "gold",
    },
    {
      id: "HERO-02",
      alt: "Serene profile of a woman bathed in warm golden light, eyes closed, beside a delicate translucent molecular structure",
      brief: "Golden profile with floating molecule — science meets calm",
      focal: "70% 35%",
      tone: "gold",
    },
    {
      id: "HERO-03",
      alt: "Silhouette of a woman surrounded by flowing rose-burgundy silk veils lit softly from behind",
      brief: "Silhouette in flowing rose-burgundy veils, backlit",
      focal: "60% 40%",
      tone: "rose",
    },
    {
      id: "HERO-04",
      alt: "Woman in her fifties with dark hair, eyes closed in calm composure, wearing a black wrap top against a warm terracotta wall",
      brief: "Calm portrait on terracotta wall, black wrap top",
      focal: "70% 35%",
      tone: "rose",
    },
    {
      id: "HERO-05",
      alt: "Warm consultation between a clinician and a smiling patient in an ivory suite with white roses",
      brief: "Doctor–patient consultation, ivory suite, white roses",
      focal: "65% 45%",
      tone: "taupe",
    },
  ] satisfies HeroSlide[],
};

/* -------------------------------- symptoms -------------------------------- */

/*
  `img` is a drop-a-file slot like every other image on the site: land
  public/images/SYM-XX.webp and the card renders the photo; until then it shows
  the toned placeholder carrying `brief` (the shot brief, mirrored in
  IMAGE_PROMPTS.md). `tone` only colours that placeholder.
*/
export type Symptom = {
  name: string;
  signal: string;
  pathway: string;
  category: string;
  img: string;
  brief: string;
  tone: "rose" | "gold" | "taupe";
};

/* The four groupings the rail filters by. "all" leads so the section still
   opens showing every symptom — the point is to find yourself in the list. */
export type SymptomCategory = { id: string; label: string; icon: string };

export const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  { id: "all", label: "All", icon: "infinity" },
  { id: "hormones", label: "Hormones & cycles", icon: "refresh" },
  { id: "energy", label: "Energy, sleep & mind", icon: "compass" },
  { id: "metabolism", label: "Metabolism & digestion", icon: "leaf" },
  { id: "intimacy", label: "Skin, hair & intimacy", icon: "sparkle" },
];

export const SYMPTOMS: Symptom[] = [
  { name: "Weight gain", category: "metabolism", signal: "Often metabolic and hormonal — not a willpower problem.", pathway: "functional-medicine", img: "SYM-01", brief: "Woman in her forties on a Mediterranean harbour terrace, linen dress, hand at her waist, soft dusk light", tone: "gold" },
  { name: "Fatigue", category: "energy", signal: "When rest doesn’t restore you, hormones may be why.", pathway: "hormone-therapy", img: "SYM-02", brief: "Chin resting on her hand at a sunlit desk, coffee cooling beside her, warm interior", tone: "taupe" },
  { name: "Poor sleep", category: "energy", signal: "Night waking and early waking have hormonal patterns.", pathway: "menopause-care", img: "SYM-03", brief: "Awake in low lamplight, silk pyjamas, propped against hotel-white pillows", tone: "rose" },
  { name: "Brain fog", category: "energy", signal: "Focus and recall shift with oestrogen — and can shift back.", pathway: "menopause-care", img: "SYM-04", brief: "At a high window with a city skyline behind her, gaze unfocused, cool morning light", tone: "taupe" },
  { name: "Mood changes", category: "energy", signal: "Irritability and flatness can be chemistry, not character.", pathway: "hormone-therapy", img: "SYM-05", brief: "By a rain-flecked window, muted daylight, quiet unreadable expression", tone: "rose" },
  { name: "Low libido", category: "intimacy", signal: "Desire is physiology as much as psychology.", pathway: "hormone-therapy", img: "SYM-06", brief: "Two hands apart on ivory bedlinen, soft morning light, no faces — suggestion, not illustration", tone: "rose" },
  { name: "PMS", category: "hormones", signal: "Severe cycles are a signal, not something to endure.", pathway: "hormone-therapy", img: "SYM-07", brief: "Curled on a deep-toned sofa under a throw, warm lamplight, hand resting at her abdomen", tone: "gold" },
  { name: "Hot flashes", category: "hormones", signal: "The classic signal — and one of the most treatable.", pathway: "menopause-care", img: "SYM-08", brief: "At an open balcony door lifting her hair from her neck, evening breeze, warm backlight", tone: "gold" },
  { name: "Hair thinning", category: "intimacy", signal: "Hair follows hormones, thyroid, and nutrition.", pathway: "functional-medicine", img: "SYM-09", brief: "At a gold-framed vanity mirror, fingers through her hair, warm bathroom light", tone: "gold" },
  { name: "Gut issues", category: "metabolism", signal: "The gut and your hormones regulate each other.", pathway: "functional-medicine", img: "SYM-10", brief: "Herbal tea at a marble kitchen counter, hand resting just below her ribs", tone: "taupe" },
  { name: "Skin ageing", category: "intimacy", signal: "Collagen and skin quality respond to regenerative care.", pathway: "peptide-regenerative", img: "SYM-11", brief: "Close portrait in soft window light, bare skin, fine lines visible and unretouched", tone: "rose" },
  { name: "PCOS / cycle irregularity", category: "hormones", signal: "Irregular cycles deserve investigation, not dismissal.", pathway: "hormone-therapy", img: "SYM-12", brief: "A journal and calendar open on a linen bedspread, her hand pausing over a marked date", tone: "taupe" },
];

export const SYMPTOMS_SECTION = {
  kicker: "Pathways for how you feel",
  headline: "What are you experiencing?",
  helper: "Select what resonates. We’ll guide you to the right starting point.",
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
  swipeHint: "Swipe to meet the whole team",
};

/*
  Full expert roster — names & titles transcribed from Ayran's Doctors folder
  filenames, in his numbering. Name spellings normalised from slugs (13, 14) —
  confirm with Irina. role = first segment of the title, specialty = the rest.
*/
export type Expert = {
  name: string;
  role: string;
  specialty: string;
  img: string;
};

export const EXPERTS: Expert[] = [
  { name: "Irina Bond", role: "Founder | CEO", specialty: "Hormone Health Educator", img: "/images/doctors/doc-01.webp" },
  { name: "Dr Valentina Ghorashi", role: "Gynaecologist", specialty: "BHRT & Holistic Women’s Health", img: "/images/doctors/doc-02.webp" },
  { name: "Dr. Nahla Ibrahim Elawady", role: "Gynaecologist", specialty: "BHRT · Sexual Health", img: "/images/doctors/doc-03.webp" },
  { name: "Dr. Mouzayan Ginzarly", role: "Functional Medicine", specialty: "Functional Medicine & Longevity", img: "/images/doctors/doc-04.webp" },
  { name: "Dr. Andrey Komissarov", role: "Internal Medicine", specialty: "Internal, Integrative & Functional Medicine", img: "/images/doctors/doc-05.webp" },
  { name: "Dr. Diana Makovskaia", role: "Gynecologist", specialty: "Hormonal Health", img: "/images/doctors/doc-06.webp" },
  { name: "Dr. Eslam Yakout", role: "Functional Medicine", specialty: "Functional & Regenerative Medicine", img: "/images/doctors/doc-07.webp" },
  { name: "Ms. Richa Puri", role: "Functional Medicine", specialty: "Bioidentical Hormone Specialist", img: "/images/doctors/doc-08.webp" },
  { name: "Dr. Walid Al-Salim", role: "Functional Medicine", specialty: "Functional & Internal Medicine", img: "/images/doctors/doc-09.webp" },
  { name: "Dr. Ebenezer Abel Paul", role: "Physician", specialty: "Profile in progress", img: "/images/doctors/doc-10.webp" },
  { name: "Dr. Khalid", role: "American Board Certified", specialty: "Anti-Ageing & Regenerative Medicine", img: "/images/doctors/doc-11.webp" },
  { name: "Dr Nira Sarak", role: "Naturopathic Doctor", specialty: "Naturopathic Medicine", img: "/images/doctors/doc-12.webp" },
  { name: "Dr. Greta Peciulyte", role: "Regenerative Medicine", specialty: "Regenerative Andrology & Aesthetics", img: "/images/doctors/doc-13.webp" },
  { name: "Begum Demircan", role: "Clinical Dietitian", specialty: "Diabetes, Metabolic Health & Longevity", img: "/images/doctors/doc-14.webp" },
  { name: "Dr. Vishal", role: "Psychiatrist", specialty: "Mental Health & Wellbeing", img: "/images/doctors/doc-15.webp" },
  { name: "Dr Sarmistha", role: "Holistic Health Expert", specialty: "Subconscious Mastery", img: "/images/doctors/doc-16.webp" },
  { name: "Ms. Sophie", role: "Nutritional Therapist", specialty: "Nutrition & Personal Training", img: "/images/doctors/doc-17.webp" },
  { name: "Ms. Livia Rees", role: "Perimenopause", specialty: "Perimenopause Support", img: "/images/doctors/doc-18.webp" },
];

// Real roster from the Doctors folder (names/titles per Ayran's file naming).
// Landing shows 3 of 18 — the pick per specialty is editable; "best for" tags
// are draft pending Irina's sign-off. Full roster lives in Doctors/.
export const DOCTORS: Doctor[] = [
  {
    name: "Dr Valentina Ghorashi",
    credentials: "Gynaecologist",
    specialty: "BHRT & Holistic Women’s Health",
    bestFor: ["Perimenopause", "BHRT", "Cycle health"],
    imageSlot: { id: "IMG-06", caption: "Dr Valentina Ghorashi — portrait" },
  },
  {
    name: "Dr. Mouzayan Ginzarly",
    credentials: "Functional Medicine",
    specialty: "Functional Medicine & Longevity",
    bestFor: ["Gut & thyroid", "Weight", "Fatigue"],
    imageSlot: { id: "IMG-07", caption: "Dr. Mouzayan Ginzarly — portrait" },
  },
  {
    name: "Dr. Khalid",
    credentials: "American Board Certified",
    specialty: "Anti-Ageing & Regenerative Medicine",
    bestFor: ["Peptides", "Skin", "Healthy ageing"],
    imageSlot: { id: "IMG-08", caption: "Dr. Khalid — portrait" },
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
