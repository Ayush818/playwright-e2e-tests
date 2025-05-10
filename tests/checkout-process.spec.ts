import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';



test('Verify checkout process', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await cartPage.goto();
  await cartPage.proceedToCheckout();
  await checkoutPage.checkOutinformation();

  const cartItemNames = await cartPage.getCartItemNames();
  const checkoutItemNames = await checkoutPage.getCheckoutItemNames();
  
  expect(checkoutItemNames.sort()).toEqual(cartItemNames.sort());

  await checkoutPage.completeCheckout();
  await checkoutPage.verifyCheckoutPage();

});
