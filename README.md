# Sauce Demo Playwright

End-to-end test automation framework for [Sauce Demo Shopify](https://sauce-demo.myshopify.com) store using Playwright with Page Object Model design pattern.

## Pre-requisites

- Node.js v20+
- npm v9+
- Allure CLI (optional, for local Allure reports)

## Installation

```bash
npm ci
npx playwright install --with-deps
```

## Running Tests

### Local

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:chromium` | Chromium only |
| `npm run test:firefox` | Firefox only |
| `npm run test:webkit` | WebKit only |
| `npm run test:headed` | Run with browser visible |
| `npm run test:ui` | Playwright UI mode |

### CI/CD

Tests run automatically via GitHub Actions on:
- Pull requests to `main`
- Push/merge to `main`
- Manual trigger from Actions tab

## Test Reporting

### HTML Report
```bash
npm run test:report
```

### Allure Report
```bash
npm run allure:generate
npm run allure:open
```

### CI Reports
Download from **Actions > Workflow run > Artifacts**:
- `playwright-report` - HTML report
- `allure-results` - Allure results
