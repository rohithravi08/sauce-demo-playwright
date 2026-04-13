import { test } from '@playwright/test';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { NavigationComponent } from '../../pages/components/NavigationComponent';
import productsData from '../../data/products.json';

test.describe('Add to Cart', () => {
  test('should not allow adding sold out product to cart', async ({ page }) => {
    const productDetailPage = new ProductDetailPage(page);
    const navigation = new NavigationComponent(page);

    const { brownShades } = productsData;

    // 1. Navigate to /products/brown-shades (sold out product)
    await productDetailPage.goto(brownShades.slug);
    await productDetailPage.verifyProductPageLoaded(brownShades.name);

    // 2. Verify 'Sold Out' button state
    await productDetailPage.verifySoldOutButtonVisible();
    await productDetailPage.verifySoldOutButtonDisabled();
    await productDetailPage.verifyAddToCartButtonNotVisible();

    // 3. Verify cart remains unchanged
    await navigation.verifyCartCount(0);
  });
});
