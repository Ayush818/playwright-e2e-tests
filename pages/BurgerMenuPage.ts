// pageObjects/BurgerMenuPage.ts
import { Page } from '@playwright/test';
import { getByDataTest } from '../utils/selectors';

export class BurgerMenuPage {
  private burgerMenuButton = "open-menu"; 
  private logoutButton = "logout-sidebar-link"; // Selector for logout button

  constructor(private page: Page) {
  }

  async openBurgerMenu() {
    const menuButton = await getByDataTest(this.page, "open-menu");
    await menuButton.scrollIntoViewIfNeeded();
    await menuButton.click({ force: true });
  }

  async clickLogoutButton() {
    await getByDataTest(this.page,this.logoutButton).click();
}
}
