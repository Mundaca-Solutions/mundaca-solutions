import { describe, expect, it } from "vitest";
import { contactServices, contactTimelines } from "@/lib/contact-options";
import { contactSchema } from "@/lib/contact-schema";

const valid = {
  name: "Ana Pérez",
  company: "Panadería Sur",
  email: "  ANA@Panaderia.CL ",
  phone: "",
  service: contactServices[0],
  timeline: contactTimelines[1],
  message: "Hoy llevamos los pedidos en planillas y se pierden.",
  consent: true as const,
  website: "",
};

describe("contactSchema", () => {
  it("accepts a complete request and normalizes the email", () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("ana@panaderia.cl");
  });

  it("defaults phone and website when omitted", () => {
    const { phone, website, ...rest } = valid;
    void phone;
    void website;
    const result = contactSchema.safeParse(rest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBe("");
      expect(result.data.website).toBe("");
    }
  });

  it.each([
    ["name", { name: "A" }, "Ingresa tu nombre"],
    ["company", { company: "" }, "Ingresa el nombre de tu empresa"],
    ["email", { email: "no-es-correo" }, "Ingresa un correo válido"],
    ["message", { message: "corto" }, "Cuéntanos un poco más sobre el desafío"],
  ])("rejects an invalid %s with a plain Spanish message", (_field, patch, message) => {
    const result = contactSchema.safeParse({ ...valid, ...patch });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues[0]?.message).toBe(message);
  });

  it("requires consent to be exactly true", () => {
    for (const consent of [false, "true", undefined]) {
      const result = contactSchema.safeParse({ ...valid, consent });
      expect(result.success).toBe(false);
    }
    const missing = contactSchema.safeParse({ ...valid, consent: false });
    if (!missing.success) expect(missing.error.issues[0]?.message).toBe("Debes aceptar la Política de Privacidad");
  });

  it("rejects services and timelines outside the published lists", () => {
    expect(contactSchema.safeParse({ ...valid, service: "Otra cosa" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, timeline: "Mañana" }).success).toBe(false);
  });

  it("rejects unknown keys (strict) and oversized values", () => {
    expect(contactSchema.safeParse({ ...valid, admin: true }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(3001) }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, name: "x".repeat(101) }).success).toBe(false);
  });
});
