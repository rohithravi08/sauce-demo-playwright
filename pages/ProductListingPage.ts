import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductListingPage extends BasePage {
  readonly productsHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.productsHeading = page.getByRole('heading', { name: 'Products' });
  }

  async goto(): Promise<void> {
    await this.navigate('/collections/all');
    await this.waitForPageLoad();
  }

  async verifyProductsPageLoaded(): Promise<void> {
    await expect(this.productsHeading).toBeVisible();
  }

  async clickProduct(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: productName }).first().click();
  }
}
