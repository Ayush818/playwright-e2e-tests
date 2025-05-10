import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { getByDataTest } from '../utils/selectors';



test('Verify checkout process', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Step 1: Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Step 2: Add Items to Cart
  await inventoryPage.addItemToCart(0); // Add the first item
//   await assert(addButtons="1")
  await inventoryPage.addItemToCart(1); // Add the second item

  // Step 3: Navigate to Cart Page
  await cartPage.goto();

  // Step 4: Proceed to Checkout
  await cartPage.proceedToCheckout();

  // Step 5 : Fill Checkout Information
  await checkoutPage.checkOutinformation();

  // Step 6: Verify Cart Items in Checkout
  const cartItemNames = await cartPage.getCartItemNames();
  const checkoutItemNames = await checkoutPage.getCheckoutItemNames();
  expect(checkoutItemNames.sort()).toEqual(cartItemNames.sort());

  // Step 6: Complete the Checkout
  await checkoutPage.completeCheckout();

  await checkoutPage.verifyCheckoutPage();

});
