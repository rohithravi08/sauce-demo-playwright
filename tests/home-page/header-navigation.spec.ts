// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Home Page', () => {
  test('should verify header navigation elements', async ({ page }) => {
    const homePage = new HomePage(page);

    // 1. Navigate to the home page
    await homePage.goto();

    // Verify home page loads successfully
    await homePage.verifyHomePageLoaded();

    // 2. Verify all header elements are present
    // - Search box with placeholder 'Search'
    // - Search submit button
    // - Navigation links: Search, About Us, Log In, Sign up
    // - Cart link 'My Cart (0)'
    // - Check Out link
    await homePage.verifyHeaderNavigationElements();
  });
});
