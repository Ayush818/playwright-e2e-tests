import { expect, Page } from '@playwright/test';
import { getByDataTest } from '../utils/selectors';

export class CheckoutPage {
  private locators = {
    itemName: 'inventory-item-name',
    finishButton: 'finish',
    firstNameInput: 'firstName',
    lastNameInput: 'lastName',
    postalCodeInput: 'postalCode',
    continueButton: 'continue',
    pageHeader: 'checkout-complete-container',
  };

  constructor(private page: Page) {}


  async getCheckoutItemNames(): Promise<string[]> {
    await this.page.goto('/checkout-step-two.html');
    return await getByDataTest(this.page, this.locators.itemName).allTextContents();
  }


  async completeCheckout(): Promise<void> {
    await getByDataTest(this.page, this.locators.finishButton).click();
  }


  async checkOutinformation(): Promise<void> {
    await getByDataTest(this.page, this.locators.firstNameInput).fill('Aayush');
    await getByDataTest(this.page, this.locators.lastNameInput).fill('Pokhrel');
    await getByDataTest(this.page, this.locators.postalCodeInput).fill('12345');
    await getByDataTest(this.page, this.locators.continueButton).click();
  }


  async verifyCheckoutPage(): Promise<void> {
    const pageUrl = await this.page.url();
    expect(pageUrl).toContain('/checkout-complete.html');
    const pageHeader = await getByDataTest(this.page, this.locators.pageHeader);
    expect(await pageHeader.isVisible()).toBeTruthy();
  }
}
