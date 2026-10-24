import { after, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizePhoneForWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("56")) return digits;
  return digits.length <= 9 ? `56${digits}` : digits;
}

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();

  if (rateLimitStore.size > 500) {
    for (const [key, value] of rateLimitStore) {
      if (value.resetAt <= now) rateLimitStore.delete(key);
    }
  }

  const current = rateLimitStore.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function getCanonicalOrigins() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    process.env.NODE_ENV !== "production" ? "http://localhost:3000" : undefined,
  ].filter(Boolean) as string[];

  const origins = new Set<string>();

  for (const candidate of candidates) {
    try {
      const url = new URL(candidate);
      origins.add(url.origin);

      if (url.hostname.startsWith("www.")) {
        const apex = new URL(url.origin);
        apex.hostname = url.hostname.slice(4);
        origins.add(apex.origin);
      } else if (!url.hostname.endsWith(".vercel.app") && url.hostname !== "localhost") {
        const www = new URL(url.origin);
        www.hostname = `www.${url.hostname}`;
        origins.add(www.origin);
      }
    } catch {
      // Ignore malformed environment values; preflight reports them before deployment.
    }
  }

  return origins;
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return getCanonicalOrigins().has(new URL(origin).origin);
  } catch {
    return false;
  }
}

function emailShell(content: string) {
  return `
    <div style="margin:0;padding:0;background:#f3f6fb;font-family:Arial,Helvetica,sans-serif;color:#0a1220;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6fb;padding:32px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;background:#ffffff;border:1px solid #dfe7f2;border-radius:24px;overflow:hidden;box-shadow:0 18px 55px rgba(8,24,48,0.10);">
              ${content}
            </table>
            <div style="max-width:720px;margin:18px auto 0;text-align:center;color:#8a98aa;font-size:12px;line-height:1.6;">
              Mundaca's Solutions · Tecnología construida para avanzar.
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function header(title: string, subtitle: string) {
  return `
    <tr>
      <td style="padding:0;background:linear-gradient(135deg,#06101f,#0b2643 58%,#283d78);">
        <div style="padding:34px 34px 30px;">
          <div style="display:inline-block;background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.16);border-radius:999px;padding:8px 13px;color:#9deaff;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;">
            Mundaca's Solutions
          </div>
          <h1 style="margin:22px 0 10px;color:#ffffff;font-size:34px;line-height:1.08;letter-spacing:-1px;">${title}</h1>
          <p style="margin:0;color:#b8cce2;font-size:16px;line-height:1.6;">${subtitle}</p>
        </div>
      </td>
    </tr>
  `;
}

function infoRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #edf1f7;color:#748397;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;">${label}</td>
      <td style="padding:12px 0;border-bottom:1px solid #edf1f7;text-align:right;color:#0a1220;font-size:14px;font-weight:800;">${value}</td>
    </tr>
  `;
}

function adminTemplate(data: {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  timeline: string;
  message: string;
  submittedAt: string;
  whatsappUrl: string;
}) {
  return emailShell(`
    ${header("Nueva oportunidad comercial", "Una empresa acaba de solicitar una conversación desde la landing.")}
    <tr>
      <td style="padding:30px 34px 10px;">
        <div style="background:#eef6ff;border:1px solid #d5e7ff;border-radius:18px;padding:20px;">
          <p style="margin:0 0 7px;color:#285ec8;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.07em;">Solicitud de reunión</p>
          <h2 style="margin:0 0 6px;color:#0a1220;font-size:24px;">${data.company}</h2>
          <p style="margin:0;color:#53637a;font-size:15px;line-height:1.6;">${data.name} está evaluando <strong>${data.service}</strong>.</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:18px 34px 0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          ${infoRow("Contacto", data.name)}
          ${infoRow("Empresa", data.company)}
          ${infoRow("Correo", data.email)}
          ${infoRow("Teléfono", data.phone || "No informado")}
          ${infoRow("Servicio", data.service)}
          ${infoRow("Inicio esperado", data.timeline)}
          ${infoRow("Fecha", data.submittedAt)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 34px 0;">
        <p style="margin:0 0 10px;color:#0a1220;font-size:14px;font-weight:900;">Desafío descrito</p>
        <div style="background:#f7f9fc;border:1px solid #e3e9f2;border-radius:16px;padding:18px;color:#3f5068;font-size:15px;line-height:1.75;">${data.message}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 34px 34px;">
        <a href="mailto:${data.email}?subject=${encodeURIComponent(`Reunión con Mundaca's Solutions — ${data.company}`)}" style="display:inline-block;background:#2f6de1;color:#ffffff;text-decoration:none;border-radius:12px;padding:14px 20px;font-weight:900;font-size:14px;margin-right:10px;">Responder por correo</a>
        ${data.whatsappUrl ? `<a href="${data.whatsappUrl}" style="display:inline-block;background:#18a968;color:#ffffff;text-decoration:none;border-radius:12px;padding:14px 20px;font-weight:900;font-size:14px;">Abrir WhatsApp</a>` : ""}
      </td>
    </tr>
  `);
}

function customerTemplate(data: { name: string; company: string; service: string; siteUrl: string }) {
  return emailShell(`
    ${header("Recibimos tu solicitud", "Gracias por considerar a Mundaca's Solutions para tu próximo desafío digital.")}
    <tr>
      <td style="padding:34px;">
        <p style="margin:0 0 18px;color:#0a1220;font-size:17px;line-height:1.7;">Hola <strong>${data.name}</strong>,</p>
        <p style="margin:0;color:#3f5068;font-size:16px;line-height:1.8;">Ya recibimos la solicitud de <strong>${data.company}</strong> relacionada con <strong>${data.service}</strong>. Revisaremos el contexto antes de contactarte para que la conversación sea útil desde el primer minuto.</p>
        <div style="margin-top:24px;background:#eef6ff;border:1px solid #d5e7ff;border-radius:18px;padding:20px;">
          <p style="margin:0 0 8px;color:#285ec8;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.07em;">Siguiente paso</p>
          <p style="margin:0;color:#3f5068;font-size:15px;line-height:1.7;">Te contactaremos personalmente para coordinar una reunión y comprender mejor el desafío, el alcance y los resultados esperados.</p>
        </div>
        <a href="${data.siteUrl}" style="display:inline-block;margin-top:26px;background:#2f6de1;color:#ffffff;text-decoration:none;border-radius:12px;padding:14px 20px;font-weight:900;font-size:14px;">Volver al sitio</a>
        <p style="margin:26px 0 0;color:#738197;font-size:14px;line-height:1.7;">Un saludo,<br/><strong style="color:#0a1220;">Mundaca's Solutions</strong></p>
      </td>
    </tr>
  `);
}

async function storeLead(data: ContactInput) {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const configuredTable = process.env.SUPABASE_LEADS_TABLE || "landing_leads";
  const table = /^[a-zA-Z0-9_]+$/.test(configuredTable) ? configuredTable : "landing_leads";

  if (!url || !serviceRoleKey) return;

  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      timeline: data.timeline,
      message: data.message,
      consent: true,
      privacy_version: "2026-07-22",
      consent_at: new Date().toISOString(),
      source: "mundaca-solutions-landing",
    }),
  });

  if (!response.ok) {
    console.error("Supabase lead storage failed", await response.text());
  }
}

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return json({ message: "Origen de solicitud no permitido." }, 403);
    }

    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return json({ message: "Formato de solicitud no permitido." }, 415);
    }

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return json({ message: "La solicitud es demasiado grande." }, 413);
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return json({ message: "Has realizado varias solicitudes. Inténtalo nuevamente en unos minutos." }, 429);
    }

    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
      return json({ message: "La solicitud es demasiado grande." }, 413);
    }

    const payload = contactSchema.parse(JSON.parse(rawBody));

    // Honeypot: report success without processing likely automated submissions.
    if (payload.website) {
      return json({ ok: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mundacasolutions.com";

    if (!apiKey || !to || !from) {
      console.error("Missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL");
      return json({ message: "El formulario no está disponible temporalmente. Escríbenos por WhatsApp." }, 503);
    }

    const safe = {
      name: escapeHtml(payload.name),
      company: escapeHtml(payload.company),
      email: escapeHtml(payload.email),
      phone: escapeHtml(payload.phone || ""),
      service: escapeHtml(payload.service),
      timeline: escapeHtml(payload.timeline),
      message: escapeHtml(payload.message).replace(/\n/g, "<br />"),
    };

    const submittedAt = new Intl.DateTimeFormat("es-CL", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "America/Santiago",
    }).format(new Date());

    const whatsappNumber = normalizePhoneForWhatsapp(payload.phone || "");
    const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "";
    const resend = new Resend(apiKey);

    const adminEmail = await resend.emails.send({
      from,
      to,
      replyTo: payload.email,
      subject: `Nueva reunión — ${payload.company} · ${payload.service}`,
      html: adminTemplate({ ...safe, submittedAt, whatsappUrl }),
      text: `Nueva oportunidad comercial\n\nEmpresa: ${payload.company}\nContacto: ${payload.name}\nCorreo: ${payload.email}\nTeléfono: ${payload.phone || "No informado"}\nServicio: ${payload.service}\nInicio: ${payload.timeline}\n\n${payload.message}`,
    });

    if (adminEmail.error) {
      console.error("Resend admin email failed", adminEmail.error);
      return json({ message: "No fue posible enviar la solicitud. Intenta nuevamente." }, 502);
    }

    after(async () => {
      const [confirmationResult, storageResult] = await Promise.allSettled([
        resend.emails.send({
          from,
          to: payload.email,
          subject: "Recibimos tu solicitud — Mundaca's Solutions",
          html: customerTemplate({
            name: safe.name,
            company: safe.company,
            service: safe.service,
            siteUrl,
          }),
          text: `Hola ${payload.name},\n\nRecibimos la solicitud de ${payload.company}. Te contactaremos personalmente para coordinar una reunión.\n\nMundaca's Solutions`,
        }),
        storeLead(payload),
      ]);

      if (confirmationResult.status === "rejected") {
        console.error("Resend confirmation email failed", confirmationResult.reason);
      } else if (confirmationResult.value.error) {
        console.error("Resend confirmation email failed", confirmationResult.value.error);
      }

      if (storageResult.status === "rejected") {
        console.error("Supabase lead storage failed", storageResult.reason);
      }
    });

    return json({ ok: true });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return json({ message: "La solicitud contiene datos inválidos." }, 400);
    }

    if (error instanceof z.ZodError) {
      return json({ message: error.issues[0]?.message || "Revisa los datos ingresados." }, 400);
    }

    console.error("Contact route failed", error);
    return json({ message: "Ocurrió un error inesperado. Intenta nuevamente." }, 500);
  }
}
