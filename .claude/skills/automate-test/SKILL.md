---
name: automate-test
description: Automate writing Playwright tests from the shopping-flow.md test plan
allowed-tools: Bash(playwright-cli:*) Bash(npx:*) Bash(npm:*) Read Write Edit Glob Grep
---

# Automate Test Writing

Write Playwright tests based on test specifications from `specs/shopping-flow.md`.

## Usage

```
/automate-test <test-number>
```

Example:
```
/automate-test 1.2
/automate-test 2.1
/automate-test 4.1
```

## Workflow

When the user provides a test number (e.g., `1.2`), follow these steps:

### 1. Read the Test Specification

Read `specs/shopping-flow.md` and find the test matching the provided number.

Extract:
- Test title (e.g., "Verify header navigation elements")
- File path (e.g., `tests/home-page/header-navigation.spec.ts`)
- Seed file (e.g., `tests/seed.spec.ts`)
- Test steps with expected outcomes

### 2. Check Existing Page Objects

Look in the `pages/` directory for existing page objects that can be reused or extended:
- `pages/HomePage.ts`
- `pages/BasePage.ts`
- Other relevant page objects

### 3. Use playwright-cli to Explore the Page

```bash
# Open browser and navigate to the page
playwright-cli open <url-from-test-spec>

# Take snapshots to understand page structure
playwright-cli snapshot

# Identify element refs for interactions
playwright-cli snapshot --depth=4
```

### 4. Generate Playwright Code

Use `playwright-cli run-code` to verify elements exist:

```bash
playwright-cli run-code "async (page) => {
  const element = page.getByRole('...', { name: '...' });
  return await element.isVisible();
}"
```

### 5. Update Page Objects (if needed)

If new locators or methods are required, update the appropriate page object in `pages/`.

### 6. Write the Test File

Create the test file at the path specified in the spec (e.g., `tests/home-page/header-navigation.spec.ts`).

Follow this structure:
```typescript
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Test Suite Name', () => {
  test('test description from spec', async ({ page }) => {
    const homePage = new HomePage(page);

    // Step 1: Navigate
    await homePage.goto();

    // Step 2: Verify expectations
    // ... assertions based on spec
  });
});
```

### 7. Run the Test

```bash
npx playwright test <test-file-path> --project=chromium
```

### 8. Update the Spec

Mark the test as automated in `specs/shopping-flow.md`:
```
**Automated:** No  →  **Automated:** Yes
```

### 9. Close Browser

```bash
playwright-cli close
```

## Test Plan Structure Reference

Tests in `specs/shopping-flow.md` are organized by sections:
- **1. Home Page** - Home page tests (1.1, 1.2, 1.3, etc.)
- **2. Product Listing** - Catalog/product listing tests
- **3. Product Detail** - Product detail page tests
- **4. Add to Cart** - Add to cart functionality tests
- **5. Shopping Cart** - Cart management tests
- **6. Checkout Process** - Checkout flow tests
- **7. Search Functionality** - Search tests
- **8. End-to-End Shopping Flow** - E2E tests

## Project Conventions

- Use Page Object Model pattern (`pages/` directory)
- Extend `BasePage` for new page objects
- Use semantic role-based locators (`getByRole`, `getByText`)
- Store test data in `data/` directory as JSON files
- Config is in `config/env.config.ts`
