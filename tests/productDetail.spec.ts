// tests/productDetail.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';

test('Navigate to product detail page and verify information', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const productDetailPage = new ProductDetailPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  const productIndex = 0; 
  const expectedTitle = await inventoryPage.getProductTitleByIndex(productIndex);
  const expectedDescription = await inventoryPage.getProductDescriptionByIndex(productIndex);
  const expectedPrice = await inventoryPage.getProductPriceByIndex(productIndex);

  await inventoryPage.clickProductByIndex(productIndex);

  const actualTitle = await productDetailPage.getProductTitle();
  const actualDescription = await productDetailPage.getProductDescription();
  const actualPrice = await productDetailPage.getProductPrice();
  expect(actualTitle).toBe(expectedTitle);
  expect(actualDescription).toBe(expectedDescription);
  expect(actualPrice).toBe(expectedPrice);
});
