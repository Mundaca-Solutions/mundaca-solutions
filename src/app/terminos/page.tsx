import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { terms } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: terms.metaTitle,
  description: terms.metaDescription,
  path: terms.path,
});

export default function TermsPage() {
  return <LegalPage doc={terms} lead={terms.metaDescription} />;
}
