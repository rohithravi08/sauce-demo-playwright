# Sauce Demo Shopping Flow Test Plan

## Application Overview

This test plan covers the complete end-to-end shopping flow for the Sauce Demo Shopify store, including home page navigation, product browsing, product details, cart management, and checkout process. The plan includes comprehensive positive and negative test scenarios to ensure full coverage of the shopping experience.

## Test Scenarios

### 1. Home Page

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify home page loads correctly

**File:** `tests/home-page/home-page-loads.spec.ts`

**Steps:**
  1. Navigate to https://sauce-demo.myshopify.com
    - expect: Page title should be 'Sauce Demo'
    - expect: Site logo and heading 'Sauce Demo' should be visible
    - expect: Tagline 'Just a demo site showing off what Sauce can do.' should be displayed
    - expect: Main navigation menu should be visible with links: Home, Catalog, Blog, About Us, Wish list, Refer a friend

#### 1.2. Verify header navigation elements

**File:** `tests/home-page/header-navigation.spec.ts`

**Steps:**
  1. Navigate to the home page
    - expect: Home page loads successfully
  2. Verify all header elements are present
    - expect: Search box should be visible with placeholder 'Search'
    - expect: Search submit button should be present
    - expect: Navigation links should be visible: Search, About Us, Log In, Sign up
    - expect: Cart link 'My Cart (0)' should be displayed
    - expect: Check Out link should be visible

#### 1.3. Verify featured products display

**File:** `tests/home-page/featured-products.spec.ts`

**Steps:**
  1. Navigate to the home page
    - expect: Home page loads successfully
  2. Check featured products section
    - expect: At least 3 product cards should be displayed
    - expect: Each product card should show product image, name, and price
    - expect: Product examples should include: Grey jacket (£55.00), Noir jacket (£60.00), Striped top (£50.00)

#### 1.4. Verify footer content

**File:** `tests/home-page/footer-content.spec.ts`

**Steps:**
  1. Navigate to the home page
    - expect: Home page loads successfully
  2. Scroll to footer and verify content
    - expect: Footer should contain 'About Us' section with description
    - expect: Payment method icons should be visible (Amex, Visa, Mastercard)
    - expect: Copyright notice should display current year
    - expect: Footer navigation links should be present: Search, About Us

#### 1.5. Verify social media links

**File:** `tests/home-page/social-media-links.spec.ts`

**Steps:**
  1. Navigate to the home page
    - expect: Home page loads successfully
  2. Check social media icons in navigation
    - expect: Social media links should be present for: Facebook, Twitter, Instagram, Pinterest
    - expect: RSS feed link should be available

### 2. Product Listing

**Seed:** `tests/seed.spec.ts`

#### 2.1. Navigate to catalog page

**File:** `tests/product-listing/catalog-navigation.spec.ts`

**Steps:**
  1. Navigate to the home page
    - expect: Home page loads successfully
  2. Click on 'Catalog' link in main navigation
    - expect: Should navigate to /collections/all
    - expect: Page title should be 'Products – Sauce Demo'
    - expect: Heading 'Products' should be displayed

#### 2.2. Verify product catalog display

**File:** `tests/product-listing/catalog-display.spec.ts`

**Steps:**
  1. Navigate to /collections/all
    - expect: Products page loads successfully
  2. Verify all products are displayed
    - expect: Multiple product cards should be visible
    - expect: Products should include: Black heels, Bronze sandals, Brown Shades, Grey jacket, Noir jacket, Striped top, White sandals
    - expect: Each product card should display product image, name, and price

#### 2.3. Verify sold out products indication

**File:** `tests/product-listing/sold-out-products.spec.ts`

**Steps:**
  1. Navigate to the catalog page
    - expect: Products page loads successfully
  2. Identify products marked as 'Sold Out'
    - expect: Brown Shades should have 'Sold Out' badge visible
    - expect: White sandals should have 'Sold Out' badge visible
    - expect: Sold out products should still display price information

#### 2.4. Verify breadcrumb navigation

**File:** `tests/product-listing/breadcrumb-navigation.spec.ts`

**Steps:**
  1. Navigate to the catalog page
    - expect: Products page loads successfully
  2. Check breadcrumb trail
    - expect: Breadcrumb should show: Home — Products
    - expect: Home link should be clickable and navigate to home page
    - expect: Products link should be active

#### 2.5. Verify product price display

**File:** `tests/product-listing/product-prices.spec.ts`

**Steps:**
  1. Navigate to the catalog page
    - expect: Products page loads successfully
  2. Verify all product prices are correctly displayed
    - expect: Black heels: £45.00
    - expect: Bronze sandals: £39.99
    - expect: Brown Shades: £20.00
    - expect: Grey jacket: £55.00
    - expect: Noir jacket: £60.00
    - expect: Striped top: £50.00
    - expect: White sandals: £25.00
    - expect: All prices should be formatted with £ symbol

### 3. Product Detail

**Seed:** `tests/seed.spec.ts`

#### 3.1. View available product details

**File:** `tests/product-detail/available-product-details.spec.ts`

**Steps:**
  1. Navigate to /collections/all
    - expect: Products page loads successfully
  2. Click on 'Grey jacket' product
    - expect: Should navigate to /products/grey-jacket
    - expect: Page title should be 'Grey jacket – Sauce Demo'
  3. Verify product detail page elements
    - expect: Product image should be displayed
    - expect: Product name 'Grey jacket' should be shown as heading
    - expect: Price '£55.00' should be visible
    - expect: Product description should be displayed
    - expect: Variant selector dropdown should be present showing 'Grey jacket'
    - expect: 'Add to Cart' button should be visible and enabled

#### 3.2. View sold out product details

**File:** `tests/product-detail/sold-out-product-details.spec.ts`

**Steps:**
  1. Navigate to /collections/all
    - expect: Products page loads successfully
  2. Click on 'Brown Shades' sold out product
    - expect: Should navigate to /products/brown-shades
    - expect: Page title should be 'Brown Shades – Sauce Demo'
  3. Verify sold out product page elements
    - expect: Product image should be displayed
    - expect: Product name 'Brown Shades' should be shown
    - expect: Price '£20.00' should be visible
    - expect: 'Sold Out' button should be displayed and disabled
    - expect: User should not be able to add product to cart

#### 3.3. Verify product breadcrumb navigation

**File:** `tests/product-detail/product-breadcrumb.spec.ts`

**Steps:**
  1. Navigate to a product detail page (Grey jacket)
    - expect: Product page loads successfully
  2. Check breadcrumb navigation
    - expect: Breadcrumb should show: Home — Grey jacket
    - expect: Home link should be clickable
    - expect: Product name should be displayed in breadcrumb

#### 3.4. Verify product variant selector

**File:** `tests/product-detail/variant-selector.spec.ts`

**Steps:**
  1. Navigate to a product detail page
    - expect: Product page loads successfully
  2. Check variant selector dropdown
    - expect: Dropdown should be present
    - expect: Default variant should be pre-selected
    - expect: Dropdown should be functional

### 4. Add to Cart

**Seed:** `tests/seed.spec.ts`

#### 4.1. Add single product to cart

**File:** `tests/add-to-cart/add-single-product.spec.ts`

**Steps:**
  1. Navigate to /products/grey-jacket
    - expect: Product page loads successfully
  2. Click 'Add to Cart' button
    - expect: Page should remain on product page
    - expect: Cart counter in header should update to 'My Cart (1)'
    - expect: Product should be added to cart successfully

#### 4.2. Add multiple products to cart

**File:** `tests/add-to-cart/add-multiple-products.spec.ts`

**Steps:**
  1. Navigate to /products/grey-jacket
    - expect: Product page loads successfully
  2. Click 'Add to Cart' button
    - expect: Cart counter should show 'My Cart (1)'
  3. Navigate to /products/noir-jacket
    - expect: Product page loads successfully
  4. Click 'Add to Cart' button
    - expect: Cart counter should update to 'My Cart (2)'

#### 4.3. Verify add to cart for sold out product

**File:** `tests/add-to-cart/sold-out-product.spec.ts`

**Steps:**
  1. Navigate to /products/brown-shades (sold out product)
    - expect: Product page loads successfully
  2. Verify 'Sold Out' button state
    - expect: 'Sold Out' button should be disabled
    - expect: User should not be able to click the button
    - expect: Product should not be addable to cart

#### 4.4. Verify cart counter updates

**File:** `tests/add-to-cart/cart-counter-updates.spec.ts`

**Steps:**
  1. Start with empty cart (cart count = 0)
    - expect: Cart counter shows 'My Cart (0)'
  2. Add a product to cart
    - expect: Cart counter should immediately update to 'My Cart (1)'
  3. Add another product to cart
    - expect: Cart counter should update to 'My Cart (2)'

### 5. Shopping Cart

**Seed:** `tests/seed.spec.ts`

#### 5.1. View cart with single item

**File:** `tests/shopping-cart/view-cart-single-item.spec.ts`

**Steps:**
  1. Add Grey jacket to cart
    - expect: Product added successfully, cart shows (1)
  2. Click 'Check Out' link in header
    - expect: Should navigate to /cart
    - expect: Page title should be 'Your Shopping Cart – Sauce Demo'
    - expect: Heading should show 'My Cart'
  3. Verify cart contents
    - expect: Product image should be displayed
    - expect: Product name 'Grey jacket - Grey jacket' should be shown
    - expect: Vendor 'Sauce Demo' should be visible
    - expect: Product description should be truncated
    - expect: Unit price should show '£55.00'
    - expect: Quantity textbox should show '1'
    - expect: Line total should display '£55.00'
    - expect: Cart total should show 'Total £55.00'
    - expect: Remove link 'x' should be present

#### 5.2. Update product quantity in cart

**File:** `tests/shopping-cart/update-quantity.spec.ts`

**Steps:**
  1. Navigate to cart with Grey jacket (quantity 1)
    - expect: Cart page loads with product
  2. Change quantity textbox value to '3'
    - expect: Quantity field updated to 3
  3. Click 'Update' button
    - expect: Page should refresh
    - expect: Quantity should be updated to 3
    - expect: Line total should update to '£165.00' (3 × £55.00)
    - expect: Cart total should show 'Total £165.00'
    - expect: Cart counter in header should show 'My Cart (3)'

#### 5.3. Remove product from cart

**File:** `tests/shopping-cart/remove-product.spec.ts`

**Steps:**
  1. Navigate to cart with Grey jacket in it
    - expect: Cart page displays with product
  2. Click the 'x' remove link
    - expect: Page should refresh
    - expect: Product should be removed from cart
    - expect: Cart should show as empty
    - expect: Cart counter should update to 'My Cart (0)'

#### 5.4. Verify cart with multiple products

**File:** `tests/shopping-cart/multiple-products-cart.spec.ts`

**Steps:**
  1. Add Grey jacket (£55.00) to cart
    - expect: Product added successfully
  2. Add Noir jacket (£60.00) to cart
    - expect: Product added successfully
  3. Navigate to cart page
    - expect: Both products should be listed
    - expect: Each product should have its own quantity control
    - expect: Each product should have its own remove link
    - expect: Cart total should show '£115.00' (£55 + £60)

#### 5.5. Add order note

**File:** `tests/shopping-cart/add-order-note.spec.ts`

**Steps:**
  1. Navigate to cart with items in it
    - expect: Cart page loads with products
  2. Enter text in 'Add a note to your order...' textbox
    - expect: Text should be entered successfully
  3. Click 'Update' button
    - expect: Page should refresh
    - expect: Order note should be preserved

#### 5.6. Continue shopping from cart

**File:** `tests/shopping-cart/continue-shopping.spec.ts`

**Steps:**
  1. Navigate to cart page
    - expect: Cart page loads
  2. Click '« Continue Shopping' link
    - expect: Should navigate to /collections/all
    - expect: Products catalog should be displayed

#### 5.7. Verify empty cart state

**File:** `tests/shopping-cart/empty-cart.spec.ts`

**Steps:**
  1. Navigate to /cart with no items in cart
    - expect: Cart page should load
    - expect: Cart should indicate it's empty
    - expect: Cart counter should show 'My Cart (0)'

#### 5.8. Update quantity to zero

**File:** `tests/shopping-cart/quantity-zero.spec.ts`

**Steps:**
  1. Navigate to cart with product in it
    - expect: Cart page displays with product
  2. Change quantity to '0'
    - expect: Quantity field updated
  3. Click 'Update' button
    - expect: Product should be removed from cart
    - expect: Cart should show as empty
    - expect: Cart counter should update to 'My Cart (0)'

#### 5.9. Verify quantity input validation

**File:** `tests/shopping-cart/quantity-validation.spec.ts`

**Steps:**
  1. Navigate to cart with product
    - expect: Cart page loads with product
  2. Attempt to enter negative quantity (-1)
    - expect: System should handle negative quantity appropriately
  3. Attempt to enter non-numeric value
    - expect: System should validate input and show error or prevent entry
  4. Attempt to enter very large quantity (e.g., 9999)
    - expect: System should either accept or show stock limitation message

### 6. Checkout Process

**Seed:** `tests/seed.spec.ts`

#### 6.1. Navigate to checkout

**File:** `tests/checkout/navigate-to-checkout.spec.ts`

**Steps:**
  1. Add product to cart and navigate to cart page
    - expect: Cart page displays with product
  2. Click 'Check Out' button
    - expect: Should navigate to checkout page (/checkouts/...)
    - expect: Page title should be 'Checkout - Sauce Demo'
    - expect: Checkout form should be displayed

#### 6.2. Verify checkout page structure

**File:** `tests/checkout/checkout-page-structure.spec.ts`

**Steps:**
  1. Navigate to checkout page
    - expect: Checkout page loads successfully
  2. Verify all checkout sections are present
    - expect: Heading 'Sauce Demo Checkout' should be visible
    - expect: 'Contact' section should be present
    - expect: 'Delivery' section should be present
    - expect: 'Payment' section should be present
    - expect: Order summary sidebar should be visible
    - expect: 'Pay now' button should be present at the bottom

#### 6.3. Verify contact information section

**File:** `tests/checkout/contact-information.spec.ts`

**Steps:**
  1. Navigate to checkout page
    - expect: Checkout page loads
  2. Verify Contact section elements
    - expect: 'Contact' heading should be visible
    - expect: 'Sign in' link should be present
    - expect: Email textbox should be displayed
    - expect: 'Email me with news and offers' checkbox should be visible

#### 6.4. Verify delivery information section

**File:** `tests/checkout/delivery-information.spec.ts`

**Steps:**
  1. Navigate to checkout page
    - expect: Checkout page loads
  2. Verify Delivery section elements
    - expect: 'Delivery' heading should be visible
    - expect: 'Country/Region' dropdown should be present with Netherlands pre-selected
    - expect: 'First name (optional)' textbox should be visible
    - expect: 'Last name' textbox should be visible
    - expect: 'Company (optional)' textbox should be visible
    - expect: 'Address' combobox should be present
    - expect: 'Apartment, suite, etc. (optional)' textbox should be visible
    - expect: 'Postal code' textbox should be visible
    - expect: 'City' textbox should be visible
    - expect: 'Phone (optional)' textbox should be visible
    - expect: 'Save this information for next time' checkbox should be present
    - expect: 'Shipping method' section should show placeholder message

#### 6.5. Verify payment section

**File:** `tests/checkout/payment-section.spec.ts`

**Steps:**
  1. Navigate to checkout page
    - expect: Checkout page loads
  2. Verify Payment section elements
    - expect: 'Payment' heading should be visible
    - expect: Security message 'All transactions are secure and encrypted' should be displayed
    - expect: 'Credit card' heading should be present
    - expect: BOGUS payment gateway indicator should be visible
    - expect: Card number input field should be present (in iframe)
    - expect: Expiration date input field should be present (in iframe)
    - expect: Security code input field should be present (in iframe)
    - expect: Name on card input field should be present (in iframe)
    - expect: 'Use shipping address as billing address' checkbox should be checked by default
    - expect: 'Add discount' button should be visible

#### 6.6. Verify order summary sidebar

**File:** `tests/checkout/order-summary.spec.ts`

**Steps:**
  1. Add Grey jacket to cart and navigate to checkout
    - expect: Checkout page loads with product
  2. Verify order summary sidebar contents
    - expect: 'Order summary' heading should be visible
    - expect: Product image should be displayed
    - expect: Product name 'Grey jacket' should be shown
    - expect: Product variant 'Grey jacket' should be listed
    - expect: Quantity '1' should be displayed
    - expect: Product price '£55.00' should be shown
    - expect: Subtotal should display '£55.00'
    - expect: Shipping should show 'Enter shipping address'
    - expect: Total should display 'GBP £55.00'

#### 6.7. Verify discount code section

**File:** `tests/checkout/discount-code.spec.ts`

**Steps:**
  1. Navigate to checkout page
    - expect: Checkout page loads
  2. Click 'Add discount' button
    - expect: Discount code section should expand
    - expect: Discount code textbox should be visible
    - expect: 'Apply' button should be present but disabled initially

#### 6.8. Fill out contact information

**File:** `tests/checkout/fill-contact-info.spec.ts`

**Steps:**
  1. Navigate to checkout page
    - expect: Checkout page loads
  2. Enter email address in Contact section
    - expect: Email should be accepted and displayed
  3. Optionally check 'Email me with news and offers'
    - expect: Checkbox should be checked

#### 6.9. Fill out delivery information

**File:** `tests/checkout/fill-delivery-info.spec.ts`

**Steps:**
  1. Navigate to checkout and fill contact info
    - expect: Contact section completed
  2. Select country from dropdown
    - expect: Country should be selected
  3. Fill in required delivery fields: Last name, Address, Postal code, City
    - expect: All required fields should be filled
  4. Optionally fill First name, Company, Apartment, and Phone
    - expect: Optional fields should accept input
  5. Verify shipping method appears after entering address
    - expect: Shipping method options should become available or shipping cost should be calculated

#### 6.10. Verify checkout with empty cart

**File:** `tests/checkout/empty-cart-checkout.spec.ts`

**Steps:**
  1. Attempt to navigate directly to checkout URL with empty cart
    - expect: Should either redirect to cart page
    - expect: Or display message indicating cart is empty
    - expect: Should not allow checkout with no items

#### 6.11. Verify return to cart from checkout

**File:** `tests/checkout/return-to-cart.spec.ts`

**Steps:**
  1. Navigate to checkout page
    - expect: Checkout page loads
  2. Click 'Cart' link in header
    - expect: Should navigate back to cart page
    - expect: Cart contents should be preserved

#### 6.12. Verify required field validation

**File:** `tests/checkout/required-field-validation.spec.ts`

**Steps:**
  1. Navigate to checkout page
    - expect: Checkout page loads
  2. Leave required fields empty and click 'Pay now'
    - expect: Validation errors should be displayed
    - expect: Should highlight required fields: Email, Last name, Address, Postal code, City
    - expect: Should not proceed to payment without required information

#### 6.13. Verify email format validation

**File:** `tests/checkout/email-validation.spec.ts`

**Steps:**
  1. Navigate to checkout page
    - expect: Checkout page loads
  2. Enter invalid email format (e.g., 'notanemail')
    - expect: Email field should show validation error
  3. Enter valid email format (e.g., 'test@example.com')
    - expect: Email should be accepted without error

### 7. Search Functionality

**Seed:** `tests/seed.spec.ts`

#### 7.1. Search for existing products

**File:** `tests/search/search-existing-products.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page loads successfully
  2. Enter 'jacket' in search box
    - expect: Search term entered
  3. Click Submit button
    - expect: Should navigate to /search?type=product&q=jacket
    - expect: Page title should indicate '2 results found for "jacket"'
    - expect: Search results should display Grey jacket and Noir jacket
    - expect: Each result should show product image, name, and price

#### 7.2. Search with no results

**File:** `tests/search/search-no-results.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page loads
  2. Enter non-existent product name (e.g., 'xyz123')
    - expect: Search term entered
  3. Submit search
    - expect: Should navigate to search results page
    - expect: Should display '0 results found' or 'No results' message
    - expect: No product cards should be displayed

#### 7.3. Search with empty query

**File:** `tests/search/search-empty-query.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page loads
  2. Leave search box empty and click Submit
    - expect: Should either show all products
    - expect: Or display validation message
    - expect: Should handle empty search gracefully

#### 7.4. Search and navigate to product

**File:** `tests/search/search-navigate-to-product.spec.ts`

**Steps:**
  1. Search for 'jacket'
    - expect: Search results displayed with 2 products
  2. Click on 'Grey jacket' from search results
    - expect: Should navigate to product detail page
    - expect: Product page should display correctly

#### 7.5. Search case sensitivity

**File:** `tests/search/search-case-sensitivity.spec.ts`

**Steps:**
  1. Search for 'JACKET' (uppercase)
    - expect: Should return same results as lowercase 'jacket'
  2. Search for 'JaCkEt' (mixed case)
    - expect: Search should be case-insensitive and return matching products

### 8. End-to-End Shopping Flow

**Seed:** `tests/seed.spec.ts`

#### 8.1. Complete shopping journey - single product

**File:** `tests/e2e/complete-shopping-single-product.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page loads successfully
  2. Click on Catalog link
    - expect: Product catalog page displays
  3. Click on Grey jacket product
    - expect: Product detail page loads for Grey jacket
  4. Click 'Add to Cart' button
    - expect: Product added to cart, counter shows (1)
  5. Click 'Check Out' in header
    - expect: Navigate to cart page
  6. Verify cart contents and click 'Check Out' button
    - expect: Navigate to checkout page
  7. Fill in contact information (email)
    - expect: Email entered successfully
  8. Fill in delivery information (all required fields)
    - expect: Delivery information completed
  9. Verify order summary shows correct product and total
    - expect: Grey jacket displayed in order summary
    - expect: Total shows £55.00 (plus shipping if applicable)

#### 8.2. Complete shopping journey - multiple products

**File:** `tests/e2e/complete-shopping-multiple-products.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page loads
  2. Browse catalog and add Grey jacket to cart
    - expect: Cart counter shows (1)
  3. Browse catalog and add Noir jacket to cart
    - expect: Cart counter shows (2)
  4. Navigate to cart
    - expect: Both products displayed in cart
  5. Update Grey jacket quantity to 2
    - expect: Cart total updates to £170.00 (2×£55 + £60)
  6. Proceed to checkout
    - expect: Checkout page loads with correct items
  7. Complete checkout form
    - expect: All required information entered
  8. Verify order summary
    - expect: 2 Grey jackets and 1 Noir jacket in summary
    - expect: Total of £170.00 displayed

#### 8.3. Shopping flow with search

**File:** `tests/e2e/shopping-flow-with-search.spec.ts`

**Steps:**
  1. Navigate to home page
    - expect: Home page loads
  2. Search for 'sandals'
    - expect: Search results show Bronze sandals and White sandals
  3. Click on Bronze sandals
    - expect: Product detail page loads
  4. Add to cart
    - expect: Product added successfully
  5. Continue to checkout
    - expect: Checkout process proceeds normally

#### 8.4. Cart management during shopping

**File:** `tests/e2e/cart-management-flow.spec.ts`

**Steps:**
  1. Add 3 different products to cart
    - expect: Cart counter shows (3)
  2. Go to cart and remove one product
    - expect: Cart updates to 2 items
  3. Update quantity of remaining product
    - expect: Cart total updates accordingly
  4. Click 'Continue Shopping'
    - expect: Return to catalog
  5. Add another product
    - expect: Cart maintains previous items and adds new one
  6. Proceed to checkout
    - expect: All cart items transferred to checkout
