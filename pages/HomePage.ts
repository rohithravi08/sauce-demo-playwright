import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly catalogLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Sauce Demo' });
    this.catalogLink = page.getByRole('link', { name: 'Catalog' });
  }

  async goto(): Promise<void> {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async verifyHomePageLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async clickCatalog(): Promise<void> {
    await this.catalogLink.click();
  }
}
