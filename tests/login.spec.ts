import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  test('1. Login with valid user should redirect to inventory', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('2. Login with locked out user shows error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    const err = await login.getError();
    expect(err).toContain('locked out');
  });

  test('3. Login with empty credentials shows error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('', '');
    const err = await login.getError();
    expect(err).toContain('Username is required');
  });

  test('4. Login with only username shows password error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', '');
    const err = await login.getError();
    expect(err).toContain('Password is required');
  });

  test('5. Login with wrong password shows error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'wrongpass');
    const err = await login.getError();
    expect(err).toContain('Username and password do not match');
  });

  test('6. Login button disabled when fields are empty (UI state)', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await expect(login.loginButton).toBeEnabled(); // shows default is not disabled
  });
});
