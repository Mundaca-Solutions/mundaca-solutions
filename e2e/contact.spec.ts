import { expect, test, type Page, type Route } from "@playwright/test";

/**
 * The contact API is ALWAYS mocked here (page.route): these tests never send email nor touch Resend/Supabase.
 * The real route (rate limit, honeypot, origin, Resend) is unchanged and out of scope for the UI.
 */

async function fillValid(page: Page) {
  await page.getByLabel("Nombre", { exact: true }).fill("Ana Pérez");
  await page.getByLabel("Empresa", { exact: true }).fill("Panadería Sur");
  await page.getByLabel("Correo", { exact: true }).fill("ana@panaderia.cl");
  await page.getByLabel("Teléfono / WhatsApp").fill("+56 9 1234 5678");
  await page.getByLabel("¿Qué quieres resolver?").selectOption({ index: 1 });
  await page.getByLabel("Cuéntanos qué está ocurriendo").fill("Hoy llevamos los pedidos en planillas y se pierden.");
  await page.getByLabel(/Autorizo el uso de estos datos/).check();
}

/** Next also renders its own role="alert" route announcer: scope to the form's feedback box. */
const formAlert = (page: Page) => page.locator("form").getByRole("alert");
const formStatus = (page: Page) => page.locator("form").getByRole("status");

const submit = (page: Page) => page.getByRole("button", { name: /Solicitar evaluación|Enviando solicitud/ });

for (const path of ["/", "/contacto"]) {
  test.describe(`form on ${path}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path);
    });

    test("an empty submit shows plain Spanish errors with an icon and sends nothing", async ({ page }) => {
      let called = false;
      await page.route("**/api/contact", (route) => {
        called = true;
        return route.abort();
      });

      await submit(page).click();

      const alert = formAlert(page);
      await expect(alert).toContainText("Revisa los campos marcados");
      await expect(alert.locator("svg")).toHaveCount(1);
      for (const message of [
        "Ingresa tu nombre",
        "Ingresa el nombre de tu empresa",
        "Ingresa un correo válido",
        "Cuéntanos un poco más sobre el desafío",
        "Debes aceptar la Política de Privacidad",
      ]) {
        await expect(page.getByText(message, { exact: true })).toBeVisible();
      }
      await expect(page.getByLabel("Nombre", { exact: true })).toHaveAttribute("aria-invalid", "true");
      expect(called).toBe(false);
    });

    test("a valid request is posted as JSON and confirmed", async ({ page }) => {
      let body: Record<string, unknown> = {};
      await page.route("**/api/contact", async (route: Route) => {
        body = route.request().postDataJSON();
        await route.fulfill({ status: 200, json: { ok: true } });
      });

      await fillValid(page);
      await submit(page).click();

      await expect(formStatus(page)).toContainText("Solicitud recibida");
      expect(body).toMatchObject({
        name: "Ana Pérez",
        company: "Panadería Sur",
        email: "ana@panaderia.cl",
        consent: true,
        website: "",
      });
      // The form is cleared after success.
      await expect(page.getByLabel("Nombre", { exact: true })).toHaveValue("");
    });

    test("a server error is explained in plain Spanish and the data is kept", async ({ page }) => {
      await page.route("**/api/contact", (route) =>
        route.fulfill({ status: 429, json: { message: "Has realizado varias solicitudes. Inténtalo nuevamente en unos minutos." } }),
      );
      await fillValid(page);
      await submit(page).click();

      await expect(formAlert(page)).toContainText("Has realizado varias solicitudes");
      await expect(page.getByLabel("Nombre", { exact: true })).toHaveValue("Ana Pérez");
    });

    test("the service being unavailable points to WhatsApp", async ({ page }) => {
      await page.route("**/api/contact", (route) =>
        route.fulfill({ status: 503, json: { message: "El formulario no está disponible temporalmente. Escríbenos por WhatsApp." } }),
      );
      await fillValid(page);
      await submit(page).click();
      await expect(formAlert(page)).toContainText("Escríbenos por WhatsApp");
    });

    test("a network failure shows a friendly error, not a technical one", async ({ page }) => {
      await page.route("**/api/contact", (route) => route.abort("failed"));
      await fillValid(page);
      await submit(page).click();
      const alert = formAlert(page);
      await expect(alert).toBeVisible();
      await expect(alert).not.toContainText(/fetch|TypeError|undefined/i);
    });

    test("the button is disabled and busy while sending", async ({ page }) => {
      let release: () => void = () => {};
      const gate = new Promise<void>((resolve) => {
        release = resolve;
      });
      await page.route("**/api/contact", async (route) => {
        await gate;
        await route.fulfill({ status: 200, json: { ok: true } });
      });
      await fillValid(page);
      await submit(page).click();
      await expect(page.getByRole("button", { name: "Enviando solicitud" })).toBeDisabled();
      await expect(page.locator("form")).toHaveAttribute("aria-busy", "true");
      release();
      await expect(formStatus(page)).toContainText("Solicitud recibida");
    });

    test("the honeypot is out of the tab order and invisible", async ({ page }) => {
      const trap = page.getByLabel("Dejar este campo vacío");
      await expect(trap).toHaveAttribute("tabindex", "-1");
      const box = await trap.boundingBox();
      expect(box === null || box.x < 0).toBe(true);
    });
  });
}

test("the privacy link inside the form goes to the policy", async ({ page }) => {
  await page.goto("/contacto");
  await page.getByRole("link", { name: "Política de Privacidad" }).click();
  await expect(page).toHaveURL(/\/privacidad$/);
});
