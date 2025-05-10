import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test('Remove item from cart and verify UI and cart state', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // Step 1: Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Step 2: Add first item to cart
  await inventoryPage.addItemToCart(0);
  await expect(await inventoryPage.getCartBadgeCount()).toBe(1);

  // Step 3: Remove the item
  await inventoryPage.removeFirstItem();

  // Step 4: Validate cart badge is gone
  const badge = await inventoryPage.getCartBadgeCount();
  await expect(await badge).toBe(0);

  // Step 5: Validate button changed back to "Add to cart"
  const addButton = await inventoryPage.getAddToCartButton();
  await expect(addButton.first()).toBeVisible();

  // Step 6: Go to cart page and ensure item is not listed
  await cartPage.goto();
  const isItemPresent = await cartPage.isItemInCart('Sauce Labs Backpack');
  await expect(isItemPresent).toBeFalsy();
});
