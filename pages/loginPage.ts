import { Page, Locator } from '@playwright/test';


export class LoginPage {
  private page: Page;
  private emailAddressInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private pinPageText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailAddressInput = page.getByRole('textbox', { name: 'Email address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'LOGIN' });
    this.pinPageText = page.getByText('digit pin');
  }
  
  getPage(): Page{
    return this.page;
  }

  async navigateToLoginPage() {
    await this.page.goto('/salon/#/salon/28852/day/today');

    // ASSUMPTION, PIN IS REQUIRED, ON NAVIGATION TO THIS PAGE
    await this.pinPageText.waitFor() 
    const pin = process.env.PIN || '1234'
    for(const digit of pin) {
      await this.page.keyboard.press(digit, {delay: 200});
    } 
    
  }

  async login(username: string, password: string) {
    await this.emailAddressInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/login/mfa');
    
    // TODO: Automate the MFA & PIN STEPS
    // THIS NEEDS TO BE DONE MANUALLY FOR NOW
    // INSERT BREAKPOINT HERE

    return this.page;
  }
}