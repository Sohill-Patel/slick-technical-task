import { test as setup, expect } from '../../fixtures/loginFixture';
import { LoginPage } from '../../pages/loginPage';
import { STORAGE_STATE_PATH } from '../../utils/const';


setup('global setup login session for tests', async ({ browser }) => {
  const browserContext = await browser.newContext();
	const page = await browserContext.newPage();
  const username = process.env.USERNAME || 'defaultUser';
  const password = process.env.PASSWORD || 'defaultPassword';
  
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();  
  const LoggedInPage = await loginPage.login(username, password);
  await LoggedInPage.context().storageState({ path: STORAGE_STATE_PATH });
  await browserContext.close();
})