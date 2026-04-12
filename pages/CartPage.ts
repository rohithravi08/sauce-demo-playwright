import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartHeading: Locator;
  readonly checkoutButton: Locator;
  readonly cartTotal: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.cartHeading = page.getByRole('heading', { name: 'My Cart' });
    this.checkoutButton = page.getByRole('button', { name: 'Check Out' });
    this.cartTotal = page.locator('.cart__subtotal');
    this.emptyCartMessage = page.getByText('Your cart is currently empty');
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
}
