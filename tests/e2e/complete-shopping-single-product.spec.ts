import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductListingPage } from '../../pages/ProductListingPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { NavigationComponent } from '../../pages/components/NavigationComponent';
import productsData from '../../data/products.json';
import checkoutData from '../../data/checkout.json';

test.describe('End-to-End Shopping Flow', () => {
  test('should complete shopping journey with single product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productListingPage = new ProductListingPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const navigation = new NavigationComponent(page);

    const { greyJacket } = productsData;
    const { contact, delivery } = checkoutData;

    // Step 1: Navigate to home page
    await homePage.goto();
    await homePage.verifyHomePageLoaded();

    // Step 2: Click on Catalog link
    await homePage.clickCatalog();
    await productListingPage.verifyProductsPageLoaded();

    // Step 3: Click on Grey jacket product
    await productListingPage.clickProduct(greyJacket.name);
    await productDetailPage.verifyProductPageLoaded(greyJacket.name);

    // Step 4: Click 'Add to Cart' button
    await productDetailPage.addToCart();
    await navigation.verifyCartCount(1);

    // Step 5: Click 'Check Out' in header
    await navigation.clickCheckOut();
    await cartPage.verifyCartPageLoaded();

    // Step 6: Verify cart contents and click 'Check Out' button
    await cartPage.verifyProductInCart(greyJacket.name);
    await cartPage.clickCheckout();
    await checkoutPage.verifyCheckoutPageLoaded();

    // Step 7: Fill in contact information
    await checkoutPage.fillEmail(contact.email);

    // Step 8: Fill in delivery information
    await checkoutPage.fillDeliveryInfo(delivery);

    // Step 9: Verify order summary shows correct product and total
    await checkoutPage.verifyProductInOrderSummary(greyJacket.name);
    await checkoutPage.verifyOrderTotal(greyJacket.price);
  });
});
