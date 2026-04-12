import { Page } from '@playwright/test';
import { config } from '../config/env.config';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string = ''): Promise<void> {
    const url = `${config.baseURL}${path}`;
    await this.page.goto(url);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png` });
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
