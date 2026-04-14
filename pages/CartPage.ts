import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartHeading: Locator;
  readonly checkoutButton: Locator;
  readonly cartTotal: Locator;
  readonly updateButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartHeading = page.getByRole('heading', { name: 'My Cart' });
    this.checkoutButton = page.getByRole('button', { name: 'Check Out' });
    this.cartTotal = page.getByRole('heading', { name: /Total/ });
    this.updateButton = page.getByRole('button', { name: 'Update' });
  }

  async goto(): Promise<void> {
    await this.navigate('/cart');
    await this.waitForPageLoad();
  }

  async verifyCartPageLoaded(): Promise<void> {
    await expect(this.cartHeading).toBeVisible();
  }

  async verifyProductInCart(productName: string): Promise<void> {
    await expect(this.page.getByRole('link', { name: new RegExp(productName) })).toBeVisible();
  }

  async verifyCartTotal(expectedTotal: string): Promise<void> {
    await expect(this.cartTotal).toContainText(expectedTotal);
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async updateProductQuantity(productName: string, quantity: number): Promise<void> {
    const productRow = this.page.locator('form .row').filter({ has: this.page.getByRole('link', { name: new RegExp(productName) }) });
    const quantityInput = productRow.getByRole('textbox');
    await quantityInput.clear();
    await quantityInput.fill(quantity.toString());
    await this.updateButton.click();
    await this.waitForPageLoad();
  }

  async verifyMultipleProductsInCart(productNames: string[]): Promise<void> {
    for (const productName of productNames) {
      await this.verifyProductInCart(productName);
    }
  }
}
