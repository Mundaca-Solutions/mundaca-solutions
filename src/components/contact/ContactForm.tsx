"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { contactServices, contactTimelines } from "@/lib/contact-options";
import { contactSchema } from "@/lib/contact-schema";
import { Icon } from "@/components/ui/icons";
import clsx from "@/lib/clsx";
import styles from "./contact.module.css";

type FormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: (typeof contactServices)[number];
  timeline: (typeof contactTimelines)[number];
  message: string;
  consent: boolean;
  website: string;
};

const initialForm: FormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: contactServices[0],
  timeline: contactTimelines[1],
  message: "",
  consent: false,
  website: "",
};

type Status = "idle" | "sending" | "success" | "error";
type FieldErrors = Partial<Record<keyof FormValues, string>>;

const REQUEST_TIMEOUT_MS = 15_000;

/** Visual order of the visible fields (the honeypot is never focusable). */
const FIELD_ORDER: (keyof FormValues)[] = ["name", "company", "email", "phone", "service", "timeline", "message", "consent"];

/** A message the API itself wrote (already plain Spanish). Anything else is a technical error we never show. */
class ServerMessage extends Error {}

/** The server stays the authority; the shared schema only gives instant, field-level hints. */
function validate(values: FormValues): FieldErrors {
  const result = contactSchema.safeParse(values);
  if (result.success) return {};
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof FormValues | undefined;
    if (field && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}

export function ContactForm() {
  const uid = useId();
  const [form, setForm] = useState<FormValues>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const update = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === "success" || status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const found = validate(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("error");
      setFeedback("Revisa los campos marcados para poder enviar tu solicitud.");
      // Keyboard and screen-reader users land on the first field to fix.
      const first = FIELD_ORDER.find((field) => found[field]);
      if (first) document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    setFeedback("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
        credentials: "same-origin",
      });

      const data = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) {
        throw new ServerMessage(data.message || "No fue posible enviar la solicitud. Inténtalo nuevamente.");
      }

      setStatus("success");
      setFeedback(
        "Solicitud recibida. Revisaremos tu caso antes de contactarte para que la conversación sea útil desde el primer minuto.",
      );
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof DOMException && error.name === "AbortError"
          ? "La solicitud tardó demasiado y puede que sí se haya enviado. Revisa tu conexión; si no recibes nuestra confirmación en unos minutos, escríbenos por WhatsApp."
          : error instanceof ServerMessage
            ? error.message
            : "No pudimos enviar tu solicitud. Revisa tu conexión e inténtalo nuevamente, o escríbenos por WhatsApp.",
      );
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const fieldProps = (field: keyof FormValues) => ({
    id: `${uid}-${field}`,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${uid}-${field}-error` : undefined,
  });

  const fieldError = (field: keyof FormValues) =>
    errors[field] ? (
      <span className={styles.fieldError} id={`${uid}-${field}-error`}>
        <Icon name="alert" size={15} /> {errors[field]}
      </span>
    ) : null;

  return (
    <form className={styles.form} onSubmit={submit} aria-busy={status === "sending"} noValidate>
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor={`${uid}-name`}>Nombre</label>
          <input
            {...fieldProps("name")}
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Tu nombre"
            autoComplete="name"
            maxLength={100}
            required
          />
          {fieldError("name")}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${uid}-company`}>Empresa</label>
          <input
            {...fieldProps("company")}
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            placeholder="Nombre de tu empresa"
            autoComplete="organization"
            maxLength={120}
            required
          />
          {fieldError("company")}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${uid}-email`}>Correo</label>
          <input
            {...fieldProps("email")}
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="nombre@empresa.cl"
            autoComplete="email"
            inputMode="email"
            maxLength={160}
            required
          />
          {fieldError("email")}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${uid}-phone`}>Teléfono / WhatsApp</label>
          <input
            {...fieldProps("phone")}
            type="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="+56 9..."
            autoComplete="tel"
            inputMode="tel"
            maxLength={40}
          />
          {fieldError("phone")}
        </div>

        <div className={clsx(styles.field, styles.wide)}>
          <label htmlFor={`${uid}-service`}>¿Qué quieres resolver?</label>
          <select
            {...fieldProps("service")}
            value={form.service}
            onChange={(event) => update("service", event.target.value as FormValues["service"])}
          >
            {contactServices.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
          {fieldError("service")}
        </div>

        <div className={clsx(styles.field, styles.wide)}>
          <label htmlFor={`${uid}-timeline`}>¿Cuándo quieres comenzar?</label>
          <select
            {...fieldProps("timeline")}
            value={form.timeline}
            onChange={(event) => update("timeline", event.target.value as FormValues["timeline"])}
          >
            {contactTimelines.map((timeline) => (
              <option key={timeline}>{timeline}</option>
            ))}
          </select>
          {fieldError("timeline")}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor={`${uid}-message`}>Cuéntanos qué está ocurriendo</label>
        <textarea
          {...fieldProps("message")}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="¿Qué proceso hoy les quita tiempo, genera errores o limita el crecimiento de la empresa?"
          rows={6}
          maxLength={3000}
          required
        />
        {fieldError("message")}
      </div>

      <div className={styles.consent}>
        <input
          {...fieldProps("consent")}
          type="checkbox"
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
          required
        />
        <div>
          <label htmlFor={`${uid}-consent`}>Autorizo el uso de estos datos para responder mi solicitud</label>
          {", según la "}
          <Link href="/privacidad">Política de Privacidad</Link>.
          {fieldError("consent")}
        </div>
      </div>

      {/* Honeypot: invisible to people, tempting to bots. The API silently drops anything that fills it.
          Neutral label/id (not "website"/"url") so browser autofill does not fill it for a real person. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${uid}-hp`}>Dejar este campo vacío</label>
        <input
          id={`${uid}-hp`}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={form.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>

      {/* Persistent live region: a status box that is mounted together with its text is often not announced. */}
      <div role="status" aria-live="polite">
        {status === "success" ? (
          <div className={clsx(styles.feedback, styles.feedbackOk)}>
            <Icon name="checkCircle" size={22} />
            <span>{feedback}</span>
          </div>
        ) : null}
      </div>
      {status === "error" && feedback ? (
        <div className={clsx(styles.feedback, styles.feedbackError)} role="alert">
          <Icon name="alert" size={22} />
          <span>{feedback}</span>
        </div>
      ) : null}

      <div className={styles.submitRow}>
        <p>Respondemos personalmente y revisamos cada solicitud antes de contactarte.</p>
        <button className={styles.submit} type="submit" disabled={status === "sending"}>
          {status === "sending" ? <Icon name="loader" size={19} className={styles.spin} /> : <Icon name="arrowRight" size={19} />}
          {status === "sending" ? "Enviando solicitud" : "Solicitar evaluación"}
        </button>
      </div>
    </form>
  );
}
