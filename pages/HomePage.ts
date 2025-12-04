import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage - Page Object Model for reverseoutfit.com homepage
 * 
 * Encapsulates all locators and actions for the home page
 */
export class HomePage extends BasePage {
    // Locators using accessibility-first approach
    private readonly logo: Locator;
    private readonly menMenu: Locator;
    private readonly womenMenu: Locator;
    private readonly bundleOffersMenu: Locator;
    private readonly aboutUsMenu: Locator;
    private readonly contactMenu: Locator;
    private readonly featuredProductsSection: Locator;
    private readonly featuredProductsHeading: Locator;
    private readonly productCards: Locator;
    private readonly firstProduct: Locator;
    private readonly shopNowSection: Locator;

    constructor(page: Page) {
        super(page);

        // Navigation menu items
        this.logo = page.getByRole('link', { name: 'Home' }).first();
        this.menMenu = page.getByRole('button', { name: 'Men', exact: true });
        this.womenMenu = page.getByRole('button', { name: 'Women', exact: true });
        this.bundleOffersMenu = page.locator('header').getByRole('link', { name: 'Bundle Offers' });
        this.aboutUsMenu = page.getByRole('link', { name: 'About Us' });
        this.contactMenu = page.getByRole('link', { name: 'Contact' });

        // Featured products section
        this.featuredProductsHeading = page.getByRole('heading', { name: /Featured products/i });
        this.featuredProductsSection = page.locator('section, div').filter({ has: this.featuredProductsHeading });

        // Product cards - looking for product links within the featured products section
        // The products are in a list with role="list" and aria-label="Slider"
        this.productCards = page.getByRole('list', { name: 'Slider' }).locator('li');
        this.firstProduct = this.productCards.first();

        // Shop section
        this.shopNowSection = page.locator('section').filter({ hasText: 'Our shop' });
    }

    /**
     * Navigate to homepage
     */
    async goto(): Promise<void> {
        await this.navigate('/');
        // Using 'load' instead of 'networkidle' to avoid timeout issues with third-party widgets
        await this.waitForLoadState('load');
    }

    /**
     * Verify homepage has loaded correctly
     * @returns true if all key elements are visible
     */
    async isLoaded(): Promise<boolean> {
        try {
            // Wait for key elements to be visible
            await this.waitForVisible(this.logo);
            await this.waitForVisible(this.menMenu);
            await this.waitForVisible(this.featuredProductsHeading);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Verify the page title
     */
    async verifyTitle(): Promise<string> {
        return await this.getTitle();
    }

    /**
     * Check if navigation menu is visible
     */
    async isNavigationVisible(): Promise<boolean> {
        const isLogoVisible = await this.isVisible(this.logo);
        const isMenVisible = await this.isVisible(this.menMenu);
        const isWomenVisible = await this.isVisible(this.womenMenu);

        return isLogoVisible && isMenVisible && isWomenVisible;
    }

    /**
     * Check if featured products section is visible
     */
    async isFeaturedProductsSectionVisible(): Promise<boolean> {
        return await this.isVisible(this.featuredProductsHeading);
    }

    /**
     * Get count of featured products
     */
    async getFeaturedProductsCount(): Promise<number> {
        await this.waitForVisible(this.productCards.first());
        return await this.productCards.count();
    }

    /**
     * Click on Men category
     */
    async clickMenCategory(): Promise<void> {
        // Navigate directly to men's collection since the header is a dropdown
        await this.navigate('/collections/men');
        await this.waitForLoadState('load');
    }

    /**
     * Click on Women category
     */
    async clickWomenCategory(): Promise<void> {
        // Navigate directly to women's collection since the header is a dropdown
        await this.navigate('/collections/women');
        await this.waitForLoadState('load');
    }

    /**
     * Click on Bundle Offers
     */
    async clickBundleOffers(): Promise<void> {
        await this.waitForNavigation(async () => {
            await this.safeClick(this.bundleOffersMenu);
        });
    }

    /**
     * Click on first featured product
     */
    async clickFirstFeaturedProduct(): Promise<void> {
        await this.scrollToElement(this.firstProduct);
        await this.waitForVisible(this.firstProduct);

        // Get the product link within the card
        const productLink = this.firstProduct.getByRole('link').first();

        await this.waitForNavigation(async () => {
            await this.safeClick(productLink);
        });
    }

    /**
     * Get all featured product names
     */
    async getFeaturedProductNames(): Promise<string[]> {
        const products = await this.productCards.all();
        const names: string[] = [];

        for (const product of products) {
            const link = product.getByRole('link').first();
            const name = await link.textContent();
            if (name) {
                names.push(name.trim());
            }
        }

        return names;
    }

    /**
     * Navigate to About Us page
     */
    async goToAboutUs(): Promise<void> {
        await this.waitForNavigation(async () => {
            await this.safeClick(this.aboutUsMenu);
        });
    }

    /**
     * Navigate to Contact page
     */
    async goToContact(): Promise<void> {
        await this.waitForNavigation(async () => {
            await this.safeClick(this.contactMenu);
        });
    }

    /**
     * Search for a specific product (if search functionality exists)
     * This is a placeholder for future enhancement
     */
    async searchProduct(productName: string): Promise<void> {
        // Search functionality to be implemented if available on the site
        console.log(`Search functionality not yet implemented for: ${productName}`);
    }
}
