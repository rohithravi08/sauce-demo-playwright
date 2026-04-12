import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class NavigationComponent extends BasePage {
  readonly cartLink: Locator;
  readonly checkOutLink: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    super(page);
    this.cartLink = page.getByRole('link', { name: /My Cart/ });
    this.checkOutLink = page.getByRole('link', { name: 'Check Out' });
    this.cartCount = page.locator('.cart-link');
  }

  async clickCheckOut(): Promise<void> {
    await this.checkOutLink.click();
  }

  async verifyCartCount(count: number): Promise<void> {
    await expect(this.cartLink).toContainText(`My Cart (${count})`);
  }

  async clickCart(): Promise<void> {
    await this.cartLink.click();
  }
}
