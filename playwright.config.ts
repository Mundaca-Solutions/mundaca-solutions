import { defineConfig, devices } from "@playwright/test";

/**
 * e2e against the PRODUCTION build (`npm run build` first), on its own port so it never collides with the
 * server used for visual review (3300) or the owner's server (3100). The contact API is always mocked
 * with page.route: tests never send email.
 */
const port = Number(process.env.E2E_PORT ?? 3200);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "retain-on-failure",
    // Animations (reveal, page entrance) would make measurements and axe contrast checks race the clock.
    reducedMotion: "reduce",
  },
  webServer: {
    command: `npx next start -p ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: { ...devices["Desktop Chrome"], viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true },
    },
  ],
});
