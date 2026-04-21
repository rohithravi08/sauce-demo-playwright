import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly heading: Locator;
  readonly logo: Locator;
  readonly tagline: Locator;
  readonly mainNavigation: Locator;
  readonly catalogLink: Locator;

  // Navigation links (main menu)
  readonly homeLink: Locator;
  readonly blogLink: Locator;
  readonly aboutUsLink: Locator;
  readonly wishListLink: Locator;
  readonly referFriendLink: Locator;

  // Header elements
  readonly banner: Locator;
  readonly searchBox: Locator;
  readonly searchSubmitButton: Locator;
  readonly headerSearchLink: Locator;
  readonly headerAboutUsLink: Locator;
  readonly logInLink: Locator;
  readonly signUpLink: Locator;
  readonly cartLink: Locator;
  readonly checkOutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Sauce Demo', level: 1 });
    this.logo = page.getByRole('img', { name: 'Sauce Demo' });
    this.tagline = page.getByRole('heading', { name: 'Just a demo site showing off what Sauce can do.', level: 3 });
    this.mainNavigation = page.locator('#main-menu');

    // Navigation links within main menu
    this.homeLink = this.mainNavigation.getByRole('link', { name: 'Home', exact: true });
    this.catalogLink = this.mainNavigation.getByRole('link', { name: 'Catalog', exact: true });
    this.blogLink = this.mainNavigation.getByRole('link', { name: 'Blog', exact: true });
    this.aboutUsLink = this.mainNavigation.getByRole('link', { name: 'About Us', exact: true });
    this.wishListLink = this.mainNavigation.getByRole('link', { name: 'Wish list', exact: true });
    this.referFriendLink = this.mainNavigation.getByRole('link', { name: 'Refer a friend', exact: true });

    // Header elements
    this.banner = page.getByRole('banner');
    this.searchBox = page.getByRole('textbox', { name: 'Search' });
    this.searchSubmitButton = page.getByRole('button', { name: 'Submit' });
    this.headerSearchLink = this.banner.getByRole('link', { name: 'Search', exact: true });
    this.headerAboutUsLink = this.banner.getByRole('link', { name: 'About Us', exact: true });
    this.logInLink = this.banner.getByRole('link', { name: 'Log In', exact: true });
    this.signUpLink = this.banner.getByRole('link', { name: 'Sign up', exact: true });
    this.cartLink = page.getByRole('link', { name: /My Cart \(\d+\)/ });
    this.checkOutLink = this.banner.getByRole('link', { name: 'Check Out', exact: true });
  }

  async goto(): Promise<void> {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async verifyHomePageLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyLogoVisible(): Promise<void> {
    await expect(this.logo).toBeVisible();
  }

  async verifyTaglineVisible(): Promise<void> {
    await expect(this.tagline).toBeVisible();
  }

  async verifyMainNavigationLinks(): Promise<void> {
    await expect(this.homeLink).toBeVisible();
    await expect(this.catalogLink).toBeVisible();
    await expect(this.blogLink).toBeVisible();
    await expect(this.aboutUsLink).toBeVisible();
    await expect(this.wishListLink).toBeVisible();
    await expect(this.referFriendLink).toBeVisible();
  }

  async clickCatalog(): Promise<void> {
    await this.catalogLink.click();
  }

  async verifyHeaderNavigationElements(): Promise<void> {
    // Search box with placeholder 'Search'
    await expect(this.searchBox).toBeVisible();
    await expect(this.searchBox).toHaveAttribute('placeholder', 'Search');

    // Search submit button
    await expect(this.searchSubmitButton).toBeVisible();

    // Header navigation links: Search, About Us, Log In, Sign up
    await expect(this.headerSearchLink).toBeVisible();
    await expect(this.headerAboutUsLink).toBeVisible();
    await expect(this.logInLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();

    // Cart link 'My Cart (0)'
    await expect(this.cartLink).toBeVisible();

    // Check Out link
    await expect(this.checkOutLink).toBeVisible();
  }
}
