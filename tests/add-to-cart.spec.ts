import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Add to cart: item is added and visible in cart', async () => {
    await inventoryPage.addItemToCart(0);   // Sauce Labs Backpack

    const buttonText = await (await inventoryPage.getRemoveButton()).textContent();
    expect(buttonText).toBe('Remove');

    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe(1);

    await cartPage.goto();
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain('Sauce Labs Backpack');
  });

  test('Validate that the cart icon updates count correctly', async () => {
    // Add 2 items to the cart
    await inventoryPage.addItemToCart(0);
    await inventoryPage.addItemToCart(1);

    let cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe(2);

    // Remove 1 item from the cart
    await inventoryPage.removeItemFromCartByIndex(0);

    cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe(1);
  });
});
