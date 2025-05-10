// tests/logout.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { BurgerMenuPage } from '../pages/BurgerMenuPage';

test('Validate logout from burger menu', async ({ page }) => {
  // Instantiate Page Object Models
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const burgerMenuPage = new BurgerMenuPage(page);


  await page.goto('/'); // Navigate to the base URL
  
  await loginPage.login('standard_user', 'secret_sauce');
  
  await burgerMenuPage.openBurgerMenu();
  
  await burgerMenuPage.clickLogoutButton();
  
  await expect(page).toHaveURL( '/');
  
  await page.goto('/cart.html');
  await expect(page).toHaveURL( '/');
});
