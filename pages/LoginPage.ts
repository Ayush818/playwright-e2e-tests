import { Page } from '@playwright/test';
import { getByDataTest } from '../utils/selectors';

export class LoginPage {
  private usernameLocator = 'username';
  private passwordLocator = 'password';
  private loginButtonLocator = 'login-button';
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await getByDataTest(this.page, this.usernameLocator).fill(username);
    await getByDataTest(this.page, this.passwordLocator).fill(password);
    await getByDataTest(this.page, this.loginButtonLocator).click();
  }
   
}
