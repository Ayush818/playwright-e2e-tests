import { test as baseTest, expect } from '@playwright/test';
import { readFile } from 'fs/promises';
import path from 'path';

// Function to load the fixture data asynchronously
async function loadFixtureData() {
  const dataPath = path.resolve(__dirname, './fixtures/expectedInventory.json');
  const rawData = await readFile(dataPath, 'utf-8');
  return JSON.parse(rawData); // Return the parsed data
}

// Extend the base test with the loaded fixture data
type TestFixtures = {
  expectedInventoryItems: any; // Define the type of your fixture data here
};

export const test = baseTest.extend<TestFixtures>({
  expectedInventoryItems: async ({}, use) => {
    const data = await loadFixtureData();
    await use(data);
  },
});

export { expect };
