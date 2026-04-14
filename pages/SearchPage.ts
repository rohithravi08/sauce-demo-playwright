import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchSubmitButton: Locator;
  readonly searchResultsHeading: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.searchSubmitButton = page.getByRole('button', { name: 'Submit' });
    this.searchResultsHeading = page.locator('h1');
    this.productCards = page.locator('.product-card, .product-index');
  }

  async search(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.searchSubmitButton.click();
    await this.waitForPageLoad();
  }

  async verifySearchResultsPageLoaded(keyword: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`search.*q=${keyword}`, 'i'));
  }

  async verifyResultsCount(expectedText: string): Promise<void> {
    await expect(this.page.getByText(expectedText)).toBeVisible();
  }

  async verifyProductInResults(productName: string): Promise<void> {
    await expect(this.page.getByRole('link', { name: new RegExp(productName, 'i') })).toBeVisible();
  }

  async verifyMultipleProductsInResults(productNames: string[]): Promise<void> {
    for (const productName of productNames) {
      await this.verifyProductInResults(productName);
    }
  }

  async verifyProductHasPrice(productName: string): Promise<void> {
    const productLink = this.page.getByRole('link', { name: new RegExp(productName, 'i') });
    const priceHeading = productLink.getByRole('heading', { level: 4 });
    await expect(priceHeading).toBeVisible();
    await expect(priceHeading).toContainText('£');
  }

  async verifyProductHasImage(productName: string): Promise<void> {
    const productLink = this.page.getByRole('link', { name: new RegExp(productName, 'i') });
    const productImage = productLink.locator('img').first();
    await expect(productImage).toBeVisible();
  }
}
