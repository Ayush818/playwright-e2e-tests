import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BurgerMenuPage } from '../pages/BurgerMenuPage';

test('Verify Back Button Behavior After Logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const burgerMenu = new BurgerMenuPage(page);

  await page.goto('/'); 
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('/inventory.html');
  await burgerMenu.openBurgerMenu();
  await burgerMenu.clickLogoutButton();
  await expect(page).toHaveURL('/');
  await page.goBack();
  await expect(page).toHaveURL('/');
});
