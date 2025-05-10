import { Page, Locator, expect } from '@playwright/test';
import { getByDataTest } from '../utils/selectors';

export class InventoryPage {
  
  constructor(private page: Page) {}

  getItems(): Locator {
    return getByDataTest(this.page, 'inventory-item');
  }

  async getItemNames(): Promise<string[]> {
    return await getByDataTest(this.page, 'inventory-item-name').allTextContents();
  }

  async getItemCount(): Promise<number> {
    return await this.getItems().count();
  }
async addItemToCart(index: number) {
  const addButtons = await this.page.locator('.btn_inventory').filter({ hasText: 'Add to cart' }).nth(index);
  
  await addButtons.click();
}

async getRemoveButton() {
  return await this.page.locator('.btn_inventory').filter({ hasText: 'Remove' });
}

async removeFirstItem() {
  const RemoveButtons = await this.page.locator('.btn_inventory').filter({ hasText: 'Remove' });
  await RemoveButtons.click();
 
}
async getAddToCartButton() {
  return this.page.locator('.btn_inventory', { hasText: 'Add to cart' });
}


async getCartBadgeCount() {
  const badge = getByDataTest(this.page, 'shopping-cart-badge');
  if (await badge.isVisible()) {
    return parseInt(await badge.textContent()|| '0')
  }
  return 0;
}

async sortByPriceLowTohigh(){
  await getByDataTest(this.page, 'product-sort-container').selectOption('lohi');
}

async getProductPrice(){
  const prices = await getByDataTest(this.page, "inventory-item-price").allTextContents();
  return prices.map(price => parseFloat(price.replace('$', '')));

}

async getProductTitleByIndex(index: number) {
  return await getByDataTest(this.page, 'inventory-item-name').nth(index).textContent();
}

async getProductDescriptionByIndex(index: number) {
  return await getByDataTest(this.page, 'inventory-item-desc').nth(index).textContent();

}
async getProductPriceByIndex(index: number) {
  const priceText = await getByDataTest(this.page, 'inventory-item-price').nth(index).textContent();
  return priceText;
}

async clickProductByIndex(index: number) {
  await  getByDataTest(this.page, 'inventory-item-name').nth(index).click();
  // console.log("product", product);
  // await product.click({force: true});
await expect(this.page).toHaveURL(/\/inventory-item\.html\?id=\d+/);
}

  async removeItemFromCartByIndex(index: number) {
    await this.page.locator('[data-test^="remove"]').nth(index).click();
  }


}
