import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Inventory Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('7. Should display all 6 inventory items', async ({ page }) => {
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
  });

  test('8. Add item to cart and check cart badge', async ({ page }) => {
    await page.locator('text=Add to cart').first().click();
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

  test('9. Clicking item should open item detail page', async ({ page }) => {
    await page.locator('.inventory_item_name').first().click();
    await expect(page).toHaveURL(/inventory-item/);
    await expect(page.locator('.inventory_details_name')).toBeVisible();
  });

  test('10. Sort dropdown should change item order', async ({ page }) => {
    const dropdown = page.locator('[data-test="product_sort_container"]');
    await dropdown.selectOption('za');
    const firstItem = await page.locator('.inventory_item_name').first().textContent();
    expect(firstItem?.trim()).toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('11. Logout should redirect to login page', async ({ page }) => {
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page).toHaveURL('/');
  });
});
