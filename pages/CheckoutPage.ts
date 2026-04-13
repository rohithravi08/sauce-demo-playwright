import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

interface DeliveryInfo {
  country?: string;
  firstName?: string;
  lastName: string;
  company?: string;
  address: string;
  apartment?: string;
  postalCode: string;
  city: string;
  phone?: string;
}

export class CheckoutPage extends BasePage {
  readonly checkoutHeading: Locator;
  readonly emailInput: Locator;
  readonly countrySelect: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly apartmentInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cityInput: Locator;
  readonly phoneInput: Locator;
  readonly orderSummary: Locator;
  readonly payNowButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutHeading = page.getByRole('heading', { name: 'Sauce Demo Checkout' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.countrySelect = page.getByRole('combobox', { name: 'Country/Region' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name' });
    this.companyInput = page.getByRole('textbox', { name: 'Company' });
    this.addressInput = page.getByRole('combobox', { name: 'Address' });
    this.apartmentInput = page.getByRole('textbox', { name: 'Apartment' });
    this.postalCodeInput = page.getByRole('textbox', { name: 'Postal code' });
    this.cityInput = page.getByRole('textbox', { name: 'City' });
    this.phoneInput = page.getByRole('textbox', { name: 'Phone' });
    this.orderSummary = page.locator('[data-order-summary]');
    this.payNowButton = page.getByRole('button', { name: 'Pay now' });
  }

  async verifyCheckoutPageLoaded(): Promise<void> {
    await expect(this.emailInput).toBeVisible();
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillDeliveryInfo(info: DeliveryInfo): Promise<void> {
    if (info.country) {
      await this.countrySelect.selectOption(info.country);
    }
    if (info.firstName) {
      await this.firstNameInput.fill(info.firstName);
    }
    await this.lastNameInput.fill(info.lastName);
    if (info.company) {
      await this.companyInput.fill(info.company);
    }
    await this.addressInput.fill(info.address);
    if (info.apartment) {
      await this.apartmentInput.fill(info.apartment);
    }
    await this.postalCodeInput.fill(info.postalCode);
    await this.cityInput.fill(info.city);
    if (info.phone) {
      await this.phoneInput.fill(info.phone);
    }
  }

  async verifyProductInOrderSummary(productName: string): Promise<void> {
    await expect(this.page.getByText(productName).first()).toBeVisible();
  }

  async verifyOrderTotal(expectedTotal: string): Promise<void> {
    await expect(this.page.getByText(expectedTotal).first()).toBeVisible();
  }

  async clickPayNow(): Promise<void> {
    await this.payNowButton.click();
  }

  async verifyValidationErrorDisplayed(fieldName: string): Promise<void> {
    const errorMessage = this.page.locator(`[id*="${fieldName}"] ~ *`).filter({ hasText: /required|enter|invalid/i }).first();
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
  }

  async verifyFieldHasError(field: Locator): Promise<void> {
    await expect(field).toHaveAttribute('aria-invalid', 'true');
  }

  async verifyRequiredFieldErrors(): Promise<void> {
    // Wait for validation to complete by checking the first field
    // This ensures all validation has been triggered before checking other fields
    await expect(this.emailInput).toHaveAttribute('aria-invalid', 'true', { timeout: 10000 });
    await expect(this.lastNameInput).toHaveAttribute('aria-invalid', 'true');
    await expect(this.addressInput).toHaveAttribute('aria-invalid', 'true');
    await expect(this.postalCodeInput).toHaveAttribute('aria-invalid', 'true');
    await expect(this.cityInput).toHaveAttribute('aria-invalid', 'true');
  }

  async verifyStillOnCheckoutPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout/);
    await expect(this.payNowButton).toBeVisible();
  }
}
