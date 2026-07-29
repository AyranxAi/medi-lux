import {
  Hero,
  Symptoms,
  CarePathways,
  Method,
  WhyMediGyn,
  Still,
  Doctors,
  ProductsAndLabs,
  Events,
  CtaBand,
} from "@/components/home";

/*
  Homepage = the conversion journey from the brief, in order:
  Hero → What are you experiencing? → Care pathways → The Medi-Gyn Method →
  Why Medi-Gyn → Doctors → Products & labs (low, supportive) → Events → CTA.

  `Still` is the one addition: a full-bleed photograph between the argument and
  the faces. It sells nothing and asks for nothing, which is the point.
*/
export default function HomePage() {
  return (
    <>
      <Hero />
      <Symptoms />
      <CarePathways />
      <Method />
      <WhyMediGyn />
      <Still />
      <Doctors />
      <ProductsAndLabs />
      <Events />
      <CtaBand />
    </>
  );
}
