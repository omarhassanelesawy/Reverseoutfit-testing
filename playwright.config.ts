import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for reverseoutfit.com E2E testing
 * 
 * Features:
 * - Multi-browser support (Chromium, Firefox, WebKit)
 * - Video/Trace recording on failure only
 * - Auto-waiting for resilient tests
 * - HTML reporter
 */
export default defineConfig({
    // Test directory
    testDir: './tests',

    // Maximum time one test can run
    timeout: 30 * 1000,

    // Run tests in files in parallel
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code
    forbidOnly: !!process.env.CI,

    // Retry on CI only
    retries: process.env.CI ? 2 : 1,

    // Opt out of parallel tests on CI
    workers: process.env.CI ? 1 : undefined,

    // Reporter to use
    reporter: [
        ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
        ['list']
    ],

    // Shared settings for all the projects below
    use: {
        // Base URL for the application
        baseURL: 'https://reverseoutfit.com',

        // Collect trace on first retry for debugging
        trace: 'on-first-retry',

        // Record video on failure only to save resources
        video: 'retain-on-failure',

        // Screenshot on failure
        screenshot: 'only-on-failure',

        // Maximum time each action can take
        actionTimeout: 15 * 1000,

        // Navigation timeout
        navigationTimeout: 30 * 1000,
    },

    // Configure projects for major browsers
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 }
            },
        },

        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                viewport: { width: 1920, height: 1080 }
            },
        },

        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                viewport: { width: 1920, height: 1080 }
            },
        },

        // Mobile viewports (optional - commented out for initial implementation)
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },
    ],

    // Run your local dev server before starting the tests
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
