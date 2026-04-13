// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SearchPage } from '../../pages/SearchPage';
import searchData from '../../data/search.json';

test.describe('Search Functionality', () => {
  test('should find existing products when searching', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    
    const { jacketSearch } = searchData;

    // 1. Navigate to home page
    await homePage.goto();
    await homePage.verifyHomePageLoaded();

    // 2. Enter 'jacket' in search box and click Submit
    await searchPage.search(jacketSearch.keyword);

    // 3. Verify search results page
    await searchPage.verifySearchResultsPageLoaded(jacketSearch.keyword);
    await expect(page.getByText('Showing results for jacket')).toBeVisible();

    // 4. Verify search results display correct products
    await searchPage.verifyMultipleProductsInResults(jacketSearch.expectedProducts);

    // 5. Verify each result shows product image and price
    await searchPage.verifyProductHasImage('Grey jacket');
    await searchPage.verifyProductHasPrice('Grey jacket');
  });
});
