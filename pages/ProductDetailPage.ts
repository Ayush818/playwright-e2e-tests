import { Page } from '@playwright/test';
import { getByDataTest } from '../utils/selectors';

export class ProductDetailPage {

    private locators = {
        productTitle: 'inventory-item-name',
        productDescription: 'inventory-item-desc',
        productPrice: 'inventory-item-price'
    };

    constructor(private page: Page) {}
    async getProductTitle() {
        return await getByDataTest(this.page, this.locators.productTitle).textContent();
    }
    async getProductDescription() {
        return await getByDataTest(this.page, this.locators.productDescription).textContent();
    }
    async getProductPrice() {
        return await getByDataTest(this.page, this.locators.productPrice).textContent();
    }
}
