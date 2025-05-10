import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { readFile } from 'fs/promises';
import path from 'path';

test.describe('Inventory Tests', () => {
  let page: Page;
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  // Perform login once before all tests
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    // Login only once for all tests
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForSelector('[data-test="inventory-item"]'); // Wait for the inventory page to load
  });

  test('Inventory items match expected values', async () => {
    // Read the fixture file
    const dataPath = path.resolve(__dirname, '../fixtures/expectedInventory.json');
    const rawData = await readFile(dataPath, 'utf-8');
    const expectedInventoryItems: string[] = JSON.parse(rawData);

    const itemCount = await inventoryPage.getItemCount();
    const frontendItemNames = await inventoryPage.getItemNames();

    // Verify inventory items match expected values
    expect(itemCount).toBe(expectedInventoryItems.length);
    expect(frontendItemNames.sort()).toEqual(expectedInventoryItems.sort());
  });

  test('Verify sorting of items by price (low to high)', async () => {
    // Get initial product prices
    const initialProductPrice = await inventoryPage.getProductPrice();

    // Sort products by price (low to high)
    await inventoryPage.sortByPriceLowTohigh();

    // Get sorted product prices
    const sortedProductPrice = await inventoryPage.getProductPrice();

    // Verify that the prices are sorted correctly
    expect(sortedProductPrice).toEqual(initialProductPrice.sort((a, b) => a - b));
  });

  // Cleanup after all tests are done
  test.afterAll(async () => {
    await page.close(); // Close the browser page after the tests
  });
});
