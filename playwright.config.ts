import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: env.CI === 'true',
  retries: env.CI ? 2 : 0,
  workers: env.CI ? 2 : undefined,
  reporter: env.CI ? [["github"], ["html"]] : [["html"]],
  use: {
    baseURL: env.BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
