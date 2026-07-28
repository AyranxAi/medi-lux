import {
  Hero,
  Symptoms,
  CarePathways,
  Method,
  WhyMediGyn,
  Doctors,
  ProductsAndLabs,
  Events,
  CtaBand,
} from "@/components/home";

/*
  Homepage = the conversion journey from the brief, in order:
  Hero → What are you experiencing? → Care pathways → The Medi-Gyn Method →
  Why Medi-Gyn → Doctors → Products & labs (low, supportive) → Events → CTA.
*/
export default function HomePage() {
  return (
    <>
      <Hero />
      <Symptoms />
      <CarePathways />
      <Method />
      <WhyMediGyn />
      <Doctors />
      <ProductsAndLabs />
      <Events />
      <CtaBand />
    </>
  );
}
