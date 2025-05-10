import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { readFile } from 'fs/promises';
import path from 'path';

test.describe('Inventory Tests', () => {
  let page: Page;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForSelector('[data-test="inventory-item"]'); 
  });

  test('Inventory items match expected values', async () => {
    const dataPath = path.resolve(__dirname, '../fixtures/expectedInventory.json');
    const rawData = await readFile(dataPath, 'utf-8');
    const expectedInventoryItems: string[] = JSON.parse(rawData);
    const itemCount = await inventoryPage.getItemCount();
    const frontendItemNames = await inventoryPage.getItemNames();

    expect(itemCount).toBe(expectedInventoryItems.length);
    expect(frontendItemNames.sort()).toEqual(expectedInventoryItems.sort());
  });

  test('Verify sorting of items by price (low to high)', async () => {
    const initialProductPrice = await inventoryPage.getProductPrice();

    await inventoryPage.sortByPriceLowTohigh();

    const sortedProductPrice = await inventoryPage.getProductPrice();
    
    expect(sortedProductPrice).toEqual(initialProductPrice.sort((a, b) => a - b));
  });

  test.afterAll(async () => {
    await page.close(); 
  });
});
