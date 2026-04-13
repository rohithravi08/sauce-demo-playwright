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
  test('should complete shopping journey with multiple products', async ({ page }) => {
    const homePage = new HomePage(page);
    const productListingPage = new ProductListingPage(page);
    const productDetailPage = new ProductDetailPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const navigation = new NavigationComponent(page);

    const { greyJacket, noirJacket, multipleProductsTest } = productsData;
    const { contact, delivery } = checkoutData;

    // Step 1: Navigate to home page
    await homePage.goto();
    await homePage.verifyHomePageLoaded();

    // Step 2: Browse catalog and add Grey jacket to cart
    await homePage.clickCatalog();
    await productListingPage.verifyProductsPageLoaded();
    await productListingPage.clickProduct(greyJacket.name);
    await productDetailPage.verifyProductPageLoaded(greyJacket.name);
    await productDetailPage.addToCart();
    await navigation.verifyCartCount(1);

    // Step 3: Browse catalog and add Noir jacket to cart
    await productListingPage.goto();
    await productListingPage.clickProduct(noirJacket.name);
    await productDetailPage.verifyProductPageLoaded(noirJacket.name);
    await productDetailPage.addToCart();
    await navigation.verifyCartCount(2);

    // Step 4: Navigate to cart
    await navigation.clickCheckOut();
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyMultipleProductsInCart([greyJacket.name, noirJacket.name]);

    // Step 5: Update Grey jacket quantity to 2
    await cartPage.updateProductQuantity(greyJacket.name, multipleProductsTest.greyJacketQuantity);
    await cartPage.verifyCartTotal(multipleProductsTest.expectedTotal);

    // Step 6: Proceed to checkout
    await cartPage.clickCheckout();
    await checkoutPage.verifyCheckoutPageLoaded();

    // Step 7: Complete checkout form
    await checkoutPage.fillEmail(contact.email);
    await checkoutPage.fillDeliveryInfo(delivery);

    // Step 8: Verify order summary
    await checkoutPage.verifyProductInOrderSummary(greyJacket.name);
    await checkoutPage.verifyProductInOrderSummary(noirJacket.name);
    await checkoutPage.verifyOrderTotal(multipleProductsTest.expectedTotal);
  });
});
