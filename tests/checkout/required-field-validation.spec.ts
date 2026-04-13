// spec: Test plan 6.12 - Required field validation
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { NavigationComponent } from '../../pages/components/NavigationComponent';
import productsData from '../../data/products.json';

test.describe('Checkout', () => {
  test('should display validation errors for required fields', async ({ page }) => {
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const navigation = new NavigationComponent(page);

    const { greyJacket } = productsData;

    // 1. Add a product to cart to enable checkout
    await productDetailPage.goto(greyJacket.slug);
    await productDetailPage.addToCart();
    await navigation.verifyCartCount(1);

    // Navigate to cart and proceed to checkout
    await cartPage.goto();
    await cartPage.verifyCartPageLoaded();
    await cartPage.clickCheckout();

    // 2. Verify checkout page loads
    await checkoutPage.verifyCheckoutPageLoaded();

    // 3. Select Netherlands to ensure consistent form fields across environments
    await checkoutPage.selectCountry('Netherlands');

    // 4. Leave required fields empty and click 'Pay now'
    await checkoutPage.clickPayNow();

    // 5. Verify validation errors are displayed
    await checkoutPage.verifyRequiredFieldErrors();

    // 6. Verify user is still on checkout page (did not proceed)
    await checkoutPage.verifyStillOnCheckoutPage();
  });
});
