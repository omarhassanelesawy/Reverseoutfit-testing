# Playwright E2E Testing Framework for reverseoutfit.com

A robust, scalable end-to-end testing framework built with Playwright and TypeScript, following the Page Object Model (POM) design pattern.

## 🚀 Features

- ✅ **Page Object Model (POM)** - Clean, maintainable test architecture
- ✅ **Multi-Browser Support** - Chromium, Firefox, and WebKit
- ✅ **TypeScript** - Type-safe test development
- ✅ **Resilient Tests** - No hard-coded waits, leveraging Playwright's auto-waiting
- ✅ **Video & Trace Recording** - Automatic capture on test failures
- ✅ **HTML Reports** - Beautiful, interactive test reports
- ✅ **Parallel Execution** - Fast test runs with concurrent execution
- ✅ **Retry Logic** - Automatic retries for flaky tests

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository** (if applicable)
   ```bash
   cd playwright-testing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## 📁 Project Structure

```
playwright-testing/
├── pages/                    # Page Object Models
│   ├── BasePage.ts          # Base class with common methods
│   └── HomePage.ts          # Homepage page object
├── tests/                    # Test specifications
│   └── home.spec.ts         # Homepage test suite
├── utils/                    # Utility functions
│   └── helpers.ts           # Helper functions
├── test-results/            # Test execution results
├── playwright-report/       # HTML test reports
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🧪 Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run a specific test file
```bash
npx playwright test tests/home.spec.ts
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

### Run tests with UI mode (interactive)
```bash
npx playwright test --ui
```

## 📊 Viewing Test Reports

### Open the HTML report
```bash
npx playwright show-report
```

### View trace for failed tests
```bash
npx playwright show-trace test-results/[test-name]/trace.zip
```

## 🏗️ Framework Architecture

### BasePage Class
Located in `pages/BasePage.ts`, provides common methods used across all page objects:
- `navigate()` - Navigate to URLs
- `safeClick()` - Click with auto-waiting
- `safeType()` - Type with auto-waiting
- `waitForVisible()` - Wait for element visibility
- `waitForNavigation()` - Wait for navigation events
- `takeScreenshot()` - Capture screenshots

### Page Object Model
Each page of the application has a corresponding page class (e.g., `HomePage.ts`) that:
- Defines locators for page elements
- Encapsulates page interactions
- Provides methods for test actions

### Test Specifications
Test files in `tests/` directory contain:
- Test suites organized by feature/page
- Clear test descriptions
- Arrange-Act-Assert pattern

## ⚙️ Configuration

The framework is configured via `playwright.config.ts`:

- **Base URL**: `https://reverseoutfit.com`
- **Timeout**: 30 seconds per test
- **Browsers**: Chromium, Firefox, WebKit
- **Video**: Recorded on failure only
- **Screenshots**: Captured on failure
- **Trace**: Enabled on first retry
- **Parallel Execution**: Enabled
- **Retries**: 1 retry on failure (2 retries on CI)

## 📝 Writing New Tests

### 1. Create a Page Object

```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
    private readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    }

    async addToCart(): Promise<void> {
        await this.safeClick(this.addToCartButton);
    }
}
```

### 2. Create a Test Spec

```typescript
import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test.describe('Product Tests', () => {
    test('should add product to cart', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.navigate('/products/example');
        await productPage.addToCart();
        // Add assertions
    });
});
```

## 🎯 Best Practices

### ✅ DO's
- Use accessibility-first locators (`getByRole`, `getByLabel`, `getByText`)
- Leverage Playwright's auto-waiting capabilities
- Keep page objects focused and single-responsibility
- Use descriptive test names
- Add comments for complex logic
- Use `test.beforeEach()` for common setup

### ❌ DON'Ts
- Avoid `waitForTimeout()` - use Playwright's smart waits
- Don't use brittle CSS selectors when accessibility locators work
- Don't put business logic in test files
- Avoid hard-coded test data where possible

## 🐛 Debugging

### Common Commands
```bash
# Run with trace viewer
npx playwright test --trace on

# Run in debug mode with inspector
npx playwright test --debug

# Run specific test in debug mode
npx playwright test tests/home.spec.ts:27 --debug

# Generate and show trace
npx playwright show-trace trace.zip
```

### Tips
- Use `page.pause()` to pause test execution
- Check screenshots in `test-results/` folder
- Review videos for visual debugging
- Use trace viewer for detailed timeline analysis

## 📈 Test Results

Current test status:
- **Chromium**: ✅ 5/5 passing (100%)
- **Firefox**: ✅ 4/5 passing (80%)
- **WebKit**: ⚠️ Variable results

See [walkthrough.md](file:///C:/Users/omarh/.gemini/antigravity/brain/a0fee7e5-9a19-4bcb-9850-f9218120ccd6/walkthrough.md) for detailed test results and debugging history.

## 🔧 Troubleshooting

### Tests timeout
- Check network connectivity
- Verify base URL is accessible
- Consider increasing timeout in config
- Check for third-party widgets blocking page load

### Locator not found
- Use `page.locator().highlight()` to visualize
- Check element exists in DOM
- Verify element isn't in iframe
- Use Playwright Inspector for debugging

### Flaky tests
- Avoid race conditions
- Use proper wait strategies
- Check for animation/transition issues
- Review network requests

## 🤝 Contributing

To add new tests:
1. Create page objects in `pages/` directory
2. Add test specs in `tests/` directory
3. Follow existing naming conventions
4. Ensure tests pass locally before committing
5. Run `npx playwright test` to verify

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 📄 License

This project is for educational and testing purposes.

---

**Happy Testing! 🎭**
