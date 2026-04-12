import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  readonly addToCartButton: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.productTitle = page.locator('h1.product-single__title');
    this.productPrice = page.locator('.product__price');
  }

  async goto(productSlug: string): Promise<void> {
    await this.navigate(`/products/${productSlug}`);
    await this.waitForPageLoad();
  }

  async verifyProductPageLoaded(productName: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async verifyAddToCartButtonVisible(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
  }
}
