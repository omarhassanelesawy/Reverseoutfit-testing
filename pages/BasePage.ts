import { Page, Locator } from '@playwright/test';

/**
 * BasePage - Parent class for all Page Object Models
 * 
 * Provides common utilities and resilient waiting mechanisms
 * without using hard-coded waitForTimeout()
 */
export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to a specific URL
     * @param url - Relative or absolute URL
     */
    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    /**
     * Get the current page title
     */
    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Get the current page URL
     */
    getCurrentUrl(): string {
        return this.page.url();
    }

    /**
     * Safe click with automatic wait for element to be actionable
     * Demonstrates Playwright's auto-waiting without hard-coded timeouts
     * @param locator - Playwright locator
     */
    async safeClick(locator: Locator): Promise<void> {
        // Playwright automatically waits for element to be:
        // - Attached to DOM
        // - Visible
        // - Stable (not animating)
        // - Enabled
        // - Receives events (not obscured)
        await locator.click();
    }

    /**
     * Safe type/fill with automatic wait for input to be ready
     * @param locator - Playwright locator
     * @param text - Text to type
     */
    async safeType(locator: Locator, text: string): Promise<void> {
        // Playwright auto-waits before typing
        await locator.fill(text);
    }

    /**
     * Custom polling mechanism using waitFor() API
     * Demonstrates how to handle flakiness without waitForTimeout()
     * 
     * @param locator - Element to wait for
     * @param state - State to wait for ('visible' | 'hidden' | 'attached' | 'detached')
     * @param timeout - Maximum wait time in ms (default: 30000)
     */
    async waitForElementWithPolling(
        locator: Locator,
        state: 'visible' | 'hidden' | 'attached' | 'detached' = 'visible',
        timeout: number = 30000
    ): Promise<void> {
        await locator.waitFor({ state, timeout });
    }

    /**
     * Wait for element to be visible (shorthand)
     */
    async waitForVisible(locator: Locator): Promise<void> {
        await this.waitForElementWithPolling(locator, 'visible');
    }

    /**
     * Wait for element to be hidden (shorthand)
     */
    async waitForHidden(locator: Locator): Promise<void> {
        await this.waitForElementWithPolling(locator, 'hidden');
    }

    /**
     * Check if element is visible
     */
    async isVisible(locator: Locator): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Get text content of an element
     */
    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent()) || '';
    }

    /**
     * Get all text contents from multiple elements
     */
    async getAllTexts(locator: Locator): Promise<string[]> {
        return await locator.allTextContents();
    }

    /**
     * Scroll element into view
     */
    async scrollToElement(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
    }

    /**
     * Wait for page load state
     * @param state - Load state to wait for ('load' | 'domcontentloaded' | 'networkidle')
     */
    async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load'): Promise<void> {
        await this.page.waitForLoadState(state);
    }

    /**
     * Wait for navigation to complete
     */
    async waitForNavigation(callback: () => Promise<void>): Promise<void> {
        await Promise.all([
            this.page.waitForLoadState('domcontentloaded'),
            callback()
        ]);
    }

    /**
     * Take a screenshot
     * @param path - Path to save screenshot
     */
    async takeScreenshot(path: string): Promise<void> {
        await this.page.screenshot({ path, fullPage: true });
    }
}
