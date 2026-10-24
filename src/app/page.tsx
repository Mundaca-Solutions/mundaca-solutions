import { JsonLd } from "@/components/seo/JsonLd";
import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import {
  AiLayersSection,
  CafetalSection,
  MethodSection,
  PartnerSection,
  PrincipleSection,
  ProblemsSection,
  ProductsSection,
  ResultsSection,
  SolutionsSection,
} from "@/components/sections/HomeSections";
import { Ticker } from "@/components/sections/Ticker";
import { graph, professionalServiceSchema } from "@/lib/seo";

/**
 * Home (server component). Order is fixed by docs/ART_DIRECTION_GUIDE.md. Title, description and
 * canonical come from the root layout; the single H1 lives in <Hero />.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={graph(professionalServiceSchema())} />
      <Hero />
      <Ticker />
      <ProductsSection />
      <CafetalSection />
      <PrincipleSection />
      <AiLayersSection />
      <ProblemsSection />
      <SolutionsSection />
      <MethodSection />
      <PartnerSection />
      <ContactSection />
      <ResultsSection />
    </>
  );
}
