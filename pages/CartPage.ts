// pages/CartPage.ts
import { Page } from '@playwright/test';
import { getByDataTest } from '../utils/selectors';

export class CartPage {
  private locators = {
    inventoryItem: 'inventory-item',
    inventoryItemName: 'inventory-item-name',
    checkoutButton: 'checkout',
    cartItem: '.cart_item',
  };

  constructor(private page: Page) {}

  // Navigate to the cart page
  async goto(): Promise<void> {
    await this.page.goto('/cart.html');
    await getByDataTest(this.page, this.locators.inventoryItem).first().isVisible();
  }

  // Get the names of items in the cart
  async getCartItemNames(): Promise<string[]> {
    return await getByDataTest(this.page, this.locators.inventoryItemName).allTextContents();
  }

  // Check if an item is in the cart
  async isItemInCart(itemName: string): Promise<boolean> {
    const item = this.page.locator(this.locators.cartItem).filter({ hasText: itemName });
    return await item.count() > 0;
  }

  // Proceed to the checkout
  async proceedToCheckout(): Promise<void> {
    await getByDataTest(this.page, this.locators.checkoutButton).click();
  }
}
