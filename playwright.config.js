const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './features',
  timeout: 60000,
  expect: {
    timeout: 10000
  },
  use: {
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
