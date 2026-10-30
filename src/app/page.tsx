import { JsonLd } from "@/components/seo/JsonLd";
import { ContactSection } from "@/components/sections/ContactSection";
import { Hero } from "@/components/sections/Hero";
import {
  AiLayersSection,
  FoodiesDemoSection,
  MethodSection,
  PartnerSection,
  PrincipleSection,
  ProblemsSection,
  ProductsSection,
  ResultsSection,
  SolutionsSection,
} from "@/components/sections/HomeSections";
import { ValueBand } from "@/components/sections/ValueBand";
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
      <ValueBand />
      <ProductsSection />
      <FoodiesDemoSection />
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
