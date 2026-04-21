// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Home Page', () => {
  test('should verify home page loads correctly', async ({ page }) => {
    const homePage = new HomePage(page);

    // 1. Navigate to home page
    await homePage.goto();

    // Verify page title should be 'Sauce Demo'
    await homePage.verifyPageTitle('Sauce Demo');

    // Verify site logo should be visible
    await homePage.verifyLogoVisible();

    // Verify heading 'Sauce Demo' should be visible
    await homePage.verifyHomePageLoaded();

    // Verify tagline 'Just a demo site showing off what Sauce can do.' should be displayed
    await homePage.verifyTaglineVisible();

    // Verify main navigation menu should be visible with links:
    // Home, Catalog, Blog, About Us, Wish list, Refer a friend
    await homePage.verifyMainNavigationLinks();
  });
});
