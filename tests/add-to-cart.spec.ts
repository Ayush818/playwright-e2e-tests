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
    // Login before each test
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Add to cart: item is added and visible in cart', async () => {
    // Step 1: Add the first item to the cart
    await inventoryPage.addItemToCart(0); // Sauce Labs Backpack

    // Step 2: Verify the button changed to 'Remove'
    const buttonText = await (await inventoryPage.getRemoveButton()).textContent();
    expect(buttonText).toBe('Remove');

    // Step 3: Verify cart badge shows count = 1
    const cartCount = await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe(1);

    // Step 4: Go to cart and verify the item name matches
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
