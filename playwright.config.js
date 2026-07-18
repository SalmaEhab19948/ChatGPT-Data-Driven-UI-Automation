require('dotenv').config();
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use.*/
  reporter: [
    ['list'],
    ['html', { open: 'always' }],
    ['./reporters/EnvironmentReporter.js']
],


  /* Shared settings for all the projects below.*/
  use: {
    /* Base URL to use */
    baseURL: process.env.BASE_URL,
    headless: false,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});

