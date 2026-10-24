import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacy } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: privacy.metaTitle,
  description: privacy.metaDescription,
  path: privacy.path,
});

export default function PrivacyPage() {
  return <LegalPage doc={privacy} lead={privacy.metaDescription} />;
}
