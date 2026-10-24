import { contactSection } from "@/content/home";
import { contactEmail, site } from "@/content/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/icons";
import { LinkButton } from "@/components/ui/LinkButton";
import { Container, Section } from "@/components/ui/primitives";
import styles from "./sections.module.css";

/** Direct channels: booking, WhatsApp and (on request) the visible email. */
export function ContactChannels({ showEmail = false }: { showEmail?: boolean }) {
  return (
    <div className={styles.channels}>
      <LinkButton href={site.bookingUrl} variant="lightOnDark" size="lg" icon="arrowRight">
        {contactSection.bookingLabel}
      </LinkButton>
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

/** Home contact section (id="contacto"): copy + channels on the left, the form on the right. */
export function ContactSection() {
  return (
    <Section id="contacto" tone="dark" labelledBy="contacto-title">
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
