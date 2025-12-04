import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

/**
 * Happy Path E2E Tests for reverseoutfit.com Homepage
 * 
 * Test Suite covering:
 * 1. Homepage load verification
 * 2. Navigation interactions
 * 3. Product browsing
 * 
 * All tests use Page Object Model pattern and Playwright's auto-waiting
 */

test.describe('reverseoutfit.com - Happy Path Tests', () => {
    let homePage: HomePage;

    // Setup before each test
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    /**
     * Test 1: Verify homepage loads correctly
     */
    test('should load homepage with all key elements visible', async () => {
        // Verify page title
        const title = await homePage.verifyTitle();
        expect(title).toContain('Reverse');

        // Verify homepage is loaded
        const isLoaded = await homePage.isLoaded();
        expect(isLoaded).toBe(true);

        // Verify navigation menu is visible
        const isNavVisible = await homePage.isNavigationVisible();
        expect(isNavVisible).toBe(true);

        // Verify featured products section is visible
        const isFeaturedVisible = await homePage.isFeaturedProductsSectionVisible();
        expect(isFeaturedVisible).toBe(true);

        // Verify there are featured products displayed
        const productsCount = await homePage.getFeaturedProductsCount();
        expect(productsCount).toBeGreaterThan(0);
    });

    /**
     * Test 2: Navigate to Men category and verify products load
     */
    test('should navigate to Men category and display products', async ({ page }) => {
        // Click on Men category
        await homePage.clickMenCategory();

        // Verify URL changed to men's collection
        expect(page.url()).toContain('collections');

        // Wait for page to load with domcontentloaded to ensure products are loaded
        await page.waitForLoadState('domcontentloaded');

        // Verify products or headings are visible on the collection page
        // Using flexible locator that works for category pages
        const categoryHeading = page.locator('h1, h2, [class*="heading"]').first();
        await expect(categoryHeading).toBeVisible({ timeout: 10000 });
    });

    /**
     * Test 3: Click on featured product and verify product page loads
     */
    test('should click on featured product and view product details', async ({ page }) => {
        // Get product names before clicking
        const productNames = await homePage.getFeaturedProductNames();
        expect(productNames.length).toBeGreaterThan(0);

        // Click on first featured product
        await homePage.clickFirstFeaturedProduct();

        // Verify navigation to product detail page
        expect(page.url()).toContain('/products/');

        // Wait for product detail page to load
        await page.waitForLoadState('domcontentloaded');

        // Verify product details are visible
        // Product pages typically have these elements
        const productTitle = page.locator('h1, [class*="product-title"], [class*="product__title"]').first();
        await expect(productTitle).toBeVisible({ timeout: 10000 });

        // Verify price is displayed
        const price = page.locator('[class*="price"]').first();
        await expect(price).toBeVisible();
    });

    /**
     * Test 4: Verify navigation to Bundle Offers
     */
    test('should navigate to Bundle Offers page', async ({ page }) => {
        // Click on Bundle Offers
        await homePage.clickBundleOffers();

        // Verify URL contains bundle-offers
        expect(page.url()).toContain('bundle-offers');

        // Wait for page load
        await page.waitForLoadState('domcontentloaded');

        // Verify page has loaded with content
        const content = page.locator('body');
        await expect(content).toBeVisible();
    });

    /**
     * Test 5: Complete user journey - Browse and view product
     * This test demonstrates resilience with complex interactions
     */
    test('complete user journey: homepage → category → product details', async ({ page }) => {
        // Step 1: Verify we're on homepage
        const isLoaded = await homePage.isLoaded();
        expect(isLoaded).toBe(true);

        // Step 2: Check products count
        const initialProductsCount = await homePage.getFeaturedProductsCount();
        expect(initialProductsCount).toBeGreaterThan(0);

        // Step 3: Navigate to Women category
        await homePage.clickWomenCategory();
        expect(page.url()).toContain('collections');

        // Wait for category page to stabilize
        await page.waitForLoadState('domcontentloaded');

        // Step 4: Go back to homepage
        await homePage.goto();

        // Step 5: Verify homepage loads again
        const isReloaded = await homePage.isLoaded();
        expect(isReloaded).toBe(true);

        // Step 6: Click on featured product
        await homePage.clickFirstFeaturedProduct();

        // Step 7: Verify product page
        expect(page.url()).toContain('/products/');

        const productTitle = page.locator('h1').first();
        await expect(productTitle).toBeVisible({ timeout: 10000 });
    });
});
