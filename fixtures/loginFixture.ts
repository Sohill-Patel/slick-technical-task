import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { STORAGE_STATE_PATH } from '../utils/const';


export const test = base.extend<{loginPage: LoginPage}>({
  loginPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: STORAGE_STATE_PATH });
		const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();

    await use(loginPage);
    await context.close();
  },
});

export { expect } from '@playwright/test';