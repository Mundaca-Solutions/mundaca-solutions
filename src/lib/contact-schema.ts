import { z } from "zod";
import { contactServices, contactTimelines } from "@/lib/contact-options";

/**
 * Contact form contract, shared by the form (client-side hints) and POST /api/contact (the authority).
 * Extracted verbatim from the route so both sides validate exactly the same thing.
 */
export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Ingresa tu nombre").max(100),
    company: z.string().trim().min(2, "Ingresa el nombre de tu empresa").max(120),
    email: z.string().trim().toLowerCase().email("Ingresa un correo válido").max(160),
    phone: z.string().trim().max(40).optional().default(""),
    service: z.enum(contactServices),
    timeline: z.enum(contactTimelines),
    message: z.string().trim().min(12, "Cuéntanos un poco más sobre el desafío").max(3000),
    consent: z.literal(true, { error: "Debes aceptar la Política de Privacidad" }),
    website: z.string().trim().max(200).optional().default(""),
  })
  .strict();

export type ContactInput = z.infer<typeof contactSchema>;
