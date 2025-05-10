// utils/selectors.ts
import { Page, Locator } from '@playwright/test';

/**
 * Custom helper to select elements by data-test attribute
 */
export function getByDataTest(page: Page, value: string): Locator {
  return page.locator(`[data-test="${value}"]`);
}
