// tests/logout.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BurgerMenuPage } from '../pages/BurgerMenuPage';

test('Validate logout from burger menu', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const burgerMenuPage = new BurgerMenuPage(page);

 
  await page.goto('/'); 
  await loginPage.login('standard_user', 'secret_sauce');
  await burgerMenuPage.openBurgerMenu();
  await burgerMenuPage.clickLogoutButton(); 
  await expect(page).toHaveURL( '/');
  await page.goto('/cart.html');
  await expect(page).toHaveURL( '/');
});
