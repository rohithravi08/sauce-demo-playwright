# 🎭 Playwright Automation Framework — Task Plan
**Target:** https://sauce-demo.myshopify.com  
**Stack:** TypeScript · Playwright · Allure + HTML Reports · GitHub Actions · Slack Notifications

---

## 📋 Task Overview

| ID | Title | Phase |
|----|-------|-------|
| T01 | Initialize Playwright TypeScript project | 🏗 Scaffolding |
| T02 | Create folder structure | 🏗 Scaffolding |
| T03 | Create environment config file | 🏗 Scaffolding |
| T04 | Add .gitignore file | 🏗 Scaffolding |
| T05 | Create BasePage class | 🧩 POM |
| T06 | Create HomePage page object | 🧩 POM |
| T07 | Create ProductListingPage page object | 🧩 POM |
| T08 | Create ProductDetailPage page object | 🧩 POM |
| T09 | Create CartPage page object | 🧩 POM |
| T10 | Create CheckoutPage page object | 🧩 POM |
| T11 | Create NavigationComponent page object | 🧩 POM |
| T12 | Create test data JSON files | 📦 Data |
| T13 | Create data loader utility | 📦 Data |
| T14 | Write Home Page tests | 🧪 Tests |
| T15 | Write Product Listing tests | 🧪 Tests |
| T16 | Write Product Detail Page tests | 🧪 Tests |
| T17 | Write Cart tests | 🧪 Tests |
| T18 | Write Checkout flow tests | 🧪 Tests |
| T19 | Write Search tests | 🧪 Tests |
| T20 | Configure Playwright HTML reporter | 📊 Reporting |
| T21 | Configure Allure reporter | 📊 Reporting |
| T22 | GitHub Actions workflow — PRs | ⚙️ CI/CD |
| T23 | GitHub Actions workflow — main + Slack | ⚙️ CI/CD |
| T24 | Write README.md | 📝 Docs |

---

## 🏗 Phase 1 — Project Scaffolding & Configuration

### T01 · Initialize Playwright TypeScript project
Run `npm init playwright@latest`, select TypeScript. Configure `playwright.config.ts` with:
- `baseURL` read from `process.env.BASE_URL`
- Browsers: Chromium, Firefox, WebKit
- Screenshots and videos captured on failure

**Files:** `playwright.config.ts`, `package.json`, `tsconfig.json`

---

### T02 · Create folder structure
```
├── tests/                  # Test spec files
├── pages/                  # Page Object Model classes
│   └── components/         # Shared UI components (nav, header, etc.)
├── data/                   # JSON test data files
├── config/                 # Environment config (env.config.ts)
├── utils/                  # Helpers: data loader, custom assertions
├── reports/                # Generated reports (gitignored)
└── .github/
    └── workflows/          # GitHub Actions YAML files
```

---

### T03 · Create environment config file
Create `config/env.config.ts` that exports `BASE_URL`, credentials, and timeouts from `process.env`.

**Files:** `config/env.config.ts`, `.env.example`

✅ `BASE_URL` must never be hardcoded in tests or page objects  
✅ Real `.env` must be in `.gitignore`

---

### T04 · Add .gitignore file
**Entries to include:**
```
node_modules/
.env
playwright-report/
allure-results/
allure-report/
test-results/
dist/
*.log
```

---

## 🧩 Phase 2 — Page Object Model

### T05 · BasePage class
`pages/BasePage.ts` — shared methods for all pages:
- `navigate()`, `waitForPageLoad()`, `getTitle()`, `takeScreenshot()`
- All page objects must extend this class

---

### T06 · HomePage
`pages/HomePage.ts` — hero banner, nav menu, featured products, search bar

### T07 · ProductListingPage
`pages/ProductListingPage.ts` — product cards, filters, sort options, pagination, add-to-cart from listing

### T08 · ProductDetailPage
`pages/ProductDetailPage.ts` — title, price, variant selectors, quantity input, add-to-cart, images

### T09 · CartPage
`pages/CartPage.ts` — cart items, quantity update, remove item, subtotal, proceed to checkout

### T10 · CheckoutPage
`pages/CheckoutPage.ts` — contact info, shipping address, shipping method, payment fields, order summary, place order

### T11 · NavigationComponent
`pages/components/NavigationComponent.ts` — logo, nav links, cart icon + count, search, account

---

## 📦 Phase 3 — Test Data

### T12 · Create JSON data files

**`data/users.json`**
```json
{
  "validUser": { "email": "test@example.com", "password": "Password123" },
  "invalidUser": { "email": "wrong@example.com", "password": "wrongpass" }
}
```

**`data/products.json`**
```json
{
  "featuredProduct": { "name": "Example Product", "expectedPrice": "$29.99" },
  "searchKeyword": "shirt"
}
```

**`data/checkout.json`**
```json
{
  "shippingAddress": {
    "firstName": "John", "lastName": "Doe",
    "address": "123 Main St", "city": "Amsterdam",
    "country": "Netherlands", "zip": "1000AA"
  }
}
```

**`data/search.json`** — valid and invalid search terms

---

### T13 · Data loader utility
`utils/dataLoader.ts` — generic, strongly typed JSON reader:
```ts
loadData<T>(filename: string): T
```
Throws a descriptive error if file is not found.

---

## 🧪 Phase 4 — Tests

### T14 · Home Page tests (`tests/homePage.spec.ts`)
- Page loads with correct title
- Navigation menu items visible
- Featured products section displayed
- Logo links back to home

### T15 · Product Listing tests (`tests/productListing.spec.ts`)
- Products listed on collection page
- Sort by price low-to-high works
- Clicking product navigates to PDP
- Cards display name and price

### T16 · Product Detail Page tests (`tests/productDetail.spec.ts`)
- Product title and price displayed
- Add to cart button visible and clickable
- Cart count increments after add
- Product images load correctly

### T17 · Cart tests (`tests/cart.spec.ts`)
- Item added from PDP appears in cart
- Cart item count updates
- Item can be removed
- Subtotal reflects correct amount
- Empty cart shows appropriate message

### T18 · Checkout flow tests (`tests/checkout.spec.ts`)
- Checkout page loads from cart
- Contact info fields accept input
- Shipping address can be filled (from `checkout.json`)
- Shipping method can be selected
- Order summary shows correct items and total

### T19 · Search tests (`tests/search.spec.ts`)
- Valid keyword returns relevant results
- No results shows appropriate message
- Search accessible from navigation

---

## 📊 Phase 5 — Reporting

### T20 · Playwright HTML Reporter
- Enable built-in HTML reporter in `playwright.config.ts`
- Output folder: `playwright-report/`
- Add npm script: `test:report` → `playwright show-report`

### T21 · Allure Reporter
- Install: `allure-playwright`, `allure-commandline`
- Configure in `playwright.config.ts`
- Add test annotations: `@epic`, `@feature`, `@story`
- npm scripts:
  - `allure:generate` → `allure generate allure-results --clean -o allure-report`
  - `allure:open` → `allure open allure-report`

---

## ⚙️ Phase 6 — GitHub Actions CI/CD

### T22 · PR Workflow (`.github/workflows/playwright-pr.yml`)
**Trigger:** `pull_request` on any branch

Steps:
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Run Playwright tests
5. Upload HTML report as GitHub artifact

✅ Workflow fails the PR if any test fails

---

### T23 · Main Branch Workflow + Slack (`.github/workflows/playwright-main.yml`)
**Trigger:** `push` to `main`

Same steps as PR workflow, plus:
- Send Slack notification via `slackapi/slack-github-action`
- Message includes: ✅/❌ status, GitHub run URL, branch name
- `SLACK_WEBHOOK_URL` stored as a GitHub Actions secret

**Required GitHub secrets:**
| Secret | Description |
|--------|-------------|
| `SLACK_WEBHOOK_URL` | Incoming webhook URL from your Slack app |

---

## 📝 Phase 7 — Documentation

### T24 · README.md

Sections to include:
1. Project Overview
2. Tech Stack
3. Folder Structure
4. Prerequisites
5. Installation
6. Running Tests (all browsers, single file, headed mode)
7. Viewing Reports (HTML + Allure)
8. Environment Variables
9. CI/CD Setup
10. Slack Notifications Setup

---

## 📦 npm Scripts Summary

| Script | Command |
|--------|---------|
| `test` | `playwright test` |
| `test:headed` | `playwright test --headed` |
| `test:ui` | `playwright test --ui` |
| `test:report` | `playwright show-report` |
| `allure:generate` | `allure generate allure-results --clean -o allure-report` |
| `allure:open` | `allure open allure-report` |

---

## 🗂 Suggested Execution Order for Playwright Agent

```
T01 → T02 → T03 → T04 → T05 → T06 → T07 → T08 → T09 → T10 → T11
→ T12 → T13 → T14 → T15 → T16 → T17 → T18 → T19
→ T20 → T21 → T22 → T23 → T24
```
