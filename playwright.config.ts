// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 5,
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  testDir: './tests',
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
