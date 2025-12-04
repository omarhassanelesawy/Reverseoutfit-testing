/**
 * Utility helper functions for Playwright tests
 */

/**
 * Generate random string
 * @param length - Length of random string
 */
export function generateRandomString(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Generate random email
 */
export function generateRandomEmail(): string {
    return `test.${generateRandomString(8)}@example.com`;
}

/**
 * Format currency (Egyptian Pound)
 * @param amount - Amount to format
 */
export function formatEGP(amount: number): string {
    return `LE ${amount.toFixed(2)} EGP`;
}

/**
 * Sleep/delay utility (use sparingly, prefer Playwright's auto-wait)
 * @param ms - Milliseconds to wait
 */
export async function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get current timestamp
 */
export function getTimestamp(): string {
    return new Date().toISOString();
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
