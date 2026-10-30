import { contactSection } from "@/content/home";
import { contactEmail, isExternalHref, site } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/icons";
import { LinkButton } from "@/components/ui/LinkButton";
import { Container, Section } from "@/components/ui/primitives";
import styles from "./sections.module.css";

/**
 * Direct channels: WhatsApp, the visible email (on request) and a booking button ONLY when booking goes to an
 * outside calendar. By default the booking URL is the form on this very page, and a button that scrolls to the
 * form the visitor is already looking at is just a second CTA for the same action.
 */
export function ContactChannels({ showEmail = false }: { showEmail?: boolean }) {
  const outsideBooking = isExternalHref(site.bookingUrl);
  return (
    <div className={styles.channels}>
      {outsideBooking ? (
        <LinkButton href={site.bookingUrl} variant="lightOnDark" size="lg" icon="arrowRight">
          {contactSection.bookingLabel}
        </LinkButton>
      ) : null}
      <a className={styles.whatsappCard} href={site.whatsappUrl} target="_blank" rel="noopener noreferrer">
        <Icon name="whatsapp" size={26} />
        <span>
          <small>{contactSection.whatsapp.kicker}</small>
          <strong>{contactSection.whatsapp.title}</strong>
        </span>
        <Icon name="arrowRight" size={17} />
      </a>
      {showEmail ? (
        <a className={styles.emailLink} href={`mailto:${contactEmail}`}>
          <Icon name="mail" size={18} /> {contactEmail}
        </a>
      ) : null}
    </div>
  );
}

/** Home contact section (id="contacto"): copy + channels on the left, a compact form on the right. */
export function ContactSection() {
  return (
    <Section id="contacto" tone="dark" labelledBy="contacto-title" className={styles.contactSection}>
      <Container>
        <div className={styles.contactLayout}>
          <Reveal className={styles.contactCopy}>
            <span className={styles.partnerEyebrow}>{contactSection.eyebrow}</span>
            <h2 id="contacto-title">{contactSection.title}</h2>
            <p>{contactSection.text}</p>
            <ul className={styles.contactPoints}>
              {contactSection.points.map((point) => (
                <li key={point}>
                  <Icon name="check" size={16} /> {point}
                </li>
              ))}
            </ul>
            <ContactChannels />
          </Reveal>
          <Reveal className={styles.formShell} delay={100}>
            <div className={styles.formHead}>
              <span>
                <b>{contactSection.formHead.index}</b>
                <strong>{contactSection.formHead.title}</strong>
              </span>
              <small>{contactSection.formHead.note}</small>
            </div>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
