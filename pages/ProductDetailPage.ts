// pages/ProductDetailPage.ts
import { Page } from '@playwright/test';
import { getByDataTest } from '../utils/selectors';

export class ProductDetailPage {
    // Define locators as constants in one place
    private locators = {
        productTitle: 'inventory-item-name',
        productDescription: 'inventory-item-desc',
        productPrice: 'inventory-item-price'
    };

    constructor(private page: Page) {}

    // Get the product title
    async getProductTitle() {
        return await getByDataTest(this.page, this.locators.productTitle).textContent();
    }
    
    // Get the product description
    async getProductDescription() {
        return await getByDataTest(this.page, this.locators.productDescription).textContent();
    }

    // Get the product price
    async getProductPrice() {
        return await getByDataTest(this.page, this.locators.productPrice).textContent();
    }
}
