import { test as base } from '@playwright/test';

type LoginCredentials = {
  username: string;
  password: string;
};

export const test = base.extend<{
  validUser: LoginCredentials;
  lockedOutUser: LoginCredentials;
}>({
  validUser: async ({}, use) => {
    await use({
      username: 'standard_user',
      password: 'secret_sauce',
    });
  },
  lockedOutUser: async ({}, use) => {
    await use({
      username: 'locked_out_user',
      password: 'secret_sauce',
    });
  },
});

export { expect } from '@playwright/test';
