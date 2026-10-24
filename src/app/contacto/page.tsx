import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { ContactChannels } from "@/components/sections/ContactSection";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/primitives";
import { contactPage } from "@/content/home";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/sections/pages.module.css";

export const metadata: Metadata = pageMetadata({
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
        eyebrow={contactPage.eyebrow}
        title={contactPage.h1}
        lead={contactPage.lead}
      />
      <div className={styles.page}>
        <Container>
          <div className={styles.contactPanel}>
            <Reveal>
              <div className={styles.contactCard} data-surface="dark">
                <h2>{contactPage.cardTitle}</h2>
                <p>{contactPage.cardText}</p>
                <ContactChannels showEmail />
              </div>
            </Reveal>
            <Reveal className={styles.formCard} delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </div>
    </>
  );
}
