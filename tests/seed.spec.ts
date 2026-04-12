import { test } from '@playwright/test';

test.describe('Seed', () => {
  test('navigate to home page', async ({ page }) => {
    await page.goto('https://sauce-demo.myshopify.com');
  });
});
