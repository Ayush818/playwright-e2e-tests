import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BurgerMenuPage } from '../pages/BurgerMenuPage';

test('Verify Back Button Behavior After Logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const burgerMenu = new BurgerMenuPage(page);

  await page.goto('/'); 

  // 1. Login with valid user
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('/inventory.html');

  // 2. Logout
  await burgerMenu.openBurgerMenu();
  await burgerMenu.clickLogoutButton();
  
  // 3. Verify that we are on the login page after logout
  await expect(page).toHaveURL('/');
  
  // 4. Use the browser back button to try and access the inventory page again
  await page.goBack();
  
  // 5. Verify that the user is redirected to the login page after using the back button
  await expect(page).toHaveURL('/');
});
